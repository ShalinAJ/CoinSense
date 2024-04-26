import { Link } from "react-router-dom";
import tempLine from "../assets/temp-line.png";

const BitcoinChart = () => {
  return (
    <div className="w-[80%] h-[max-content] bg-white">
      <div className="flex items-start justify-between px-[28px] pt-[45px] pb-10">
        <div>
          <h2 className="text-2xl font-bold">Crypto Trading</h2>
          <p className="text-sm pt-2 font-light">
            Trade and view realtime data of Crypto Currencies
          </p>
        </div>
        <div className="flex flex-row items-center border shadow-md rounded-full gap-3">
          <p className="text-xs font-semibold pl-6">
            Crypto invested: $12,000.00
          </p>
          <Link className="text-xs m-3 px-3 py-1 text-white bg-coinsense-blue rounded-full">
            View more
          </Link>
        </div>
      </div>
      <div className="px-[28px] ">
        <div className="flex flex-row gap-4 border shadow-lg shadow-grey-500/40 p-5 justify-stretch rounded-3xl">
          <div className="w-[35%] flex flex-row items-center gap-4">
            <select
              name=""
              id=""
              value="Bitcoin"
              className="w-[60%] py-1 px-2 cursor-pointer text-sm bg-transparent border-2 text-gray-500 border-gray-300 rounded-2xl"
            >
              <option value="">Bitcoin</option>
            </select>
            <div className="w-[40%] flex flex-row justify-center">
              <img src={tempLine} alt="" className="w-[80%] h-5" />
            </div>
          </div>
          <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
          <div className="w-[58%] flex flex-row items-center text-xs font-semibold gap-5 justify-between">
            <p className="">$58,000.00</p>
            <p className="bg-green-200 text-green-600 rounded-full px-2 py-1">
              +$1.23
            </p>
            <p className="bg-green-200 text-green-600 rounded-full px-2 py-1">
              1.2%
            </p>
            <div className="flex flex-col items-center gap-[2.8px]">
              <p>24h High</p>
              <p className="font-normal">$2,000.00</p>
            </div>
            <div className="flex flex-col items-center gap-[2.8px]r">
              <p>24h low</p>
              <p className="font-normal">$1,200.00</p>
            </div>
            <div className="flex flex-col items-center gap-[2.8px]">
              <p>24h Volume(BTC)</p>
              <p className="font-normal">$2,000.00</p>
            </div>
            <div className="flex flex-col items-center gap-[2.8px]">
              <p>24h Volume(USDT)</p>
              <p className="font-normal">$2,000.00</p>
            </div>
          </div>
          <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
          <div className="w-[7%]"></div>
        </div>
      </div>
    </div>
  );
};

export default BitcoinChart;
