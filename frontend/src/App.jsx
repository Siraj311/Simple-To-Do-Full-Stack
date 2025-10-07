import { useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router';
// import { AuthContext } from './context/AuthContext';

import Layout from './components/Layout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Signup from './pages/Signup';
import useAuth from './hooks/useAuth';

const ProtectedRoute = () => {
  const { auth } = useAuth();
  if (auth?.user) {
    return <Navigate to="/tasks" replace />;
  }

  return <Outlet />;
};

const PublicRoute = () => {
  const { auth } = useAuth();
  if (auth?.user) {
    return <Navigate to="/tasks" replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Route>
    </Routes>
  )
}
export default App