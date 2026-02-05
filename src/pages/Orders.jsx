import { useEffect, useState } from "react";
import './Orders.css';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetching data and mapping it to an "Order" schema
        fetch("https://dummyjson.com/products?limit=10")
            .then(res => res.json())
            .then(data => {
                const fakeOrders = data.products.map(p => ({
                    id: 1000 + p.id, // Creating a 4-digit order ID
                    customer: `Customer #${p.id + 50}`,
                    product: p.title,
                    price: p.price,
                    date: new Date().toLocaleDateString(),
                    status: ["Pending", "Shipped", "Delivered"][p.id % 3]
                }));
                setOrders(fakeOrders);
                setLoading(false);
            });
    }, []);

    const handleStatusChange = (id, newStatus) => {
        setOrders(prev => prev.map(order => 
            order.id === id ? { ...order, status: newStatus } : order
        ));
    };

    return (
        <div className="orders-container">
            <header className="page-header">
                <div className="header-text">
                    <h2 className="page-title">Order Management</h2>
                    <p>Track, update, and manage incoming shipments</p>
                </div>
                <div className="order-stats">
                    <div className="stat-pill">Total: {orders.length}</div>
                </div>
            </header>

            {loading ? (
                <div className="loader-wrapper">
                    <div className="spinner"></div>
                    <p>Fetching Orders...</p>
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Product Details</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(o => (
                                <tr key={o.id}>
                                    <td className="order-id">#{o.id}</td>
                                    <td>
                                        <div className="customer-info">
                                            <div className="avatar-small">{o.customer.charAt(0)}</div>
                                            {o.customer}
                                        </div>
                                    </td>
                                    <td className="product-cell">{o.product}</td>
                                    <td className="price-cell">${o.price}</td>
                                    <td className="date-cell">{o.date}</td>
                                    <td>
                                        <select 
                                            className={`status-select ${o.status.toLowerCase()}`}
                                            value={o.status}
                                            onChange={(e) => handleStatusChange(o.id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}