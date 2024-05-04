import React, { useEffect, useState } from "react";

const TradingOpenOrders = ({ openOrdersData }) => {
  const [openOrders, setOpenOrders] = useState(null);

  useEffect(() => {
    async function fetchOpenOrdersData() {
      const data = await openOrdersData;
      setOpenOrders(data);
    }

    fetchOpenOrdersData();
  }, [openOrdersData]);

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
