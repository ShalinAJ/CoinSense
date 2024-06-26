import React, { Suspense, useEffect, useState } from "react";
import {
  Await,
  defer,
  json,
  Link,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import backArrow from "../assets/back-arrow.png";
import infoImg from "../assets/info.png";
import Topups from "../components/Topups";
import TopupWalletModal from "../components/TopupWalletModal";
import TradingOrderHistory from "../components/trading/TradingOrderHistory";
import WithdrawModal from "../components/WithdrawModal";
import InfoModal from "../components/InfoModal";
import RightSlide from "../components/animations/RightSlide";
import Spring from "../components/animations/Spring";

const TradingWalletPage = ({}) => {
  const { topups, wallets, orderHistory } = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [walletList, setWalletList] = useState();
  const [topupdata, setTopupData] = useState();
  const [modalType, setModalType] = useState();
  const [orderHistoryData, setOrderHistoryData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrderHistoryData() {
      const data = await orderHistory;
      setOrderHistoryData(data);
    }

    fetchOrderHistoryData();
  }, [orderHistory]);

  useEffect(() => {
    async function walletCountHandler() {
      const walletList = await wallets;
      const cards = walletList.map((wallet) => ({
        number: wallet.number,
        nickname: wallet.nickname,
        _id: wallet._id,
        cardbalance: wallet.cardbalance,
      }));
      const cardArray = ["", ...cards];
      setWalletList(cardArray);
    }

    async function topupDetails() {
      const topupDataList = await topups;
      setTopupData(topupDataList);
    }

    topupDetails();
    walletCountHandler();
  }, [wallets]);

  let totalAmount = 0;
  let entries = 0;

  if (Array.isArray(topupdata)) {
    topupdata.forEach((item) => {
      if (item.status === "topup") {
        totalAmount += item.amount;
        entries++;
      } else if (item.status === "withdraw") {
        totalAmount -= item.amount;
        entries++;
      }
    });
  }

  if (Array.isArray(orderHistoryData)) {
    orderHistoryData.forEach((item) => {
      if (item.transactionType == "buy") {
        totalAmount -= item.amount * item.price;
      } else {
        totalAmount += item.amount * item.price;
      }
    });
  }

  function topupHandler() {
    setModalType("top-up");
    setModalOpen(true);
  }

  function withdrawHandler() {
    setModalType("withdraw");
    setModalOpen(true);
  }

  function infoHandler() {
    setModalType("info");
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <>
      {modalType === "top-up" && (
        <>
          <Suspense>
            <Await>
              {() => (
                <TopupWalletModal
                  walletCards={walletList}
                  isOpen={modalOpen}
                  onClose={closeModal}
                />
              )}
            </Await>
          </Suspense>
        </>
      )}

      {modalType === "withdraw" && (
        <>
          <Suspense>
            <Await>
              {() => (
                <WithdrawModal
                  totalAmount={totalAmount}
                  walletCards={walletList}
                  isOpen={modalOpen}
                  onClose={closeModal}
                />
              )}
            </Await>
          </Suspense>
        </>
      )}

      {modalType === "info" && (
        <>
          <Suspense>
            <Await>
              {() => (
                <InfoModal
                  title={"Trading Wallet Dashboard"}
                  sub={
                    "Welcome to your Trading Wallet Dashboard! This page serves as your central hub for managing your trading activities and monitoring your wallet's status. Here's what you can find on this page:"
                  }
                  description={[
                    "Keep track of your current trading wallet balance to stay informed about your available funds for trading.",
                    "View a comprehensive history of all the top-ups made to your trading wallet. Easily track when funds were added and the corresponding amounts",
                    "Seamlessly add funds to your trading wallet with the Top Up button. Enjoy the convenience of topping up your wallet directly from this dashboard. After top-up, the amount will be deducted from the selected card.",
                    "Initiate withdrawals from your trading wallet back to your main wallet. Access a log of past withdrawals, including dates and withdrawn amounts. After withdrawal, the amount will be added to the selected card.",
                    "Dive into your trading activity with a detailed history of all trades executed from your trading wallet. Gain insights into the assets traded, quantities, prices, and transaction dates.",
                  ]}
                  footer={
                    "With these features at your fingertips, you have everything you need to manage your trading wallet efficiently and make informed investment decisions."
                  }
                  isOpen={modalOpen}
                  onClose={closeModal}
                />
              )}
            </Await>
          </Suspense>
        </>
      )}

      <div className="lg:w-[80%] h-[max-content] px-[10px] lg:px-[28px] pb-10 lg:pb-0 bg-white">
        <div className="flex flex-col lg:flex-row text-center lg:text-left items-center lg:items-start justify-between px-[10px] lg:px-[28px] pt-[29px]">
          <div>
            <Link onClick={prevPage} className="ml-28 lg:ml-0 p-0 m-0 w-4">
              <img src={backArrow} alt="" />
            </Link>
            <h2 className="text-lg lg:text-2xl font-bold">Trading wallet</h2>
            <p className="text-xs lg:text-sm lg:pt-2 font-light">
              Detailed view of your trading wallet details
            </p>
          </div>
          <div className="mr-3">
            <button
              className="bg-transparent border-none pr-1 lg:pr-0"
              onClick={infoHandler}
            >
              <img src={infoImg} alt="" className="w-4 lg:w-5" />
            </button>
          </div>
        </div>
        <RightSlide>
          <div className="border shadow-sm lg:shadow-lg shadow-grey-500/40 p-5 rounded-3xl mt-4 mb-5 lg:my-9">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col lg:flex-row justify-evenly lg:justify-normal lg:w-[65%]">
                <div className="flex flex-row text-sm lg:justify-start font-medium lg:gap-3 items-center lg:w-[35%] lg:ml-2">
                  <p className="text-xs lg:text-sm font-normal">
                    Trading wallet balance :
                  </p>
                  <p className="text-xs lg:text-sm font-semibold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(totalAmount)}
                  </p>
                </div>
                <div className="hidden xl:block border-r-[1px] border-gray-300 w-[2px]"></div>
                <div className="flex flex-row lg:justify-end lg:ml-20 text-sm font-medium gap-3 items-center lg:w-[30%]">
                  <p className="text-xs lg:text-sm font-normal">
                    total top-ups :
                  </p>
                  <p className="bg-coinsense-blue text-xs lg:text-sm text-white px-2 rounded-lg">
                    {entries}
                  </p>
                </div>
              </div>
              <div className="hidden xl:block border-r-[1px] border-gray-300 w-[2px]"></div>
              <div className="w-[35%] flex flex-col lg:flex-row justify-end gap-1">
                <button
                  onClick={withdrawHandler}
                  className="border-[#152DFF] bg-transparent text-coinsense-blue text-xs lg:px-[4rem] lg:mr-2 hover:bg-coinsense-blue-darker hover:text-white"
                >
                  Withdraw
                </button>
                <button
                  onClick={topupHandler}
                  className="bg-[#152DFF] text-white text-xs lg:px-[4rem] lg:mr-2 hover:bg-coinsense-blue-darker"
                >
                  Top up
                </button>
              </div>
            </div>
          </div>
        </RightSlide>
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div className="lg:w-[50%]">
            <Spring>
              <div className="border rounded-3xl h-[17rem] lg:h-[23rem]">
                <Suspense
                  fallback={
                    <p className="text-sm font-medium p-5">Loading...</p>
                  }
                >
                  <Await resolve={topups}>
                    {(topupdata) => <Topups tradingWallet={topupdata} />}
                  </Await>
                </Suspense>
              </div>
            </Spring>
          </div>
          <div className="lg:w-[50%]">
            <Spring>
              <div className="border rounded-3xl p-3 h-[17rem] lg:h-[23rem]">
                <Suspense
                  fallback={
                    <p className="text-sm font-medium p-2">Loading...</p>
                  }
                >
                  <p className="text-xs text-gray-400 font-normal">
                    Order History
                  </p>
                  <Await resolve={orderHistory}>
                    {(orderHistory) => (
                      <TradingOrderHistory orderHistoryData={orderHistory} />
                    )}
                  </Await>
                </Suspense>
              </div>
            </Spring>
          </div>
        </div>
      </div>
    </>
  );
};

export default TradingWalletPage;

export async function action({ request }) {
  const data = await request.formData();
  const user = JSON.parse(localStorage.getItem("user"));
  const account = JSON.parse(localStorage.getItem("account"));
  const cardId = data.get("cardId");
  const cardbalance = data.get("cardbalance");
  const amount = parseFloat(data.get("amount"));
  const status = data.get("status");
  const date = new Date(data.get("date")).toISOString();

  // add trading wallet transaction to wallet details
  const tradingDetailsData = {
    amount: amount,
    cardName: data.get("cardName"),
    status: status,
  };

  const tradingWalletDetailsResponse = await fetch(
    "https://coinsense-mix7.onrender.com/tradingwalletdetails/new",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tradingDetailsData),
    }
  );

  if (!tradingWalletDetailsResponse.ok) {
    throw json({ message: "Could not save." }, { status: 500 });
  }

  // update trading wallet
  const topupData = {
    amount:
      status === "topup"
        ? parseFloat(cardbalance) - amount
        : parseFloat(cardbalance) + amount,
    cardName: data.get("cardName"),
    status: status,
  };

  const response = await fetch(
    "https://coinsense-mix7.onrender.com/tradingwallet/" + account.user_id,
    {
      method: "PATCH",

      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topupData),
    }
  );

  if (!response.ok) {
    throw json({ message: "Could not save." }, { status: 500 });
  }

  // add new transaction
  const transactionData = {
    transaction: "Trading Wallet",
    date: date,
    amount: amount,
    status: status,
    card: cardId,
  };

  const Transactionresponse = await fetch(
    "https://coinsense-mix7.onrender.com/transaction/new",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    }
  );

  if (!Transactionresponse.ok) {
    throw json({ message: "Could not save." }, { status: 500 });
  }

  const walletResponse = await fetch(
    "https://coinsense-mix7.onrender.com/wallet/" + cardId,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardbalance:
          status === "topup"
            ? parseFloat(cardbalance) - amount
            : parseFloat(cardbalance) + amount,
      }),
    }
  );

  if (!walletResponse.ok) {
    throw new Error("Wallet value Could not be updated.");
  }

  window.location.reload();
  return null;
}

async function loadWallets() {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await fetch("https://coinsense-mix7.onrender.com/wallets", {
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
  return defer({ wallets: loadWallets() });
}
