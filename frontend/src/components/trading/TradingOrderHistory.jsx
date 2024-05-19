import React, { useEffect, useState } from "react";
import FadeIn from "../animations/FadeIn";

const TradingOrderHistory = ({ orderHistoryData, orderType }) => {
  const [orderHistory, setOrderHistory] = useState(null);

  useEffect(() => {
    async function fetchOrderHistoryData() {
      const data = await orderHistoryData;
      if (Array.isArray(data)) {
        const filteredOrders = data.filter(
          (order) => order.status === orderType
        );
        setOrderHistory(filteredOrders);
      }
    }

    fetchOrderHistoryData();
  }, [orderHistoryData, orderType]);

  return (
    <div className="px-1 my-3">
      <hr />
      <div className="overflow-y-auto max-h-[18rem]">
        <table className="w-full">
          <tbody>
            <tr className="text-xs leading-[25px]">
              <th className="text-left font-normal">
                <FadeIn>Token</FadeIn>
              </th>
              <th className="text-center font-normal">
                <FadeIn>Amount</FadeIn>
              </th>
              <th className="text-right font-normal pr-4">
                <FadeIn>Type</FadeIn>
              </th>
            </tr>

            {orderHistory &&
              orderHistory.map((order, index) => (
                <tr
                  key={index}
                  className="text-xs font-semibold leading-[35px]"
                >
                  <td>
                    <FadeIn>{order.name}</FadeIn>
                  </td>
                  <td className="text-center">
                    <FadeIn>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(order.amount * order.price)}
                    </FadeIn>
                  </td>
                  <td className="text-right flex flex-row justify-end pr-3">
                    <p
                      className={`${
                        order.transactionType === "buy"
                          ? "bg-[#bcffde] text-[#02B15A]  "
                          : " bg-[#ff00001f] text-[#ff0000] } "
                      } px-2 my-1 rounded-xl`}
                    >
                      <FadeIn>{order.transactionType}</FadeIn>
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradingOrderHistory;
