import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {useContext} from 'react';

function Navbar() {
  const {isAuthenticated, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login')
  };

  return (
    <nav className="border-0 md:border border-gray-500 py-2 mb-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-blue-700 font-bold text-3xl ml-2 mb-4 md:mb-0">
          My app
        </h1>
        {isAuthenticated ? (
          <div className="flex justify-between ml-2 mr-5">
            <Link to='/' className="text-white font-bold p-1">Home</Link>
            <Link to='/leaderboard' className="text-white font-bold p-1">Leaderboard</Link>
            <button
              onClick={handleLogout}
              className="text-red-500 p-1"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-between ml-2 mr-5">
            <Link to='/guest' className="text-white font-bold p-1">Home</Link>
            <Link to='/leaderboard' className="text-white font-bold p-1">Leaderboard</Link>
            <Link to='/login' className="border rounded-lg font-bold text-blue-700 p-1">Login</Link>
            <Link to='/register' className="border rounded-lg font-bold text-blue-700 p-1">Register</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar;