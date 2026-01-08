import React, { useMemo, useState } from 'react';
import { ROLE_CONFIG, columns as baseColumns } from '../common/grid-config';
import { generateEmployees } from '../data/data-source';
import Login from './Login';
import EmployeeGrid from './EmployeeGrid';
import Navbar from './Navbar';
import '../styles/Home.css';

const APPLICATION_TITLE = 'SummitBridge Workforce Portal';

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);

  const columns = useMemo(
    () => baseColumns.filter((c) => c.field !== 'notes'),
    []
  );

  const employeeData = useMemo(() => generateEmployees(100), []);

  const handleLogin = ({ role, userId }) => {
    setCurrentUser({ role, userId });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="app-container">
      {!currentUser ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Navbar
            user={currentUser}
            title={APPLICATION_TITLE}
            onLogout={handleLogout}
          />
          <main className="content-wrapper">
            <EmployeeGrid
              data={employeeData}
              currentRole={currentUser.role}
              roleConfig={ROLE_CONFIG}
              columns={columns}
            />
          </main>
        </>
      )}
    </div>
  );
}