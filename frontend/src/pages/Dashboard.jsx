import totalIncomeImg from "../assets/total-income.png";
import totalExpenseImg from "../assets/total-expenses.png";
import totalInvestmentImg from "../assets/total-investments.png";
import InflowOutflowChart from "../charts/InflowOutflowChart";
import BalanceEvolutionChart from "../charts/BalanceEvolutionChart";
import { json } from "react-router-dom";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  async function loadTransactions() {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("http://localhost:4000/transactions", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      return json({ message: "Could not fetch events." }, { status: 500 });
    } else {
      const transactions = await response.json();
      return transactions;
    }
  }

  useEffect(() => {
    async function transactionInfo() {
      try {
        const transactions = await loadTransactions();

        let totalIncome = 0;
        let totalInvestment = 0;
        let totalExpense = 0;

        transactions.forEach((trans) => {
          if (trans.status === "Investment") {
            totalInvestment += trans.amount;
          }
          if (trans.status === "Income") {
            totalIncome += trans.amount;
          }
          if (trans.status === "Expense") {
            totalExpense += trans.amount;
          }
        });

        totalIncome = parseFloat(totalIncome.toFixed(2));
        totalInvestment = parseFloat(totalInvestment.toFixed(2));
        totalExpense = parseFloat(totalExpense.toFixed(2));

        setTotalIncome(totalIncome);
        setTotalExpense(totalExpense);
        setTotalInvestment(totalInvestment);
      } catch (error) {
        console.error(error.message);
      }
    }

    transactionInfo();
  }, []);
  const headingText = "Here's overview of your financial portfolio.";
  const { name } = JSON.parse(localStorage.getItem("user"));
  let firstName;
  name ? (firstName = name.split(" ")[0]) : "";
  return (
    <>
      <div className="w-[80%]">
        <div className="bg-white flex flex-col items-start justify-between px-[28px] pt-[45px]">
          <div className="mr-20 mb-8">
            <p className="text-2xl font-bold">
              Welcome Back, {!firstName ? "[YOUR NAME]" : firstName} 👋
            </p>
            <p className="text-sm pt-2 font-light">{headingText} </p>
          </div>
          <div className="flex flex-row gap-5 mb-11 w-[100%]">
            <div className="basis-1/3">
              <button className="flex gap-4 w-[100%] p-4 bg-coinsense-blue text-white rounded-xl hover:bg-coinsense-blue-darker">
                <img src={totalIncomeImg} alt="" className="w-12" />
                <div className="flex flex-col items-start">
                  <p className="text-sm font-medium">Total Income</p>
                  <p className="text-lg font-semibold">${totalIncome}</p>
                </div>
              </button>
            </div>
            <div className="basis-1/3">
              <button className="flex gap-4 w-[100%] p-4 bg-coinsense-blue text-white rounded-xl	hover:bg-coinsense-blue-darker">
                <img src={totalExpenseImg} alt="" className="w-12" />
                <div className="flex flex-col items-start">
                  <p className="text-sm font-medium">Total Expences</p>
                  <p className="text-lg font-semibold">${totalExpense}</p>
                </div>
              </button>
            </div>
            <div className="basis-1/3">
              <button className="flex gap-4 w-[100%] p-4 bg-coinsense-blue text-white rounded-xl	hover:bg-coinsense-blue-darker">
                <img src={totalInvestmentImg} alt="" className="w-12" />
                <div className="flex flex-col items-start">
                  <p className="text-sm font-medium">Total Investments</p>
                  <p className="text-lg font-semibold">${totalInvestment}</p>
                </div>
              </button>
            </div>
          </div>
          <div className="w-[100%] h-[100%]">
            <div className="border-[2px] border-[#152dff61] rounded-xl p-4">
              <h2 className="p-3 text-base font-medium">
                Financial Inflow Outflow
              </h2>
              <InflowOutflowChart />
            </div>
            <div className="border-[2px] border-[#152dff61] rounded-xl p-4 mt-10 mb-10">
              <h2 className="p-3 mb-5 text-base font-medium">
                Balance Evolution
              </h2>
              <BalanceEvolutionChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
