import { useLoaderData } from "react-router-dom";
import React, { useEffect, useState } from "react";
import UserInvestmentsWidget from "../components/widgets/UserInvestmentsWidget";
import UserMarketOptions from "../components/widgets/UserMarketOptions";
import CryptoChart from "../charts/CryptoChart";
import axios from "axios";
import StockChart from "../charts/StockChart";
import DataLineWidget from "../components/widgets/DataLineWidget";
import RightSlide from "../components/animations/RightSlide";
import Spring from "../components/animations/Spring";
import FadeIn from "../components/animations/FadeIn";

const InvestmentsPage = () => {
  const { orderHistory, userInfo, selectToken, tradingInterval } =
    useLoaderData();
  const [tradeData, setTradeData] = useState([0, 0]);
  const [recentInvestments, setRecentInvestments] = useState([]);
  const [investmentTotal, setInvestmentTotal] = useState(0);
  const [stockDataSet, setStockDataSet] = useState(0);
  const [cryptoDataSet, setCryptoDataSet] = useState(0);
  const [stockChartData, setStockChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "AAPL Price",
        data: [],
        backgroundColor: "rgba(21, 45, 255, 0.1)",
        borderColor: "rgba(21, 45, 255, 0.6)",
        borderWidth: 2,
        pointRadius: 2,
      },
    ],
  });
  const [cryptoChartData, setCryptoChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Bitcoin Price",
        data: [],
        fill: true,
        borderColor: "#152dff26",
        backgroundColor: "#152DFF",
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  });
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1M`
        );
        const data = response.data;
        const labels = data
          .map((item) => {
            const date = new Date(item[0]);
            return `${date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
            })}`;
          })
          .slice(-8);
        const prices = data.map((item) => parseFloat(item[4])).slice(-8);
        const currentPrice = parseFloat(data.lastPrice);
        setCryptoDataSet(currentPrice);
        setCryptoDataSet(data[81][4]);

        setCryptoChartData({
          labels,
          datasets: [
            {
              label: "Bitcoin Price",
              data: prices,
              fill: true,
              borderColor: "#152dffa1",
              backgroundColor: "transparent",
              tension: 0.1,
              pointRadius: 3,
              pointHoverRadius: 3,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching Bitcoin data: ", error);
      }
    };

    const fetchStockData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          `https://coinsense-mix7.onrender.com/stock-data`,
          {
            params: {
              symbol: "AAPL",
              range: "max",
              interval: "1wk",
            },
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = response.data.chart.result[0];

        const stockInfo = data.meta;
        const currentPrice = stockInfo.regularMarketPrice || 0;

        setStockDataSet(currentPrice.toFixed(2));

        const labels = data.timestamp.slice(-8).map((timestamp) => {
          const date = new Date(timestamp * 1000);
          return `${date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
          })}`;
        });
        const prices = data.indicators.quote[0].close.slice(-8);

        setStockChartData({
          labels,
          datasets: [
            {
              label: "AAPL Price",
              data: prices.map((price) => (price ? price.toFixed(2) : null)),
              backgroundColor: "rgba(21, 45, 255, 0.1)",
              borderColor: "rgba(21, 45, 255, 0.6)",
              tension: 0.1,
              pointRadius: 3,
              pointHoverRadius: 3,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching Bitcoin data: ", error);
      }
    };
    fetchCryptoData();
    fetchStockData();

    const interval = setInterval(() => {
      fetchStockData();
      fetchCryptoData();
    }, 1000);

    return () => clearInterval(interval);
  }, [userInfo]);

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

          setInvestmentTotal(cryptoInvestedTotal + stockInvestedTotal);
          setRecentInvestments(orderData);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    recentInvestmentChecker();
  }, [orderHistory]);

  return (
    <div className="lg:w-[80%] h-[max-content] bg-white lg:px-[28px] pt-[29px] lg:pt-[45px]">
      <div className="px-[10px] lg:px-0 flex flex-col lg:flex-row text-center lg:text-left items-center lg:items-start justify-between">
        <FadeIn>
          <div className="text-lg lg:text-2xl font-bold">Investments</div>
          <p className="text-xs lg:text-sm lg:pt-2 font-light">
            Detailed view of your investments
          </p>
        </FadeIn>
      </div>

      <div className="flex flex-col lg:flex-row justify-between pt-6 pb-2 lg:pb-10">
        <div className="lg:w-[48.5%]">
          <UserInvestmentsWidget
            investmentTotal={investmentTotal}
            recentInvestments={recentInvestments}
          />
        </div>
        <div className="lg:w-[48.5%]">
          <UserMarketOptions
            tradeData={tradeData}
            url={[
              "../investment/crypto-trading",
              "../investment/stock-trading",
              "../investment/assets",
            ]}
          />
        </div>
      </div>
      <RightSlide>
        <div className="hidden lg:flex mb-10 flex-col gap-5">
          <DataLineWidget />
        </div>
      </RightSlide>

      <Spring>
        <div className="flex flex-col lg:flex-row justify-between lg:gap-10">
          <div className="w-[100%] px-[10px] lg:px-8 pt-8 pb-6 mb-6 lg:mb-10 rounded-3xl lg:border lg:shadow-sm lg:hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
            <div>
              <div className="flex flex-row justify-between items-center gap-3 pb-5 pl-1">
                <div className="flex flex-row gap-3">
                  <img
                    src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                    alt=""
                    className="w-5 h-5 lg:w-6 lg:h-6 rounded-md"
                  />
                  <p className="text-sm lg:text-base font-semibold">
                    Bitcoin (BTC)
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    Price per token :{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(cryptoDataSet)}
                  </p>
                </div>
              </div>
              <div>
                <CryptoChart chartData={cryptoChartData} size={screenSize} />
              </div>
            </div>
          </div>
          <hr />
          <div className="w-[100%] px-[10px] lg:px-8 pt-8 pb-6 mb-10 rounded-3xl lg:border lg:shadow-sm lg:hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
            <div>
              <div className="flex flex-row justify-between items-center gap-3 pb-5 pl-1">
                <div className="flex flex-row gap-3">
                  <img
                    src="https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png"
                    alt=""
                    className="w-5 h-5 lg:w-6 lg:h-6 rounded-md"
                  />
                  <p className="text-sm lg:text-base font-semibold">
                    Apple Inc (AAPL)
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    Price per stock :{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(stockDataSet)}
                  </p>
                </div>
              </div>
              <div>
                <StockChart chartData={stockChartData} size={screenSize} />
              </div>
            </div>
          </div>
        </div>
      </Spring>
    </div>
  );
};

export default InvestmentsPage;
