import React, { useEffect, useState } from "react";
import visaLogo from "../assets/visa-logo.png";
import mastercardLogo from "../assets/mastercard-logo.png";
import EditWalletModal from "./EditWalletModal";

const WalletsList = ({ wallets, transactions }) => {
  const [updatedWallets, setUpdatedWallets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [walletIdHandler, setWalletIdHandler] = useState();

  const openModal = (walletId) => {
    setModalOpen(true);
    setWalletIdHandler(walletId);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    async function walletBalanceCalculator() {
      const cardTransactions = await transactions;
      const walletData = await wallets;

      const updatedWalletData = walletData.map((wallet) => {
        const updatedWallet = { ...wallet };
        cardTransactions.forEach((transaction) => {
          if (parseInt(transaction.card) === parseInt(wallet.number)) {
            if (transaction.status === "Income") {
              updatedWallet.cardbalance += transaction.amount;
            } else if (transaction.status === "Expense") {
              updatedWallet.cardbalance -= transaction.amount;
            } else if (transaction.status === "Investment") {
              updatedWallet.cardbalance -= transaction.amount;
            }
          }
        });
        return updatedWallet;
      });
      setUpdatedWallets(updatedWalletData);
    }

    walletBalanceCalculator();
  }, [transactions, wallets]);

  return (
    <>
      <EditWalletModal
        editWalletId={walletIdHandler}
        isOpen={modalOpen}
        onClose={closeModal}
        walletDetails={wallets}
      />
      <div className="grid grid-cols-3 gap-[50px] bg-white">
        {updatedWallets.map((wallet) => (
          <div
            key={wallet._id}
            className="pt-5 pb-5 px-4 flex flex-col rounded-lg border shadow-lg shadow-grey-500/40"
          >
            <div className="flex flex-row items-center gap-3 pb-3">
              <p className="text-xl font-bold">{wallet.nickname}</p>
              <p className="text-xs">{wallet.name}</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-[#152dff] via-sky-500 to-fuchsia-500">
              <div className="flex flex-row justify-between">
                <div className="mb-[5rem]">
                  <p className="text-xs text-[#ffffff9c]">Current Balance</p>
                  <p className="text-white text-xl font-medium">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(wallet.cardbalance)}
                  </p>
                </div>
                {(wallet.number.toString()[0] === "4" ||
                  wallet.number.toString()[0] === "5") && (
                  <img
                    src={
                      wallet.number.toString()[0] === "4"
                        ? visaLogo
                        : mastercardLogo
                    }
                    className="w-10 h-full"
                    alt="Card Logo"
                  />
                )}
              </div>
              <div className="flex flex-row justify-between text-xs">
                <p className="text-white">
                  {`${wallet.number.toString().slice(0, 4)} ${wallet.number
                    .toString()
                    .slice(4, 8)} ${wallet.number.toString().slice(8, 12)}
                  ${wallet.number.toString().slice(12, 16)}`}
                </p>
                <p className="text-white text-xs">{`${wallet.expMonth}/${wallet.expYear}`}</p>
              </div>
              <p>{wallet.number[0]}</p>
            </div>
            <div className="pt-3 flex flex-row">
              <button
                onClick={() => openModal(wallet._id)}
                className="text-sm px-1 pb-0 pt-1 border-none font-semibold bg-transparent text-gray-500"
              >
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WalletsList;
