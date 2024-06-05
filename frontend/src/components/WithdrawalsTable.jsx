import React from "react";

const WithdrawalsTable = ({ tradingWallet }) => {
  return (
    <div className="overflow-y-auto max-h-[12.5rem] lg:max-h-[18rem]">
      <table className="w-[100%]">
        <tbody>
          <tr className="text-[10px] lg:text-xs leading-[25px]">
            <th className="text-left font-normal">Date</th>
            <th className="text-center font-normal">
              Card used for Withdrawal
            </th>
            <th className="text-right font-normal pr-3">Amount</th>
          </tr>

          {Array.isArray(tradingWallet) &&
            tradingWallet.length > 0 &&
            tradingWallet
              .filter((transaction) => transaction.status === "withdraw")
              .map((transaction, index) => (
                <tr
                  key={index}
                  className="text-[10px] lg:text-xs font-semibold leading-[24px] lg:leading-[35px]"
                >
                  <td className="text-left lg:w-[32%] ">
                    {new Date(transaction.createdAt).toLocaleString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="flex flex-row justify-center items-center">
                    <p className="lg:pl-2 text-[10px] text-black font-light">
                      XXXX XXXX XXXX{" "}
                      {transaction.cardName
                        ? transaction.cardName.slice(12, 16)
                        : undefined}
                    </p>
                  </td>
                  <td className="text-right lg:pr-3">
                    <div className="">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(transaction.amount)}
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawalsTable;
