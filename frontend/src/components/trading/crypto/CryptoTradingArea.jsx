import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import TradingForm from "./CryptoTradingForm";
import classes from "./CryptoTradingArea.module.css";
import TradingOrderHistory from "./CryptoTradingOrderHistory";
import TradingOpenOrders from "./CryptoTradingOpenOrders";

const TradingArea = ({
  currentPrice,
  topups,
  orderHistoryData,
  openOrdersData,
  selectToken,
  investedTotal,
}) => {
  const [orderHistory, setOrderHistory] = useState("open-orders");
  const [tradeType, setTradeType] = useState("buy");
  const [tradeAmountType, setTradeAmountType] = useState("market");

  return (
    <div className="py-10 flex flex-row justify-between">
      <div className="w-[48.5%] h-[23rem]">
        <p className="text-lg font-semibold  pb-3 pl-1">Make Trade</p>
        <div className="flex flex-row justify-between pb-7 text-xs">
          <div className="flex flex-row gap-3">
            <NavLink
              className={`${classes.buy} ${
                tradeType === "buy" ? classes.buy_active : ""
              }`}
              onClick={() => setTradeType("buy")}
            >
              Buy
            </NavLink>
            <NavLink
              className={`${classes.sell} ${
                tradeType === "sell" ? classes.sell_active : ""
              }`}
              onClick={() => setTradeType("sell")}
            >
              Sell
            </NavLink>
          </div>
          <div className="flex flex-row gap-3">
            <NavLink
              className={`${classes.navLink} ${
                tradeAmountType === "market" ? classes.active : ""
              }`}
              onClick={() => setTradeAmountType("market")}
            >
              Market
            </NavLink>
            <NavLink
              className={`${classes.navLink} ${
                tradeAmountType === "limit" ? classes.active : ""
              }`}
              onClick={() => setTradeAmountType("limit")}
            >
              Limit
            </NavLink>
          </div>
        </div>
        <TradingForm
          currentPrice={currentPrice}
          tradeAmountType={tradeAmountType}
          transactionType={tradeType}
          topups={topups}
          selectToken={selectToken}
          investedTotal={investedTotal}
          orderHistoryData={orderHistoryData}
        />
      </div>
      <div className="w-[48.5%]">
        <div className="border rounded-3xl p-3 h-[23rem]">
          <div className="text-xs flex flex-row gap-3 trading">
            <NavLink
              className={`${classes.navLink} ${
                orderHistory === "open-orders" ? classes.active : ""
              }`}
              onClick={() => setOrderHistory("open-orders")}
            >
              Open Orders
            </NavLink>
            <NavLink
              className={`${classes.navLink} ${
                orderHistory === "order-history" ? classes.active : ""
              }`}
              onClick={() => setOrderHistory("order-history")}
            >
              Order History
            </NavLink>
          </div>
          <div>
            {orderHistory === "order-history" && (
              <TradingOrderHistory orderHistoryData={orderHistoryData} />
            )}
            {orderHistory === "open-orders" && (
              <TradingOpenOrders
                openOrdersData={openOrdersData}
                currentPriceData={currentPrice}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingArea;
