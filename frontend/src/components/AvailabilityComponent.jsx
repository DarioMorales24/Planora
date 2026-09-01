import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AvailabilityComponent() {
  const [availabilities, setAvailabilities] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ employeeId: '', dayOfWeek: '', isAvailable: true, startTime: '', endTime: '', notes: '' });
  const [editingId, setEditingId] = useState(null);

  const diasSemana = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];

  const fetchEmployees = async () => {
    const { data } = await axios.get('/api/employees');
    setEmployees(data);
  };

  const fetchAvailabilities = async () => {
    const { data } = await axios.get('/api/availabilities');
    setAvailabilities(data);
  };

  useEffect(() => {
    fetchEmployees();
    fetchAvailabilities();
  }, []);

  const handleSubmit = async () => {
    await axios.post('/api/availabilities', formData);
    fetchAvailabilities();
    setFormData({ employeeId: '', dayOfWeek: '', isAvailable: true, startTime: '', endTime: '', notes: '' });
    setEditingId(null);
  };

  const handleEdit = (avail) => {
    setFormData({ employeeId: avail.employee.id, dayOfWeek: avail.dayOfWeek, isAvailable: avail.isAvailable, startTime: avail.startTime || '', endTime: avail.endTime || '', notes: avail.notes || '' });
    setEditingId(avail.id);
  };

  const handleUpdate = async () => {
    await axios.put(`/api/availabilities/${editingId}`, formData);
    fetchAvailabilities();
    setFormData({ employeeId: '', dayOfWeek: '', isAvailable: true, startTime: '', endTime: '', notes: '' });
    setEditingId(null);
  };

  const handleDelete = async id => {
    await axios.delete(`/api/availabilities/${id}`);
    fetchAvailabilities();
  };

  return (
    <div>
      <h2>Disponibilidad</h2>
      <select
        value={formData.employeeId}
        onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
      >
        <option value="">Seleccionar empleado</option>
        {employees.map(e => (
          <option key={e.id} value={e.id}>
            {e.firstName} {e.lastName}
          </option>
        ))}
      </select>

      <select
        value={formData.dayOfWeek}
        onChange={e => setFormData({ ...formData, dayOfWeek: e.target.value })}
      >
        <option value="">Seleccionar día</option>
        {diasSemana.map(dia => (
          <option key={dia} value={dia.toUpperCase()}>
            {dia}
          </option>
        ))}
      </select>

      <label>
        <input
          type="checkbox"
          checked={formData.isAvailable}
          onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })}
        />
        Disponible
      </label>

      <input
        placeholder="HH:mm - inicio"
        value={formData.startTime}
        onChange={e => setFormData({ ...formData, startTime: e.target.value })}
      />
      <input
        placeholder="HH:mm - fin"
        value={formData.endTime}
        onChange={e => setFormData({ ...formData, endTime: e.target.value })}
      />
      <input
        placeholder="Notas"
        value={formData.notes}
        onChange={e => setFormData({ ...formData, notes: e.target.value })}
      />

      <button onClick={handleSubmit}>Guardar</button>
      {editingId && <button onClick={handleUpdate}>Actualizar</button>}

      <ul>
        {availabilities.map(a => (
          <li key={a.id}>
            {employees.find(e => e.id === a.employeeId)?.firstName} {employees.find(e => e.id === a.employeeId)?.lastName} - {a.dayOfWeek}: {a.isAvailable ? 'Disponible' : 'No disponible'} - {a.startTime || 'todo el día'} - {a.endTime || ''} - {a.notes || ''}{' '}
            <button onClick={() => handleDelete(a.id)}>Eliminar</button>
            <button onClick={() => handleEdit(a)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}