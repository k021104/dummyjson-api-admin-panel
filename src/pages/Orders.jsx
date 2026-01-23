import { useEffect, useState } from "react";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // DummyJSON se products laa rahe hain
        fetch("https://dummyjson.com/products?limit=8")
            .then(res => res.json())
            .then(data => {
                // Products ko orders jaisa treat kar rahe hain
                const fakeOrders = data.products.map(p => ({
                    id: p.id,
                    customer: "User " + p.id,
                    product: p.title,
                    price: p.price,
                    status: ["Pending", "Shipped", "Delivered"][p.id % 3]
                }));
                setOrders(fakeOrders);
            });
    }, []); 

    return (
        <>
            <h2 className="page-title">Orders</h2>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(o => (
                        <tr key={o.id}>
                            <td>#{o.id}</td>
                            <td>{o.customer}</td>
                            <td>{o.product}</td>
                            <td>₹{o.price}</td>
                            <td>
                                <span className={`status ${o.status.toLowerCase()}`}>
                                    {o.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
