import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SkillsComponent() {
  const [skills, setSkills] = useState([]);
  const [newName, setNewName] = useState('');

  const fetchSkills = async () => {
    const { data } = await axios.get('/api/skills');
    setSkills(data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAdd = async () => {
    await axios.post('/api/skills', { name: newName });
    setNewName('');
    fetchSkills();
  };

  const handleDelete = async id => {
    await axios.delete(`/api/skills/${id}`);
    fetchSkills();
  };

  return (
    <div>
      <h2>Habilidades</h2>
      <input
        placeholder="Nueva habilidad"
        value={newName}
        onChange={e => setNewName(e.target.value)}
      />
      <button onClick={handleAdd}>Agregar</button>

      <ul>
        {skills.map(s => (
          <li key={s.id}>
            {s.name}{' '}
            <button onClick={() => handleDelete(s.id)}>Eliminar</button>
          </li>
        ))}
        {skills.length === 0 && <p>No hay habilidades registradas</p>}
      </ul>
    </div>
  );
}