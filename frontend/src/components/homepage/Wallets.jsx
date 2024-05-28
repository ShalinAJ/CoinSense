import React from "react";
import WalletImg from "../../../../Images/wallet-homepage.png";
import MobileWalletImg from "../../../../Images/mobile-wallet-homepage.png";

const Wallets = () => {
  return (
    <div className="pt-[5rem] flex items-center bg-white justify-center relative">
      <div className="hidden lg:block absolute left-[28rem] top-[6rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
      <div className="w-[100%] z-10 px-8 md:px-12 lg:px-[10rem] flex flex-col md:flex-row gap-10 items-center">
        <div className="hidden lg:block w-[50%]">
          <img src={WalletImg} alt="Dashboard" className="w-full" />
        </div>
        <div className="pt-5 z-20 lg:w-[50%]">
          <div className="text-[13px]">
            <p className="text-3xl md:text-5xl font-medium lg:font-semibold text-coinsense-blue">
              Wallets
            </p>
            <p className="my-4 font-normal pt-3">
              The CoinSense Wallets page hv, displaying essential information
              such as current balances and card details. Users can manage their
              wallets directly from this interface, adding new wallets or
              viewing specific wallet information.
            </p>
            <p className="my-4 font-normal pt-3">
              The page offers a clear and organized presentation of all
              associated cards, including masked card numbers for security, and
              the option to navigate to the trading wallet or add a new wallet
              for better financial management.
            </p>
          </div>
          <div className="flex flex-row justify-center lg:hidden">
            <img src={MobileWalletImg} alt="Dashboard" className="mt-2 mb-4" />
          </div>
          <div className="pt-2 lg:pt-4">
            <p className="text-lg font-semibold pb-4">Key Features</p>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Wallet Overview: </span> Detailed
                view of each wallet with current balance and card details.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Card Information: </span> Masked
                card numbers for security and card type (e.g., Mastercard,
                Visa).
              </p>
            </div>
            <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Manage Wallets: </span> Options to
                manage each wallet individually.
              </p>
            </div>
            <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Add Wallet: </span> Button to add
                a new wallet.
              </p>
            </div>
            <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Trading Wallet: </span>Quick
                access to the trading wallet section.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallets;
