import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import './globalcss2.css';

export default function Users() {
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: ""
    });

    const addUser = (user) => {
        const newUser = {
            ...user,
            id: Date.now(),
            // image: `https://robohash.org/${user.firstName}?set=set4` 
            image: user.image || "https://dummyjson.com/icon/user/128"
        };
        setUsers(prev => [newUser, ...prev]);
        toast.success("User added successfully!");
    };

    const updateUser = (id, updatedData) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updatedData } : u));
        toast.success("User updated successfully!");
    };

    const deleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(prev => prev.filter(u => u.id !== id));
            toast.success("User deleted successfully!");
        }
    };

    useEffect(() => {
        fetch("https://dummyjson.com/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                setLoading(false);
            });
    }, []);

    return (
        <div className="users-page">
            <header className="page-header">
                <div className="header-text">
                    <h2 className="page-title">User Management</h2>
                    <p>Manage permissions and view customer profiles</p>
                </div>
                <button
                    className="add-btn-premium"
                    onClick={() => {
                        setShowForm(true);
                        setEditingUser(null);
                        setFormData({ firstName: "", lastName: "", email: "", phone: "", age: "" });
                    }}
                >
                    <i className="fa-solid fa-user-plus"></i> Add User
                </button>
            </header>

            {loading ? (
                <div className="loader-wrapper">
                    <div className="spinner"></div>
                    <p>Loading Directory...</p>
                </div>
            ) : (
                <div className="table-container-outer">
                    <div className="table-responsive">
                        <table className="premium-table">
                            <thead>
                                <tr>
                                    <th>Profile</th>
                                    <th>Email Address</th>
                                    <th>Contact</th>
                                    <th>Age</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td>
                                            <div className="user-profile-info">
                                                <img src={u.image} alt={u.firstName} className="table-avatar" />
                                                <span className="user-full-name">{u.firstName} {u.lastName}</span>
                                            </div>
                                        </td>
                                        <td><span className="email-link">{u.email}</span></td>
                                        <td><span className="phone-text">{u.phone}</span></td>
                                        <td><span className="age-pill">{u.age}</span></td>
                                        <td>
                                            <div className="action-group">
                                                <button className="icon-btn edit" onClick={() => {
                                                    setEditingUser(u);
                                                    setFormData({
                                                        firstName: u.firstName,
                                                        lastName: u.lastName || "",
                                                        email: u.email,
                                                        phone: u.phone,
                                                        age: u.age
                                                    });
                                                    setShowForm(true);
                                                }}><i className="fa-solid fa-user-pen"></i></button>
                                                <button className="icon-btn delete" onClick={() => deleteUser(u.id)}><i className="fa-solid fa-trash-can"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="addproduct-title">{editingUser ? "Update User Profile" : "Create New Account"}</h3>
                            <button className="close-modal" onClick={() => setShowForm(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="input-row">
                                <div className="input-field">
                                    <label>First Name</label>
                                    <input type="text" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} placeholder="John" />
                                </div>
                                <div className="input-field">
                                    <label>Last Name</label>
                                    <input type="text" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} placeholder="Doe" />
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Email Address</label>
                                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" />
                            </div>
                            <div className="input-row">
                                <div className="input-field">
                                    <label>Phone Number</label>
                                    <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+1..." />
                                </div>
                                <div className="input-field">
                                    <label>Age</label>
                                    <input type="number" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} placeholder="25" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setShowForm(false)}>Discard</button>
                            <button className="btn-primary" onClick={() => {
                                editingUser ? updateUser(editingUser.id, formData) : addUser(formData);
                                setShowForm(false);
                            }}>
                                {editingUser ? "Update User" : "Create Account"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
