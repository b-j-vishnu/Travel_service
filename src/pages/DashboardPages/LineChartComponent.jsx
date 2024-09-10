/* eslint-disable no-unused-vars */
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./DashboardCss/Canva.css";
const LineChartComponent = () => {
  const data = {
    labels: ["Mon", "Tues", "Wed", "Thur", "Frid", "Satu", "Sun"],
    datasets: [
      {
        data: [10, 20, 40, 30, 50, 60, 70],
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        backgroundColor: "rgba(37, 205, 37,0.3)",
      },
    ],
  };

  let delayed = true;
  const config = {
    type: "line",
    animation: {
      onComplete: () => {},
    },

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} K`,
        },
      },
    },
    boxWidth: 0,
  };

  return (
    <div className="w-full flex justify-center">
      <Line className=" w-full " data={data} options={config} />
    </div>
  );
};

export default LineChartComponent;
