import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Sidebar.css';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Menu items array for easy management
    const menuItems = [
        { name: "Dashboard", path: "/", icon: "fa-solid fa-house-chimney" },
        { name: "Products", path: "/products", icon: "fa-solid fa-box-open" },
        { name: "Users", path: "/users", icon: "fa-solid fa-users-gear" },
        { name: "Orders", path: "/orders", icon: "fa-solid fa-cart-shopping" },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminAuth");
        toast.info("Logged out successfully 👋");
        navigate("/login");
    };

    return (
        <>
            {/* Mobile Menu Button - Toggle Icon change on state */}
            <button className="mobile-btn" onClick={toggleSidebar}>
                <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
            </button>

            {/* Main Sidebar */}
            <div className={`sidebar-container ${isOpen ? 'active' : ''}`}>
                <div className="sidebar-brand">
                    <div className="brand-icon">
                        <i className="fa-solid fa-bolt-lightning"></i>
                    </div>
                    <h2>Admin<span>Panel</span></h2>
                </div>

                <nav className="sidebar-menu">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={() => setIsOpen(false)} // Mobile par click karte hi close ho jaye
                        >
                            <i className={`${item.icon} menu-icon`}></i>
                            <span className="menu-text">{item.name}</span>
                            {location.pathname === item.path && <div className="active-indicator" />}
                        </Link>
                    ))}
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

            {/* Background blur overlay for mobile screens */}
            {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
        </>
    );
}