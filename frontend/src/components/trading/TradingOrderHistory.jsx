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
      <div className="overflow-y-auto max-h-[18rem]">
        <table className="w-full">
          <tbody>
            <tr className="text-xs leading-[25px]">
              <th className="text-left font-normal">Token</th>
              <th className="text-center font-normal">Amount</th>
              <th className="text-right font-normal pr-3">Type</th>
            </tr>

            {orderHistory &&
              orderHistory.map((order, index) => (
                <tr
                  key={index}
                  className="text-xs font-semibold leading-[35px]"
                >
                  <td>{order.name}</td>
                  <td className="text-center">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(order.amount * order.price)}
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

export default TradingOrderHistory;
