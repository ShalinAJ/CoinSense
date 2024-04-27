import totalIncomeImg from "../assets/total-income.png";
import totalExpenseImg from "../assets/total-expenses.png";
import totalInvestmentImg from "../assets/total-investments.png";
import InflowOutflowChart from "../charts/InflowOutflowChart";
import BalanceEvolutionChart from "../charts/BalanceEvolutionChart";
import { json, NavLink, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { transactions } = useLoaderData();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [transactionYears, setTransactionYears] = useState([]);
  const [selectedYearBE, setSelectedYearBE] = useState(
    `${new Date().getFullYear()}`
  );
  const [selectedYearIO, setSelectedYearIO] = useState(
    `${new Date().getFullYear()}`
  );

  useEffect(() => {
    async function transactionInfo() {
      try {
        const loadedTransactions = await transactions;
        let totalIncome = 0;
        let totalInvestment = 0;
        let totalExpense = 0;

        loadedTransactions.forEach((trans) => {
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

        const totalIncomeFormated = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(totalIncome);

        const totalExpenseFormated = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(totalExpense);

        const totalInvestmentFormated = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(totalInvestment);

        setTotalIncome(totalIncomeFormated);
        setTotalExpense(totalExpenseFormated);
        setTotalInvestment(totalInvestmentFormated);
      } catch (error) {
        console.error(error.message);
      }
      const transactionD = await transactions;
      return transactionD;
    }

    transactionInfo();
  }, []);

  useEffect(() => {
    async function transactionYear() {
      try {
        const loadedTransactions = await transactions;
        const years = [
          ...new Set(
            loadedTransactions.map((trans) =>
              new Date(trans.date).getFullYear()
            )
          ),
        ];
        setTransactionYears(years);
      } catch (error) {
        console.error(error.message);
      }
    }

    transactionYear();
  }, [transactions]);

  const handleYearChangeBE = (event) => {
    setSelectedYearBE(event.target.value);
  };

  const handleYearChangeIO = (event) => {
    setSelectedYearIO(event.target.value);
  };

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
              Welcome Back, {!firstName ? "Username" : firstName} 👋
            </p>
            <p className="text-sm pt-2 font-light">{headingText} </p>
          </div>
          <div className="flex flex-row gap-5 mb-11 w-[100%]">
            <div className="basis-1/3">
              <NavLink
                to={"/dashboard/income"}
                className="flex gap-4 w-[100%] p-4 bg-coinsense-blue text-white rounded-xl hover:bg-coinsense-blue-darker"
              >
                <img src={totalIncomeImg} alt="" className="w-12" />
                <div className="flex flex-col items-start">
                  <p className="text-sm font-medium">Total Income</p>
                  <p className="text-lg font-semibold">{totalIncome}</p>
                </div>
              </NavLink>
            </div>
            <div className="basis-1/3">
              <NavLink
                to={"/dashboard/expense"}
                className="flex gap-4 w-[100%] p-4 bg-coinsense-blue text-white rounded-xl	hover:bg-coinsense-blue-darker"
              >
                <img src={totalExpenseImg} alt="" className="w-12" />
                <div className="flex flex-col items-start">
                  <p className="text-sm font-medium">Total Expences</p>
                  <p className="text-lg font-semibold">{totalExpense}</p>
                </div>
              </NavLink>
            </div>
            <div className="basis-1/3">
              <NavLink
                to={"/dashboard/investment/user-investments"}
                className="flex gap-4 w-[100%] p-4 bg-coinsense-blue text-white rounded-xl	hover:bg-coinsense-blue-darker"
              >
                <img src={totalInvestmentImg} alt="" className="w-12" />
                <div className="flex flex-col items-start">
                  <p className="text-sm font-medium">Total Investments</p>
                  <p className="text-lg font-semibold">{totalInvestment}</p>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="w-[100%] h-[100%]">
            <div className="border-[2px] border-[#152dff61] rounded-xl p-4">
              <div className="flex flex-row justify-between items-center">
                <h2 className="p-3 text-base font-medium">
                  Financial Inflow Outflow
                </h2>
                <select
                  name="years1"
                  id="years1"
                  value={selectedYearIO}
                  onChange={handleYearChangeIO}
                  className="bg-transparent mr-5 border-2 text-gray-500 border-gray-300 rounded-2xl p-1 px-2 text-xs font-medium hover:cursor-pointer"
                >
                  {transactionYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <InflowOutflowChart selectedYear={selectedYearIO} />
            </div>
            <div className="border-[2px] border-[#152dff61] rounded-xl p-4 mt-10 mb-10">
              <div className="flex flex-row justify-between items-center">
                <h2 className="p-3 mb-5 text-base font-medium">
                  Balance Evolution
                </h2>
                <select
                  name="years2"
                  id="years2"
                  value={selectedYearBE}
                  onChange={handleYearChangeBE}
                  className="bg-transparent mr-5 mb-5 border-2 text-gray-500 border-gray-300 rounded-2xl p-1 px-2 text-xs font-medium hover:cursor-pointer"
                >
                  {transactionYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <BalanceEvolutionChart selectedYear={selectedYearBE} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
