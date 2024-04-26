import { Link } from "react-router-dom";
import tempLine from "../assets/temp-line.png";
import CryptoChart from "../charts/CryptoChart";
import { useEffect, useState } from "react";
import axios from "axios";
import HorizontalMarketBar from "../components/widgets/HorizontalMarketBar";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m"
        );
        const data = response.data;
        const labels = data.map((item) =>
          new Date(item[0]).toLocaleTimeString()
        );
        const prices = data.map((item) => parseFloat(item[4]));

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
              pointRadius: 0,
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
  }, []);

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
              value="Bitcoin"
              className="w-[60%] py-1 px-2 cursor-pointer text-sm bg-transparent border-2 text-gray-500 border-gray-300 rounded-2xl"
            >
              <option value="">Bitcoin</option>
            </select>
            <div className="w-[40%] flex flex-row justify-center">
              <img src={tempLine} alt="" className="w-[80%] h-5" />
            </div>
          </div>
          <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
          <div className="w-[58%] flex flex-row items-center text-xs font-semibold gap-5 justify-between">
            <p className="">$58,000.00</p>
            <p className="bg-green-200 text-green-600 rounded-full px-2 py-1">
              +$1.23
            </p>
            <p className="bg-green-200 text-green-600 rounded-full px-2 py-1">
              1.2%
            </p>
            <div className="flex flex-col items-center gap-[2.8px]">
              <p>24h High</p>
              <p className="font-normal">$2,000.00</p>
            </div>
            <div className="flex flex-col items-center gap-[2.8px]r">
              <p>24h low</p>
              <p className="font-normal">$1,200.00</p>
            </div>
            <div className="flex flex-col items-center gap-[2.8px]">
              <p>24h Volume(BTC)</p>
              <p className="font-normal">$2,000.00</p>
            </div>
            <div className="flex flex-col items-center gap-[2.8px]">
              <p>24h Volume(USDT)</p>
              <p className="font-normal">$2,000.00</p>
            </div>
          </div>
          <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
          <div className="w-[7%]"></div>
        </div>
        <div className="my-8" style={{ height: "395px" }}>
          <CryptoChart chartData={chartData} />
        </div>
        <hr />
        <div className="py-10 flex flex-row justify-between">
          <div className="w-[48.5%] h-[23rem]">
            <p className="text-lg font-semibold  pb-3 pl-1">Make Trade</p>
            <div className="flex flex-row justify-between pb-7 text-xs">
              <div className="flex flex-row gap-3">
                <button className="rounded-full">Buy</button>
                <button className="rounded-full">Sell</button>
              </div>
              <div className="flex flex-row gap-3">
                <button className="rounded-full">Market</button>
                <button className="rounded-full">Limit</button>
              </div>
            </div>

            <form action="">
              <div className="flex flex-col pb-5">
                <label htmlFor="">Price (USDT)</label>
                <input type="text" />
              </div>
              <div className="flex flex-col pb-5">
                <label htmlFor="">Amount (BTC)</label>
                <input type="text" />
              </div>
              <div className="flex flex-row justify-between pb-5">
                <div>
                  <label htmlFor="" className="mr-3">
                    Payment Card
                  </label>
                  <select name="" id="">
                    <option value="">Card 1</option>
                  </select>
                </div>
                <div>Details</div>
              </div>
              <div className="flex flex-row justify-end">
                <button className="mt-8 py-1 px-3 w-[18%] text-sm items-end hover:bg-coinsense-blue-darker">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="w-[48.5%] h-[23rem] border rounded-3xl p-3">
            <div className="text-xs flex flex-row gap-3">
              <button className="rounded-full">Open Orders</button>
              <button className="rounded-full">Order History</button>
            </div>
            <div></div>
          </div>
        </div>
        <div>
          <HorizontalMarketBar />
        </div>
      </div>
    </div>
  );
};

export default BitcoinChart;
