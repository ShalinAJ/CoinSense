import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const BitcoinChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d"
        );
        const data = response.data;
        const dates = data.map((item) =>
          new Date(item[0]).toLocaleDateString()
        );
        const prices = data.map((item) => parseFloat(item[4]));
        setChartData({
          labels: dates,
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

    fetchBitcoinData();
  }, []);

  useEffect(() => {
    if (chartData.labels && chartData.datasets) {
      const ctx = document.getElementById("bitcoinChart");
      new Chart(ctx, {
        type: "line",
        data: chartData,
      });
    }
  }, [chartData]);

  return (
    <div className="w-[90%] px-20">
      <h2>Bitcoin Price Chart</h2>
      <canvas id="bitcoinChart" />
    </div>
  );
};

export default BitcoinChart;
