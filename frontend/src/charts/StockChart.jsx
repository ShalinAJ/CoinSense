import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const StockChart = ({ apiUrl, interval }) => {
  const chartRef = useRef();
  const [chartInstance, setChartInstance] = useState(null);

  const dataPoints = {
    "1d": 250,
    "1wk": 250,
    "1mo": 250,
    "3mo": 8,
    "6mo": 8,
    "1y": 8,
    "5y": 8,
  };

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            symbol: "AAPL",
            range: "1y",
            interval: interval,
          },
        });
        const data = response.data.chart.result[0];
        const labels = data.timestamp.map((timestamp) =>
          new Date(timestamp * 1000).toLocaleDateString()
        );
        const prices = data.indicators.quote[0].close;

        if (chartInstance) {
          chartInstance.destroy();
        }

        const ctx = chartRef.current.getContext("2d");

        const newChartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels.slice(0, dataPoints[interval]),
            datasets: [
              {
                label: "AAPL Price",
                data: prices
                  .map((price) => (price ? price.toFixed(2) : null))
                  .slice(0, dataPoints[interval]),
                backgroundColor: "rgba(21, 45, 255, 0.1)",
                borderColor: "rgba(21, 45, 255, 0.6)",
                borderWidth: 2,
                pointRadius: 2,
              },
            ],
          },
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
      } catch (error) {
        console.error("Error fetching stock data: ", error);
      }
    };

    fetchChartData();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [apiUrl, interval]);

  return <canvas id="stockChart" ref={chartRef} style={{ height: "100px" }} />;
};

export default StockChart;
