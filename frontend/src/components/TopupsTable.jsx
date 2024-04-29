import deleteImg from "../assets/delete.png";
import { useState } from "react";
import styles from "./TransactionTable.module.css";

const TopupsTable = ({ tradingWallet }) => {
  return (
    <div>
      <table className="w-[100%]">
        <tbody>
          <tr className="text-sm leading-[45px]">
            <th className="text-left pl-10">Date</th>
            <th className="text-center">Card used for top-up</th>
            <th className="text-right pr-7">Amount</th>
          </tr>

          {Array.isArray(tradingWallet) && tradingWallet.length > 0 ? (
            tradingWallet.map((transaction, index) => (
              <tr key={index} className="text-sm font-medium leading-[48px]">
                <td className="text-left pl-5">
                  {transaction.createdAt.split("T")[0]}{" "}
                  {/* Extract date part from createdAt */}
                </td>
                <td className="flex flex-row justify-center">
                  {transaction.cardName}{" "}
                  <p className="pl-2 text-[10px] text-gray-500 font-light">
                    12
                    {/* Displaying user_id or any other relevant card information */}
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
              <td colSpan="3">Trading transactions loading...</td>
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
