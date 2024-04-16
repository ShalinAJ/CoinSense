import React from "react";
import visaLogo from "../assets/visa-logo.png";
import mastercardLogo from "../assets/mastercard-logo.png";

const WalletsList = ({ wallets }) => {
  return (
    <div>
      {wallets.map((wallet) => (
        <div className="flex flex-col" key={wallet._id}>
          <div>
            <p>{wallet.nickname}</p>
            <p>{wallet.name}</p>
          </div>
          <div>
            <div className="flex flex-row">
              <div>
                <p>Current Balance</p>
                <p>{wallet.balance}</p>
              </div>
              {wallet.number.toString()[0] === "4" && (
                <img src={visaLogo}></img>
              )}
              {wallet.number.toString()[0] === "5" && (
                <img src={mastercardLogo}></img>
              )}
            </div>
            <div className="flex flex-row">
              <p>{wallet.number}</p>

              <p>
                {wallet.expMonth}/{wallet.expYear}
              </p>
            </div>
            <p>{wallet.number[0]}</p>
          </div>
          <dir>
            <button>Remove</button>
          </dir>
        </div>
      ))}
    </div>
  );
};

export default WalletsList;
