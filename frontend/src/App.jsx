import React from 'react';
import EmployeeComponent from './components/EmployeeComponent';
import Login from './components/Login';

function App() {
  const [view, setView] = React.useState('login');
  return (
    <div style={{ padding: '1rem' }}>
      <nav style={{ marginBottom: '1rem' }}>
        <button onClick={() => setView('login')}>Login</button>
        <button onClick={() => setView('employees')}>Employees</button>
      </nav>
      {view === 'login' && <Login />}
      {view === 'employees' && <EmployeeComponent />}
    </div>
  );
}
export default App;
