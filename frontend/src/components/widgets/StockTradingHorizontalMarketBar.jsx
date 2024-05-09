import React, { useEffect, useState } from "react";
import axios from "axios";

const StockTradingHorizontalMarketBar = ({ generalData, tradingInterval }) => {
  const { ...userInfo } = JSON.parse(localStorage.getItem("user"));
  const [stocksData, setStocksData] = useState([]);
  const [stocksDetails, setStocksDetails] = useState({
    aapl: {
      price: 0,
      priceChange: 0,
    },
  });

  //console.log(coinDetails);

  useEffect(() => {
    if (generalData) {
      setStocksData(generalData);
    }

    const fetchData = async (stock) => {
      try {
        const response = await axios.get(`http://localhost:4000/stock-data`, {
          params: {
            symbol: stock,
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
        // Dynamically select the property to update based on the stocks parameter
        setStocksDetails((prevState) => ({
          ...prevState,
          [stock.toLowerCase()]: {
            ...prevState[stock.toLowerCase()],
            priceChange: changePercentage,
          },
        }));

        return currentPrice; // Return the current price
      } catch (error) {
        console.error("Error fetching data: ", error);
        return 0; // Return 0 in case of an error
      }
    };

    // Fetch data for BTC and SOL and set the state variables accordingly
    const fetchDataAndUpdateState = async () => {
      const aaplPrice = await fetchData("AAPL");

      // Update state using the setter function returned by setCoinDetails
      setStocksDetails((prevState) => ({
        ...prevState,
        aapl: {
          ...prevState.aapl,
          price: aaplPrice,
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
  }, [generalData]);

  if (stocksData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row justify-between px-10 py-4 mb-10 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
      <div className="w-[30%] flex flex-col gap-4 text-sm font-medium"></div>
      <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
      <div className="w-[30%] flex flex-col gap-4 text-sm font-medium"></div>
      <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
      <div className="w-[30%] flex flex-col gap-4 text-sm font-medium"></div>
    </div>
  );
};

export default StockTradingHorizontalMarketBar;
