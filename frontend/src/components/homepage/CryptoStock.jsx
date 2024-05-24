import React from "react";
import CryptoStockImg from "../../assets/cryptoStock-homepage.png";
import MobileCryptoStockImg from "../../assets/mobile-cryptoStock-homepage.png";

const CryptoStock = () => {
  return (
    <div className="pt-[5rem] pb-[10rem] flex items-center bg-white justify-center relative">
      <div className="hidden lg:block absolute left-[28rem] top-[6rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
      <div className="w-[100%] z-10 px-8 md:px-12 lg:px-[10rem] flex flex-col md:flex-row gap-10 items-center">
        <div className="hidden lg:block w-[50%]">
          <img src={CryptoStockImg} alt="Dashboard" className="w-full" />
        </div>
        <div className="pt-5 z-20 lg:w-[50%]">
          <div className="text-[13px]">
            <p className="text-3xl md:text-5xl font-medium lg:font-semibold text-coinsense-blue">
              Crypto/Stock Trading
            </p>
            <p className="my-4 font-normal pt-3">
              The CoinSense Stock and Crypto Trading page provides users with an
              intuitive platform to trade and view real-time data of various
              stocks and Cryptos. Users can monitor the current price, view
              detailed performance charts, and execute trades directly from this
              interface. The page highlights essential statistics such as daily
              volume, day high, day low, and the percentage change.
            </p>
          </div>
          <div className="flex flex-row justify-center lg:hidden">
            <img src={MobileCryptoStockImg} alt="Dashboard" className=" my-8" />
          </div>
          <div className="pt-2 lg:pt-4">
            <p className="text-lg font-semibold pb-4">Key Features</p>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Crypto/Stock Overview: </span>{" "}
                Real-time data display of selected crypto/stocks, including
                price, volume, and percentage change.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Performance Chart: </span>{" "}
                Interactive chart showing stock performance over different
                intervals.
              </p>
            </div>
            <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Trade Execution: </span> Options
                to buy or sell stocks with market or limit orders.
              </p>
            </div>
            <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Trading Wallet Balance: </span>{" "}
                Display of available funds for trading.
              </p>
            </div>
            <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Order Management: </span> Easy
                access to open orders and order history for tracking and
                managing trades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoStock;
