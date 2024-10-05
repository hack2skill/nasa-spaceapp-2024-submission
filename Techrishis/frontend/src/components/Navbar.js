import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import './navbar.css';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">SkillPulse</Link>
        <nav>
          <div className="nav-links">
            {user && (
              <div>
                <span className="nav-text">{user.email}</span>
                <button onClick={handleClick} className="nav-text">Log out</button>
              </div>
            )}
            {!user && (
              <>
                <Link to="/login" className="nav-text">Login</Link>
                <Link to="/signup" className="nav-text">Signup</Link>
              </>
            )}
            <Link to="/contact" className="nav-text">Contact Us</Link>
            <Link to="/about" className="nav-text">About Us</Link>
            <Link to="/faq" className="faq-btn">FAQ</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;


