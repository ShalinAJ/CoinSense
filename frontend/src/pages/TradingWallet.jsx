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

const TradingWalletPage = ({}) => {
  const { topups, wallets } = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [walletList, setWalletList] = useState();
  const [topupdata, setTopupData] = useState();
  const navigate = useNavigate();

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
      if (item.cardName == "buy") {
        totalAmount -= item.amount;
      } else {
        totalAmount += item.amount;
      }
      entries++;
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
        <div>
          <Suspense
            fallback={<p className="text-sm font-medium">Loading...</p>}
          >
            <Await resolve={topups}>
              {(topupdata) => <TopupsTable tradingWallet={topupdata} />}
            </Await>
          </Suspense>
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

async function loadTopups() {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await fetch("http://localhost:4000/tradingwallet", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  if (!response.ok) {
    return json({ message: "Could not fetch top-ups." }, { status: 500 });
  } else {
    const topups = await response.json();
    return topups;
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
  return defer({ topups: loadTopups(), wallets: loadWallets() });
}
