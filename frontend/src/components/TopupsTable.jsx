import React from "react";
import FadeIn from "./animations/FadeIn";

const TopupsTable = ({ tradingWallet }) => {
  console.log(tradingWallet);
  return (
    <div className="overflow-y-auto max-h-[18rem]">
      <table className="w-[100%]">
        <tbody>
          <tr className="text-xs leading-[25px]">
            <th className="text-left font-normal">
              <FadeIn>Date</FadeIn>
            </th>
            <th className="text-center font-normal">
              <FadeIn>Card used for top-up</FadeIn>
            </th>
            <th className="text-right font-normal pr-3">
              <FadeIn>Amount</FadeIn>
            </th>
          </tr>

          {Array.isArray(tradingWallet) &&
            tradingWallet.length > 0 &&
            tradingWallet
              .filter((transaction) => transaction.status === "topup")
              .map((transaction, index) => (
                <tr
                  key={index}
                  className="text-xs font-semibold leading-[35px]"
                >
                  <td className="text-left w-[32%] ">
                    <FadeIn>
                      {new Date(transaction.createdAt).toLocaleString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </FadeIn>
                  </td>
                  <td className="flex flex-row justify-center items-center">
                    <p className="pl-2 text-[10px] text-black font-light">
                      <FadeIn>
                        {" "}
                        XXXX XXXX XXXX{" "}
                        {transaction.cardName
                          ? transaction.cardName.slice(12, 16)
                          : undefined}
                      </FadeIn>
                    </p>
                  </td>
                  <td className="text-right pr-3">
                    <div className="">
                      <FadeIn>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(transaction.amount)}
                      </FadeIn>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopupsTable;
