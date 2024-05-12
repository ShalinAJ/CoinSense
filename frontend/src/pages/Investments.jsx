import { useLoaderData } from "react-router-dom";
import React, { useEffect, useState } from "react";
import UserInvestmentsWidget from "../components/widgets/UserInvestmentsWidget";
import UserMarketOptions from "../components/widgets/UserMarketOptions";
import CryptoChart from "../charts/CryptoChart";
import axios from "axios";

const InvestmentsPage = () => {
  const { orderHistory } = useLoaderData();
  const [tradeData, setTradeData] = useState([0, 0, 0]);
  const [recentInvestments, setRecentInvestments] = useState([]);
  const [investmentTotal, setInvestmentTotal] = useState(0);
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
          "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d"
        );
        const data = response.data;
        const labels = data.map((item) =>
          new Date(item[0]).toLocaleDateString()
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

  useEffect(() => {
    async function recentInvestmentChecker() {
      try {
        const orderData = await orderHistory;
        if (Array.isArray(orderData)) {
          const cryptoInvested = orderData.filter(
            (order) => order.status === "Crypto"
          );

          const cryptoInvestedTotal = cryptoInvested.reduce((acc, item) => {
            if (item.transactionType === "buy") {
              return acc + item.amount * item.price;
            } else if (item.transactionType === "sell") {
              return acc - item.amount * item.price;
            }
            return acc;
          }, 0);

          const stockInvested = orderData.filter(
            (order) => order.status === "Stock"
          );
          const stockInvestedTotal = stockInvested.reduce(
            (acc, curr) => acc + curr.amount * curr.price,
            0
          );

          const forexInvested = orderData.filter(
            (order) => order.status === "Forex"
          );
          const forexInvestedTotal = forexInvested.reduce(
            (acc, curr) => acc + curr.amount * curr.price,
            0
          );

          setTradeData([
            cryptoInvestedTotal,
            stockInvestedTotal,
            forexInvestedTotal,
          ]);

          setInvestmentTotal(
            cryptoInvestedTotal + stockInvestedTotal + forexInvested
          );
          setRecentInvestments(orderData);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    recentInvestmentChecker();
  }, [orderHistory]);

  return (
    <div className="w-[80%] h-[max-content] bg-white px-[28px] pt-[45px]">
      <div className="text-2xl font-bold">Investments</div>
      <p className="text-sm pt-2 font-light">
        Detailed view of your investments{" "}
      </p>
      <div className="flex flex-row justify-between pt-6 pb-10">
        <div className="w-[48.5%]">
          <UserInvestmentsWidget
            investmentTotal={investmentTotal}
            recentInvestments={recentInvestments}
          />
        </div>
        <div className="w-[48.5%]">
          <UserMarketOptions
            tradeData={tradeData}
            url={[
              "../investment/crypto-trading",
              "../investment/stock-trading",
              "../investment/forex-trading",
            ]}
          />
        </div>
      </div>
      <div className="px-8 pt-8 pb-6 mb-10 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
        <div>
          <div className="flex flex-row gap-3 pb-5 pl-1">
            <p className="text-base font-semibold">BTC/USD</p>
            <p className="text-base font-semibold text-[#02B15A]">+1.48%</p>
          </div>
          <CryptoChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default InvestmentsPage;
