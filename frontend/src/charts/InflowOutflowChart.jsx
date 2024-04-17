import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const InflowOutflowChart = () => {
  const [inflows, setInflows] = useState(Array(12).fill(0));
  const [outflows, setOutflows] = useState(Array(12).fill(0));
  const chartRef = useRef(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await fetch("http://localhost:4000/transactions", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Could not fetch transactions.");
        }

        const transactions = await response.json();
        processTransactions(transactions);
      } catch (error) {
        console.error(error.message);
      }
    };

    const processTransactions = (transactions) => {
      const monthIndexMap = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      };

      transactions.slice(0, 12).forEach((transaction) => {
        const transactionDate = new Date(transaction.date).toLocaleString(
          "en-US",
          {
            month: "long",
          }
        );
        const monthIndex = monthIndexMap[transactionDate];
        if (monthIndex !== undefined) {
          if (transaction.status === "Income") {
            setInflows((prevInflows) => {
              const updatedInflows = [...prevInflows];
              updatedInflows[monthIndex] += transaction.amount;
              return updatedInflows;
            });
          } else if (transaction.status === "Expense") {
            setOutflows((prevOutflows) => {
              const updatedOutflows = [...prevOutflows];
              updatedOutflows[monthIndex] += transaction.amount;
              return updatedOutflows;
            });
          }
        }
      });
    };

    loadTransactions();
  }, []);

  useEffect(() => {
    renderChart();
  }, [inflows, outflows]);

  const renderChart = () => {
    const ctx = document.getElementById("inflowOutflow");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
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
            data: inflows,
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
            data: outflows,
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
  };

  return <canvas width="100" height="30" id="inflowOutflow"></canvas>;
};

export default InflowOutflowChart;
