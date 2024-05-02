import React from "react";

const TradingOrderHistory = () => {
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
          <tr className="text-xs font-semibold">
            <td>Bitcoin</td>
            <td className="text-center">$1,200.00</td>
            <td className="text-right">BUY</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TradingOrderHistory;
