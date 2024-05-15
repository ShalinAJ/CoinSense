import React, { Suspense, useEffect, useState } from "react";
import { Link, NavLink, useLoaderData, useNavigate } from "react-router-dom";
import backArrow from "../assets/back-arrow.png";
import InvestmentsTable from "../components/InvestmentsTable.jsx";
import classes from "./AllInvestments.module.css";

const AllInvestmentsPage = () => {
  const { orderHistory } = useLoaderData();
  const [tradeType, setTradeType] = useState("All");
  const [tradeData, setTradeData] = useState([]);
  const [tradeTotal, setTradeTotal] = useState(0);
  const [tradeCount, setTradeCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function orderHistoryhandler() {
      const orders = await orderHistory;

      let filteredOrders;
      let total = 0;
      let count = 0;

      if (tradeType === "All") {
        filteredOrders = orders;
      } else if (tradeType === "Crypto") {
        filteredOrders = orders.filter((order) => order.status === "Crypto");
      } else if (tradeType === "Stock") {
        filteredOrders = orders.filter((order) => order.status === "Stock");
      }

      count = filteredOrders.length;
      total = filteredOrders.reduce(
        (acc, curr) => acc + curr.amount * curr.price,
        0
      );
      setTradeData(filteredOrders);
      setTradeCount(count);
      setTradeTotal(total);
    }

    orderHistoryhandler();
  }, [orderHistory, tradeType]);

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="w-[80%] h-[max-content] bg-white">
        <div className="flex items-start justify-between px-[28px] pt-[29px]">
          <div>
            <Link onClick={prevPage} className="p-0 m-0 w-4">
              <img src={backArrow} alt="" />
            </Link>
            <h2 className="text-2xl font-bold">Investment Data</h2>
            <p className="text-sm pt-2 font-light">
              Detailed view of all investment transactions{" "}
            </p>
          </div>
          <div className="bg-[#bcffde] text-[#02B15A] rounded-lg flex flex-row justify-center py-2 px-4 mr-3 text-[13px]">
            <p className="text-black pr-2">Investment count: </p>
            <p className="font-semibold">{tradeCount}</p>
          </div>
        </div>
        <div className="flex justify-center mt-1 mb-3">
          <div className="flex flex-col justify-center items-center mt-10 mb-8 ">
            <p className="text-sm font-medium text-gray-400">Total Invested</p>
            <p className="text-[28px] font-bold pb-1">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(tradeTotal)}
            </p>
            <div className="flex flex-row gap-2">
              <NavLink
                className={`${classes.navLink} ${
                  tradeType === "All" ? classes.active : ""
                }`}
                onClick={() => {
                  setTradeType("All");
                }}
              >
                All
              </NavLink>
              <NavLink
                className={`${classes.navLink} ${
                  tradeType === "Crypto" ? classes.active : ""
                }`}
                onClick={() => {
                  setTradeType("Crypto");
                }}
              >
                Crypto
              </NavLink>
              <NavLink
                className={`${classes.navLink} ${
                  tradeType === "Stock" ? classes.active : ""
                }`}
                onClick={() => {
                  setTradeType("Stock");
                }}
              >
                Stock
              </NavLink>
            </div>
          </div>
        </div>
        <hr className="mx-6" />
        <div className=" pl-[28px] py-6">
          <Suspense
            fallback={<p className="text-sm font-medium">Loading...</p>}
          >
            <InvestmentsTable tradeData={tradeData} tradeType={tradeType} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AllInvestmentsPage;
