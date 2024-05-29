import React from "react";
import DashboardImg from "../../../../Images/dashboard-homepage.png";
import MobileDashboardImg from "../../../../Images/mobile-dashboard-homepage.png";

const Dashboard = () => {
  return (
    <div className="py-[0rem] lg:py-[15rem] flex items-center bg-white justify-center relative">
      <div className="hidden lg:block absolute right-0 md:right-[25rem] top-[5rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
      <div className="hidden lg:block absolute right-0 bottom-[3rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
      <div
        id="dashboard"
        className="z-10 w-[100%] px-8 md:px-12 lg:px-[10rem] gap-10 items-center"
      >
        <div className="flex flex-row">
          <div className="pt-5 z-20 lg:w-[50%]">
            <div className="text-[13px]">
              <p className="text-3xl md:text-5xl font-medium lg:font-semibold text-coinsense-blue">
                Dashboard
              </p>
              <p className="my-4 font-normal pt-3">
                The CoinSense Dashboard offers users a comprehensive overview of
                their financial portfolio. It displays key financial metrics
                such as net worth, total income, and total expenses, providing
                users with a snapshot of their financial health. The dashboard
                includes charts to visualize financial inflows and outflows over
                the year and the evolution of account balances.
              </p>
              <p className="my-4 font-normal">
                Users can also view details about their market investments,
                wallets, and assets, with options to explore more information or
                perform actions like topping up their trading wallet. The
                user-friendly interface ensures that all critical financial
                information is easily accessible at a glance.
              </p>
            </div>
            <div className="block lg:hidden">
              <img
                src={MobileDashboardImg}
                alt="Dashboard"
                className="w-full my-8 border shadow rounded-3xl"
              />
            </div>
            <div className="pt-2 lg:pt-4">
              <p className="text-lg font-semibold pb-4">Key Features</p>
              <div className="flex flex-row text-[13px] gap-3 mb-5">
                <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                <p>
                  <span className="font-medium">Key Financial Metrics:</span>{" "}
                  Overview of net worth, total income, and total expenses.
                </p>
              </div>
              <div className="flex flex-row text-[13px] gap-3 mb-5">
                <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                <p>
                  <span className="font-medium">
                    Financial Inflow Outflow Chart:
                  </span>{" "}
                  Visualization of money inflows and outflows over the year.
                </p>
              </div>
              <div className="flex flex-row text-[13px] gap-3 mb-5">
                <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                <p>
                  <span className="font-medium">Markets Section:</span>{" "}
                  Information on traded amounts in various markets like Crypto
                  Currency and Stock Market.
                </p>
              </div>
              <div className="flex flex-row text-[13px] gap-3 mb-5">
                <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                <p>
                  <span className="font-medium">Wallets Overview:</span> Details
                  of wallet balances with partially masked card numbers for
                  security.
                </p>
              </div>
              <div className="flex flex-row text-[13px] gap-3 mb-5">
                <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                <p>
                  <span className="font-medium">Assets Summary:</span> Total
                  number of assets with a "View more" option for detailed
                  information.
                </p>
              </div>
              <div className="flex flex-row text-[13px] gap-3 mb-5">
                <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                <p>
                  <span className="font-medium">Trading Wallet Balance:</span>{" "}
                  Current balance with an option to top up the wallet.
                </p>
              </div>
              <div className="flex flex-row text-[13px] gap-3 mb-5">
                <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                <p>
                  <span className="font-medium">Balance Evolution Chart:</span>{" "}
                  Graph showing changes in account or portfolio balance over
                  time.
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-[50%]">
            <img src={DashboardImg} alt="Dashboard" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
