import React, { Suspense, useEffect, useState } from "react";
import { Await, defer, json, Link, useLoaderData } from "react-router-dom";
import TransactionsTable from "../components/TransactionsTable.jsx";
import AddTransactionModal from "../components/AddTransactionModal.jsx";
import backArrow from "../assets/back-arrow.png";

const AllInvestmentsPage = () => {
  const { transactions: transactionPromise, wallets } = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [walletList, setWalletList] = useState();
  const [investmentCount, setInvestmentCount] = useState(0);
  const [investmentTotal, setInvestmentTotal] = useState(0);

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
      const investmentTransactions = transactions.filter(
        (transaction) => transaction.status === "Investment"
      );
      const count = investmentTransactions.length;
      const total = investmentTransactions.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );
      setInvestmentCount(count);
      setInvestmentTotal(total);
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
        <div className="flex items-start justify-between px-[28px] pt-[29px]">
          <div>
            <Link to={".."} className="p-0 m-0 w-4">
              <img src={backArrow} alt="" />
            </Link>
            <h2 className="text-2xl font-bold">Investment Data</h2>
            <p className="text-sm pt-2 font-light">
              Detailed view of all investment transactions{" "}
            </p>
          </div>
          <div className="bg-[#bcffde] text-[#02B15A] rounded-lg flex flex-row justify-center py-2 px-4 mr-3 text-[13px]">
            <p className="text-black pr-2">Investment count: </p>
            <p className="font-semibold">{investmentCount}</p>
          </div>
        </div>
        <div className="flex justify-center mt-1 mb-3">
          <div className="flex flex-col justify-center items-center my-10 ">
            <p className="text-sm font-medium text-gray-400">Total Invested</p>
            <p className="text-[28px] font-bold pb-1">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(investmentTotal)}
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
                  transactionStatus={"Investment"}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AllInvestmentsPage;
