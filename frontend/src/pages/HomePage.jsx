import { Link } from "react-router-dom";
import BannerImg from "../assets/banner-image.png";
import DashboardImg from "../assets/dashboard-homepage.png";
import TransactionsImg from "../assets/transactions-homepage.png";

const HomePage = () => {
  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="mx-4 md:mx-8 bg-white flex flex-row justify-between items-center pt-8 z-20">
          <div>CoinSense</div>
          <div className="flex flex-row text-[13px] px-4 md:px-8 py-2 font-medium gap-6 items-center border rounded-full shadow-md shadow-grey-500/40 duration-300">
            <p>About</p>
            <p>Contact</p>
            <p>About</p>
            <p>Contact</p>
          </div>
          <div>
            <button className="text-xs font-medium rounded-full px-5 py-2">
              View Demo
            </button>
          </div>
        </div>

        <div className="pt-[1rem] pb-[3rem] my-[2rem] flex items-center justify-center relative overflow-hidden">
          <div className="absolute left-[-15rem] top-[0.5rem] bg-[#EEF0FF] w-[35rem] h-[35rem] rounded-full z-0"></div>
          <div className="z-10 px-4 md:px-8 flex flex-col md:flex-row w-full items-center justify-between">
            <div className="z-20 w-full md:w-[40%] text-center md:text-left">
              <p className="text-4xl md:text-7xl font-bold text-coinsense-blue">
                Welcome To CoinSense
              </p>
              <p className="my-4 text-sm md:text-base font-medium">
                Take control of your financial journey with CoinSense.
                Effortlessly monitor your investments, execute trades with
                precision, and stay ahead of market trends. Empower your
                portfolio with CoinSense today.
              </p>
              <button className="mt-4 text-xs font-medium rounded-full px-5 py-2 text-white bg-coinsense-blue">
                View Demo
              </button>
            </div>
            <div className="w-full md:w-[60%] mt-8 md:mt-0">
              <img
                src={BannerImg}
                alt="Banner"
                className="w-full md:w-[55rem]"
              />
            </div>
          </div>
        </div>

        <div className="py-[6rem] bg-[#f3f3f3] flex flex-col items-center">
          <div className="bg-coinsense-blue text-white px-8 py-10 w-full md:w-[40%] rounded-2xl">
            <div className="flex flex-col">
              <p className="text-3xl md:text-5xl font-medium">About</p>
              <p className="mt-4 mb-10 text-[13px] font-normal">
                CoinSense is a comprehensive financial management platform
                designed to provide users with a detailed overview of their
                financial activities, including transactions, investments, and
                market data for both crypto and stock markets. It offers an
                intuitive and user-friendly interface for managing personal
                finances, investments, and trading activities.
              </p>
            </div>
            <hr />
            <div className="pb-8">
              <p className="mt-10 mb-6 font-semibold">CoinSense Components</p>
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <button className="bg-white text-coinsense-blue text-xs font-medium rounded-full px-5 py-2">
                    Dashboard
                  </button>
                  <button className="bg-white text-coinsense-blue text-xs font-medium rounded-full px-5 py-2">
                    Transactions
                  </button>
                  <button className="bg-white text-coinsense-blue text-xs font-medium rounded-full px-5 py-2">
                    Dashboard
                  </button>
                  <button className="bg-white text-coinsense-blue text-xs font-medium rounded-full px-5 py-2">
                    Dashboard
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <button className="bg-white text-coinsense-blue text-xs font-medium rounded-full px-5 py-2">
                    Dashboard
                  </button>
                  <button className="bg-white text-coinsense-blue text-xs font-medium rounded-full px-5 py-2">
                    Transactions
                  </button>
                  <button className="bg-white text-coinsense-blue text-xs font-medium rounded-full px-5 py-2">
                    Dashboard
                  </button>
                  <button className="bg-white text-coinsense-blue text-xs font-medium rounded-full px-5 py-2">
                    Dashboard
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <button className="bg-white text-coinsense-blue text-xs font-medium rounded-full px-5 py-2">
                    Dashboard
                  </button>
                  <button className="bg-white text-coinsense-blue text-xs font-medium rounded-full px-5 py-2">
                    Transactions
                  </button>
                  <button className="bg-white text-coinsense-blue text-xs font-medium rounded-full px-5 py-2">
                    Dashboard
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <button className="bg-white text-coinsense-blue text-xs font-medium rounded-full px-5 py-2">
                    Dashboard
                  </button>
                  <button className="bg-white text-coinsense-blue text-xs font-medium rounded-full px-5 py-2">
                    Transactions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[6rem] md:py-[15rem] flex items-center bg-white justify-center relative">
          <div className="absolute right-0 md:right-[25rem] top-[5rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
          <div className="absolute right-0 bottom-[3rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
          <div className="z-10 w-[100%] px-4 md:px-[10rem] flex flex-col md:flex-row gap-10 items-center">
            <div className="pt-5 z-20 w-[50%]">
              <div className="text-[13px]">
                <p className="text-3xl md:text-5xl font-semibold text-coinsense-blue">
                  Dashboard
                </p>
                <p className="my-4 font-normal pt-3">
                  The CoinSense Dashboard offers users a comprehensive overview
                  of their financial portfolio. It displays key financial
                  metrics such as net worth, total income, and total expenses,
                  providing users with a snapshot of their financial health. The
                  dashboard includes charts to visualize financial inflows and
                  outflows over the year and the evolution of account balances.
                </p>
                <p className="my-4 font-normal">
                  Users can also view details about their market investments,
                  wallets, and assets, with options to explore more information
                  or perform actions like topping up their trading wallet. The
                  user-friendly interface ensures that all critical financial
                  information is easily accessible at a glance.
                </p>
              </div>
              <div className="pt-4">
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
                    <span className="font-medium">Wallets Overview:</span>{" "}
                    Details of wallet balances with partially masked card
                    numbers for security.
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
                    <span className="font-medium">
                      Balance Evolution Chart:
                    </span>{" "}
                    Graph showing changes in account or portfolio balance over
                    time.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[50%]">
              <img src={DashboardImg} alt="Dashboard" className="w-full" />
            </div>
          </div>
        </div>
        <div className="pt-[4rem] pb-[10rem] flex items-center bg-white justify-center relative">
          <div className="absolute left-[28rem] top-[5rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
          <div className="w-[100%] z-10 px-4 md:px-[10rem] flex flex-col md:flex-row gap-10 items-center">
            <div className="w-[50%]">
              <img src={TransactionsImg} alt="Dashboard" className="w-full" />
            </div>
            <div className="w-[50%] pt-5 z-20">
              <div className="text-[13px]">
                <p className="text-3xl md:text-5xl font-semibold text-coinsense-blue">
                  Transactions
                </p>
                <p className="my-4 font-normal pt-3">
                  The Transactions page provides a detailed view of all
                  financial transactions made by the user. This includes
                  deposits, withdrawals, transfers, and purchases. Users can
                  filter, search, and categorize their transactions to manage
                  their finances effectively.
                </p>
              </div>
              <div className="pt-4">
                <p className="text-lg font-semibold pb-4">Key Features</p>
                <div className="flex flex-row text-[13px] gap-3 mb-5">
                  <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                  <p>
                    <span className="font-medium">Transaction List:</span>{" "}
                    Displays all transactions in a table format, detailing the
                    date, description, amount, and status of each transaction.
                    Transactions are color-coded based on their status, such as
                    withdraw, expense, income, or top-up.
                  </p>
                </div>
                <div className="flex flex-row text-[13px] gap-3 mb-5">
                  <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                  <p>
                    <span className="font-medium">Filters and Search:</span>{" "}
                    Users can filter transactions by date range, transaction
                    type, and amount range. A search bar enables finding
                    specific transactions using keywords or descriptions.
                  </p>
                </div>
                <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
                  <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                  <p>
                    <span className="font-medium">Add Transactions: </span>{" "}
                    Allows users to manually add new transactions, featuring
                    input fields for transaction name, amount, date, status, and
                    the card used. A confirmation button adds the transaction to
                    the list.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
