import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Typography } from '@mui/material';

// Register chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ title, transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <p>No transactions to display for {title}.</p>;
  }

  // Summarize data: Group by date and accumulate amounts
  const summary = transactions.reduce((acc, tx) => {
    const date = new Date(tx.createdAt).toLocaleDateString();
    if (!acc[date]) acc[date] = 0;
    acc[date] += tx.amount;
    return acc;
  }, {});

  // Prepare chart data
  const labels = Object.keys(summary); // Dates for X-axis
  const data = labels.map((date) => summary[date]);

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: [
          'rgba(93, 173, 226, 0.2)',
          'rgba(46, 204, 113, 0.2)',
          'rgba(241, 196, 15, 0.2)',
          'rgba(231, 76, 60, 0.2)',
          'rgba(155, 89, 182, 0.2)',
        ],
        borderColor: [
          'rgba(93, 173, 226, 1)',
          'rgba(46, 204, 113, 1)',
          'rgba(241, 196, 15, 1)',
          'rgba(231, 76, 60, 1)',
          'rgba(155, 89, 182, 1)',
        ],
        borderWidth: 2,
        borderRadius: 10, // Rounded corners
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Removes the box before the title
      },
      title: {
        display: true,
        text: title,
        color: '#34495e', // Modern title color
        font: {
          size: 18,
          family: 'Arial, sans-serif',
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          color: '#2980b9', // Modern color for X-axis title
          font: {
            size: 14,
            family: 'Arial, sans-serif',
            weight: 'bold',
          },
        },
        grid: {
          display: false, // Remove grid lines on X-axis
        },
        ticks: {
          color: '#34495e', // Modern color for X-axis labels
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount (Rs)',
          color: '#27ae60', // Modern color for Y-axis title
          font: {
            size: 14,
            family: 'Arial, sans-serif',
            weight: 'bold',
          },
        },
        grid: {
          display: false, // Remove grid lines on Y-axis
        },
        ticks: {
          color: '#34495e', // Modern color for Y-axis labels
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        marginBottom: '32px',
        height: '400px', // Default height
        '@media (max-width: 768px)': {
          height: '250px', // Smaller height for mobile
        },
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#34495e', // Modern title color
          marginBottom: '1px',
        }}
      >
        {title}
      </Typography>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
