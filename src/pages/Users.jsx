import React from 'react'
import { useState, useEffect } from "react";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/users?limit=10")
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <h2 className="page-title">Users</h2>

            {
                loading ? (
                    <div className="loading">Loading users...</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Age</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>
                                        <img src={u.image} alt={u.firstName} className="user-img" />
                                    </td>
                                    <td>{u.firstName} {u.lastName}</td>
                                    <td>{u.email}</td>
                                    <td>{u.phone}</td>
                                    <td>{u.age}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </>
    );
}
