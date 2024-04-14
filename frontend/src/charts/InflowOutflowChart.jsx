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
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3, 18, 12, 7, 3, 5, 9],
            borderWidth: 2,
            borderColor: "#c4c4c4",
            backgroundColor: "#f3f3f3e8",
            borderRadius: 50,
          },
          {
            label: "Dataset 2",
            data: [2, 3, 4, 5, 6, 12, 11, 8, 6, 4, 3, 9],
            borderWidth: 2,
            borderColor: "#152DFF",
            backgroundColor: "#152dff26",
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

  return <canvas width="100" height="30" id="inflowOutflow"></canvas>;
};

export default InflowOutflowChart;
