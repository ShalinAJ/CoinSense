import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const InflowOutflowChart = () => {
  useEffect(() => {
    const ctx = document.getElementById("inflowOutflow");

    new Chart(ctx, {
      type: "bar",
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
            label: "Inflow",
            data: [2, 3, 4, 5, 6, 12, 11, 8, 6, 4, 3, 9],
            borderWidth: 1,
            borderColor: "#152DFF",
            backgroundColor: "#152dff26",
            barThickness: 10,
            borderRadius: 50,
          },
          {
            label: "",
            data: [],
            barPercentage: 0.01,
            borderWidth: 0,
            backgroundColor: "transparent",
          },
          {
            label: "Outflow",
            data: [12, 19, 3, 5, 2, 3, 18, 12, 7, 3, 5, 9],
            borderWidth: 1,
            borderColor: "#c4c4c4",
            backgroundColor: "#f3f3f3e8",
            barThickness: 10,
            borderRadius: 50,
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
                family: "inter",
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 10,
                family: "inter",
              },
            },
          },
        },
        layout: {
          padding: {
            left: 12,
            right: 12,
          },
        },
        plugins: {
          legend: {
            labels: {
              boxWidth: 10,
              color: "black",
              pointStyle: "circle",
              font: {
                weight: "normal",
              },
              useBorderRadius: true,
              borderRadius: 5,
            },
          },
        },
      },
    });
  }, []);

  return <canvas width="100" height="30" id="inflowOutflow"></canvas>;
};

export default InflowOutflowChart;
