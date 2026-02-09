import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from '../context/ThemeContext';
import '../pages/global.css';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme(); // Consume theme context
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", path: "/", icon: "fa-solid fa-house-chimney" },
        { name: "Products", path: "/products", icon: "fa-solid fa-box-open" },
        { name: "Users", path: "/users", icon: "fa-solid fa-users-gear" },
        { name: "Orders", path: "/orders", icon: "fa-solid fa-cart-shopping" },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.removeItem("adminAuth");
        toast.info("Logged out successfully 👋");
        navigate("/login");
    };

    return (
        <>
            <button className="mobile-btn" onClick={toggleSidebar}>
                <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
            </button>

            <div className={`sidebar-container ${isOpen ? 'active' : ''}`}>
                {/* <div className="sidebar-brand">
                    <div className="brand-icon">
                        <i className="fa-solid fa-bolt-lightning"></i>
                    </div>
                    <h2>Admin<span>Panel</span></h2>
                </div> */}
                <div className="sidebar-brand">

                    <div className="brand-left">
                        <div className="brand-icon">
                            <i className="fa-solid fa-bolt-lightning"></i>
                        </div>
                        <h2>Admin<span>Panel</span></h2>
                    </div>

                    <div className="theme-icon" onClick={toggleTheme}>
                        <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
                    </div>

                </div>

                <nav className="sidebar-menu">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <i className={`${item.icon} menu-icon`}></i>
                            <span className="menu-text">{item.name}</span>
                            {location.pathname === item.path && <div className="active-indicator" />}
                        </Link>
                    ))}

                    <div className="menu-divider"></div>

                    {/* Theme toggle BELOW menu */}
                    {/* <div className="menu-link theme-toggle-item" onClick={toggleTheme}>
                        <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'} menu-icon`}></i>
                        <span className="menu-text mode-text">
                            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                        </span>
                    </div> */}
                </nav>

                <div className="sidebar-user">
                    <div className="user-avatar">AD</div>
                    <div className="user-info">
                        <span className="user-name">Admin</span>
                        <span className="user-status">Online</span>
                    </div>
                    <i className="fa-solid fa-right-from-bracket logout-btn" onClick={handleLogout}></i>
                </div>
            </div>

            {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
        </>
    );
}