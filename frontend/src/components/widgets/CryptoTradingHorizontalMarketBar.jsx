import React, { useEffect, useState } from "react";
import axios from "axios";

const CryptoTradingHorizontalMarketBar = () => {
  const { ...userInfo } = JSON.parse(localStorage.getItem("user"));
  const [cryptoData, setCryptoData] = useState([]);
  const [coinDetails, setCoinDetails] = useState({
    btcusdt: {
      price: 0,
      priceChange: 0,
    },
    ethusdt: {
      price: 0,
      priceChange: 0,
    },
    bnbusdt: {
      price: 0,
      priceChange: 0,
    },
    solusdt: {
      price: 0,
      priceChange: 0,
    },
    usdcusdt: {
      price: 0,
      priceChange: 0,
    },
    xrpusdt: {
      price: 0,
      priceChange: 0,
    },
    dogeusdt: {
      price: 0,
      priceChange: 0,
    },
    adausdt: {
      price: 0,
      priceChange: 0,
    },
    shibusdt: {
      price: 0,
      priceChange: 0,
    },
  });

  //console.log(coinDetails);

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

        // Dynamically select the property to update based on the crypto parameter
        setCoinDetails((prevState) => ({
          ...prevState,
          [crypto.toLowerCase()]: {
            ...prevState[crypto.toLowerCase()],
            priceChange: priceChangePercent.toFixed(2),
          },
        }));

        return currentPrice.toFixed(2); // Return the current price
      } catch (error) {
        console.error("Error fetching data: ", error);
        return 0; // Return 0 in case of an error
      }
    };

    // Fetch data for BTC and SOL and set the state variables accordingly
    const fetchDataAndUpdateState = async () => {
      const btcPrice = await fetchData("BTCUSDT");
      const ethPrice = await fetchData("ETHUSDT");
      const bnbPrice = await fetchData("BNBUSDT");
      const solPrice = await fetchData("SOLUSDT");
      const usdcPrice = await fetchData("USDCUSDT");
      const xrpPrice = await fetchData("XRPUSDT");
      const dogePrice = await fetchData("DOGEUSDT");
      const adaPrice = await fetchData("ADAUSDT"); //cardano
      const shibPrice = await fetchData("SHIBUSDT");

      // Update state using the setter function returned by setCoinDetails
      setCoinDetails((prevState) => ({
        ...prevState,
        btcusdt: {
          ...prevState.btcusdt,
          price: btcPrice,
        },
        ethusdt: {
          ...prevState.ethusdt,
          price: ethPrice,
        },
        bnbusdt: {
          ...prevState.bnbusdt,
          price: bnbPrice,
        },
        solusdt: {
          ...prevState.bnbusdt,
          price: solPrice,
        },
        usdcusdt: {
          ...prevState.bnbusdt,
          price: usdcPrice,
        },
        xrpusdt: {
          ...prevState.bnbusdt,
          price: xrpPrice,
        },
        dogeusdt: {
          ...prevState.bnbusdt,
          price: dogePrice,
        },
        adausdt: {
          ...prevState.bnbusdt,
          price: adaPrice,
        },
        shibusdt: {
          ...prevState.bnbusdt,
          price: shibPrice,
        },
      }));
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
            <p>{coinDetails.btcusdt.price}</p>
            <p
              className={
                coinDetails.btcusdt.priceChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {coinDetails.btcusdt.priceChange}%
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
            <p>{coinDetails.ethusdt.price}</p>
            <p
              className={
                coinDetails.ethusdt.priceChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {coinDetails.ethusdt.priceChange}%
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
            <p>{coinDetails.bnbusdt.price}</p>
            <p
              className={
                coinDetails.bnbusdt.priceChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {coinDetails.bnbusdt.priceChange}%
            </p>
          </div>
        )}
      </div>
      <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
      <div className="w-[30%] flex flex-col gap-4">
        {cryptoData[3] && (
          <div className="flex flex-row items-center justify-between">
            <img
              src={cryptoData[3].image}
              alt=""
              className="w-7 h-7 rounded-full"
            />
            <p>{coinDetails.solusdt.price}</p>
            <p
              className={
                coinDetails.solusdt.priceChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {coinDetails.solusdt.priceChange}%
            </p>
          </div>
        )}
        {cryptoData[4] && (
          <div className="flex flex-row items-center justify-between">
            <img
              src={cryptoData[4].image}
              alt=""
              className="w-7 h-7 rounded-full"
            />
            <p>{coinDetails.usdcusdt.price}</p>
            <p
              className={
                coinDetails.usdcusdt.priceChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {coinDetails.usdcusdt.priceChange}%
            </p>
          </div>
        )}
        {cryptoData[5] && (
          <div className="flex flex-row items-center justify-between">
            <img
              src={cryptoData[5].image}
              alt=""
              className="w-7 h-7 rounded-full"
            />
            <p>{coinDetails.xrpusdt.price}</p>
            <p
              className={
                coinDetails.xrpusdt.priceChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {coinDetails.xrpusdt.priceChange}%
            </p>
          </div>
        )}
      </div>
      <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
      <div className="w-[30%] flex flex-col gap-4">
        {cryptoData[6] && (
          <div className="flex flex-row items-center justify-between">
            <img
              src={cryptoData[6].image}
              alt=""
              className="w-7 h-7 rounded-full"
            />
            <p>{coinDetails.dogeusdt.price}</p>
            <p
              className={
                coinDetails.dogeusdt.priceChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {coinDetails.dogeusdt.priceChange}%
            </p>
          </div>
        )}
        {cryptoData[7] && (
          <div className="flex flex-row items-center justify-between">
            <img
              src={cryptoData[7].image}
              alt=""
              className="w-7 h-7 rounded-full"
            />
            <p>{coinDetails.adausdt.price}</p>
            <p
              className={
                coinDetails.adausdt.priceChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {coinDetails.adausdt.priceChange}%
            </p>
          </div>
        )}
        {cryptoData[8] && (
          <div className="flex flex-row items-center justify-between">
            <img
              src={cryptoData[8].image}
              alt=""
              className="w-7 h-7 rounded-full"
            />
            <p>{coinDetails.shibusdt.price}</p>
            <p
              className={
                coinDetails.shibusdt.priceChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {coinDetails.shibusdt.priceChange}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoTradingHorizontalMarketBar;
