import React, { Suspense, useEffect, useState } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import TransactionsTable from "../components/TransactionsTable.jsx";
import AddTransactionModal from "../components/AddTransactionModal.jsx";
import backArrow from "../assets/back-arrow.png";
import FadeIn from "../components/animations/FadeIn.jsx";
import RightSlide from "../components/animations/RightSlide.jsx";
import Spring from "../components/animations/Spring.jsx";

const ExpensePage = () => {
  const { transactions: transactionPromise, wallets } = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [walletList, setWalletList] = useState();
  const [expenseCount, setExpenseCount] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const navigate = useNavigate();

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
      const expenseTransactions = transactions.filter(
        (transaction) => transaction.status === "Expense"
      );
      const count = expenseTransactions.length;
      const total = expenseTransactions.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );
      setExpenseCount(count);
      setExpenseTotal(total);
    });
  }, [transactionPromise]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <>
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
            <FadeIn>
              <Link onClick={prevPage} className="p-0 m-0 w-4">
                <img src={backArrow} alt="" />
              </Link>
              <h2 className="text-2xl font-bold">Expense Data</h2>
              <p className="text-sm pt-2 font-light">
                Detailed view of all expense transactions{" "}
              </p>
            </FadeIn>
          </div>
          <RightSlide>
            <div className="bg-[#ff00001f] text-[#ff0000] rounded-lg flex flex-row justify-center py-2 px-4 mr-3 text-[13px]">
              <p className="text-black pr-2">Expense count: </p>
              <p className="font-semibold">{expenseCount}</p>
            </div>
          </RightSlide>
        </div>
        <div className="flex justify-center mt-1 mb-3">
          <div className="flex flex-col justify-center items-center my-10 ">
            <p className="text-sm font-medium text-gray-400">
              <FadeIn>Total Expense</FadeIn>
            </p>
            <p className="text-[28px] font-bold pb-1">
              <FadeIn>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(expenseTotal)}
              </FadeIn>
            </p>
            <Spring>
              <button
                onClick={openModal}
                className="bg-[#152DFF] text-white text-xs px-[3rem] hover:bg-coinsense-blue-darker"
              >
                Add Transaction
              </button>
            </Spring>
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
                  transactionStatus={"Expense"}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ExpensePage;
