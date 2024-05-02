import React, { useEffect, useState } from "react";
import axios from "axios";

const HorizontalMarketBar = () => {
  const { ...userInfo } = JSON.parse(localStorage.getItem("user"));
  const [cryptoData, setCryptoData] = useState([]);
  const [btcPrice, setBtcPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [tusdPrice, setTusdPrice] = useState(0);
  const [btcPriceChange, setBtcPriceChange] = useState(0);
  const [ethPriceChange, setEthPriceChange] = useState(0);
  const [tusdPriceChange, setTusdPriceChange] = useState(0);

  useEffect(() => {
    const getCryptoGeneralData = async () => {
      try {
        const response = await fetch("http://localhost:4000/crypto/general", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        const cryptoDetails = await response.json();
        setCryptoData(cryptoDetails);
      } catch (error) {
        console.error("Error fetching crypto data: ", error);
      }
    };
    getCryptoGeneralData();

    const fetchData = async (crypto) => {
      try {
        const response = await axios.get(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${crypto}`
        );

        const data = response.data;
        const currentPrice = parseFloat(data.lastPrice);
        const priceChangePercent = parseFloat(data.priceChangePercent);
        if (crypto == "BTCUSDT") {
          setBtcPriceChange(priceChangePercent.toFixed(2));
        } else if (crypto == "ETHUSDT") {
          setEthPriceChange(priceChangePercent.toFixed(2));
        } else if (crypto == "BNBUSDT") {
          setTusdPriceChange(priceChangePercent.toFixed(2));
        }
        return currentPrice.toFixed(2); // Return the current price
      } catch (error) {
        console.error("Error fetching Bitcoin data: ", error);
        return 0; // Return 0 in case of an error
      }
    };

    // Fetch data for BTC and SOL and set the state variables accordingly
    const fetchDataAndUpdateState = async () => {
      const btcPrice = await fetchData("BTCUSDT");
      const ethPrice = await fetchData("ETHUSDT");
      const tusdPrice = await fetchData("BNBUSDT");
      setBtcPrice(btcPrice);
      setEthPrice(ethPrice);
      setTusdPrice(tusdPrice);
    };

    fetchDataAndUpdateState(); // Fetch data initially

    const interval = setInterval(() => {
      fetchDataAndUpdateState();
    }, 3000);

    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (cryptoData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row justify-between px-10 py-4 mb-10 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
      <div className="w-[30%] flex flex-col gap-4 text-sm font-medium">
        {cryptoData[0] && (
          <div className="flex flex-row items-center justify-between">
            <img
              src={cryptoData[0].image}
              alt=""
              className="w-7 h-7 rounded-full"
            />
            <p>{btcPrice}</p>
            <p
              className={
                btcPriceChange >= 0 ? "text-green-600" : "text-red-600"
              }
            >
              {btcPriceChange}%
            </p>
          </div>
        )}
        {cryptoData[1] && (
          <div className="flex flex-row items-center justify-between">
            <img
              src={cryptoData[1].image}
              alt=""
              className="w-7 h-7 rounded-full"
            />
            <p>{ethPrice}</p>
            <p
              className={
                ethPriceChange >= 0 ? "text-green-600" : "text-red-600"
              }
            >
              {ethPriceChange}%
            </p>
          </div>
        )}
        {cryptoData[2] && (
          <div className="flex flex-row items-center justify-between">
            <img
              src={cryptoData[2].image}
              alt=""
              className="w-7 h-7 rounded-full"
            />
            <p>{tusdPrice}</p>
            <p
              className={
                tusdPriceChange >= 0 ? "text-green-600" : "text-red-600"
              }
            >
              {tusdPriceChange}%
            </p>
          </div>
        )}
      </div>
      <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
      <div className="w-[30%] flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <img
            src="https://en.wikipedia.org/wiki/File:Bitcoin.svg"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">$60,000.00</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <img
            src="https://en.wikipedia.org/wiki/File:Bitcoin.svg"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">$60,000.00</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <img
            src="https://en.wikipedia.org/wiki/File:Bitcoin.svg"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">$60,000.00</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
      </div>
      <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
      <div className="w-[30%] flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <img
            src="https://en.wikipedia.org/wiki/File:Bitcoin.svg"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">$60,000.00</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <img
            src="https://en.wikipedia.org/wiki/File:Bitcoin.svg"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">$60,000.00</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <img
            src="https://en.wikipedia.org/wiki/File:Bitcoin.svg"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">$60,000.00</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
      </div>
    </div>
  );
};

export default HorizontalMarketBar;
