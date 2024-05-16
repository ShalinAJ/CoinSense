import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const AssetTypeChart = ({ assetData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (assetData) {
      const labels = assetData.map((asset) => asset.name);
      const data = assetData.map((asset) => asset.value);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Asset Type Distribution",
            data: data,
            backgroundColor: [
              "rgba(21, 45, 255, 0.8)", // Main color
              "rgba(255, 206, 86, 0.6)", // Yellow
              "rgba(153, 102, 255, 0.6)", // Purple
              "rgba(21, 45, 255, 0.6)", // Lighter shade
              "rgba(21, 45, 255, 1)", // Darker shade
              "rgba(255, 99, 132, 0.6)", // Red
              "rgba(54, 162, 235, 0.6)", // Blue
              "rgba(75, 192, 192, 0.6)", // Cyan
              "rgba(255, 159, 64, 0.6)", // Orange
            ],
          },
        ],
      });
    }
  }, [assetData]);

  const options = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>{chartData && <Doughnut data={chartData} options={options} />}</div>
  );
};

export default AssetTypeChart;
