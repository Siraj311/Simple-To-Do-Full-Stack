import { Link } from "react-router"
import './Header.css';

const Header = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <div className="nav_logo">
          <p>To Do Tasks</p>
        </div>
      </Link>

      <div className="loginBtn">
        <Link to="/login"><button>Login</button></Link>
      </div>
    </div>
  )
}

export default Header