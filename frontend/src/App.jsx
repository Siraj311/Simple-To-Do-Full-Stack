import { useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router';
// import { AuthContext } from './context/AuthContext';

import Layout from './components/Layout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Signup from './pages/Signup';

const ProtectedRoute = () => {
  // const { refreshToken, isLoading } = useContext(AuthContext);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Loading...
  //     </div>
  //   );
  // }

  // if (!refreshToken) {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
};

const PublicRoute = () => {
  // const { refreshToken, isLoading } = useContext(AuthContext);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Loading...
  //     </div>
  //   );
  // }

  // if (refreshToken) {
  //   return <Navigate to="/tasks" replace />;
  // }

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