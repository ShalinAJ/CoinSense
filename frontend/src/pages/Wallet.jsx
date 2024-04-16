import { useState } from "react";
import AddWalletModal from "../components/AddWalletModal";

const WalletPage = () => {
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
        <div className=" pl-[38px] py-[36px]">
          <div>add cards..</div>
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
