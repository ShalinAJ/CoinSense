import React, { Suspense, useEffect, useState } from "react";
import { Link, NavLink, useLoaderData, useNavigate } from "react-router-dom";
import backArrow from "../assets/back-arrow.png";
import InvestmentsTable from "../components/InvestmentsTable.jsx";
import classes from "./AllInvestments.module.css";
import FadeIn from "../components/animations/FadeIn.jsx";
import RightSlide from "../components/animations/RightSlide.jsx";
import Spring from "../components/animations/Spring.jsx";

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
      <div className="lg:w-[80%] h-[max-content] bg-white">
        <div className="flex flex-col lg:flex-row text-center lg:text-left items-center lg:items-start justify-between px-[10px] lg:px-[28px] pt-[29px]">
          <div>
            <FadeIn>
              <Link onClick={prevPage} className="ml-28 lg:ml-0 p-0 m-0 w-4">
                <img src={backArrow} alt="" />
              </Link>
              <h2 className="text-lg lg:text-2xl font-bold">Investment Data</h2>
              <p className="text-xs lg:text-sm lg:pt-2 font-light">
                Detailed view of all investment transactions
              </p>
            </FadeIn>
          </div>
          <RightSlide>
            <div className="bg-[#bcffde] text-[#02B15A] rounded-lg flex flex-row justify-center mt-2 lg:mt-0 py-2 px-4 lg:mr-3 text-xs lg:text-[13px]">
              <p className="text-black pr-1 lg:pr-2">Investment count: </p>
              <p className="font-semibold">{tradeCount}</p>
            </div>
          </RightSlide>
        </div>
        <div className=" px-[10px] lg:px-[28px] flex justify-center lg:mt-1 lg:mb-3">
          <div className="flex flex-col justify-center items-center mt-5 mb-8 lg:my-10">
            <p className="text-xs lg:ext-sm lg:font-medium text-gray-400">
              <FadeIn>Total Invested</FadeIn>
            </p>
            <p className="text-lg lg:text-[28px] font-bold pb-1 lg:pb-2">
              <FadeIn>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(tradeTotal)}
              </FadeIn>
            </p>
            <div className="flex flex-row gap-2">
              <Spring>
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
              </Spring>
              <Spring>
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
              </Spring>
              <Spring>
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
              </Spring>
            </div>
          </div>
        </div>
        <hr className="mx-2 lg:mx-6" />
        <div className="px-[10px] lg:pl-[28px] py-2 lg:py-6">
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
