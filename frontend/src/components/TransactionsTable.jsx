import deleteImg from "../assets/delete.png";
import { useEffect, useState } from "react";
import styles from "./TransactionTable.module.css";
import FadeIn from "./animations/FadeIn";

const TransactionsTable = ({
  transactions,
  transactionStatus,
  page,
  onPageChange,
}) => {
  const deleteHandler = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("http://localhost:4000/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Could not delete transaction.");
    }

    window.location.reload();
    return null;
  };

  const pageTransactionFilter = transactions.filter(
    (transaction) => transaction.status === transactionStatus
  );

  const [currentPage, setCurrentPage] = useState(page);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (
    transactionStatus === "" ? transactions : pageTransactionFilter
  ).slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm leading-[45px]">
            <th>
              <FadeIn>Transaction</FadeIn>
            </th>
            <th>
              <FadeIn>Date</FadeIn>
            </th>
            <th className="w-[15%]">
              <FadeIn>Amount</FadeIn>
            </th>
            <th className="text-center pl-[80px]">
              <FadeIn>Status</FadeIn>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((transaction) => (
              <tr
                key={transaction._id}
                className="text-sm font-medium leading-[48px]"
              >
                <td>
                  <FadeIn>{transaction.transaction}</FadeIn>
                </td>
                <td>
                  <FadeIn>
                    {new Date(transaction.createdAt).toLocaleString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </FadeIn>
                </td>
                <td>
                  <FadeIn>
                    <div className="flex flex-row">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(transaction.amount)}
                      <p className="pl-2 text-[10px] text-gray-500 font-light">
                        {transaction.card
                          ? "Card " + transaction.card.slice(12, 16)
                          : undefined}
                      </p>
                    </div>
                  </FadeIn>
                </td>
                <td className="mt-3 text-center text-xs flex flex-row justify-end pr-9">
                  <p
                    className={
                      (transaction.status === "Income" &&
                        "py-1 w-[45%] bg-[#bcffde] text-[#02B15A] rounded-xl") ||
                      (transaction.status === "Expense" &&
                        "py-1 w-[45%] bg-[#ff00001f] text-[#ff0000] rounded-xl") ||
                      (transaction.status === "withdraw" &&
                        "py-1 w-[45%] bg-[#bcffde] text-[#02B15A] rounded-xl mr-6") ||
                      (transaction.status === "topup" &&
                        "py-1 w-[45%] bg-[#ff00001f] text-[#ff0000] rounded-xl mr-6")
                    }
                  >
                    <FadeIn>{transaction.status}</FadeIn>
                  </p>

                  {(transaction.status === "Income" ||
                    transaction.status === "Expense") && (
                    <button
                      onClick={() => deleteHandler(transaction._id)}
                      className="p-0 m-0 ml-2 border-none bg-transparent"
                    >
                      <FadeIn>
                        <img src={deleteImg} className="w-4" />
                      </FadeIn>
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <p className="text-sm font-medium">No results found</p>
          )}
        </tbody>
      </table>
      <FadeIn>
        <ul className={`${styles.pagination} flex flex-row gap-1`}>
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
        </ul>
      </FadeIn>
    </div>
  );
};

export default TransactionsTable;
