import React from "react";

const UserMarketOptions = () => {
  return (
    <div className="p-5 rounded-3xl flex flex-col border shadow-lg shadow-grey-500/40 h-[23rem]">
      <div className="pt-3 px-2">
        <p className="text-xl font-semibold">Markets</p>
        <p className="text-xs text-gray-400 py-1">
          Choose a market to make your investment
        </p>
        <div className="flex flex-col">
          <button className="text-black rounded-full p-4 box-shadow bg-transparent border-[1px] border-[#152DFF] flex flex-row justify-between items-center mt-3 mb-2">
            <p className="text-sm pl-4">Crypto</p>
            <p className="text-sm pr-4">--V</p>
          </button>
          <button className="text-black rounded-full p-4 box-shadow bg-transparent border-[1px] border-[#152DFF] flex flex-row justify-between items-center my-2">
            <p className="text-sm pl-4">Crypto</p>
            <p className="text-sm pr-4">--V</p>
          </button>
          <button className="text-black rounded-full p-4 box-shadow bg-transparent border-[1px] border-[#152DFF] flex flex-row justify-between items-center my-2">
            <p className="text-sm pl-4">Crypto</p>
            <p className="text-sm pr-4">--V</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMarketOptions;
