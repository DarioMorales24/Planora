import React, { useState } from 'react';
import EmployeeComponent from './components/EmployeeComponent';
import ShiftComponent from './components/ShiftComponent';
import AvailabilityComponent from './components/AvailabilityComponent';
import SkillsComponent from './components/SkillsComponent';
import ScheduleComponent from './components/ScheduleComponent';
import { useLang, t, setLang } from './i18n';

function App() {
  const [activeTab, setActiveTab] = useState('employees');
  const [lang, setLangFn] = useLang();

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{t('app.title')}</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setActiveTab('employees')}>Empleados</button>
          <button onClick={() => setActiveTab('shifts')}>Turnos</button>
          <button onClick={() => setActiveTab('availability')}>Disponibilidad</button>
          <button onClick={() => setActiveTab('skills')>Habilidades</button>
          <button onClick={() => setActiveTab('schedule')}>Horario</button>
          <button onClick={() => setLangFn(lang === 'es' ? 'en' : 'es')}>
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </header>
      <section style={{ marginTop: '1rem' }}>
        {activeTab === 'employees' && <EmployeeComponent />}
        {activeTab === 'shifts' && <ShiftComponent />}
        {activeTab === 'availability' && <AvailabilityComponent />}
        {activeTab === 'skills' && <SkillsComponent />}
        {activeTab === 'schedule' && <ScheduleComponent />}
      </section>
    </div>
  );
}

export default App;