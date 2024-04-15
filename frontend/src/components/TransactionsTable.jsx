import React, { useState } from "react";
import AddTransactionModal from "../components/AddTransactionModal.jsx";
import { format } from "date-fns";

const TransactionsTable = ({ transactions }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <AddTransactionModal isOpen={modalOpen} onClose={closeModal} />
      <div className="w-[80%] ">
        <div className="flex items-start justify-between px-[28px] pt-[45px]">
          <div>
            <h2 className="text-2xl font-bold">Transactions</h2>
            <p className="text-sm pt-2 font-light">
              Detailed view of your transactions
            </p>
          </div>
          <button
            onClick={openModal}
            className="bg-[#152DFF] text-white text-xs px-10 hover:bg-coinsense-blue-darker"
          >
            Add Transaction
          </button>
        </div>
        <div className=" pl-[38px] py-[36px]">
          <table className="w-[100%]">
            <tbody>
              <tr className="text-left text-sm leading-[45px]">
                <th>transactions</th>
                <th>Date</th>
                <th>Amount</th>
                <th className="text-center">Status</th>
              </tr>
              {transactions.map((transaction) => (
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
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(transaction.amount)}
                  </td>
                  <td className="mt-3 text-center text-xs flex justify-center">
                    <p
                      className={
                        (transaction.status === "Income" &&
                          "py-1 w-[50%] bg-[#bcffde] text-[#02B15A] rounded-xl") ||
                        (transaction.status === "Expense" &&
                          "py-1 w-[50%] bg-[#ff00001f] text-[#ff0000] rounded-xl") ||
                        (transaction.status === "Investment" &&
                          "py-1 w-[50%] bg-[#bcffde] text-[#02B15A] rounded-xl")
                      }
                    >
                      {transaction.status}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionsTable;
