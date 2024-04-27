import React from "react";
import { Link, useNavigate } from "react-router-dom";
import backArrow from "../assets/back-arrow.png";
import infoImg from "../assets/info.png";
import TopupsTable from "../components/TopupsTable";

const TradingWalletPage = () => {
  const navigate = useNavigate();

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <div className="w-[80%] h-[max-content] px-[28px] bg-white">
      <div className="flex items-start justify-between  pt-[29px]">
        <div>
          <Link onClick={prevPage} className="p-0 m-0 w-4">
            <img src={backArrow} alt="" />
          </Link>
          <h2 className="text-2xl font-bold">Trading wallet</h2>
          <p className="text-sm pt-2 font-light">
            Detailed view of your trading wallet details
          </p>
        </div>
        <div className="mr-3">
          <img src={infoImg} alt="" className="w-5" />
        </div>
      </div>
      <div className="border shadow-lg shadow-grey-500/40 p-5 rounded-3xl my-9">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row text-sm font-medium gap-3 items-center w-[30%]">
            <p className="font-normal">Trading wallet balance :</p>
            <p className="font-semibold">$1,200.00</p>
          </div>
          <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
          <div className="flex flex-row justify-center text-sm font-medium gap-3 items-center w-[40%]">
            <p className="font-normal">total top-ups :</p>
            <p className="bg-coinsense-blue text-white px-2 rounded-lg">2</p>
          </div>
          <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
          <div className="w-[30%] flex flex-row justify-end">
            <button className="bg-[#152DFF] text-white text-xs px-[5rem] mr-2 hover:bg-coinsense-blue-darker">
              Top-up trading wallet
            </button>
          </div>
        </div>
      </div>
      <div>
        <TopupsTable />
      </div>
    </div>
  );
};

export default TradingWalletPage;
