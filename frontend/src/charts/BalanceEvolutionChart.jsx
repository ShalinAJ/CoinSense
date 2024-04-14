import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const BalanceEvolutionChart = () => {
  useEffect(() => {
    const ctx = document.getElementById("balanceEvolution");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Dataset 2",
            data: [2, 3, 4, 5, 6, 2, 8, 10, 6, 4, 3, 9],
            borderColor: "#152DFF",
            backgroundColor: "#152dff26",
            tension: 0.4,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 10,
                family: "Inter",
              },
            },
          },
          x: {
            ticks: {
              font: {
                size: 10,
                family: "Inter",
              },
            },
          },
        },
      },
    });
  }, []);

  return <canvas width="100" height="30" id="balanceEvolution"></canvas>;
};

export default BalanceEvolutionChart;