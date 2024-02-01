import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const restaurantId = localStorage.getItem('restaurantId');
  const navigate = useNavigate(); // Add this line

  useEffect(() => {
    // Check if the token or restaurantId exists in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token && !!restaurantId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleLogout = () => {
    // Clear localStorage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('restaurantId');
    setIsLoggedIn(false);

    // Use navigate to redirect to the home page or another desired route
    navigate('/');
  };

  return (
    <header className="bg-amber-700 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Restaurant
        </Link>
      </div>

      {isLoggedIn ? (
        <nav >
          <ul className="flex items-center">
          <li className="mr-4">
            {/* Use navigate to redirect to the desired route */}
            <span
              className="text-white font-bold cursor-pointer"
              onClick={() => navigate(`/restaurantOwner/${restaurantId}`)}
            >
              my account
            </span>
          </li>
          <li className="mr-4">
            <Link to="/" className="text-white font-bold" onClick={handleLogout}>
              Log Out
            </Link>
          </li>

          </ul>
        </nav>
      ) : (
        <nav>
          <ul className="flex items-center">
            <li className="mr-4">
              <Link to="/login" className="text-white font-bold hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-white font-bold hover:underline">
                SignUp
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
