import React, { Suspense, useEffect, useState } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import TransactionsTable from "../components/TransactionsTable.jsx";
import AddTransactionModal from "../components/AddTransactionModal.jsx";
import backArrow from "../assets/back-arrow.png";
import FadeIn from "../components/animations/FadeIn.jsx";
import RightSlide from "../components/animations/RightSlide.jsx";
import Spring from "../components/animations/Spring.jsx";

const IncomePage = () => {
  const { transactions: transactionPromise, wallets } = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [walletList, setWalletList] = useState();
  const [incomeCount, setIncomeCount] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
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

      <div className="lg:w-[80%] h-[max-content] bg-white">
        <div className="flex flex-col lg:flex-row text-center lg:text-left items-center lg:items-start justify-between px-[10px] lg:px-[28px] pt-[29px]">
          <div>
            <FadeIn>
              <Link onClick={prevPage} className="ml-24 lg:ml-0 p-0 m-0 w-4">
                <img src={backArrow} alt="" />
              </Link>
              <h2 className="text-lg lg:text-2xl font-bold">Income Data</h2>
              <p className="text-xs lg:text-sm lg:pt-2 font-light">
                <FadeIn> Detailed view of all income transactions</FadeIn>
              </p>
            </FadeIn>
          </div>
          <RightSlide>
            <div className="bg-[#bcffde] text-[#02B15A] rounded-lg flex flex-row justify-center mt-2 lg:mt-0 py-2 px-4 lg:mr-3 text-xs lg:text-[13px]">
              <p className="text-black pr-1 lg:pr-2">Income count: </p>
              <p className="font-semibold">{incomeCount}</p>
            </div>
          </RightSlide>
        </div>
        <div className="flex justify-center lg:mt-1 lg:mb-3">
          <div className="flex flex-col justify-center items-center mt-5 mb-8 lg:my-10">
            <p className="text-xs lg:ext-sm lg:font-medium text-gray-400">
              <FadeIn>Total Income</FadeIn>
            </p>
            <p className="text-lg lg:text-[28px] font-bold pb-1 lg:pb-2">
              <FadeIn>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(incomeTotal)}
              </FadeIn>
            </p>
            <Spring>
              <button
                onClick={openModal}
                className="bg-[#152DFF] rounded-full lg:rounded-lg text-white text-[11px] lg:text-xs lg:px-[3rem] hover:bg-coinsense-blue-darker"
              >
                Add Transaction
              </button>
            </Spring>
          </div>
        </div>
        <hr className="mx-2 lg:mx-6" />
        <div className="px-[10px] lg:pl-[28px] py-2 lg:py-6">
          <Suspense
            fallback={<p className="text-sm font-medium">Loading...</p>}
          >
            <Await resolve={transactionPromise}>
              {(loadedTransactions) => (
                <TransactionsTable
                  transactions={loadedTransactions}
                  transactionStatus={"Income"}
                  page={currentPage}
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
