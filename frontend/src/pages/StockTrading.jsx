import React, { useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import StockChart from "../charts/StockChart";
import axios from "axios";
import TradingArea from "../components/trading/crypto/CryptoTradingArea";
import TradeSelect from "../components/trading/crypto/CryptoTradeSelect";
import backArrow from "../assets/back-arrow.png";
import StockTradeLiveDataBar from "../components/trading/stock/StockTradeLiveDataBar";
import CryptoTradingHorizontalMarketBar from "../components/widgets/CryptoTradingHorizontalMarketBar";

const StockTradingPage = () => {
  const navigate = useNavigate();

  const { topups, orderHistory } = useLoaderData();
  const { openOrders } = useLoaderData();
  const { ...userInfo } = JSON.parse(localStorage.getItem("user"));
  const [currentPrice, setCurrentPrice] = useState(0);
  const [investedTotal, setInvestedTotal] = useState(0);
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
  });
  const [tradingInterval, setTradingInterval] = useState("1d");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectToken, setSelectToken] = useState("AAPL");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/stock-data`, {
          params: {
            symbol: selectToken,
            range: "1y",
            interval: tradingInterval,
          },
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

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
        });

        const labels = data.timestamp.map((timestamp) =>
          new Date(timestamp * 1000).toLocaleDateString()
        );
        const prices = data.indicators.quote[0].close;

        setChartData({
          labels: labels.slice(0, 250), // Data points for 1y interval
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

    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, [selectToken, tradingInterval]);

  const tokenHandler = (token) => {
    setSelectToken(token.symbol);
  };

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <>
      {!loading && (
        <div className="w-[80%] h-[max-content] bg-white">
          <div className="flex items-start justify-between px-[28px] pt-[45px] pb-10">
            <div>
              <Link onClick={prevPage} className="p-0 m-0 w-4">
                <img src={backArrow} alt="" />
              </Link>
              <h2 className="text-2xl font-bold">Stock Trading</h2>
              <p className="text-sm pt-2 font-light">
                Trade and view realtime data of Stocks
              </p>
            </div>
            <div className="flex flex-row items-center border shadow-md rounded-full gap-3">
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
          </div>
          <div className="px-[28px] ">
            <StockTradeLiveDataBar
              selectToken={[selectToken, tokenDataSet.price]}
              tokenDataSet={tokenDataSet}
              onOpen={() => setModalOpen(true)}
            />
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
                <option value="1d">1D</option>
                <option value="1wk">1W</option>
                <option value="1mo">1M</option>
                <option value="3mo">3M</option>
                <option value="6mo">6M</option>
                <option value="1y">1Y</option>
                <option value="5y">5Y</option>
              </select>
            </div>

            <div className="mb-8 mt-3" style={{ height: "400px" }}>
              <StockChart chartData={chartData} />
            </div>
            <hr />
            <div>
              <TradingArea
                currentPrice={currentPrice}
                topups={topups}
                orderHistoryData={orderHistory}
                openOrdersData={openOrders}
                selectToken={selectToken.toUpperCase()}
                investedTotal={investedTotal}
              />
            </div>
            <div>
              <CryptoTradingHorizontalMarketBar />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StockTradingPage;
