import * as React from "react";
import NavBar from '../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../providers/authProvider';

import Main from '../../components/Main/Main';

const Tasks = () => {

  const navigate = useNavigate();
  const { setToken } = useAuth();

  const logout = () => {
    setToken(null);
    navigate("/login", { replace: true });
  }

  return (
    <>
      <NavBar logout={logout} />
      <Main />
    </>
  );
};

export default Tasks;