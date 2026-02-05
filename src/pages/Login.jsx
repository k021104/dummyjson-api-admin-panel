import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ADMIN } from '../utils/fakeAuth';
import { toast } from "react-toastify";
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (email === ADMIN.email && password === ADMIN.password) {
            localStorage.setItem("adminAuth", "true");
            toast.success("Login successful 🚀");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
        else {
            toast.error("Invalid admin credentials ❌");
        }
    };

    return (
        <div className="login-wrapper">
            <form className="login-card" onSubmit={handleLogin}>
                <h2>Admin Login</h2>
                <p className="subtitle">Welcome back 👋</p>

                <div className="input-group">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                        type="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <i className="fa-solid fa-lock"></i>
                    <input
                        type='password'
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type='submit' className='login-btn'>Login</button>
            </form>
        </div>
    )
}
