import deleteImg from "../assets/delete.png";
import { useState } from "react";
import styles from "./TransactionTable.module.css";

const TopupsTable = () => {
  return (
    <div>
      <table className="w-[100%]">
        <tbody>
          <tr className="text-sm leading-[45px]">
            <th className="text-left pl-10">Date</th>
            <th className="text-center">Card used for top-up</th>
            <th className="text-right pr-7">Amount</th>
          </tr>

          <tr className="text-sm font-medium leading-[48px]">
            <td className="text-left pl-5">
              2024/01/01
              {/* {new Date(transaction.date).toLocaleString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })} */}
            </td>
            <td className="flex flex-row justify-center">
              Card 1{" "}
              <p className="pl-2 text-[10px] text-gray-500 font-light">
                7865
                {/* {transaction.card
                  ? "Card " + transaction.card.slice(12, 16)
                  : undefined} */}
              </p>
            </td>
            <td className="text-right pr-5">
              <div className="">
                $1,235.99
                {/* {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(transaction.amount)}
                  <p className="pl-2 text-[10px] text-gray-500 font-light">
                    {transaction.card
                      ? "Card " + transaction.card.slice(12, 16)
                      : undefined} 
                  </p>*/}
              </div>
            </td>
          </tr>
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
