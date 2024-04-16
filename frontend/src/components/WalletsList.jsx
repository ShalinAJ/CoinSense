import React from "react";
import visaLogo from "../assets/visa-logo.png";
import mastercardLogo from "../assets/mastercard-logo.png";
import deleteImg from "../assets/delete.png";
import editImg from "../assets/edit.png";

const WalletsList = ({ wallets }) => {
  const deleteHandler = async (id) => {
    console.log(id);
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("http://localhost:4000/wallet/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Could not delete transaction.");
    }

    window.location.reload();
    return null;
  };

  return (
    <div className="grid grid-cols-3 gap-[50px] bg-white">
      {wallets.map((wallet) => (
        <div
          key={wallet._id}
          className="pt-5 pb-5 px-4 flex flex-col rounded-lg border shadow-lg shadow-grey-500/40"
        >
          <div className="flex flex-row items-center gap-3 pb-3">
            <p className="text-xl font-bold">{wallet.nickname}</p>
            <p className="text-xs  ">{wallet.name}</p>
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
              {wallet.number.toString()[0] === "4" && (
                <img src={visaLogo} className="w-10 h-full"></img>
              )}
              {wallet.number.toString()[0] === "5" && (
                <img src={mastercardLogo} className="w-10 h-full"></img>
              )}
            </div>
            <div className="flex flex-row justify-between text-xs">
              <p className="text-white">
                {wallet.number.toString().slice(0, 4) +
                  " " +
                  wallet.number.toString().slice(4, 8) +
                  " " +
                  wallet.number.toString().slice(8, 12) +
                  " " +
                  wallet.number.toString().slice(12, 16)}
              </p>

              <p className="text-white text-xs">
                {wallet.expMonth}/{wallet.expYear}
              </p>
            </div>
            <p>{wallet.number[0]}</p>
          </div>
          <div className="pt-3 flex flex-row">
            <button
              onClick={() => deleteHandler(wallet._id)}
              className="text-sm px-1 pb-0 pt-1 border-none font-semibold bg-transparent text-gray-500"
            >
              Manage
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletsList;
