import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_COLORS = [
    '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4'
];

export default function CategoryChart() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then((res) => res.json())
            .then((data) => {
                // Dashboard ke chote section ke liye top 5-6 categories kaafi hain
                const formatted = data.slice(0, 5).map((cat) => ({
                    name: typeof cat === 'object' ? cat.name : cat,
                    count: Math.floor(Math.random() * 50) + 10,
                }));
                setCategories(formatted);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const chartData = {
        labels: categories.map((cat) => cat.name),
        datasets: [
            {
                data: categories.map((cat) => cat.count),
                backgroundColor: CHART_COLORS,
                // borderColor: '#1e293b', // Card background se match karta border
                borderWidth: 0,
                hoverOffset: 10,
                borderRadius: 0,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Hum custom legend niche use kar rahe hain controls ke liye
            },
            tooltip: {
                backgroundColor: '#0f172a',
                titleColor: '#fff',
                bodyColor: '#cbd5e1',
                padding: 12,
                cornerRadius: 8,
            }
        },
        cutout: '70%',
    };

    if (loading) return <div className="pulse" style={{ color: '#94a3b8', textAlign: 'center', padding: '20px' }}>Loading...</div>;

    return (
        <div className="category-container">
            <div className="chart-area">
                <Doughnut data={chartData} options={chartOptions} />
                {/* Center Text */}
                <div className="chart-center-text">
                    <span className="total-num">{categories.length}</span>
                    <span className="total-label">Tags</span>
                </div>
            </div>

            {/* Premium Legend Section */}
            <div className="custom-legend-grid">
                {categories.map((cat, index) => (
                    <div className="legend-pill" key={index}>
                        <span 
                            className="dot" 
                            style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                        ></span>
                        <span className="category-name" style={{fontSize: '12px'}}>{cat.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}