import React, { useState } from "react";
import AddTransactionModal from "../components/AddTransactionModal.jsx";

const TRANSACTIONS = [
  {
    id: "T1",
    name: "Adobe",
    date: "2023.02.01",
    amount: "$25.09",
    status: "Paid",
  },
  {
    id: "T2",
    name: "Microsoft",
    date: "2023.02.01",
    amount: "$25.09",
    status: "Paid",
  },
  {
    id: "T3",
    name: "Dell",
    date: "2023.02.01",
    amount: "$25.09",
    status: "Paid",
  },
  {
    id: "T4",
    name: "Msi",
    date: "2023.02.01",
    amount: "$25.09",
    status: "Paid",
  },
];

const TransactionsPage = () => {
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
            className="bg-[#152DFF] text-white text-xs px-10"
          >
            Add Transaction
          </button>
        </div>
        <div className=" pl-[38px] py-[36px]">
          <table className="w-[100%]">
            <tr className="text-left text-sm leading-[45px]">
              <th>Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th className="text-center">Status</th>
            </tr>
            {TRANSACTIONS.map((transaction) => (
              <tr className="text-sm font-medium leading-[48px]">
                <td>{transaction.name}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td className=" text-center text-xs flex justify-center">
                  <p className="py-1 w-[50%] bg-[#bcffde] text-[#02B15A] rounded-xl">
                    {transaction.status}
                  </p>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionsPage;

export async function action({ request }) {
  const data = await request.formData();

  const eventData = {
    transaction: data.get("transaction"),
    date: data.get("date"),
    amount: data.get("amount"),
    status: data.get("status"),
  };

  const response = await fetch("...URI...", {
    method: "POST",
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/transactions");
}
