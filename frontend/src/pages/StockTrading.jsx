import { Link, useLoaderData, useNavigate } from "react-router-dom";
import StockChart from "../charts/StockChart";
import { useEffect, useState } from "react";
import axios from "axios";
import TradingArea from "../components/trading/crypto/CryptoTradingArea";
import TradeSelect from "../components/trading/crypto/CryptoTradeSelect";
import backArrow from "../assets/back-arrow.png";
import TradeLiveDataBar from "../components/trading/crypto/CryptoTradeLiveDataBar";
import CryptoTradingHorizontalMarketBar from "../components/widgets/CryptoTradingHorizontalMarketBar";

const StockTradingPage = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Stock Price",
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

  const { topups, orderHistory } = useLoaderData();
  const { openOrders } = useLoaderData();
  const { ...userInfo } = JSON.parse(localStorage.getItem("user"));
  const [currentPrice, setCurrentPrice] = useState(0);
  const [investedTotal, setInvestedTotal] = useState(0);
  const [tokenDataSet, setTokenDataSet] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [tradingInterval, setTradingInterval] = useState("5m");
  const [modalOpen, setModalOpen] = useState(false);
  const [generalData, setGeneralData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectToken, setSelectToken] = useState("AAPL");

  useEffect(() => {
    async function orderHistoryDataHandler() {
      const orderHistoryData = await orderHistory;

      let totalAmount = 0;

      if (Array.isArray(orderHistoryData)) {
        orderHistoryData.forEach((item) => {
          if (item.transactionType === "buy") {
            totalAmount += item.amount * item.price;
          } else {
            totalAmount -= item.amount * item.price;
          }
        });
      }

      setInvestedTotal(totalAmount);
    }

    orderHistoryDataHandler();

    async function openOrdersDataHandler() {
      const openOrdersData = await openOrders;
    }

    openOrdersDataHandler();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/stock-data?symbol=${selectToken}&interval=${tradingInterval}`
        );

        const data = response.data.chart.result[0];

        const prices = data.indicators.quote[0].close;
        const timestamps = data.timestamp.map((timestamp) =>
          new Date(timestamp * 1000).toLocaleTimeString()
        );

        setChartData({
          labels: timestamps,
          datasets: [
            {
              label: `${selectToken} Price`,
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
        console.error("Error fetching stock data: ", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 300000); // Fetch data every 5 minutes

    return () => clearInterval(interval);
  }, [selectToken, tradingInterval]);

  const tokenHandler = (token) => {
    setSelectToken(token.symbol);
  };

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <>
      {!loading && (
        <TradeSelect
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
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
            <h2 className="text-2xl font-bold">Stock Trading</h2>
            <p className="text-sm pt-2 font-light">
              Trade and view realtime data of Stocks
            </p>
          </div>
          <div className="flex flex-row items-center border shadow-md rounded-full gap-3">
            <div className="flex flex-row gap-2 text-xs font-semibold pl-6">
              <p>Stock invested :</p>
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(Math.abs(investedTotal))}
              </p>
            </div>
            <Link
              to={"../user-investments"}
              className="text-xs m-3 px-3 py-1 text-white bg-coinsense-blue rounded-full"
            >
              View more
            </Link>
          </div>
        </div>
        <div className="px-[28px] ">
          <TradeLiveDataBar
            selectToken={selectToken}
            tokenDataSet={tokenDataSet}
            onOpen={() => setModalOpen(true)}
          />
          <div className="mb-8 mt-3" style={{ height: "auto" }}>
            <StockChart chartData={chartData} />
          </div>
          <hr />
          <div>
            <TradingArea
              currentPrice={currentPrice}
              topups={topups}
              orderHistoryData={orderHistory}
              openOrdersData={openOrders}
              selectToken={selectToken.toUpperCase()}
              investedTotal={investedTotal}
            />
          </div>
          <div>
            <CryptoTradingHorizontalMarketBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default StockTradingPage;
