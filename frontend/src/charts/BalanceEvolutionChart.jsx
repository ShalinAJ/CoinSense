import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const BalanceEvolutionChart = ({ selectedYear, screenSize }) => {
  const [balanceEvolution, setBalanceEvolution] = useState(Array(12).fill(0));

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(
          "https://coinsense-mix7.onrender.com/transactions",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

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

      const balanceForYear = Array(12).fill(0);

      transactions.forEach((transaction) => {
        const transactionDate = new Date(transaction.date);
        const transactionYear = transactionDate.getFullYear();
        const transactionMonthIndex =
          monthIndexMap[
            transactionDate.toLocaleString("en-US", { month: "long" })
          ];

        if (transactionYear.toString() === selectedYear) {
          if (transaction.status === "Income") {
            balanceForYear[transactionMonthIndex] += transaction.amount;
          } else if (transaction.status === "Expense") {
            balanceForYear[transactionMonthIndex] -= transaction.amount;
          }
        }
      });

      setBalanceEvolution(balanceForYear);
    };

    loadTransactions();
  }, [selectedYear]);

  useEffect(() => {
    if (balanceEvolution.length > 0) {
      renderChart();
    }
  }, [balanceEvolution]);

  const renderChart = () => {
    const ctx = document.getElementById("balanceEvolution");

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
            label: "Balance",
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
            beginAtZero: true,
            ticks: {
              font: {
                size: 10,
                family: "Inter",
              },
            },
          },
          x: {
            beginAtZero: true,
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

  return (
    <canvas
      width="100"
      height={screenSize < 1024 ? 100 : 30}
      id="balanceEvolution"
    ></canvas>
  );
};

export default BalanceEvolutionChart;
