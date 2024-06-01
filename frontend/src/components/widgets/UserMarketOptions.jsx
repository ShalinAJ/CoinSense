import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Spring from "../animations/Spring";

const UserMarketOptions = ({ tradeData, url }) => {
  const { assets } = useLoaderData();
  const [assetData, setAssetData] = useState(0);

  useEffect(() => {
    async function fetchAssetsData() {
      const data = await assets;
      setAssetData(data);
    }

    fetchAssetsData();
  }, [assets]);

  return (
    <Spring>
      <div className="bg-coinsense-blue lg:bg-transparent pb-10 mb-4 lg:pb-0 lg:mb-0 lg:h-[23rem] flex flex-col gap-2 lg:gap-5 lg:justify-between">
        <div className="pt-4 lg:p-5 lg:rounded-3xl flex flex-col text-center lg:text-left lg:border shadow-sm lg:hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300 lg:h-[80%]">
          <div className="pt-3 px-3 lg:px-2">
            <p className="text-base lg:text-xl text-white lg:text-black font-semibold">
              Markets
            </p>
            <p className="text-xs text-white lg:text-gray-400 pb-1 lg:py-2">
              Choose a market to make your investment
            </p>
            <div className="flex flex-col">
              <Link
                to={url[0]}
                className="text-white lg:text-black rounded-full p-2 lg:p-4 box-shadow bg-transparent border-[1px] border-white lg-border-[#152DFF] flex flex-row justify-between items-center mt-3 mb-2 hover:bg-coinsense-blue hover:text-white duration-300"
              >
                <p className="text-xs lg:text-sm pl-4">Crypto Currency</p>
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
                className="text-white lg:text-black rounded-full p-2 lg:p-4 box-shadow bg-transparent border-[1px] border-white lg-border-[#152DFF] flex flex-row justify-between items-center lg:mt-3 mb-2 hover:bg-coinsense-blue hover:text-white duration-300"
              >
                <p className="text-xs lg:text-sm pl-4">Stock Market</p>
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
        <hr className="block lg:hidden mb-2" />
        <div className="mx-3 lg:mx-0 px-6 lg:px-7 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300 h-[10%] lg:h-[20%]">
          <div className="flex flex-row justify-between items-center h-[100%]">
            <p className="text-xs lg:text-xl text-white lg:text-black lg:font-semibold">
              Assets
            </p>
            <div className="flex flex-row items-center gap-1 lg:gap-3">
              <p className="text-xs lg:text-sm text-white lg:text-black font-normal">
                total assets :
              </p>
              <p className="bg-coinsense-blue text-white text-xs lg:text-sm lg:px-2 rounded-lg">
                {assetData ? assetData.length : 0}
              </p>
            </div>
            <Link
              to={url[2]}
              className="text-white lg:text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-0 lg:px-8 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
            >
              View more
            </Link>
          </div>
        </div>
      </div>
    </Spring>
  );
};

export default UserMarketOptions;
