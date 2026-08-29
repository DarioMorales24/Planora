import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EmployeeComponent() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  const fetchEmployees = async () => {
    const { data } = await axios.get('/api/employees');
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCreate = async () => {
    await axios.post('/api/employees', form);
    fetchEmployees();
    setForm({ name: '', email: '' });
  };

  const handleDelete = async id => {
    await axios.delete(`/api/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map(e => (
          <li key={e.id}>
            {e.name} ({e.email}){' '}
            <button onClick={() => handleDelete(e.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add Employee</h3>
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}
