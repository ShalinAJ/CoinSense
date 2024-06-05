import React, { useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import StockChart from "../charts/StockChart";
import axios from "axios";
import TradingArea from "../components/trading/TradingArea";
import TradeSelect from "../components/trading/TradeSelect";
import backArrow from "../assets/back-arrow.png";
import StockTradeLiveDataBar from "../components/trading/stock/StockTradeLiveDataBar";
import StockInfoPanel from "../components/trading/stock/StockInfoPanel";
import StockTradingHorizontalMarketBar from "../components/widgets/StockTradingHorizontalMarketBar";
import FadeIn from "../components/animations/FadeIn";
import RightSlide from "../components/animations/RightSlide";

const StockTradingPage = () => {
  const navigate = useNavigate();

  const { topups, orderHistory } = useLoaderData();
  const { openOrders } = useLoaderData();
  const { ...userInfo } = JSON.parse(localStorage.getItem("user"));
  const [investedTotal, setInvestedTotal] = useState(0);
  const [generalData, setGeneralData] = useState();
  const [tokenDataSet, setTokenDataSet] = useState({
    price: 0,
    change: 0,
    changePercentage: 0,
    volume: 0,
    avgVolume: 0,
    open: 0,
    previousClose: 0,
    dayHigh: 0,
    dayLow: 0,
    fiftyTwoWeekHigh: 0,
    fiftyTwoWeekLow: 0,
  });
  const [tradingInterval, setTradingInterval] = useState("1d");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectToken, setSelectToken] = useState([
    "AAPL",
    "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png",
  ]);

  const [chartData, setChartData] = useState({
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

  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    async function orderHistoryDataHandler() {
      const orderHistoryData = await orderHistory;

      let totalAmount = 0;

      if (Array.isArray(orderHistoryData)) {
        let filteredOrders = orderHistoryData.filter(
          (order) => order.status === "Stock"
        );

        if (Array.isArray(filteredOrders)) {
          filteredOrders.forEach((item) => {
            if (item.transactionType == "buy") {
              totalAmount += item.amount * item.price;
            } else {
              totalAmount -= item.amount * item.price;
            }
          });
        }

        setInvestedTotal(totalAmount);
      }
    }

    orderHistoryDataHandler();

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://coinsense-mix7.onrender.com/stocks/general/",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        const stockDetails = await response.json();

        setGeneralData(stockDetails);
      } catch (error) {
        console.error("Error fetching crypto data: ", error);
      }
      try {
        const response = await axios.get(
          `https://coinsense-mix7.onrender.com/stock-data`,
          {
            params: {
              symbol: selectToken[0],
              range: "1y",
              interval: tradingInterval,
            },
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        const data = response.data.chart.result[0];

        const stockInfo = data.meta;
        const currentPrice = stockInfo.regularMarketPrice || 0;
        const previousClose = stockInfo.chartPreviousClose || 0;
        const change = currentPrice - previousClose;
        const changePercentage = ((change / previousClose) * 100).toFixed(2);

        setTokenDataSet({
          price: currentPrice.toFixed(2),
          change: change.toFixed(2),
          changePercentage,
          volume: stockInfo.regularMarketVolume || 0,
          avgVolume: stockInfo.averageDailyVolume10Day || 0,
          open: stockInfo.regularMarketOpen || 0,
          previousClose: previousClose.toFixed(2),
          dayHigh: stockInfo.regularMarketDayHigh || 0,
          dayLow: stockInfo.regularMarketDayLow || 0,
          fiftyTwoWeekHigh: stockInfo.fiftyTwoWeekHigh || 0,
          fiftyTwoWeekLow: stockInfo.fiftyTwoWeekLow || 0,
        });

        const labels = data.timestamp.map((timestamp) =>
          new Date(timestamp * 1000).toLocaleDateString()
        );
        const prices = data.indicators.quote[0].close;

        setChartData({
          labels: labels.slice(0, 250),
          datasets: [
            {
              label: "AAPL Price",
              data: prices.map((price) => (price ? price.toFixed(2) : null)),
              backgroundColor: "rgba(21, 45, 255, 0.1)",
              borderColor: "rgba(21, 45, 255, 0.6)",
              borderWidth: 2,
              pointRadius: 2,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data: ", error);
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, [selectToken, tradingInterval]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const tokenHandler = (token) => {
    if (!token.symbol) {
      setSelectToken([token.ticker, token.logo]);
    } else {
      setSelectToken(token.symbol);
    }
  };

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <>
      {!loading && (
        <TradeSelect
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          cryptoData={generalData}
          tokenHandler={tokenHandler}
          orderType={"Stock"}
        />
      )}
      {!loading && (
        <div className="lg:w-[80%] h-[max-content] bg-white">
          <div className="flex flex-col lg:flex-row text-center lg:text-left items-center lg:items-start justify-between px-[10px] lg:px-[28px] pt-[29px] lg:pt-[45px] pb-6 lg:pb-10">
            <div>
              <FadeIn>
                <Link onClick={prevPage} className="ml-24 lg:ml-0 p-0 m-0 w-4">
                  <img src={backArrow} alt="" />
                </Link>
                <h2 className="text-lg lg:text-2xl font-bold">Stock Trading</h2>
                <p className="text-xs lg:text-sm lg:pt-2 font-light">
                  Trade and view realtime data of Stocks
                </p>
              </FadeIn>
            </div>
            <RightSlide>
              <div className="flex flex-row items-center mt-2 lg:mt-0 border shadow-sm lg:shadow-md rounded-full gap-3">
                <div className="flex flex-row gap-2 text-xs font-semibold pl-6">
                  <p>Stock invested :</p>
                  <p>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(Math.abs(investedTotal))}
                  </p>
                </div>
                <Link
                  to={"../user-investments"}
                  className="text-xs m-3 px-3 py-1 text-white bg-coinsense-blue rounded-full"
                >
                  View more
                </Link>
              </div>
            </RightSlide>
          </div>
          <div className="px-[10px] lg:px-[28px]">
            <RightSlide>
              <StockTradeLiveDataBar
                selectToken={selectToken}
                tokenDataSet={tokenDataSet}
                onOpen={() => setModalOpen(true)}
              />
            </RightSlide>
            <FadeIn>
              <div className="flex flex-row items-center justify-end gap-2 mt-5">
                <label htmlFor="">Interval </label>
                <select
                  name="trading-interval"
                  id="trading-interval"
                  onChange={(event) => {
                    setTradingInterval(event.target.value);
                  }}
                  defaultValue={tradingInterval}
                  className="bg-transparent mr-5 border-2 text-gray-500 border-gray-300 rounded-2xl p-1 px-2 text-xs font-medium hover:cursor-pointer"
                >
                  <option value="1h">4H</option>
                  <option value="1d">1D</option>
                  <option value="1wk">1W</option>
                  <option value="1mo">1M</option>
                  <option value="3mo">3M</option>
                </select>
              </div>

              <div className="mb-8 mt-3" style={{ height: "auto" }}>
                <StockChart chartData={chartData} size={screenSize} />
              </div>
            </FadeIn>
            <hr />
            <FadeIn>
              <div>
                <TradingArea
                  currentPrice={tokenDataSet.price}
                  topups={topups}
                  orderHistoryData={orderHistory}
                  openOrdersData={openOrders}
                  selectToken={selectToken[0]}
                  investedTotal={investedTotal}
                  orderType={"Stock"}
                />
              </div>
              <div>
                <StockInfoPanel
                  generalData={generalData}
                  selectToken={selectToken[0]}
                  tokenDataSet={tokenDataSet}
                />
              </div>
            </FadeIn>
            <RightSlide>
              <StockTradingHorizontalMarketBar
                generalData={generalData}
                tradingInterval={tradingInterval}
              />
            </RightSlide>
          </div>
        </div>
      )}
    </>
  );
};

export default StockTradingPage;
