import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function CategoriesBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(result => {
        const products = result.products;
        
        const categoryMap = {};

        products.forEach(p => {
          categoryMap[p.category] =
            (categoryMap[p.category] || 0) + 1;
        });

        const chartData = Object.keys(categoryMap).map(cat => ({
          category: cat,
          count: categoryMap[cat]
        }));

        setData(chartData);
      });
  }, []);

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Products by Category</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="category" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ===== simple premium styles ===== */
const cardStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "16px"
};

const titleStyle = {
  color: "#f8fafc",
  marginBottom: "15px"
};
