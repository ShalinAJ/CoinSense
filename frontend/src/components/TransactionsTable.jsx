import deleteImg from "../assets/delete.png";

const TransactionsTable = ({ transactions }) => {
  const deleteHandler = async (id) => {
    console.log(id);
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

  return (
    <table className="w-[100%]">
      <tbody>
        <tr className="text-left text-sm leading-[45px]">
          <th>Transaction</th>
          <th>Date</th>
          <th>Amount</th>
          <th className="text-center pl-[80px]">Status</th>
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
  );
};

export default TransactionsTable;
