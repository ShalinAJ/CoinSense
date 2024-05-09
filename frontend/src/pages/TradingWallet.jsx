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
import TopupsTable from "../components/TopupsTable";
import TopupWalletModal from "../components/TopupWalletModal";
import TradingOrderHistory from "../components/trading/TradingOrderHistory";

const TradingWalletPage = ({}) => {
  const { topups, wallets, orderHistory } = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [walletList, setWalletList] = useState();
  const [topupdata, setTopupData] = useState();
  const navigate = useNavigate();
  const [cocollogLogo, setCocollogLogo] = useState("");
  const [orderHistoryData, setOrderHistoryData] = useState(null);

  useEffect(() => {
    async function fetchOrderHistoryData() {
      const data = await orderHistory;
      setOrderHistoryData(data);
    }

    fetchOrderHistoryData();
  }, [orderHistory]);

  useEffect(() => {
    async function fetchCocollogLogo() {
      try {
        const response = await fetch(
          `https://query2.finance.yahoo.com/v7/finance/quote?symbols=AAPL`
        );
        const logoDetails = await response.json();

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const logoUrl = logoDetails.quoteResponse.result[0].logo;
        console.log(logoUrl);
        setCocollogLogo(logoUrl);
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    }

    fetchCocollogLogo();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const logoResponse = await fetch(
          `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${selectToken}`
        );
        const logoDetails = await logoResponse.json();

        if (!logoResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const logoUrl = logoDetails.quoteResponse.result[0].logo;

        // Process logoUrl, then update state
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

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
      totalAmount += item.amount;
      entries++;
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
      <div className="w-[80%] h-[max-content] px-[28px] bg-white">
        <div className="flex items-start justify-between  pt-[29px]">
          <div>
            <Link onClick={prevPage} className="p-0 m-0 w-4">
              <img src={backArrow} alt="" />
            </Link>
            <h2 className="text-2xl font-bold">Trading wallet</h2>
            <p className="text-sm pt-2 font-light">
              Detailed view of your trading wallet details
            </p>
          </div>
          <div className="mr-3">
            <img src={infoImg} alt="" className="w-5" />
          </div>
        </div>
        <div className="border shadow-lg shadow-grey-500/40 p-5 rounded-3xl my-9">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row text-sm font-medium gap-3 items-center w-[35%] ml-2">
              <p className="font-normal">Trading wallet balance :</p>
              <p className="font-semibold">
                {totalAmount
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(totalAmount)
                  : "--"}
              </p>
            </div>
            <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
            <div className="flex flex-row justify-center text-sm font-medium gap-3 items-center w-[35%]">
              <p className="font-normal">total top-ups :</p>
              <p className="bg-coinsense-blue text-white px-2 rounded-lg">
                {entries}
              </p>
            </div>
            <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
            <div className="w-[30%] flex flex-row justify-end">
              <button
                onClick={openModal}
                className="bg-[#152DFF] text-white text-xs px-[5rem] mr-2 hover:bg-coinsense-blue-darker"
              >
                Top-up trading wallet
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-5">
          <div className="w-[50%] border rounded-3xl h-[23rem]">
            <Suspense
              fallback={<p className="text-sm font-medium p-5">Loading...</p>}
            >
              <Await resolve={topups}>
                {(topupdata) => <TopupsTable tradingWallet={topupdata} />}
              </Await>
            </Suspense>
          </div>
          <div className="w-[50%] border rounded-3xl p-3 h-[23rem]">
            <Suspense
              fallback={<p className="text-sm font-medium p-2">Loading...</p>}
            >
              <p className="text-xs text-gray-400 font-normal">Order History</p>
              <Await resolve={orderHistory}>
                {(orderHistory) => (
                  <TradingOrderHistory orderHistoryData={orderHistory} />
                )}
              </Await>
            </Suspense>
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
  const cardId = data.get("cardId");
  const cardbalance = data.get("cardbalance");

  //const date = new Date().toISOString();
  const amount = parseFloat(data.get("amount"));

  const topupData = {
    amount: amount,
    cardName: data.get("cardName"),
  };

  const response = await fetch("http://localhost:4000/tradingwallet/new", {
    method: "POST",

    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(topupData),
  });

  if (!response.ok) {
    throw json({ message: "Could not save." }, { status: 500 });
  }

  const walletData = {
    cardbalance: cardbalance - amount,
  };

  const walletResponse = await fetch("http://localhost:4000/wallet/" + cardId, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(walletData),
  });

  if (!walletResponse.ok) {
    throw new Error("Wallet value Could not be updated.");
  }

  window.location.reload();
  return null;
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
  return defer({ wallets: loadWallets() });
}
