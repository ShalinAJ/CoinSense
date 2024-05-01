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
        console.log(cryptoDetails);
        setCryptoData(cryptoDetails);
      } catch (error) {
        console.error("Error fetching crypto data: ", error);
      }
    };
    getCryptoGeneralData();

    const fetchData = async (crypto) => {
      try {
        const response = await axios.get(
          `https://api.binance.com/api/v3/klines?symbol=${crypto}&interval=1m`
        );

        const data = response.data;
        const latestData = data[data.length - 1];
        const currentPrice = parseFloat(latestData[4]);
        const priceChange = currentPrice - parseFloat(latestData[1]);
        const priceChangePercent = (priceChange / currentPrice) * 100;
        if (crypto == "BTCUSDT") {
          setBtcPriceChange(priceChangePercent.toFixed(2));
        } else if (crypto == "ETHUSDT") {
          setEthPriceChange(priceChangePercent.toFixed(2));
        } else if (crypto == "TUSDUSDT") {
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
      const tusdPrice = await fetchData("TUSDUSDT");
      setBtcPrice(btcPrice);
      setEthPrice(ethPrice);
      setTusdPrice(tusdPrice);
      setPriceChange(priceChangePercent.toFixed(2));
    };

    fetchDataAndUpdateState(); // Fetch data initially

    // Set intervals to fetch data periodically
    const btcInterval = setInterval(() => {
      fetchDataAndUpdateState(); // Fetch data for BTC and update state
    }, 1000);

    const ethInterval = setInterval(() => {
      fetchDataAndUpdateState(); // Fetch data for SOL and update state
    }, 1000);
    const tusdInterval = setInterval(() => {
      fetchDataAndUpdateState(); // Fetch data for SOL and update state
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(btcInterval);
      clearInterval(ethInterval);
      clearInterval(tusdInterval);
    };
  }, []);

  if (cryptoData.length === 0) {
    // Data is still loading, return a loading indicator or null
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row justify-between px-10 py-4 mb-10 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
      <div className="w-[30%] flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <img
            src={cryptoData[0].image}
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">{btcPrice}</p>
          <p
            className={btcPriceChange >= 0 ? "text-green-600" : "text-red-600"}
          >
            {btcPriceChange}%
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <img
            src={cryptoData[1].image}
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">{ethPrice}</p>
          <p
            className={ethPriceChange >= 0 ? "text-green-600" : "text-red-600"}
          >
            {ethPriceChange}%
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <img
            src={cryptoData[2].image}
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">{tusdPrice}</p>
          <p
            className={tusdPriceChange >= 0 ? "text-green-600" : "text-red-600"}
          >
            {tusdPriceChange}%
          </p>
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
