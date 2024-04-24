import deleteImg from "../assets/delete.png";
import { useState } from "react";
import styles from "./TransactionTable.module.css";

const TransactionsTable = ({ transactions, transactionStatus }) => {
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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (
    transactionStatus === "" ? transactions : pageTransactionFilter
  ).slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <table className="w-[100%]">
        <tbody>
          <tr className="text-left text-sm leading-[45px]">
            <th>Transaction</th>
            <th>Date</th>
            <th className="w-[15%]">Amount</th>
            <th className="text-center pl-[80px]">Status</th>
          </tr>
          {currentItems.map((transaction) => (
            <tr
              key={transaction._id}
              className="text-sm font-medium leading-[48px]"
            >
              <td>{transaction.transaction}</td>
              <td>
                {new Date(transaction.date).toLocaleString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td>
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
              </td>
              <td className="mt-3 text-center text-xs flex justify-end pr-9">
                <p
                  className={
                    (transaction.status === "Income" &&
                      "py-1 w-[45%] bg-[#bcffde] text-[#02B15A] rounded-xl") ||
                    (transaction.status === "Expense" &&
                      "py-1 w-[45%] bg-[#ff00001f] text-[#ff0000] rounded-xl") ||
                    (transaction.status === "Investment" &&
                      "py-1 w-[45%] bg-[#bcffde] text-[#02B15A] rounded-xl")
                  }
                >
                  {transaction.status}
                </p>
                <button
                  onClick={() => deleteHandler(transaction._id)}
                  className="p-0 m-0 ml-2 border-none bg-transparent"
                >
                  <img src={deleteImg} className="w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};

export default TransactionsTable;
