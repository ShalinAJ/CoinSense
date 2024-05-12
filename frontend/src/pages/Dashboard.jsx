import totalIncomeImg from "../assets/total-income.png";
import totalExpenseImg from "../assets/total-expenses.png";
import totalInvestmentImg from "../assets/total-investments.png";
import InflowOutflowChart from "../charts/InflowOutflowChart";
import BalanceEvolutionChart from "../charts/BalanceEvolutionChart";
import { json, NavLink, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import UserMarketOptions from "../components/widgets/UserMarketOptions";
import WalletWidget from "../components/widgets/WalletWidget";
import TradingWalletWidget from "../components/widgets/TradingWalletWidget";

const DashboardPage = () => {
  const { transactions, orderHistory } = useLoaderData();
  const [tradeData, setTradeData] = useState([0, 0]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [networth, setNetworth] = useState(0);
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

        const networthFormated = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(totalIncome - totalExpense);

        setTotalIncome(totalIncomeFormated);
        setTotalExpense(totalExpenseFormated);
        setNetworth(networthFormated);
      } catch (error) {
        console.error(error.message);
      }
      const transactionD = await transactions;
      return transactionD;
    }

    transactionInfo();
  }, []);

  useEffect(() => {
    async function recentInvestmentChecker() {
      try {
        const orderData = await orderHistory;
        if (Array.isArray(orderData)) {
          const cryptoInvested = orderData.filter(
            (order) => order.status === "Crypto"
          );

          const cryptoInvestedTotal = cryptoInvested.reduce((acc, item) => {
            if (item.transactionType === "buy") {
              return acc + item.amount * item.price;
            } else if (item.transactionType === "sell") {
              return acc - item.amount * item.price;
            }
            return acc;
          }, 0);

          const stockInvested = orderData.filter(
            (order) => order.status === "Stock"
          );
          const stockInvestedTotal = stockInvested.reduce(
            (acc, curr) => acc + curr.amount * curr.price,
            0
          );

          setTradeData([cryptoInvestedTotal, stockInvestedTotal]);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    recentInvestmentChecker();
  }, [orderHistory]);

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
                to={"/dashboard/investment/user-investments"}
                className="flex gap-4 w-[100%] p-4 bg-coinsense-blue text-white rounded-xl	hover:bg-coinsense-blue-darker"
              >
                <img src={totalInvestmentImg} alt="" className="w-12" />
                <div className="flex flex-col items-start">
                  <p className="text-sm font-medium">Networth</p>
                  <p className="text-lg font-semibold">{networth}</p>
                </div>
              </NavLink>
            </div>
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
          </div>
          <div className="w-[100%] h-[100%]">
            <div className="rounded-3xl flex flex-col border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300 p-4 pb-8 mb-10">
              <div className="flex flex-row justify-between items-center">
                <div className="p-3 mb-1">
                  <p className="text-xl font-semibold">
                    Financial Inflow Outflow
                  </p>
                  <p className="text-xs text-gray-400 py-1">
                    Visualizes the money coming in (inflow) and going out
                    (outflow) of your account over the year.
                  </p>
                </div>
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
            <div className="flex flex-row justify-between">
              <div className="w-[48.5%]">
                <UserMarketOptions
                  tradeData={tradeData}
                  url={[
                    "/dashboard/investment/crypto-trading",
                    "/dashboard/investment/stock-trading",
                    "/dashboard/investment/forex-trading",
                  ]}
                />
              </div>
              <div className="w-[48.5%] h-[23rem] flex flex-col gap-5">
                <WalletWidget />
                <TradingWalletWidget />
              </div>
            </div>
            <div className="rounded-3xl flex flex-col border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300 p-4 pb-8 mt-10 mb-10">
              <div className="flex flex-row justify-between items-center">
                <div className="p-3 mb-1">
                  <p className="text-xl font-semibold">Balance Evolution</p>
                  <p className="text-xs text-gray-400 py-1">
                    A representation of how the balance of an account or
                    portfolio has changed over time.
                  </p>
                </div>
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
