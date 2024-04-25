import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BitcoinChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const response = await fetch(
          "https://api.coindesk.com/v1/bpi/historical/close.json?start=2021-01-01&end=2021-12-31"
        );
        const data = await response.json();
        const dates = Object.keys(data.bpi);
        const prices = Object.values(data.bpi);
        const chart = new Chart(chartRef.current, {
          type: "line",
          data: {
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
          },
        });
      } catch (error) {
        console.error("Error fetching Bitcoin data: ", error);
      }
    };

    fetchBitcoinData();
  }, []);

  return (
    <div className="w-[100%]">
      <canvas ref={chartRef} />
    </div>
  );
};

export default BitcoinChart;
