import deleteImg from "../assets/delete.png";
import { useState } from "react";
import styles from "./TransactionTable.module.css";

const TopupsTable = ({ tradingWallet }) => {
  return (
    <div>
      <table className="w-[100%]">
        <tbody>
          <tr className="text-sm leading-[45px]">
            <th className="text-left pl-5">Date</th>
            <th className="text-center">Card used for top-up</th>
            <th className="text-right pr-7">Amount</th>
          </tr>

          {Array.isArray(tradingWallet) && tradingWallet.length > 0 ? (
            tradingWallet.map((transaction, index) => (
              <tr key={index} className="text-sm font-medium leading-[48px]">
                <td className="text-left pl-5">
                  {new Date(transaction.createdAt).toLocaleString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="flex flex-row justify-center items-center">
                  <p className="pl-2 text-[10px] text-black font-light">
                    XXXX XXXX XXXX{" "}
                    {transaction.cardName
                      ? transaction.cardName.slice(12, 16)
                      : undefined}
                  </p>
                </td>
                <td className="text-right pr-5">
                  <div className="">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(transaction.amount)}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="pl-5 pt-3 text-sm font-medium">loading...</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <ul className={`${styles.pagination} flex flex-row gap-1`}>
        {Array.from({
          length: Math.ceil(transactions.length / itemsPerPage),
        }).map((_, index) => (
          <li
            key={index}
            className={`${styles.pageItem} ${
              currentPage === index + 1 ? styles.active : ""
            }`}
          >
            <button
              onClick={() => paginate(index + 1)}
              className={`${styles.pageLink} ${
                currentPage === index + 1 ? styles.active : ""
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default TopupsTable;
