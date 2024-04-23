import React, { Suspense, useEffect, useState } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import TransactionsTable from "../components/TransactionsTable.jsx";
import AddTransactionModal from "../components/AddTransactionModal.jsx";

const IncomePage = () => {
  const { transactions: transactionPromise, wallets } = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [walletList, setWalletList] = useState();
  const [incomeCount, setIncomeCount] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);

  useEffect(() => {
    async function walletCountHandler() {
      const walletList = await wallets;
      const cards = walletList.map((wallet) => ({
        number: wallet.number,
        nickname: wallet.nickname,
      }));
      const cardArray = ["", ...cards];
      setWalletList(cardArray);
    }

    walletCountHandler();
  }, [wallets]);

  useEffect(() => {
    transactionPromise.then((transactions) => {
      const incomeTransactions = transactions.filter(
        (transaction) => transaction.status === "Income"
      );
      const count = incomeTransactions.length;
      const total = incomeTransactions.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );
      setIncomeCount(count);
      setIncomeTotal(total);
    });
  }, [transactionPromise]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {console.log(walletList)}
      <Suspense>
        <Await resolve={transactionPromise}>
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
            <h2 className="text-2xl font-bold">Income Data</h2>
            <p className="text-sm pt-2 font-light">
              Detailed view of all income transactions{" "}
            </p>
          </div>
          <div className="bg-[#bcffde] text-[#02B15A] rounded-lg flex flex-row justify-center py-2 px-4 mr-3 text-[13px]">
            <p className="text-black pr-2">Total incomes: </p>
            <p className="font-semibold">{incomeCount}</p>
          </div>
        </div>
        <div className="flex justify-center mt-1 mb-3">
          <div className="flex flex-col justify-center items-center my-10 ">
            <p className="text-sm font-medium text-gray-400">Income count</p>
            <p className="text-[28px] font-bold pb-1">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(incomeTotal)}
            </p>
            <button
              onClick={openModal}
              className="bg-[#152DFF] text-white text-xs px-[3rem] hover:bg-coinsense-blue-darker"
            >
              Add Transaction
            </button>
          </div>
        </div>
        <hr className="mx-6" />
        <div className=" pl-[28px] py-6">
          <Suspense
            fallback={<p className="text-sm font-medium">Loading...</p>}
          >
            <Await resolve={transactionPromise}>
              {(loadedTransactions) => (
                <TransactionsTable
                  transactions={loadedTransactions}
                  transactionStatus={"Income"}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default IncomePage;
