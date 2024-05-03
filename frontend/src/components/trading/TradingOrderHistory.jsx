import React, { useEffect, useState } from "react";

const TradingOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("http://localhost:4000/orderhistory", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        console.error("Could not fetch transactions.");
        return;
      }

      const data = await response.json();
      setOrderHistory(data);
    };

    fetchData();
  }, []);

  return (
    <div className="px-1 my-3">
      <hr />
      <table className="w-[100%]">
        <tbody>
          <tr className="text-xs  leading-[30px]">
            <th className="text-left font-normal">Token</th>
            <th className="text-center font-normal">Amount</th>
            <th className="text-right font-normal">Type</th>
          </tr>

          {orderHistory &&
            orderHistory.map((order) => (
              <tr className="text-xs font-semibold">
                <td>{order.name}</td>
                <td className="text-center">${order.amount * order.price}</td>
                <td className="text-right">{order.transactionType}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradingOrderHistory;
