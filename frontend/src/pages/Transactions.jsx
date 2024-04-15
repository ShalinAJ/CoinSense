import React, { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import TransactionsTable from "../components/TransactionsTable.jsx";

const TransactionsPage = () => {
  const { transactions } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={transactions}>
        {(loadedTransactions) => (
          <TransactionsTable transactions={loadedTransactions} />
        )}
      </Await>
    </Suspense>
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
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const transactions = await response.json();
    return transactions;
  }
}

export function loader() {
  return defer({ transactions: loadTransactions() });
}
