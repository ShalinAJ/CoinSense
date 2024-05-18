import { Suspense, useState } from "react";
import AddWalletModal from "../components/AddWalletModal";
import { Await, defer, json, Link, useLoaderData } from "react-router-dom";
import WalletsList from "../components/WalletsList";
import Spring from "../components/animations/Spring";
import RightSlide from "../components/animations/RightSlide";

const WalletPage = () => {
  const { wallets, transactions } = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <AddWalletModal isOpen={modalOpen} onClose={closeModal} />
      <div className="w-[80%] h-[max-content] bg-white">
        <div className="flex items-start justify-between px-[28px] pt-[45px]">
          <div>
            <h2 className="text-2xl font-bold">My Wallets</h2>
            <p className="text-sm pt-2 font-light">
              Detailed view of your wallets
            </p>
          </div>
          <RightSlide>
            <div className="flex flex-row gap-3">
              <Link
                to={"/dashboard/investment/trading-wallet"}
                className="text-xs text-coinsense-blue px-8 border py-1 rounded-lg border-coinsense-blue bg-transparent"
              >
                Trading Wallet
              </Link>
              <button
                onClick={openModal}
                className="bg-[#152DFF] text-white text-xs px-10 hover:bg-coinsense-blue-darker"
              >
                Add Wallet
              </button>
            </div>
          </RightSlide>
        </div>

        <div className=" px-[28px] py-6">
          <Suspense
            fallback={<p className="text-sm font-medium">Loading wallets...</p>}
          >
            <Await resolve={wallets}>
              {(loadedWallets) => (
                <WalletsList
                  wallets={loadedWallets}
                  transactions={transactions}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default WalletPage;

export async function action({ request }) {
  const data = await request.formData();
  const user = JSON.parse(localStorage.getItem("user"));

  const walletData = {
    name: data.get("name"),
    number: data.get("number"),
    expMonth: data.get("expMonth"),
    expYear: data.get("expYear"),
    nickname: data.get("nickname"),
    cardbalance: data.get("cardbalance"),
  };

  const response = await fetch("http://localhost:4000/wallet/new", {
    method: "POST",

    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(walletData),
  });

  if (!response.ok) {
    throw json({ message: "Could not save." }, { status: 500 });
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

async function loadTransactions() {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await fetch("http://localhost:4000/transactions", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  if (!response.ok) {
    return json({ message: "Could not fetch transactions." }, { status: 500 });
  } else {
    const transactions = await response.json();
    return transactions;
  }
}

export function loader() {
  return defer({ wallets: loadWallets(), transactions: loadTransactions() });
}
