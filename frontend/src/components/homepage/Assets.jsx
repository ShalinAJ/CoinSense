import React from "react";
import AssetsImg from "../../../../Images/assets-homepage.png";
import MobileAssetsImg from "../../../../Images/mobile-assets-homepage.png";

const Assets = () => {
  return (
    <div className="pt-[5rem] lg:pt-[18rem] lg:pb-[10rem] flex items-center bg-white justify-center relative">
      <div
        id="assets"
        className="hidden lg:block absolute left-[-4rem] md:right-[25rem] top-[12rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"
      ></div>
      <div className="hidden lg:block absolute right-0 top-[30rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
      <div className="z-10 w-[100%] px-8 md:px-12 lg:px-[10rem]  flex flex-col md:flex-row gap-10 items-center">
        <div className="pt-5 z-20 lg:w-[50%]">
          <div className="text-[13px]">
            <p className="text-3xl md:text-5xl font-medium lg:font-semibold text-coinsense-blue">
              Assets
            </p>
            <p className="my-4 font-normal pt-3">
              The CoinSense Assets Data page provides users with a detailed view
              of all their assets, including both tangible and intangible types.
              The page highlights the total asset value, the number of assets,
              and their respective statuses. Users can manage their assets
              effectively through the comprehensive list and visual charts that
              summarize asset type distribution and category data, making asset
              tracking and analysis straightforward and efficient.
            </p>
          </div>
          <div className="block lg:hidden">
            <img
              src={MobileAssetsImg}
              alt="Dashboard"
              className="w-full my-8 border shadow rounded-3xl"
            />
          </div>
          <div className="pt-2 lg:pt-4">
            <p className="text-lg font-semibold pb-4">Key Features</p>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Asset List:</span> Detailed list
                of all assets, including type, value, and status (owned or
                sold).
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Total Asset Value:</span> Displays
                the cumulative value of all assets.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Market Options:</span> Provides
                options to view investments in different markets such as
                Cryptocurrency and Stock Market.
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
                <span className="font-medium">Data Charts: </span> Pie chart
                illustrating the proportion of tangible versus intangible assets
                and a Pie chart showing the distribution of asset categories
                such as Equipment, Patent, and Real Estate.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Filtering Options: </span> Allows
                users to filter assets by type for focused analysis.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-[50%]">
          <img src={AssetsImg} alt="Dashboard" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Assets;
