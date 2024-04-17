import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const InflowOutflowChart = () => {
  const inflows = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const outflows = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  async function loadTransactions() {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("http://localhost:4000/transactions", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      return json(
        { message: "Could not fetch transactions." },
        { status: 500 }
      );
    } else {
      const transactions = await response.json();
      return transactions;
    }
  }

  useEffect(() => {
    async function transactionInfo() {
      try {
        const transactions = await loadTransactions();

        let inflowCounter = 0;
        let outflowCounter = 0;

        transactions.forEach((transaction) => {
          const transactionDate = new Date(transaction.date).toLocaleString(
            "en-US",
            {
              month: "long",
            }
          );

          if (
            transactionDate === "January" &&
            transaction.status === "Income"
          ) {
            inflowCounter = transaction.amount;
            inflows[0] = inflowCounter;
            return inflows;
          }

          if (
            transactionDate === "February" &&
            transaction.status === "Income"
          ) {
            inflowCounter = transaction.amount;
            inflows[1] = inflowCounter;
            return inflows;
          }
          if (transactionDate === "March" && transaction.status === "Income") {
            inflowCounter = transaction.amount;
            inflows[2] = inflowCounter;
            return inflows;
          }
          if (transactionDate === "April" && transaction.status === "Income") {
            inflowCounter = transaction.amount;
            inflows[3] = inflowCounter;
            return inflows;
          }
          if (transactionDate === "May" && transaction.status === "Income") {
            inflowCounter = transaction.amount;
            inflows[4] = inflowCounter;
            return inflows;
          }
          if (transactionDate === "June" && transaction.status === "Income") {
            inflowCounter = transaction.amount;
            inflows[5] = inflowCounter;
            return inflows;
          }
          if (transactionDate === "Jully" && transaction.status === "Income") {
            inflowCounter = transaction.amount;
            inflows[6] = inflowCounter;
            return inflows;
          }
          if (transactionDate === "Augest" && transaction.status === "Income") {
            inflowCounter = transaction.amount;
            inflows[7] = inflowCounter;
            return inflows;
          }
          if (
            transactionDate === "September" &&
            transaction.status === "Income"
          ) {
            inflowCounter = transaction.amount;
            inflows[8] = inflowCounter;
            return inflows;
          }
          if (
            transactionDate === "October" &&
            transaction.status === "Income"
          ) {
            inflowCounter = transaction.amount;
            inflows[9] = inflowCounter;
            return inflows;
          }
          if (
            transactionDate === "November" &&
            transaction.status === "Income"
          ) {
            inflowCounter = transaction.amount;
            inflows[10] = inflowCounter;
            return inflows;
          }
          if (
            transactionDate === "December" &&
            transaction.status === "Income"
          ) {
            inflowCounter = transaction.amount;
            inflows[11] = inflowCounter;
            return inflows;
          }

          if (
            transactionDate === "January" &&
            transaction.status === "Expense"
          ) {
            outflowCounter = transaction.amount;
            outflows[0] = outflowCounter;
            return outflows;
          }

          if (
            transactionDate === "February" &&
            transaction.status === "Expense"
          ) {
            outflowCounter = transaction.amount;
            outflows[1] = outflowCounter;
            return outflows;
          }
          if (transactionDate === "March" && transaction.status === "Expense") {
            outflowCounter = transaction.amount;
            outflows[2] = outflowCounter;
            return outflows;
          }
          if (transactionDate === "April" && transaction.status === "Expense") {
            outflowCounter = transaction.amount;
            outflows[3] = outflowCounter;
            return outflows;
          }
          if (transactionDate === "May" && transaction.status === "Expense") {
            outflowCounter = transaction.amount;
            outflows[4] = outflowCounter;
            return outflows;
          }
          if (transactionDate === "June" && transaction.status === "Expense") {
            outflowCounter = transaction.amount;
            outflows[5] = outflowCounter;
            return outflows;
          }
          if (transactionDate === "Jully" && transaction.status === "Expense") {
            outflowCounter = transaction.amount;
            outflows[6] = outflowCounter;
            return outflows;
          }
          if (
            transactionDate === "Augest" &&
            transaction.status === "Expense"
          ) {
            outflowCounter = transaction.amount;
            outflows[7] = outflowCounter;
            return outflows;
          }
          if (
            transactionDate === "September" &&
            transaction.status === "Expense"
          ) {
            outflowCounter = transaction.amount;
            outflows[8] = outflowCounter;
            return outflows;
          }
          if (
            transactionDate === "October" &&
            transaction.status === "Expense"
          ) {
            outflowCounter = transaction.amount;
            outflows[9] = outflowCounter;
            return outflows;
          }
          if (
            transactionDate === "November" &&
            transaction.status === "Expense"
          ) {
            outflowCounter = transaction.amount;
            outflows[10] = outflowCounter;
            return outflows;
          }
          if (
            transactionDate === "December" &&
            transaction.status === "Expense"
          ) {
            outflowCounter = transaction.amount;
            outflows[11] = outflowCounter;
            return outflows;
          }
        });
        renderChart();
      } catch (error) {
        console.error(error.message);
      }
    }

    transactionInfo();
  }, []);

  function renderChart() {
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
  }

  return <canvas width="100" height="30" id="inflowOutflow"></canvas>;
};

export default InflowOutflowChart;
