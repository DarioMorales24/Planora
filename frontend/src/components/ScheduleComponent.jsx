import { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

export default function ScheduleComponent() {
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const groupBy = (items, fn) =>
    items.reduce((acc, item) => {
      const key = fn(item);
      (acc[key] = acc[key] || []).push(item);
      return acc;
    }, {});

  const toMinutes = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const shiftMinutes = (start, end) => toMinutes(end) - toMinutes(start);

  const assignmentTimes = (scheduledShifts) =>
    groupBy(scheduledShifts, s => s.date).map(day =>
      groupBy(day, s => s.employee.id).map(emp =>
        groupBy(emp, s => s.shift.id).map(shift => ({
          employee: emp[0].firstName + ' ' + emp[0].lastName,
          shift: shift[0].shift.name,
          horario: `${shift[0].actualStartTime || shift[0].shift.startTime} – ${shift[0].actualEndTime || shift[0].shift.endTime}`,
        }))
      )
    );

  const fmtHM = (totalMinutes) => {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}:${m.toString().padStart(2, '0')}`;
  };

  const weekDates = (mondayStr) => {
    const base = new Date(mondayStr);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };

  const formatTimeDisplay = (date, tStart, tEnd) => {
    if (!tStart && !tEnd) return '';
    return `${tStart || '–'} – ${tEnd || '–'}`;
  };

  const fetchData = async () => {
    const [emp, shf, avail, sched] = await Promise.all([
      axios.get('/api/employees'),
      axios.get('/api/shifts'),
      axios.get('/api/availabilities'),
      axios.get('/api/schedule/week?startDate=' + startDate),
    ]);
    setEmployees(emp.data);
    setShifts(shf.data);
    setAvailabilities(avail.data);
    setSchedule(sched.data);
  };

  const handleGenerate = async () => {
    await axios.post('/api/schedule/generate?startDate=' + startDate);
    fetchData();
  };

  const handleLoadWeek = async () => {
    await axios.get('/api/schedule/week?startDate=' + startDate);
    fetchData();
  };

  const exportToExcel = () => {
    // Simplified Excel export
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['Empleado', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      ...schedule.map(row => [
        row.employee,
        row.days.lunes || 'Sin asignar',
        row.days.martes || 'Sin asignar',
        row.dias.miércoles || 'Sin asignar',
        row.dias.jueves || 'Sin asignar',
        row.dias.viernes || 'Sin asignar',
        row.dias.sábado || 'Sin asignar',
        row.dias.domingo || 'Sin asignar',
      ]),
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Horario');
    XLSX.writeFile(workbook, 'horario.xlsx');
  };

  useEffect(() => {
    fetchData();
  }, [startDate]);

  return (
    <div>
      <h2>Generador de Horario Semanal</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Semana iniciar el (lunes):
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>
        <button onClick={handleGenerate}>Generar Horario</button>
        <button onClick={handleLoadWeek}>Cargar Horario</button>
        <button onClick={exportToExcel}>Exportar a Excel</button>
      </div>

      <h3>Tabla Semanal</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th style={width: '20%'}>Empleado</th>
            {[...Array(7)].map((_, i) => <th key={i} style={{ width: '12%' }}>{['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][i]}</th>)}
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.firstName} {emp.lastName}</td>
              {[...Array(7)].map((_, i) => {
                const daySchedule = schedule.find(s => s.employee === emp.firstName + ' ' + emp.lastName);
                const cell = daySchedule ? daySchedule.days[['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][i]] || 'Sin asignar' : 'Sin asignar';
                return <td key={i} style={{ border: '1px solid #ccc', padding: '4px' }}>{cell}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Detalle de Asignaciones</h3>
      <ul>
        {schedule.map(s => (
          <li key={s.id}>
            {s.employee}: {s.shift.nombre} - {s.fecha}
            {s.horario || ''}
          </li>
        ))}
      </ul>
    </div>
  );
}