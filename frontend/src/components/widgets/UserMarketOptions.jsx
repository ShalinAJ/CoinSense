import { Link } from "react-router-dom";

const UserMarketOptions = ({ tradeData, url }) => {
  return (
    <div className=" h-[23rem] flex flex-col gap-5 justify-between">
      <div className="p-5 rounded-3xl flex flex-col border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300 h-[80%]">
        <div className="pt-3 px-2">
          <p className="text-xl font-semibold">Markets</p>
          <p className="text-xs text-gray-400 py-2">
            Choose a market to make your investment
          </p>
          <div className="flex flex-col">
            <Link
              to={url[0]}
              className="text-black rounded-full p-4 box-shadow bg-transparent border-[1px] border-[#152DFF] flex flex-row justify-between items-center mt-3 mb-2 hover:bg-coinsense-blue hover:text-white duration-300"
            >
              <p className="text-sm pl-4">Crypto Currency</p>
              <p className="text-xs pr-4">
                Amount traded:{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(tradeData[0])}
              </p>
            </Link>
            <Link
              to={url[1]}
              className="text-black rounded-full p-4 box-shadow bg-transparent border-[1px] border-[#152DFF] flex flex-row justify-between items-center my-2 hover:bg-coinsense-blue hover:text-white duration-300"
            >
              <p className="text-sm pl-4">Stock Market</p>
              <p className="text-xs pr-4">
                Amount traded:{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(tradeData[1])}
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="px-7 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300 h-[20%]">
        <div className="flex flex-row justify-between items-center h-[100%]">
          <p className="text-lg font-semibold">Assets</p>
          <div className="flex flex-row items-center gap-3">
            <p className="text-sm font-normal">total assets :</p>
            <p className="bg-coinsense-blue text-white text-sm px-2 rounded-lg">
              11
            </p>
          </div>
          <Link
            to={url[2]}
            className="text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-8 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
          >
            View more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserMarketOptions;
