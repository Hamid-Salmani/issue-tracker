"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const BarChart = ({ open, closed, inProgress }: Props) => {
  const data = {
    labels: ["Open", "In Progress", "Closed"],
    datasets: [
      {
        label: "Issues",
        data: [open, inProgress, closed],
        backgroundColor: ["#e71a1aff", "#8b3bd6ff", "#53ec8bff"],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="max-w-md mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
