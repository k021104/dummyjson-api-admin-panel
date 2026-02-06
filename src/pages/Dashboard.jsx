import React, { useEffect, useState } from 'react';
import CategoryBarChart from '../charts/CategoryBarChart';
import OrdersChart from '../charts/OrdersChart';
import UsersGrowthChart from '../charts/UsersGrowthChart';
import './globalcss2.css';

export default function Dashboard() {
    const [counts, setCounts] = useState({ products: 0, users: 0, orders: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Parallel API fetching
        Promise.all([
            fetch("https://dummyjson.com/products?limit=1").then(res => res.json()),
            fetch("https://dummyjson.com/users?limit=1").then(res => res.json()),
            fetch("https://dummyjson.com/carts?limit=1").then(res => res.json())
        ])
            .then(([products, users, carts]) => {
                setCounts({
                    products: products.total,
                    users: users.total,
                    orders: carts.total
                });
                setLoading(false);
            })
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    const stats = [
        { title: "Total Products", value: counts.products, icon: "fa-box", color: "#6366f1", bg: "rgba(99, 102, 241, 0.1)" },
        { title: "Total Users", value: counts.users, icon: "fa-users", color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" },
        { title: "Total Orders", value: counts.orders, icon: "fa-cart-shopping", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" },
    ];

    return (
        <div className="dashboard-wrapper">
            <header className="page-header">
                <div className="header-text">
                    <h2 className="page-title">Dashboard Overview</h2>
                    <p>Real-time data from your store</p>
                </div>
                <div className="header-actions">
                    <span className="last-updated">
                        <i className="fa-solid fa-rotate"></i> Updated just now
                    </span>
                </div>
            </header>

            <div className="dashboard-cards">
                {stats.map((stat, index) => (
                    <div className="premium-card" key={index}>
                        <div className="card-inner">
                            <div className="card-content">
                                <h4>{stat.title}</h4>
                                <p className={loading ? "pulse" : ""}>
                                    {loading ? "..." : stat.value.toLocaleString()}
                                </p>
                            </div>
                            <div className="card-icon-box" style={{ color: stat.color, backgroundColor: stat.bg }}>
                                <i className={`fa-solid ${stat.icon}`}></i>
                            </div>
                        </div>
                        <div className="card-footer">
                            <span className="trend-up"><i className="fa-solid fa-arrow-up"></i> 12%</span>
                            <span>Since last month</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="info-section">
                <div className="glass-card">
                    <h3>System Status</h3>
                    <div className="status-item">
                        <span>Server Response</span>
                        <span className="status-online">Online</span>
                    </div>
                </div>
            </div>

            {/* --- Premium Chart Section --- */}
            <div className="charts-main-grid">

                {/* 1. Full Width Order Chart */}
                <div className="chart-item-full">
                    <div className="premium-chart-card">
                        <div className="card-header">
                            <h3><i className="fa-solid fa-chart-line"></i> Orders & Revenue Analysis</h3>
                        </div>
                        <div className="chart-canvas-container">
                            <OrdersChart />
                        </div>
                    </div>
                </div>

                {/* 2. Side-by-Side: User Growth (Bada) & Category (Chota) */}
                <div className="chart-item-side-by-side">
                    <div className="premium-chart-card flex-grow-2">
                        <div className="card-header">
                            <h3><i className="fa-solid fa-users-line"></i> User Acquisition Growth</h3>
                        </div>
                        <div className="chart-canvas-container">
                            <UsersGrowthChart />
                        </div>
                    </div>

                    <div className="premium-chart-card flex-grow-1">
                        <div className="card-header">
                            <h3><i className="fa-solid fa-layer-group"></i> Top Categories</h3>
                        </div>
                        <div className="chart-canvas-container">
                            <CategoryBarChart />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}