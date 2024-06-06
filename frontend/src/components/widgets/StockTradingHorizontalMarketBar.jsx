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
    msft: {
      price: 0,
      priceChange: 0,
    },
    nvda: {
      price: 0,
      priceChange: 0,
    },
    googl: {
      price: 0,
      priceChange: 0,
    },
    amzn: {
      price: 0,
      priceChange: 0,
    },
    meta: {
      price: 0,
      priceChange: 0,
    },
    tsla: {
      price: 0,
      priceChange: 0,
    },
    pypl: {
      price: 0,
      priceChange: 0,
    },
    intc: {
      price: 0,
      priceChange: 0,
    },
  });

  useEffect(() => {
    if (generalData) {
      setStocksData(generalData);
    }

    const fetchData = async (stock) => {
      try {
        const response = await axios.get(
          `https://coinsense-mix7.onrender.com/stock-data`,
          {
            params: {
              symbol: stock,
              range: "1y",
              interval: tradingInterval,
            },
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

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
      const msftPrice = await fetchData("MSFT");
      const nvdaPrice = await fetchData("NVDA");
      const googlPrice = await fetchData("GOOGL");
      const amznPrice = await fetchData("AMZN");
      const metaPrice = await fetchData("META");
      const tslaPrice = await fetchData("TSLA");
      const pyplPrice = await fetchData("PYPL");
      const intcPrice = await fetchData("INTC");

      // Update state using the setter function returned by setCoinDetails
      setStocksDetails((prevState) => ({
        ...prevState,
        aapl: {
          ...prevState.aapl,
          price: aaplPrice,
        },
        msft: {
          ...prevState.msft,
          price: msftPrice,
        },
        nvda: {
          ...prevState.nvda,
          price: nvdaPrice,
        },
        googl: {
          ...prevState.googl,
          price: googlPrice,
        },
        amzn: {
          ...prevState.amzn,
          price: amznPrice,
        },
        meta: {
          ...prevState.meta,
          price: metaPrice,
        },
        tsla: {
          ...prevState.tsla,
          price: tslaPrice,
        },
        pypl: {
          ...prevState.pypl,
          price: pyplPrice,
        },
        intc: {
          ...prevState.intc,
          price: intcPrice,
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

  console.log();

  return (
    <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row justify-between px-4 lg:px-10 py-4 mb-10 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
      <div className="lg:w-[30%] flex flex-row justify-between lg:flex-col gap-4 text-[10px] lg:text-sm font-medium">
        {stocksData[0] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={stocksData[0].logo}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(stocksDetails.aapl.price))}
            </p>
            <p
              className={
                parseFloat(stocksDetails.aapl.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(stocksDetails.aapl.priceChange)}%
            </p>
          </div>
        )}
        {stocksData[1] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={stocksData[1].logo}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(stocksDetails.msft.price))}
            </p>
            <p
              className={
                parseFloat(stocksDetails.msft.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(stocksDetails.msft.priceChange)}%
            </p>
          </div>
        )}
        {stocksData[2] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={stocksData[2].logo}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(stocksDetails.nvda.price))}
            </p>
            <p
              className={
                parseFloat(stocksDetails.nvda.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(stocksDetails.nvda.priceChange)}%
            </p>
          </div>
        )}
      </div>
      <div className="hidden lg:block border-r-[1px] border-gray-300 w-[2px]"></div>
      <div className="block lg:hidden border-t-[1px] border-gray-200 w-[100%]"></div>
      <div className="lg:w-[30%] flex flex-row justify-between lg:flex-col gap-4 text-[10px] lg:text-sm font-medium">
        {stocksData[3] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={stocksData[3].logo}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(stocksDetails.googl.price))}
            </p>
            <p
              className={
                parseFloat(stocksDetails.googl.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(stocksDetails.googl.priceChange)}%
            </p>
          </div>
        )}
        {stocksData[4] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={stocksData[4].logo}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(stocksDetails.amzn.price))}
            </p>
            <p
              className={
                parseFloat(stocksDetails.amzn.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(stocksDetails.amzn.priceChange)}%
            </p>
          </div>
        )}
        {stocksData[5] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={stocksData[5].logo}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(stocksDetails.meta.price))}
            </p>
            <p
              className={
                parseFloat(stocksDetails.meta.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(stocksDetails.meta.priceChange)}%
            </p>
          </div>
        )}
      </div>
      <div className="hidden lg:block border-r-[1px] border-gray-300 w-[2px]"></div>
      <div className="block lg:hidden border-t-[1px] border-gray-200 w-[100%]"></div>
      <div className="lg:w-[30%] flex flex-row justify-between lg:flex-col gap-4 text-[10px] lg:text-sm font-medium">
        {stocksData[6] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={stocksData[6].logo}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(stocksDetails.tsla.price))}
            </p>
            <p
              className={
                parseFloat(stocksDetails.tsla.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(stocksDetails.tsla.priceChange)}%
            </p>
          </div>
        )}
        {stocksData[7] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={stocksData[7].logo}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(stocksDetails.pypl.price))}
            </p>
            <p
              className={
                parseFloat(stocksDetails.pypl.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(stocksDetails.pypl.priceChange)}%
            </p>
          </div>
        )}
        {stocksData[8] && (
          <div className="flex flex-row items-center gap-1 justify-between">
            <img
              src={stocksData[8].logo}
              alt=""
              className="w-4 h-4 lg:w-7 lg:h-7 rounded-full"
            />
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(parseFloat(stocksDetails.intc.price))}
            </p>
            <p
              className={
                parseFloat(stocksDetails.intc.priceChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {parseFloat(stocksDetails.intc.priceChange)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockTradingHorizontalMarketBar;
