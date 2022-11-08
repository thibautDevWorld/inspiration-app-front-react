import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { FaBars, FaTimes } from "react-icons/fa"
import { useRef } from "react";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav')
  }

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <h3>Inspiration</h3>
      <nav ref={navRef}>
        {user && (<Link to="/add" onClick={showNavbar}>+ Add</Link>)}
        {user && (<Link to="/" onClick={showNavbar}>My list</Link>)}
        {user && (<button onClick={handleClick}>Log out</button>)}
        {!user && (
              <>
                <Link to="/login" onClick={showNavbar} className="nav-log">Login</Link>
                <Link to="/signup" onClick={showNavbar} className="nav-log">Signup</Link>
              </>
        )}
        <button onClick={showNavbar} className="nav-btn nav-close-btn">
          <FaTimes />
        </button>
      </nav>
      <button onClick={showNavbar} className="nav-btn">
        <FaBars />
      </button>
      
         
            
            

    </header>
  );
};

export default Navbar;
