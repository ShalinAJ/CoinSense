import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const CryptoChart = ({ chartData }) => {
  const chartRef = useRef();
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartRef && chartRef.current && chartData.labels.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          animation: false,
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                maxTicksLimit: 10,
                font: {
                  size: 10,
                  family: "Inter",
                },
              },
            },
            y: {
              grid: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                font: {
                  size: 10,
                  family: "Inter",
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
      setChartInstance(newChartInstance);
    }
  }, [chartData]);

  return (
    <canvas id="bitcoinChart" ref={chartRef} style={{ height: "100px" }} />
  );
};

export default CryptoChart;
