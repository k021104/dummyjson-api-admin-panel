import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import '../pages/Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function UserGrowthChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Simple Logic: API se users fetch kar rahe hain
        fetch("https://dummyjson.com/users?limit=6")
            .then(res => res.json())
            .then(data => {
                // Hum khud ke labels bana rahe hain (Jan to June)
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

                // Hum maan lete hain ki har month mein users grow ho rahe hain
                const growthData = [120, 190, 300, 250, 450, 580];

                setChartData({
                    labels: months,
                    datasets: [
                        {
                            label: 'New Users',
                            data: growthData,
                            backgroundColor: '#10b981', // Success Green
                            borderRadius: 8, // Bars ko rounded banata hai (Premium Look)
                            hoverBackgroundColor: '#059669',
                        }
                    ]
                });
            });
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: { display: false } // Extra clutter hatane ke liye
        },
        scales: {
            x: {
                grid: { display: false }, // Vertical lines hatane ke liye
                ticks: { color: '#94a3b8' }
            },
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: '#94a3b8' }
            }
        }
    };

    if (!chartData) return <div className="pulse">Loading Users Data...</div>;

    return (
        <div className="user-chart-container">
            <div className="chart-info">
                <h3 style={{ color: '#94a3b8', marginBottom: '10px' }}>User Registrations</h3>
                <p style={{ color: '#f8fafc', marginBottom: '10px', fontSize: '14px' }}>Monthly growth analysis</p>
            </div>
            <Bar data={chartData} options={options} />
        </div>
    );
}