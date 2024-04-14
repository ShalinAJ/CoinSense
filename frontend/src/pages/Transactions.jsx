import React from "react";
import { json, useLoaderData } from "react-router-dom";
import TransactionsTable from "../components/TransactionsTable.jsx";

const TransactionsPage = () => {
  const data = useLoaderData();
  const transactions = data.events;

  return <TransactionsTable transactions={transactions} />;
};

export default TransactionsPage;

export async function action({ request }) {
  const data = await request.formData();
  const user = JSON.parse(localStorage.getItem("user"));

  const date = new Date(data.get("date")).toISOString();
  const amount = parseFloat(data.get("amount"));

  const eventData = {
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
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw json({ message: "Could not save." }, { status: 500 });
  }

  window.location.reload();
  return null;
}

export async function loader() {
  const user = JSON.parse(localStorage.getItem("user"));

  const response = await fetch("http://localhost:4000/transactions");

  if (!response.ok) {
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    return response;
  }
}
