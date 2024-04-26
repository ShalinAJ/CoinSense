import React from "react";
import { Link } from "react-router-dom";

const UserMarketOptions = () => {
  return (
    <div className="p-5 rounded-3xl flex flex-col border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300 h-[23rem]">
      <div className="pt-3 px-2">
        <p className="text-xl font-semibold">Markets</p>
        <p className="text-xs text-gray-400 py-1">
          Choose a market to make your investment
        </p>
        <div className="flex flex-col">
          <Link
            to={"../investment/crypto-trading"}
            className="text-black rounded-full p-4 box-shadow bg-transparent border-[1px] border-[#152DFF] flex flex-row justify-between items-center mt-3 mb-2"
          >
            <p className="text-sm pl-4">Crypto Currency</p>
            <p className="text-xs pr-4">
              Amount traded:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(0)}
            </p>
          </Link>
          <Link className="text-black rounded-full p-4 box-shadow bg-transparent border-[1px] border-[#152DFF] flex flex-row justify-between items-center my-2">
            <p className="text-sm pl-4">Stock Market</p>
            <p className="text-xs pr-4">
              Amount traded:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(0)}
            </p>
          </Link>
          <Link className="text-black rounded-full p-4 box-shadow bg-transparent border-[1px] border-[#152DFF] flex flex-row justify-between items-center my-2">
            <p className="text-sm pl-4">Forex Trading</p>
            <p className="text-xs"></p>
            <p className="text-xs pr-4">
              Amount traded:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(0)}
            </p>
          </Link>
          <p className="text-xs font-light text-gray-700 mt-5">
            - Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
            saepe nulla amet
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserMarketOptions;
