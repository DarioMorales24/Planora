import React from 'react';
import EmployeeComponent from './components/EmployeeComponent';
import ShiftComponent from './components/ShiftComponent';
import Login from './components/Login';

function App() {
  const [view, setView] = React.useState('login');
  return (
    <div style={{ padding: '1rem' }}>
      <nav style={{ marginBottom: '1rem' }}>
        <button onClick={() => setView('login')}>Login</button>
        <button onClick={() => setView('employees')}>Employees</button>
        <button onClick={() => setView('shifts')}>Shifts</button>
      </nav>
      {view === 'login' && <Login />}
      {view === 'employees' && <EmployeeComponent />}
        {view === 'shifts' && <ShiftComponent />}
    </div>
  );
}
export default App;
