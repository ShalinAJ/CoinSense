import React, { useEffect, useState } from "react";
import axios from "axios";

const TradingOpenOrders = ({ openOrdersData }) => {
  const [openOrders, setOpenOrders] = useState(null);

  useEffect(() => {
    async function fetchOpenOrdersData() {
      const data = await openOrdersData;
      setOpenOrders(data);
    }

    fetchOpenOrdersData();
  }, [openOrdersData]);

  async function getCurrentPrice(selectToken) {
    const dataBarResponse = await axios.get(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${selectToken.toUpperCase()}USDT`
    );

    const barData = dataBarResponse.data;
    const currentPrice = parseFloat(barData.lastPrice);
    return currentPrice;
  }

  async function buyCtypto(
    selectToken,
    transactionType,
    price,
    totalAmount,
    _id
  ) {
    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = JSON.parse(localStorage.getItem("account")).user_id;

    const response = await fetch(`http://localhost:4000/orderhistory/new`, {
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
        user_id,
      }),
    });

    if (!response.ok) {
      throw json({ message: "Could not save." }, { status: 500 });
    }

    const openOrder = await fetch("http://localhost:4000/openorder/" + _id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!openOrder.ok) {
      throw json({ message: "Could not delete." }, { status: 500 });
    }
  }

  if (Array.isArray(openOrders)) {
    openOrders.forEach(async (item) => {
      // Need to make the callback function async
      if (item.transactionType == "buy") {
        try {
          const currentPrice = await getCurrentPrice(item.name); // Fetch current price
          if (item.price <= currentPrice) {
            console.log(item.name);
            await buyCtypto(
              item.name,
              item.transactionType,
              item.price,
              item.amount,
              item._id
            ); // Wait for the buyCtypto function to complete
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
  }

  return (
    <div className="px-1 my-3">
      <hr />
      <div className="overflow-y-auto max-h-[18rem]">
        <table className="w-full">
          <tbody>
            <tr className="text-xs leading-[25px]">
              <th className="text-left font-normal">Token</th>
              <th className="text-center font-normal">Amount</th>
              <th className="text-right font-normal pr-3">Type</th>
            </tr>

            {openOrders &&
              openOrders.map((order, index) => (
                <tr
                  key={index}
                  className="text-xs font-semibold leading-[35px]"
                >
                  <td>{order.name}</td>
                  <td className="text-center">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(order.price)}
                  </td>
                  <td className="text-right pr-3">{order.transactionType}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradingOpenOrders;
