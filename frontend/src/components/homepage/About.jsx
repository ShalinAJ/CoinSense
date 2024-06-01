import React from "react";

const About = () => {
  return (
    <div
      id="about"
      className="py-[1rem] md:py-[3rem] lg:py-[6rem] bg-white lg:bg-[#f6f6f6] flex flex-col items-center"
    >
      <div className="lg:bg-coinsense-blue text-white px-8 md:px-12 lg:px-10 py-10 w-full lg:w-[50%] rounded-3xl">
        <div className="flex flex-col">
          <p className="text-3xl md:text-5xl text-coinsense-blue lg:text-white font-medium">
            About
          </p>
          <p className="mt-4 mb-10 text-[13px] text-black lg:text-white font-normal">
            CoinSense is a comprehensive financial management platform designed
            to provide users with a detailed overview of their financial
            activities, including transactions, investments, and market data for
            both crypto and stock markets. It offers an intuitive and
            user-friendly interface for managing personal finances, investments,
            and trading activities.
          </p>
        </div>
        <hr />
        <div className="pb-8">
          <p className="mt-10 mb-6 font-semibold text-coinsense-blue lg:text-white">
            CoinSense Components
          </p>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <a
                href="#dashboard"
                className="block bg-white text-black border-2 border-coinsense-blue lg:bg-white lg:text-coinsense-blue text-xs font-medium rounded-full px-5 py-2 text-center"
              >
                Dashboard
              </a>
              <a
                href="#transactions"
                className="block bg-white text-black border-2 border-coinsense-blue lg:bg-white lg:text-coinsense-blue text-xs font-medium rounded-full px-5 py-2 text-center"
              >
                Transactions
              </a>
              <a
                href="#investments"
                className="hidden sm:block bg-white text-black border-2 border-coinsense-blue lg:bg-white lg:text-coinsense-blue text-xs font-medium rounded-full px-5 py-2 text-center"
              >
                Investments
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <a
                href="#investments"
                className="block sm:hidden bg-white text-black border-2 border-coinsense-blue lg:bg-white lg:text-coinsense-blue text-xs font-medium rounded-full px-5 py-2 text-center"
              >
                Investments
              </a>
              <a
                href="#wallets"
                className="block bg-white text-black border-2 border-coinsense-blue lg:bg-white lg:text-coinsense-blue text-xs font-medium rounded-full px-5 py-2 text-center"
              >
                Wallets
              </a>
              <a
                href="#assets"
                className="block bg-white text-black border-2 border-coinsense-blue lg:bg-white lg:text-coinsense-blue text-xs font-medium rounded-full px-5 py-2 text-center"
              >
                Assets
              </a>
              <a
                href="#income-expenses"
                className="block bg-white text-black border-2 border-coinsense-blue lg:bg-white lg:text-coinsense-blue text-xs font-medium rounded-full px-5 py-2 text-center"
              >
                Income & Expenses
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <a
                href="#trading-wallet"
                className="block bg-white text-black border-2 border-coinsense-blue lg:bg-white lg:text-coinsense-blue text-xs font-medium rounded-full px-5 py-2 text-center"
              >
                Trading Wallet
              </a>
              <a
                href="#crypto-stock-trading"
                className="block bg-white text-black border-2 border-coinsense-blue lg:bg-white lg:text-coinsense-blue text-xs font-medium rounded-full px-5 py-2 text-center"
              >
                Crypto/Stock Trading
              </a>
              <a
                href="#login-register"
                className="hidden sm:block bg-white text-black border-2 border-coinsense-blue lg:bg-white lg:text-coinsense-blue text-xs font-medium rounded-full px-5 py-2 text-center"
              >
                Login & Register
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <a
                href="#login-register"
                className="block sm:hidden bg-white text-black border-2 border-coinsense-blue lg:bg-white lg:text-coinsense-blue text-xs font-medium rounded-full px-5 py-2 text-center"
              >
                Login & Register
              </a>
              <a
                href="#account"
                className="block bg-white text-black border-2 border-coinsense-blue lg:bg-white lg:text-coinsense-blue text-xs font-medium rounded-full px-5 py-2 text-center"
              >
                Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
