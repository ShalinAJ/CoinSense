import totalIncomeImg from "../assets/total-income.png";
import totalExpenseImg from "../assets/total-expenses.png";
import totalInvestmentImg from "../assets/total-investments2.png";
import InflowOutflowChart from "../charts/InflowOutflowChart";
import BalanceEvolutionChart from "../charts/BalanceEvolutionChart";
import { Await, NavLink, useLoaderData } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import UserMarketOptions from "../components/widgets/UserMarketOptions";
import WalletWidget from "../components/widgets/WalletWidget";
import TradingWalletWidget from "../components/widgets/TradingWalletWidget";
import NetworthModal from "../components/NetworthModal";
import Spring from "../components/animations/Spring";
import RightSlide from "../components/animations/RightSlide";
import FadeIn from "../components/animations/FadeIn";

const DashboardPage = () => {
  const { transactions, orderHistory, assets, wallets, topups } =
    useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [tradeData, setTradeData] = useState([0, 0]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [incomeExpenseDifference, setIncomeExpenseDifference] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [assetsDetails, setAssetsDetails] = useState();
  const [walletDetails, setWalletDetails] = useState();
  const [transactionYears, setTransactionYears] = useState([]);
  const [selectedYearBE, setSelectedYearBE] = useState(
    `${new Date().getFullYear()}`
  );
  const [selectedYearIO, setSelectedYearIO] = useState(
    `${new Date().getFullYear()}`
  );
  const [topupData, setTopupData] = useState();
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    async function fetchAssetsData() {
      const walletData = await wallets;
      const data = await assets;
      setWalletDetails(walletData);
      setAssetsDetails(data);
    }

    fetchAssetsData();
  }, [assets, wallets]);

  let totalWalletBalance = 0;
  if (Array.isArray(walletDetails)) {
    totalWalletBalance = walletDetails.reduce(
      (acc, card) => acc + card.cardbalance,
      0
    );
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let totalAssetValue = 0;
  if (Array.isArray(assetsDetails)) {
    totalAssetValue = assetsDetails.reduce(
      (acc, asset) => acc + asset.amount,
      0
    );
  }

  useEffect(() => {
    async function topupDataHandler() {
      const data = await topups;
      const dataAmount = data[0].amount;

      const orderHistoryData = await orderHistory;
      let totalAmount = 0;
      if (Array.isArray(orderHistoryData)) {
        orderHistoryData.forEach((item) => {
          if (item.transactionType == "buy") {
            totalAmount += item.amount * item.price;
          } else {
            totalAmount -= item.amount * item.price;
          }
        });
      }

      setTopupData(dataAmount + totalAmount);
    }
    topupDataHandler();
  }, [topups]);

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

        setTotalIncome(totalIncomeFormated);
        setTotalExpense(totalExpenseFormated);
        setIncomeExpenseDifference(totalIncome - totalExpense);
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
  const closeModal = () => {
    setModalOpen(false);
  };

  const headingText = "Here's overview of your financial portfolio.";
  const { name } = JSON.parse(localStorage.getItem("user"));
  let firstName;
  name ? (firstName = name.split(" ")[0]) : "";

  return (
    <>
      <Suspense>
        <Await>
          {() => (
            <NetworthModal
              isOpen={modalOpen}
              onClose={closeModal}
              IOdifference={[incomeExpenseDifference]}
              assets={totalAssetValue}
              tradeData={tradeData}
              topups={topupData}
              wallets={totalWalletBalance}
              total={
                incomeExpenseDifference +
                topupData +
                tradeData[0] +
                tradeData[1] +
                totalAssetValue +
                totalWalletBalance
              }
            />
          )}
        </Await>
      </Suspense>
      <div className="w-[100%] lg:w-[80%]">
        <div className="bg-white flex flex-col items-start justify-between pt-3 lg:pt-[45px]">
          <FadeIn>
            <div className="text-center lg:text-left px-[10px] lg:px-[28px] lg:mr-20 mb-5 lg:mb-8">
              <p className="text-base lg:text-2xl font-bold">
                Welcome Back, {!firstName ? "Username" : firstName} 👋
              </p>
              <p className="text-xs lg:text-sm lg:pt-2 font-light">
                {headingText}{" "}
              </p>
            </div>
          </FadeIn>
          <div className="px-[10px] lg:px-[28px] flex flex-col md:flex-row gap-3 lg:gap-5 mb-8 lg:mb-11 w-[100%]">
            <div className="basis-1/3 rounded-xl">
              <button
                onClick={() => setModalOpen(true)}
                className="p-0 m-0 w-full border-none bg-transparent"
              >
                <Spring>
                  <div className="flex items-center gap-4 w-[100%] py-2 px-3 lg:p-4 text-black box-shadow bg-white border-[1px] border-coinsense-blue rounded-xl border-blue-1	hover:bg-gray-200 duration-300">
                    <img
                      src={totalInvestmentImg}
                      alt=""
                      className="w-5 h-5 lg:w-10 lg:h-10"
                    />
                    <div className="w-[100%] flex flex-row justify-between lg:flex-col items-center lg:items-start">
                      <p className="text-xs lg:text-sm font-medium">
                        Net Worth
                      </p>
                      <p className="text-xs lg:text-lg font-semibold">
                        {totalWalletBalance
                          ? new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(
                              incomeExpenseDifference +
                                topupData +
                                tradeData[0] +
                                tradeData[1] +
                                totalAssetValue +
                                totalWalletBalance
                            )
                          : "$0.00"}
                      </p>
                    </div>
                  </div>
                </Spring>
              </button>
            </div>

            <div className="basis-1/3">
              <Spring>
                <NavLink
                  to={"/dashboard/income"}
                  className="flex items-center gap-4 w-[100%] py-2 px-3 lg:p-4 text-black box-shadow bg-white border-[1px] border-coinsense-blue rounded-xl border-blue-1	hover:bg-gray-200 duration-300"
                >
                  <img
                    src={totalIncomeImg}
                    alt=""
                    className="w-5 h-5 lg:w-10 lg:h-10"
                  />
                  <div className="w-[100%] flex flex-row justify-between lg:flex-col items-center lg:items-start">
                    <p className="text-xs lg:text-sm font-medium">
                      Total Income
                    </p>
                    <p className="text-xs lg:text-lg font-semibold">
                      {totalIncome ? totalIncome : "$0.00"}
                    </p>
                  </div>
                </NavLink>
              </Spring>
            </div>
            <div className="basis-1/3">
              <Spring>
                <NavLink
                  to={"/dashboard/expense"}
                  className="flex items-center gap-4 w-[100%] py-2 px-3 lg:p-4 text-black box-shadow bg-white border-[1px] border-coinsense-blue rounded-xl border-blue-1	hover:bg-gray-200 duration-300"
                >
                  <img
                    src={totalExpenseImg}
                    alt=""
                    className="w-5 h-5 lg:w-10 lg:h-10"
                  />
                  <div className="w-[100%] flex flex-row justify-between lg:flex-col items-center lg:items-start">
                    <p className="text-xs lg:text-sm font-medium">
                      Total Expences
                    </p>
                    <p className="text-xs lg:text-lg font-semibold">
                      {totalExpense ? totalExpense : "$0.00"}
                    </p>
                  </div>
                </NavLink>
              </Spring>
            </div>
          </div>
          <div className="px-0 lg:px-[28px] w-[100%] h-[100%]">
            <RightSlide>
              <div className="px-[10px] rounded-3xl flex flex-col lg:border lg:shadow-sm lg:hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300 lg:p-4 pb-8 lg:mb-10">
                <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                  <div className="lg:p-3 mb-1">
                    <p className="text-base lg:text-xl font-semibold">
                      Financial Inflow Outflow
                    </p>
                    <p className="text-xs text-gray-400 pb-2 lg:py-1">
                      Visualizes the money coming in (inflow) and going out
                      (outflow) of your account over the year.
                    </p>
                  </div>
                  <select
                    name="years1"
                    id="years1"
                    value={selectedYearIO}
                    onChange={handleYearChangeIO}
                    className="w-[25%] lg:w-auto bg-transparent lg:mr-5 border-2 text-gray-500 border-gray-300 rounded-2xl p-1 lg:px-2 text-xs lg:font-medium hover:cursor-pointer"
                  >
                    {transactionYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <InflowOutflowChart
                  screenSize={screenSize}
                  selectedYear={selectedYearIO}
                />
              </div>
            </RightSlide>

            <div className="flex flex-col lg:flex-row justify-between">
              <div className="lg:w-[48.5%]">
                <UserMarketOptions
                  tradeData={tradeData}
                  url={[
                    "/dashboard/investment/crypto-trading",
                    "/dashboard/investment/stock-trading",
                    "/dashboard/investment/assets",
                  ]}
                />
              </div>
              <div className="lg:w-[48.5%] lg:h-[23rem] flex flex-col gap-5">
                <WalletWidget />
                <TradingWalletWidget />
              </div>
            </div>
            <RightSlide>
              <div className="px-[10px] rounded-3xl flex flex-col lg:border lg:shadow-sm lg:hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300 lg:p-4 pb-8 lg:mb-10 mt-7 lg:mt-10">
                <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                  <div className="lg:p-3 mb-1">
                    <p className="text-base lg:text-xl font-semibold">
                      Balance Evolution
                    </p>
                    <p className="text-xs text-gray-400 pb-2 lg:py-1">
                      A representation of how the balance of an account or
                      portfolio has changed over time.
                    </p>
                  </div>
                  <select
                    name="years2"
                    id="years2"
                    value={selectedYearBE}
                    onChange={handleYearChangeBE}
                    className="w-[25%] lg:w-auto bg-transparent lg:mr-5 mb-5 border-2 text-gray-500 border-gray-300 rounded-2xl p-1 px-2 text-xs font-medium hover:cursor-pointer"
                  >
                    {transactionYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <BalanceEvolutionChart
                  screenSize={screenSize}
                  selectedYear={selectedYearBE}
                />
              </div>
            </RightSlide>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
