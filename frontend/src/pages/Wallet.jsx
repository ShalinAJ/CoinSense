import { Suspense, useState } from "react";
import AddWalletModal from "../components/AddWalletModal";
import { Await, defer, useLoaderData } from "react-router-dom";
import WalletsList from "../components/WalletsList";

const WalletPage = () => {
  const { wallets } = useLoaderData();
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
      <div className="w-[80%] ">
        <div className="flex items-start justify-between px-[28px] pt-[45px]">
          <div>
            <h2 className="text-2xl font-bold">Wallets</h2>
            <p className="text-sm pt-2 font-light">
              Detailed view of your walletss
            </p>
          </div>
          <button
            onClick={openModal}
            className="bg-[#152DFF] text-white text-xs px-10 hover:bg-coinsense-blue-darker"
          >
            Add Wallet
          </button>
        </div>
        <div className=" pl-[28px] py-6">
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={wallets}>
              {(loadedWallets) => <WalletsList wallets={loadedWallets} />}
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

export function loader() {
  return defer({ wallets: loadWallets() });
}
