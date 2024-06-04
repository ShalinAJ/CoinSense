import { Link, useLoaderData, useNavigate } from "react-router-dom";
import CryptoChart from "../charts/CryptoChart";
import { useEffect, useState } from "react";
import axios from "axios";
import TradingArea from "../components/trading/TradingArea";
import TradeSelect from "../components/trading/TradeSelect";
import backArrow from "../assets/back-arrow.png";
import TradeLiveDataBar from "../components/trading/crypto/CryptoTradeLiveDataBar";
import CryptoTradingHorizontalMarketBar from "../components/widgets/CryptoTradingHorizontalMarketBar";
import CryptoInfoPanel from "../components/trading/crypto/CryptoInfoPanel";
import FadeIn from "../components/animations/FadeIn";
import RightSlide from "../components/animations/RightSlide";

const CryptoTradingPage = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({
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

  const { topups, orderHistory } = useLoaderData();
  const { openOrders } = useLoaderData();
  const { ...userInfo } = JSON.parse(localStorage.getItem("user"));
  const [currentPrice, setCurrentPrice] = useState(0);
  const [investedTotal, setInvestedTotal] = useState(0);
  const [tokenDataSet, setTokenDataSet] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [tradingInterval, setTradingInterval] = useState("1m");
  const [modalOpen, setModalOpen] = useState(false);
  const [generalData, setGeneralData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectToken, setSelectToken] = useState([
    "BTC",
    "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
  ]);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    async function orderHistoryDataHandler() {
      const orderHistoryData = await orderHistory;

      let totalAmount = 0;

      if (Array.isArray(orderHistoryData)) {
        let filteredOrders = orderHistoryData.filter(
          (order) => order.status === "Crypto"
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

    async function openOrdersDataHandler() {
      const openOrdersData = await openOrders;
    }

    openOrdersDataHandler();

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://coinsense-mix7.onrender.com/crypto/general",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        const cryptoDetails = await response.json();

        setGeneralData(cryptoDetails);
      } catch (error) {
        console.error("Error fetching crypto data: ", error);
      }

      try {
        const response = await axios.get(
          `https://api.binance.com/api/v3/klines?symbol=${selectToken[0].toUpperCase()}USDT&interval=${tradingInterval}`
        );

        const dataBarResponse = await axios.get(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${selectToken[0].toUpperCase()}USDT`
        );

        let dates = [];

        if (tradingInterval === "1d") {
          dates = response.data.map((item) =>
            new Date(item[0]).toLocaleDateString()
          );
        } else if (tradingInterval === "4h") {
          dates = response.data.map((item) =>
            new Date(item[0]).toLocaleDateString()
          );
        } else {
          dates = response.data.map((item) =>
            new Date(item[0]).toLocaleTimeString()
          );
        }

        const data = response.data;
        const barData = dataBarResponse.data;
        const labels = dates;
        const prices = data.map((item) => parseFloat(item[4]));

        const currentPrice = parseFloat(barData.lastPrice);
        const priceChange = parseFloat(barData.priceChange);
        const priceChangePercent = parseFloat(barData.priceChangePercent);
        const high24h = parseFloat(barData.highPrice);
        const low24h = parseFloat(barData.lowPrice);

        let volume24hBTC = parseFloat(barData.volume);
        let volume24hUSDT = parseFloat(barData.quoteVolume);

        volume24hBTC = volume24hBTC.toFixed(2);
        volume24hUSDT = volume24hUSDT.toFixed(2);

        setTokenDataSet([
          currentPrice.toFixed(2),
          priceChange.toFixed(2),
          priceChangePercent.toFixed(2),
          high24h.toFixed(2),
          low24h.toFixed(2),
          volume24hBTC,
          volume24hUSDT,
        ]);
        setCurrentPrice(currentPrice.toFixed(2));

        const currentTime = new Date().toLocaleTimeString();
        if (!labels.includes(currentTime)) {
          labels.push(currentTime);
          prices.push(currentPrice);
        }

        setChartData({
          labels,
          datasets: [
            {
              label: "Bitcoin Price",
              data: prices,
              fill: true,
              borderColor: "#152dffa1",
              backgroundColor: "transparent",
              tension: 0.1,
              pointRadius: 2,
              pointHoverRadius: 2,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Bitcoin data: ", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, [tradingInterval, selectToken]);

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
    setSelectToken([token.symbol, token.image]);
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
          orderType="Crypto"
        />
      )}
      <div className="lg:w-[80%] h-[max-content] bg-white">
        <div className="flex flex-col lg:flex-row text-center lg:text-left items-center lg:items-start justify-between px-[10px] lg:px-[28px] pt-[29px] lg:pt-[45px] pb-6 lg:pb-10">
          <div>
            <FadeIn>
              <Link onClick={prevPage} className="ml-32 lg:ml-0 p-0 m-0 w-4">
                <img src={backArrow} alt="" />
              </Link>
              <h2 className="text-lg lg:text-2xl font-bold">Crypto Trading</h2>
              <p className="text-xs lg:text-sm lg:pt-2 font-light">
                Trade and view realtime data of Crypto Currencies
              </p>
            </FadeIn>
          </div>
          <RightSlide>
            <div className="flex flex-row items-center mt-2 lg:mt-0 border shadow-sm lg:shadow-md rounded-full gap-3">
              <div className="flex flex-row gap-2 text-xs font-semibold pl-6">
                <p>Crypto invested :</p>
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
            <TradeLiveDataBar
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
                onChange={() => {
                  setTradingInterval(event.target.value);
                }}
                defaultValue={tradingInterval}
                className="bg-transparent mr-5 border-2 text-gray-500 border-gray-300 rounded-2xl p-1 px-2 text-xs font-medium hover:cursor-pointer"
              >
                <option value="1s">1s</option>
                <option value="1m">1m</option>
                <option value="5m">5m</option>
                <option value="1h">1h</option>
                <option value="4h">4h</option>
                <option value="1d">1d</option>
              </select>
            </div>

            <div className="mb-8 mt-3" style={{ height: "auto" }}>
              <CryptoChart size={screenSize} chartData={chartData} />
            </div>
          </FadeIn>
          <hr />
          <FadeIn>
            <div>
              <TradingArea
                currentPrice={currentPrice}
                topups={topups}
                orderHistoryData={orderHistory}
                openOrdersData={openOrders}
                selectToken={selectToken[0].toUpperCase()}
                investedTotal={investedTotal}
                orderType={"Crypto"}
              />
            </div>
            <div>
              <CryptoInfoPanel
                generalData={generalData}
                selectToken={selectToken[0]}
              />
            </div>
          </FadeIn>
          <RightSlide>
            <CryptoTradingHorizontalMarketBar />
          </RightSlide>
        </div>
      </div>
    </>
  );
};

export default CryptoTradingPage;
