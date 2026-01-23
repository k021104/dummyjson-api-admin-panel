import React from 'react'
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => setProductsCount(data.total));
  }, []);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then(res => res.json())
      .then(data => setUsersCount(data.total));
  }, []);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => setOrdersCount(data.total));
  }, []);

  return (
    <>
      <h2 className="page-title">Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card card-products">
          <h4>Total Products</h4>
          <p>{productsCount}</p>
        </div>
        <div className="card card-users">
          <h4>Total Users</h4>
          <p>{usersCount}</p>
        </div>
        <div className="card card-orders">
          <h4>Total Orders</h4>
          <p>{ordersCount}</p>
        </div>
      </div>
    </>
  )
}
