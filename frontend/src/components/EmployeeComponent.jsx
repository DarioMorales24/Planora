import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EmployeeComponent() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', department: '', weeklyHours: '' });
  const [skills, setSkills] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchEmployees = async () => {
    const { data } = await axios.get('/api/employees');
    setEmployees(data);
  };

  const fetchSkills = async () => {
    const { data } = await axios.get('/api/skills');
    setSkills(data);
  };

  useEffect(() => {
    fetchEmployees();
    fetchSkills();
  }, []);

  const handleCreate = async () => {
    await axios.post('/api/employees', form);
    fetchEmployees();
    setForm({ firstName: '', lastName: '', email: '', department: '', weeklyHours: '' });
    setEditingId(null);
  };

  const handleEdit = (id, employee) => {
    setForm({ firstName: employee.firstName, lastName: employee.lastName, email: employee.email, department: employee.department, weeklyHours: employee.weeklyHours });
    setEditingId(id);
  };

  const handleUpdate = async () => {
    await axios.put(`/api/employees/${editingId}`, form);
    fetchEmployees();
    setForm({ firstName: '', lastName: '', email: '', department: '', weeklyHours: '' });
    setEditingId(null);
  };

  const handleDelete = async id => {
    await axios.delete(`/api/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div>
      <h2>Empleados</h2>
      <ul>
        {employees.map(e => (
          <li key={e.id}>
            {e.firstName} {e.lastName} ({e.email}){' '}
            <button onClick={() => handleEdit(e.id, e)}>Editar</button>
            <button onClick={() => handleDelete(e.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h3>Add Employee</h3>
      <input
        placeholder="First Name"
        value={form.firstName}
        onChange={e => setForm({ ...form, firstName: e.target.value })}
      />
      <input
        placeholder="Last Name"
        value={form.lastName}
        onChange={e => setForm({ ...form, lastName: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Department"
        value={form.department}
        onChange={e => setForm({ ...form, department: e.target.value })}
      />
      <input
        placeholder="Weekly Hours"
        type="number"
        value={form.weeklyHours}
        onChange={e => setForm({ ...form, weeklyHours: e.target.value })}
      />
      <button onClick={handleCreate}>Create</button>
      {editingId && (
        <button onClick={handleUpdate}>Update</button>
      )}
    </div>
  );
}