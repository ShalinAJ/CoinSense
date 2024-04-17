import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const BalanceEvolutionChart = () => {
  const [balanceEvolution, setBalanceEvolution] = useState(Array(12).fill(0));

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
            setBalanceEvolution((prevbalances) => {
              const updatedbalances = [...prevbalances];
              updatedbalances[monthIndex] += transaction.amount;
              return updatedbalances;
            });
          } else if (transaction.status === "Expense") {
            setBalanceEvolution((prevbalances) => {
              const updatedbalances = [...prevbalances];
              updatedbalances[monthIndex] -= transaction.amount;
              return updatedbalances;
            });
          }
        }
      });
    };

    loadTransactions();
  }, []);

  useEffect(() => {
    if (balanceEvolution.length > 0) {
      renderChart();
    }
  }, [balanceEvolution]);

  const renderChart = () => {
    const ctx = document.getElementById("balanceEvolution");

    // Cleanup previous chart instance
    Chart.getChart(ctx)?.destroy();

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
            data: balanceEvolution,
            borderColor: "#152dff26",
            backgroundColor: "#152DFF",
            tension: 0.4,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              font: {
                size: 10,
                family: "Inter",
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
                family: "Inter",
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
            display: false,
          },
        },
      },
    });
  };

  return <canvas width="100" height="30" id="balanceEvolution"></canvas>;
};

export default BalanceEvolutionChart;
