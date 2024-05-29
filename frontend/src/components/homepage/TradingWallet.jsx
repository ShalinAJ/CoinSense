import React from "react";
import TradingWalletImg from "../../../../Images/tradingWallet-homepage.png";
import MobileTradingWalletImg from "../../../../Images/mobile-tradingWallet-homepage.png";

const TradingWallet = () => {
  return (
    <div className="pt-[5rem] lg:pt-[18rem] lg:pb-[10rem] flex items-center bg-white justify-center relative">
      <div
        id="trading-wallet"
        className="hidden lg:block absolute left-[-4rem] md:right-[25rem] top-[12rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"
      ></div>
      <div className="hidden lg:block absolute right-0 top-[30rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
      <div className="z-10 w-[100%] px-8 md:px-12 lg:px-[10rem]  flex flex-col md:flex-row gap-10 items-center">
        <div className="pt-5 z-20 lg:w-[50%]">
          <div className="text-[13px]">
            <p className="text-3xl md:text-5xl font-medium lg:font-semibold text-coinsense-blue">
              Trading Wallet
            </p>
            <p className="my-4 font-normal pt-3">
              The CoinSense Trading Wallet page provides users with a detailed
              view of their trading wallet details, displaying essential
              information such as the current balance and recent transactions.
              Users can manage their trading wallet directly from this
              interface, including topping up or withdrawing funds. The page
              offers a clear and organized presentation of all top-ups and
              withdrawals, along with masked card numbers for security, and an
              order history section for better financial tracking.
            </p>
          </div>
          <div className="block lg:hidden">
            <img
              src={MobileTradingWalletImg}
              alt="Dashboard"
              className="w-full my-8 border shadow rounded-3xl"
            />
          </div>
          <div className="pt-2 lg:pt-4">
            <p className="text-lg font-semibold pb-4">Key Features</p>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Trading Wallet Overview:</span>{" "}
                Detailed view of the trading wallet with the current balance and
                total top-ups.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Transaction Details:</span> Masked
                card numbers for security and details of each top-up and
                withdrawal.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Manage Funds:</span> Options to
                top up or withdraw funds from the trading wallet.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Asset Management: </span> Option
                to add new assets and edit existing ones.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Order History: </span> Section to
                track the order history, including tokens, amounts, and
                transaction types.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-[50%]">
          <img src={TradingWalletImg} alt="Dashboard" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default TradingWallet;
