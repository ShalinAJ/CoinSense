import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const BitcoinChart = () => {
  const chartRef = useRef();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Bitcoin Price",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m"
        );
        const data = response.data;
        const labels = data.map((item) =>
          new Date(item[0]).toLocaleTimeString()
        );
        const prices = data.map((item) => parseFloat(item[4]));

        setChartData({
          labels,
          datasets: [
            {
              label: "Bitcoin Price",
              data: prices,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching Bitcoin data: ", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("bitcoinChart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: {
        animation: false,
      },
    });

    return () => {
      chartRef.current.destroy();
    };
  }, [chartData]);

  return (
    <div className="w-[90%]">
      <h2>Bitcoin Price Chart</h2>
      <canvas id="bitcoinChart" />
    </div>
  );
};

export default BitcoinChart;
