import { Link, useNavigate } from "react-router"
import './Header.css';
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";
import { toast } from 'react-toastify';

const Header = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosPrivate.post('/auth/logout');
      setAuth({});
      toast.info("Logged out successfully");
      navigate('/', { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <div className="nav_logo">
          <p>To Do Tasks</p>
        </div>
      </Link>

      <div className="logoutBtn">
        {auth?.user && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  )
}

export default Header