import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./DataLineWidget.module.css"; // Import the CSS module for styling

const DataLineWidget = () => {
  const [cryptoData, setCryptoData] = useState([
    { name: "BTCUSDT", price: "--", priceChange: "--" },
    { name: "ETHUSDT", price: "--", priceChange: "--" },
    { name: "BNBUSDT", price: "--", priceChange: "--" },
    { name: "SOLUSDT", price: "--", priceChange: "--" },
    { name: "USDCUSDT", price: "--", priceChange: "--" },
    { name: "XRPUSDT", price: "--", priceChange: "--" },
    { name: "DOGEUSDT", price: "--", priceChange: "--" },
    { name: "ADAUSDT", price: "--", priceChange: "--" },
    { name: "SHIBUSDT", price: "--", priceChange: "--" },
  ]);

  useEffect(() => {
    const fetchData = async (crypto) => {
      try {
        const response = await axios.get(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${crypto}`
        );

        const data = response.data;
        const currentPrice = parseFloat(data.lastPrice);
        const priceChangePercent = parseFloat(data.priceChangePercent);

        return {
          name: crypto,
          price: currentPrice.toFixed(2),
          priceChange: priceChangePercent.toFixed(2),
        };
      } catch (error) {
        console.error("Error fetching data: ", error);
        return null;
      }
    };

    const fetchDataAndUpdateState = async () => {
      const btcData = await fetchData("BTCUSDT");
      const ethData = await fetchData("ETHUSDT");
      const bnbData = await fetchData("BNBUSDT");
      const solData = await fetchData("SOLUSDT");
      const usdcData = await fetchData("USDCUSDT");
      const xrpData = await fetchData("XRPUSDT");
      const dogeData = await fetchData("DOGEUSDT");
      const adaData = await fetchData("ADAUSDT");
      const shibData = await fetchData("SHIBUSDT");

      setCryptoData([
        btcData,
        ethData,
        bnbData,
        solData,
        usdcData,
        xrpData,
        dogeData,
        adaData,
        shibData,
        // Adding an extra copy of data for marquee repeat
        btcData,
        ethData,
        bnbData,
        solData,
        usdcData,
        xrpData,
        dogeData,
        adaData,
        shibData,
      ]);
    };

    fetchDataAndUpdateState(); // Fetch data initially
  }, []);

  return (
    <div
      className={`${styles.container} lg:rounded-2xl border lg:shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow`}
    >
      <div className={`${styles.marquee}`}>
        {cryptoData.map((crypto, index) => (
          <div key={index} className={styles.cryptoItem}>
            {crypto && (
              <span>
                {crypto.name}
                <span
                  className={`${
                    parseFloat(crypto.priceChange) >= 0
                      ? styles.textGreen
                      : styles.textRed
                  } mx-2`}
                >
                  {crypto.priceChange}%
                </span>{" "}
                {crypto.price}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataLineWidget;
