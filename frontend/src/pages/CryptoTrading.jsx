import { Link, useNavigate } from "react-router-dom";
import tempLine from "../assets/temp-line.png";
import CryptoChart from "../charts/CryptoChart";
import { useEffect, useState } from "react";
import axios from "axios";
import HorizontalMarketBar from "../components/widgets/HorizontalMarketBar";
import TradingArea from "../components/trading/TradingArea";
import TradeSelect from "../components/trading/TradeSelect";
import downArrow from "../assets/down-arrow.png";
import backArrow from "../assets/back-arrow.png";

const BitcoinChart = () => {
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

  const { ...userInfo } = JSON.parse(localStorage.getItem("user"));
  const [currentPrice, setCurrentPrice] = useState(0);
  const [tokenDataSet, setTokenDataSet] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [tradingInterval, setTradingInterval] = useState("1m");
  const [modalOpen, setModalOpen] = useState(false);
  const [generalData, setGeneralData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectToken, setSelectToken] = useState([
    "BTC",
    "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/crypto/general", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

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
              pointRadius: 1,
              pointHoverRadius: 0,
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

  const tokenHandler = (token) => {
    setSelectToken([token.symbol, token.image]);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <>
      {!loading && (
        <TradeSelect
          isOpen={modalOpen}
          onClose={closeModal}
          cryptoData={generalData}
          tokenHandler={tokenHandler}
        />
      )}

      <div className="w-[80%] h-[max-content] bg-white">
        <div className="flex items-start justify-between px-[28px] pt-[45px] pb-10">
          <div>
            <Link onClick={prevPage} className="p-0 m-0 w-4">
              <img src={backArrow} alt="" />
            </Link>
            <h2 className="text-2xl font-bold">Crypto Trading</h2>
            <p className="text-sm pt-2 font-light">
              Trade and view realtime data of Crypto Currencies
            </p>
          </div>
          <div className="flex flex-row items-center border shadow-md rounded-full gap-3">
            <p className="text-xs font-semibold pl-6">
              Crypto invested: $12,000.00
            </p>
            <Link className="text-xs m-3 px-3 py-1 text-white bg-coinsense-blue rounded-full">
              View more
            </Link>
          </div>
        </div>
        <div className="px-[28px] ">
          <div className="flex flex-row gap-4 border shadow-lg shadow-grey-500/40 p-5 justify-stretch rounded-3xl">
            <div className="w-[35%] flex flex-row items-center gap-4">
              <button
                onClick={openModal}
                className="w-full flex flex-row justify-between items-center text-sm font-semibold bg-transparent text-black border-1 border-gray-300"
              >
                <p className="flex flex-row gap-3">
                  <img src={selectToken[1]} alt="" className="w-5" />
                  {selectToken[0].toUpperCase()}
                </p>
                <img src={downArrow} alt="" className="w-5" />
              </button>
              <div className="w-[40%] flex flex-row justify-center">
                <img src={tempLine} alt="" className="w-[80%] h-5" />
              </div>
            </div>
            <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
            <div className="w-[65%] flex flex-row items-center text-xs font-semibold gap-5 justify-between">
              <p className="">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(tokenDataSet[0])}
              </p>
              <div className="flex flex-col justify-center items-center">
                <p className="text-[10px]">24h Change</p>
                <div className="flex flex-row gap-2">
                  {" "}
                  <p
                    className={
                      tokenDataSet[1] >= 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(tokenDataSet[1])}
                  </p>
                  <p
                    className={
                      tokenDataSet[2] >= 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {tokenDataSet[2]}%
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-[2.8px]">
                <p className="text-[10px]">24h High</p>
                <p className="font-normal">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(tokenDataSet[3])}
                </p>
              </div>
              <div className="flex flex-col  items-center gap-[2.8px]">
                <p className="text-[10px]">24h low</p>
                <p className="font-normal">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(tokenDataSet[4])}
                </p>
              </div>
              <div className="flex flex-col text-[11px] items-center gap-[2.8px]">
                <p className="text-[10px]">24h Volume(BTC)</p>
                <p className="font-normal">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(tokenDataSet[5])}
                </p>
              </div>
              <div className="flex flex-col text-[11px] items-center gap-[2.8px]">
                <p className="text-[10px]">24h Volume(USDT)</p>
                <p className="font-normal">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(tokenDataSet[6])}
                </p>
              </div>
            </div>
          </div>
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
            <CryptoChart chartData={chartData} />
          </div>
          <hr />
          <div>
            <TradingArea currentPrice={currentPrice} />
          </div>
          <div>
            <HorizontalMarketBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default BitcoinChart;
