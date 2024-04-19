import React, { Suspense, useEffect, useState } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import TransactionsTable from "../components/TransactionsTable.jsx";
import AddTransactionModal from "../components/AddTransactionModal.jsx";

const TransactionsPage = () => {
  const { transactions, wallets } = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [walletList, setWalletList] = useState();

  useEffect(() => {
    async function walletCountHandler() {
      const walletList = await wallets;
      const cards = walletList.map((wallet) => wallet.nickname);
      const cardArray = ["", ...cards];
      setWalletList(cardArray);
    }

    walletCountHandler();
  }, [wallets]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Suspense>
        <Await resolve={transactions}>
          {() => (
            <AddTransactionModal
              walletCards={walletList}
              isOpen={modalOpen}
              onClose={closeModal}
            />
          )}
        </Await>
      </Suspense>

      <div className="w-[80%] h-[max-content] bg-white">
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
        <div className=" pl-[28px] py-6">
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={transactions}>
              {(loadedTransactions) => (
                <TransactionsTable transactions={loadedTransactions} />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default TransactionsPage;

export async function action({ request }) {
  const data = await request.formData();
  const user = JSON.parse(localStorage.getItem("user"));

  const date = new Date(data.get("date")).toISOString();
  const amount = parseFloat(data.get("amount"));

  const transactionData = {
    transaction: data.get("transaction"),
    date: date,
    amount: amount,
    status: data.get("status"),
    card: data.get("card"),
  };

  const response = await fetch("http://localhost:4000/transaction/new", {
    method: "POST",

    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transactionData),
  });

  if (!response.ok) {
    throw json({ message: "Could not save." }, { status: 500 });
  }

  window.location.reload();
  return null;
}

async function loadTransactions() {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await fetch("http://localhost:4000/transactions", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  if (!response.ok) {
    return json({ message: "Could not fetch transactions." }, { status: 500 });
  } else {
    const transactions = await response.json();
    return transactions;
  }
}

async function loadWallets() {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await fetch("http://localhost:4000/wallets", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  if (!response.ok) {
    return json({ message: "Could not fetch wallets." }, { status: 500 });
  } else {
    const wallets = await response.json();
    return wallets;
  }
}

export function loader() {
  return defer({ transactions: loadTransactions(), wallets: loadWallets() });
}
