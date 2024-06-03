import React, { useState } from "react";
import downArrow from "../../../assets/down-arrow.png";
import tempLine from "../../../assets/temp-line.png";

const TradeLiveDataBar = ({ selectToken, tokenDataSet, onOpen }) => {
  const openModal = () => {
    onOpen();
  };

  return (
    <>
      <div className="flex flex-row gap-4 border shadow-sm lg:shadow-lg shadow-grey-500/40 p-5 justify-stretch rounded-3xl">
        <div className="w-[35%] flex flex-row items-start lg:items-center gap-4">
          <button
            onClick={openModal}
            className="w-full px-3 flex flex-row justify-between items-center text-sm font-semibold bg-transparent text-black border-1 border-gray-300"
          >
            <p className="flex flex-row gap-2 lg:gap-3">
              <img src={selectToken[1]} alt="" className="w-5 rounded-md" />
              {selectToken[0].toUpperCase()}
            </p>
            <img src={downArrow} alt="" className="w-4" />
          </button>
          <div className="hidden w-[40%] lg:flex flex-row justify-center">
            <img src={tempLine} alt="" className="w-[80%] h-5" />
          </div>
        </div>
        <div className="hidden lg:block border-r-[1px] border-gray-300 w-[2px]"></div>
        <div className="w-[65%] flex flex-col lg:flex-row items-start lg:items-center text-xs font-semibold gap-5 lg:gap-0 justify-between">
          <div className="w-[100%] gap-12 flex flex-row justify-between items-center lg:w-auto">
            <p className="text-xs lg:text-sm">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(tokenDataSet[0])}
            </p>
            <div className="flex flex-col text-[10px] lg:text-[11px] justify-center items-center">
              <p className="text-[10px]">24h Change</p>
              <div className="flex flex-row gap-2">
                {" "}
                <p
                  className={
                    tokenDataSet[1] >= 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(tokenDataSet[1])}
                </p>
                <p
                  className={
                    tokenDataSet[2] >= 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {tokenDataSet[2]}%
                </p>
              </div>
            </div>
          </div>
          <div className="w-[100%] gap-12 flex flex-row justify-between items-center lg:w-auto">
            <div className="flex flex-col items-center gap-[2.8px]">
              <p className="text-[10px]">24h High</p>
              <p className="font-normal">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(tokenDataSet[3])}
              </p>
            </div>
            <div className="flex flex-col  items-center gap-[2.8px]">
              <p className="text-[10px]">24h low</p>
              <p className="font-normal">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(tokenDataSet[4])}
              </p>
            </div>
          </div>
          <div className="w-[100%] gap-12 flex flex-row justify-between items-center lg:w-auto">
            <div className="flex flex-col text-[11px] items-center gap-[2.8px]">
              <p className="text-[10px]">24h Volume(BTC)</p>
              <p className="font-normal">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(tokenDataSet[5])}
              </p>
            </div>
            <div className="flex flex-col lg:text-[11px] items-center gap-[2.8px]">
              <p className="text-[10px]">24h Volume(USDT)</p>
              <p className="font-normal">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(tokenDataSet[6])}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TradeLiveDataBar;
