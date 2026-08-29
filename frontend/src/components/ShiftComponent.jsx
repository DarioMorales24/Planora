import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ShiftComponent() {
  const [shifts, setShifts] = useState([]);
  const [form, setForm] = useState({ startTime: '', endTime: '', requiredStaff: 0 });

  const fetchShifts = async () => {
    const { data } = await axios.get('/api/shifts');
    setShifts(data);
  };

  useEffect(() => { fetchShifts(); }, []);

  const handleCreate = async () => {
    await axios.post('/api/shifts', form);
    fetchShifts();
    setForm({ startTime: '', endTime: '', requiredStaff: 0 });
  };

  const handleDelete = async id => {
    await axios.delete(`/api/shifts/${id}`);
    fetchShifts();
  };

  return (
    <div>
      <h2>Shifts</h2>
      <ul>
        {shifts.map(s => (
          <li key={s.id}>
            {s.startTime} – {s.endTime} (req: {s.requiredStaff}){' '}
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add Shift</h3>
      <input
        placeholder="Start Time (HH:mm)"
        value={form.startTime}
        onChange={e => setForm({ ...form, startTime: e.target.value })}
      />
      <input
        placeholder="End Time (HH:mm)"
        value={form.endTime}
        onChange={e => setForm({ ...form, endTime: e.target.value })}
      />
      <input
        placeholder="Required Staff"
        type="number"
        value={form.requiredStaff}
        onChange={e => setForm({ ...form, requiredStaff: e.target.value })}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}
