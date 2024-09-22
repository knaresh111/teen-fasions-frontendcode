import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './header.css';
import logo from '../../assets/images/logo-1.jpg';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false); // Close sidebar after 20 seconds
      }, 20000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  return (
    <header className="header">
     <a href="#" className="logo">
  <img src={logo} alt="Background" className="logo-image" />
  <span className="logo-text">TEEN FASHION</span>
</a>

      <nav className="navbar">
        <a href="#home">Home</a>
        
     

        <Link to='/allproduct' style={{ textDecoration: 'none' }}>
          <a href="#about">Products</a>
        </Link> 
         <a href="#home">
         <div className="dropdown">
          <span className="dropbtn">Products</span>
          <div className="dropdown-content">
            <Link to='/shirts'>Shirts</Link>
            <Link to='/hoodies'>Hoodies</Link>
            <Link to='/shoes'>Shoes</Link>
            <Link to='/allproduct'>All Products</Link>
          </div>
        </div>
        </a>

        <a href="#contact">Contact</a>
        {location.pathname !== '/' && location.pathname !== '/landing' && (
          <>
            <Link to='/UploadData' style={{ textDecoration: 'none' }}>
              <a className="hover-underline">Upload Data</a>
            </Link>
            <Link to='/ProductUpload' style={{ textDecoration: 'none' }}>
              <a className="hover-underline">ProductUpload</a>
            </Link>
            <Link to='/cart' style={{ textDecoration: 'none' }}>
              <a className="hover-underline">Cart</a>
            </Link>
          </>
        )}
      </nav>

      <div className="icons">
        <div className="icon" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>

      <div className="sidebar" style={{ width: isOpen ? '250px' : '0' }}>
        <a href="#" className="closebtn" onClick={toggleSidebar}>&times;</a>
        {!isAuthenticated ? (
          <>
            <Link to='/signuppage' onClick={toggleSidebar}>Sign Up</Link>
            <Link to='/signin' onClick={toggleSidebar}>Sign In</Link>
          </>
        ) : (
          <>
            <Link to='/myorders' onClick={toggleSidebar}>My Orders</Link>
            <Link to='/' onClick={toggleSidebar}>
              <a href="#" onClick={() => { 
                localStorage.removeItem('token'); // Ensure token is removed properly
                setIsAuthenticated(false); 
                toggleSidebar();
              }}>Sign Out</a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
