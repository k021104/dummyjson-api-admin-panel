import React from 'react'
import { Bar, Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2"; 

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
);

const categoriesdata = {
    labels: ["Beauty", "Fragrances", "Furniture", "Groceries", "Home Decoration", "Kitchen Accessories", "Laptops", "Mens Shirts", "Mens Shoes", "Mens Watches", "Mobile Accessories", "Motorcycle", "Skin Care"],
    datasets: [
        {
            label: "Categories",
            data: [120, 190, 300, 250, 220, 100, 430, 340, 200, 230, 210, 80, 50],
            backgroundColor: "#6366f1",
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: { position: "top" },
    },
};

export default function DashboardChart() {
    return (
        <>
            {/* <Bar data={data} options={options} /> */}
            {/* <Line data={data} /> */}
            <Doughnut data={categoriesdata} />
            {/* <Pie data={data} /> */}
        </>
    );
}
