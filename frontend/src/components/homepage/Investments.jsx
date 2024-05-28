import React from "react";
import InvestmentsImg from "../../../../Images/investments-homepage.png";
import MobileInvestmentsImg from "../../../../Images/mobile-investments-homepage.png";

const Investments = () => {
  return (
    <div className="pt-[5rem] lg:pt-[18rem] lg:pb-[10rem] flex items-center bg-white justify-center relative">
      <div className="hidden lg:block absolute left-[-4rem] md:right-[25rem] top-[12rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
      <div className="hidden lg:block absolute right-0 top-[30rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
      <div className="z-10 w-[100%] px-8 md:px-12 lg:px-[10rem]  flex flex-col md:flex-row gap-10 items-center">
        <div className="pt-5 z-20 lg:w-[50%]">
          <div className="text-[13px]">
            <p className="text-3xl md:text-5xl font-medium lg:font-semibold text-coinsense-blue">
              Investments
            </p>
            <p className="my-4 font-normal pt-3">
              The CoinSense Investments page provides a comprehensive overview
              of a user's investment portfolio, detailing recent transactions,
              total invested amount, and market options. Users can view their
              investments in different markets, track the performance of
              individual assets, and analyze investment trends with graphical
              representations.
            </p>
            <p className="my-4 font-normal">
              The page ensures an organized display of essential information,
              making it easy for users to monitor and manage their investments
              effectively.
            </p>
          </div>
          <div className="block lg:hidden">
            <img
              src={MobileInvestmentsImg}
              alt="Dashboard"
              className="w-full my-8 border shadow rounded-3xl"
            />
          </div>
          <div className="pt-2 lg:pt-4">
            <p className="text-lg font-semibold pb-4">Key Features</p>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Recent Transactions:</span>{" "}
                Displays the latest investment activities with time stamps and
                transaction types (buy/sell).
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Total Invested:</span> Shows the
                cumulative amount invested by the user.
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
                <span className="font-medium">Asset Tracking: </span> Summarizes
                the total number of assets and offers a detailed view.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Price Charts: </span> Total
                Graphical representation of asset performance over time, such as
                Bitcoin and Apple Inc. stock prices.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-[50%]">
          <img src={InvestmentsImg} alt="Dashboard" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Investments;
