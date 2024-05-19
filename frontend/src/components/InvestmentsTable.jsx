import React, { useState } from "react";
import styles from "./TransactionTable.module.css";
import FadeIn from "./animations/FadeIn";

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
            <th className="w-[20%]">
              <FadeIn>Transaction</FadeIn>
            </th>
            <th className="w-[30%]">
              <FadeIn>Date</FadeIn>
            </th>
            <th className="w-[20%]">
              <FadeIn>Amount</FadeIn>
            </th>
            <th className="w-[20%]">
              <FadeIn>Trade at</FadeIn>
            </th>
            <th className="w-[10%]">
              <FadeIn>Status</FadeIn>
            </th>
          </tr>
          {currentItems.map((trade) => (
            <tr key={trade._id} className="text-sm font-medium leading-[48px]">
              <td>
                <FadeIn>{trade.name}</FadeIn>
              </td>
              <td>
                <FadeIn>
                  {new Date(trade.createdAt).toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </FadeIn>
              </td>
              <td>
                <div className="flex flex-row">
                  <FadeIn>{trade.amount}</FadeIn>
                </div>
              </td>
              <td>
                <div>
                  <FadeIn>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(trade.price)}
                  </FadeIn>
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
                  <FadeIn>{trade.transactionType}</FadeIn>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FadeIn>
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
      </FadeIn>
    </div>
  );
};

export default InvestmentsTable;
