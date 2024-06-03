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
    <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row justify-between px-4 lg:px-10 py-4 mb-10 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
      <div className="lg:w-[30%] flex flex-row justify-between lg:flex-col gap-4 text-[10px] lg:text-sm font-medium">
        {cryptoData[0] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={cryptoData[0].image}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(coinDetails.btcusdt.price))}
            </p>
            <p
              className={
                parseFloat(coinDetails.btcusdt.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(coinDetails.btcusdt.priceChange)}%
            </p>
          </div>
        )}
        {cryptoData[1] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={cryptoData[1].image}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(coinDetails.ethusdt.price))}
            </p>
            <p
              className={
                parseFloat(coinDetails.ethusdt.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(coinDetails.ethusdt.priceChange)}%
            </p>
          </div>
        )}
        {cryptoData[2] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={cryptoData[2].image}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(coinDetails.bnbusdt.price))}
            </p>
            <p
              className={
                parseFloat(coinDetails.bnbusdt.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(coinDetails.bnbusdt.priceChange)}%
            </p>
          </div>
        )}
      </div>
      <div className="hidden lg:block border-r-[1px] border-gray-300 w-[2px]"></div>
      <div className="block lg:hidden border-t-[1px] border-gray-200 w-[100%]"></div>
      <div className="lg:w-[30%] flex flex-row justify-between lg:flex-col gap-4 text-[10px] lg:text-sm font-medium">
        {cryptoData[3] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={cryptoData[3].image}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(coinDetails.solusdt.price))}
            </p>
            <p
              className={
                parseFloat(coinDetails.solusdt.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(coinDetails.solusdt.priceChange)}%
            </p>
          </div>
        )}
        {cryptoData[4] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={cryptoData[4].image}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(coinDetails.usdcusdt.price))}
            </p>
            <p
              className={
                parseFloat(coinDetails.usdcusdt.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(coinDetails.usdcusdt.priceChange)}%
            </p>
          </div>
        )}
        {cryptoData[5] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={cryptoData[5].image}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(coinDetails.xrpusdt.price))}
            </p>
            <p
              className={
                parseFloat(coinDetails.xrpusdt.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(coinDetails.xrpusdt.priceChange)}%
            </p>
          </div>
        )}
      </div>
      <div className="hidden lg:block border-r-[1px] border-gray-300 w-[2px]"></div>
      <div className="block lg:hidden border-t-[1px] border-gray-200 w-[100%]"></div>
      <div className="lg:w-[30%] flex flex-row justify-between lg:flex-col gap-4 text-[10px] lg:text-sm font-medium">
        {cryptoData[6] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={cryptoData[6].image}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(coinDetails.dogeusdt.price))}
            </p>
            <p
              className={
                parseFloat(coinDetails.dogeusdt.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(coinDetails.dogeusdt.priceChange)}%
            </p>
          </div>
        )}
        {cryptoData[7] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={cryptoData[7].image}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(coinDetails.adausdt.price))}
            </p>
            <p
              className={
                parseFloat(coinDetails.adausdt.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(coinDetails.adausdt.priceChange)}%
            </p>
          </div>
        )}
        {cryptoData[8] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={cryptoData[8].image}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(coinDetails.shibusdt.price))}
            </p>
            <p
              className={
                parseFloat(coinDetails.shibusdt.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(coinDetails.shibusdt.priceChange)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoTradingHorizontalMarketBar;
