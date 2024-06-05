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
          <tr className="text-[11px] lg:text-sm lg:leading-[45px]">
            <th className="text-left w-[20%]">
              <FadeIn>Transaction</FadeIn>
            </th>
            <th className="text-center lg:text-left w-[30%]">
              <FadeIn>Date</FadeIn>
            </th>
            <th className="text-center lg:text-left w-[20%]">
              <FadeIn>Amount</FadeIn>
            </th>
            <th className="text-left w-[20%]">
              <FadeIn>Trade at</FadeIn>
            </th>
            <th className="text-left w-[10%]">
              <FadeIn>Status</FadeIn>
            </th>
          </tr>
          {currentItems.map((trade) => (
            <tr key={trade._id} className="text-[10px] lg:text-sm font-medium">
              <td>
                <FadeIn>{trade.name}</FadeIn>
              </td>

              <td className="text-[8px] lg:text-sm">
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
              <td className="text-center lg:text-left leading-[38px] lg:leading-[48px]">
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
              <td className="mt-2 lg:mt-3 text-center text-xs flex justify-end lg:justify-start leading-[38px] lg:leading-[48px]">
                <p
                  className={
                    (trade.transactionType === "buy" &&
                      "text-[10px] lg:text-xs px-1 lg:py-1 lg:w-[45%] h-[20px] lg:h-auto flex flex-row items-center lg:block bg-[#bcffde] text-[#02B15A] rounded-xl") ||
                    (trade.transactionType === "sell" &&
                      "text-[10px] lg:text-xs px-1 lg:py-1 lg:w-[45%] h-[20px] lg:h-auto flex flex-row items-center lg:block bg-[#ff00001f] text-[#ff0000] rounded-xl")
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
