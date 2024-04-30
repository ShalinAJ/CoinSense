import { Link } from "react-router-dom";
import tempLine from "../assets/temp-line.png";
import CryptoChart from "../charts/CryptoChart";
import { useEffect, useState } from "react";
import axios from "axios";
import HorizontalMarketBar from "../components/widgets/HorizontalMarketBar";
import TradingArea from "../components/trading/TradingArea";

const BitcoinChart = () => {
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

  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [priceChangePercent, setPriceChangePercent] = useState(0);
  const [high24h, setHigh24h] = useState(0);
  const [low24h, setLow24h] = useState(0);
  const [volume24hBTC, setVolume24hBTC] = useState(0);
  const [volume24hUSDT, setVolume24hUSDT] = useState(0);
  const [tradingInterval, setTradingInterval] = useState("1m");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${tradingInterval}`
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
        const labels = dates;
        const prices = data.map((item) => parseFloat(item[4]));
        const latestData = data[data.length - 1];

        const currentPrice = parseFloat(latestData[4]);
        const priceChange = currentPrice - parseFloat(latestData[1]);
        const priceChangePercent = (priceChange / currentPrice) * 100;
        const high24h = parseFloat(latestData[2]);
        const low24h = parseFloat(latestData[3]);

        let volume24hBTC = 0;
        let volume24hUSDT = 0;
        for (let i = 0; i < data.length; i++) {
          volume24hBTC += parseFloat(data[i][5]);
          volume24hUSDT += parseFloat(data[i][7]);
        }

        volume24hUSDT = volume24hUSDT.toFixed(2);
        volume24hBTC = volume24hBTC.toFixed(2);

        setCurrentPrice(currentPrice.toFixed(2));
        setPriceChange(priceChange.toFixed(2));
        setPriceChangePercent(priceChangePercent.toFixed(2));
        setHigh24h(high24h.toFixed(2));
        setLow24h(low24h.toFixed(2));
        setVolume24hBTC(volume24hBTC);
        setVolume24hUSDT(volume24hUSDT);

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
      } catch (error) {
        console.error("Error fetching Bitcoin data: ", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, [tradingInterval]);

  return (
    <div className="w-[80%] h-[max-content] bg-white">
      <div className="flex items-start justify-between px-[28px] pt-[45px] pb-10">
        <div>
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
            <select
              name=""
              id=""
              defaultValue="Bitcoin"
              className="w-[60%] py-1 px-2 cursor-pointer text-sm bg-transparent border-2 text-gray-500 border-gray-300 rounded-2xl"
            >
              <option value="">Bitcoin</option>
            </select>
            <div className="w-[40%] flex flex-row justify-center">
              <img src={tempLine} alt="" className="w-[80%] h-5" />
            </div>
          </div>
          <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
          <div className="w-[65%] flex flex-row items-center text-xs font-semibold gap-5 justify-between">
            <p className="">${currentPrice}</p>
            <p className={priceChange >= 0 ? "text-green-600" : "text-red-600"}>
              ${priceChange}
            </p>
            <p
              className={
                priceChangePercent >= 0 ? "text-green-600" : "text-red-600"
              }
            >
              {priceChangePercent}%
            </p>
            <div className="flex flex-col items-center gap-[2.8px]">
              <p>24h High</p>
              <p className="font-normal">${high24h}</p>
            </div>
            <div className="flex flex-col items-center gap-[2.8px]r">
              <p>24h low</p>
              <p className="font-normal">${low24h}</p>
            </div>
            <div className="flex flex-col items-center gap-[2.8px]">
              <p>24h Volume(BTC)</p>
              <p className="font-normal">{volume24hBTC}</p>
            </div>
            <div className="flex flex-col items-center gap-[2.8px]">
              <p>24h Volume(USDT)</p>
              <p className="font-normal">${volume24hUSDT}</p>
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
  );
};

export default BitcoinChart;
