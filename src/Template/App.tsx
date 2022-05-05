import './App.css';

import LoginButton from '../Auth/LoginButton';
import LogoutButton from '../Auth/LogoutButton';
import Profile from '../ProfileInfo/Profile';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && (
        <div className="Container">
          <Profile />
          <LogoutButton />
        </div>
      )}
    </div>
  );
}

export default App;
