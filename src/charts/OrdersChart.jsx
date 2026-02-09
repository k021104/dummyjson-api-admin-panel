import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export default function OrderTrendsChart() {
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        fetch("https://dummyjson.com/carts")
            .then(res => res.json())
            .then(data => {
                // Mocking dates for the labels (since API only gives cart IDs)
                const labels = data.carts.map((_, i) => `Day ${i + 1}`);
                const values = data.carts.map(cart => cart.total);

                setChartData({
                    labels,
                    datasets: [
                        {
                            fill: true,
                            label: 'Revenue ($)',
                            data: values,
                            borderColor: '#6366f1', // Indigo
                            backgroundColor: (context) => {
                                const canvas = context.chart.ctx;
                                const gradient = canvas.createLinearGradient(0, 0, 0, 400);
                                gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
                                gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
                                return gradient;
                            },
                            tension: 0.4, // Isse lines smooth/curvy banti hain
                            borderWidth: 3,
                            pointRadius: 4,
                            pointBackgroundColor: '#6366f1',
                            pointHoverRadius: 7,
                        }
                    ]
                });
            });
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#f8fafc',
                bodyColor: '#94a3b8',
                padding: 12,
                cornerRadius: 8,
                displayColors: false
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
                ticks: { color: '#64748b', font: { size: 11 } }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#64748b', font: { size: 11 } }
            }
        }
    };

    if (!chartData) return <div className="pulse">Loading Trends...</div>;

    return (
        <div className="chart-container-premium">
            <div className="chart-header">
                <h3 style={{marginBottom: '10px'}}>Order Trends</h3>
            </div>
            <Line ref={chartRef} data={chartData} options={options} />
        </div>
    );
}