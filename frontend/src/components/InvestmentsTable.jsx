import React, { useState } from "react";
import styles from "./TransactionTable.module.css";

const InvestmentsTable = ({ tradeType, tradeData }) => {
  const pageTradeFilter = tradeData.filter(
    (trade) => trade.status === tradeType
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (tradeType ? tradeData : pageTradeFilter).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <table className="w-[100%]">
        <tbody>
          <tr className="text-left text-sm leading-[45px]">
            <th className="w-[20%]">Transaction</th>
            <th className="w-[30%]">Date</th>
            <th className="w-[20%]">Amount</th>
            <th className="w-[20%]">Trade at</th>
            <th className="w-[10%]">Status</th>
          </tr>
          {currentItems.map((trade) => (
            <tr key={trade._id} className="text-sm font-medium leading-[48px]">
              <td>{trade.name}</td>
              <td>
                {new Date(trade.createdAt).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </td>
              <td>
                <div className="flex flex-row">{trade.amount}</div>
              </td>
              <td>
                <div>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(trade.price)}
                </div>
              </td>
              <td className="mt-3 text-center text-xs flex">
                <p
                  className={
                    (trade.transactionType === "buy" &&
                      "py-1 w-[45%] bg-[#bcffde] text-[#02B15A] rounded-xl") ||
                    (trade.transactionType === "sell" &&
                      "py-1 w-[45%] bg-[#ff00001f] text-[#ff0000] rounded-xl")
                  }
                >
                  {trade.transactionType}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className={`${styles.pagination} flex flex-row gap-1`}>
        {Array.from({
          length: Math.ceil(tradeData.length / itemsPerPage),
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
      </ul>
    </div>
  );
};

export default InvestmentsTable;
