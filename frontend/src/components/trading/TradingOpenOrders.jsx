import React, { useEffect, useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import deleteImg from "../../assets/delete.png";
import FadeIn from "../animations/FadeIn";

const TradingOpenOrders = ({ openOrdersData, currentPriceData, orderType }) => {
  const [openOrders, setOpenOrders] = useState(null);

  useEffect(() => {
    async function fetchOrderHistoryData() {
      const data = await openOrdersData;
      if (Array.isArray(data)) {
        const filteredOrders = data.filter(
          (order) => order.status === orderType
        );
        setOpenOrders(filteredOrders);
      }
    }

    fetchOrderHistoryData();
  }, [openOrdersData, orderType]);

  async function getCurrentPrice(selectToken) {
    const dataBarResponse = await axios.get(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${selectToken.toUpperCase()}USDT`
    );

    const barData = dataBarResponse.data;
    const currentPrice = parseFloat(barData.lastPrice);
    return currentPrice;
  }

  async function buyCrypto(
    selectToken,
    transactionType,
    price,
    totalAmount,
    _id,
    processed,
    prevPrice
  ) {
    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = JSON.parse(localStorage.getItem("account")).user_id;

    if (!processed) {
      const response = await fetch(
        `https://coinsense-mix7.onrender.com/orderhistory/new`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: selectToken,
            transactionType,
            price,
            amount: totalAmount,
            status: "Crypto",
            prevPrice,
            user_id,
          }),
        }
      );

      if (!response.ok) {
        throw json({ message: "Could not save." }, { status: 500 });
      }

      const openOrder = await fetch(
        "https://coinsense-mix7.onrender.com/openorder/" + _id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!openOrder.ok) {
        throw json({ message: "Could not delete." }, { status: 500 });
      }
    } else {
      console.log("processed");
    }
  }

  useEffect(() => {
    async function processOpenOrders(openOrders) {
      if (Array.isArray(openOrders)) {
        for (const item of openOrders) {
          if (!item.processed) {
            try {
              const currentPrice = await getCurrentPrice(item.name);
              if (item.price >= currentPrice && item.price < item.prevPrice) {
                await buyCrypto(
                  item.name,
                  item.transactionType,
                  item.price,
                  item.amount,
                  item._id,
                  item.processed,
                  item.prevPrice
                );
                item.processed = true;
              } else if (
                item.price < currentPrice &&
                item.price > item.prevPrice
              ) {
                await buyCrypto(
                  item.name,
                  item.transactionType,
                  item.price,
                  item.amount,
                  item._id,
                  item.processed,
                  item.prevPrice
                );
                item.processed = true;
              }
            } catch (error) {
              console.error("Error:", error);
            }
          }
        }
      }
    }
    processOpenOrders(openOrders);
  }, [currentPriceData]);

  const deleteBtnHandler = async (_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const openOrder = await fetch(
      "https://coinsense-mix7.onrender.com/openorder/" + _id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!openOrder.ok) {
      throw json({ message: "Could not delete." }, { status: 500 });
    } else {
      location.reload();
    }
  };

  return (
    <div className="px-1 my-3">
      <hr />
      <div className="overflow-y-auto max-h-[12.5rem] lg:max-h-[18rem]">
        <table className="w-full">
          <tbody>
            <tr className="text-[10px] lg:text-sm leading-[25px]">
              <th className="text-left font-normal">
                <FadeIn>Token</FadeIn>
              </th>
              <th className="text-center font-normal">
                <FadeIn>Amount</FadeIn>
              </th>
              <th className="text-center font-normal">
                <FadeIn>Limit</FadeIn>
              </th>
              <th className="text-right font-normal pr-6">
                <FadeIn>Type</FadeIn>
              </th>
            </tr>

            {openOrders &&
              openOrders.map((order, index) => (
                <tr
                  key={index}
                  className="text-[10px] lg:text-xs font-semibold leading-[24px] lg:leading-[35px]"
                >
                  <td className="w-[25%]">
                    <FadeIn>{order.name}</FadeIn>
                  </td>
                  <td className=" text-center w-[25%]">
                    <FadeIn>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(order.price * order.amount)}
                    </FadeIn>
                  </td>
                  <td className="text-center w-[25%]">
                    <FadeIn>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(order.price)}
                    </FadeIn>
                  </td>
                  <td className="w-[25%]">
                    <div className="flex flex-row justify-end items-center">
                      <p
                        className={`${
                          order.transactionType === "buy"
                            ? "bg-[#bcffde] text-[#02B15A]  "
                            : " bg-[#ff00001f] text-[#ff0000] } "
                        } px-2 my-1 rounded-xl`}
                      >
                        <FadeIn>{order.transactionType}</FadeIn>
                      </p>
                      <button
                        onClick={() => deleteBtnHandler(order._id)}
                        className="bg-transparent border-0 p-0 ml-1"
                      >
                        <img src={deleteImg} alt="" className="w-[15px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradingOpenOrders;
