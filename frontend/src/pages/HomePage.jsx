import { Link } from "react-router-dom";
import BannerImg from "../assets/banner-image.png";
import DashboardImg from "../assets/dashboard-homepage.png";
import TransactionsImg from "../assets/transactions-homepage.png";
import InvestmentsImg from "../assets/investments-homepage.png";
import WalletImg from "../assets/wallet-homepage.png";
import Logo from "../assets/logo-homepage.png";

const HomePage = () => {
  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="mx-8 md:mx-20 bg-white flex flex-row justify-between items-center pt-8 z-20">
          <div>
            <img src={Logo} alt="" className="w-32" />
          </div>
          <div className="flex flex-row gap-3">
            <div className="flex flex-row text-[13px] px-4 md:px-8 font-medium gap-10 items-center">
              <p>About</p>
              <p>Contact</p>
              <p>Components</p>
            </div>
            <button className="text-xs font-medium rounded-full px-5 py-2">
              View Demo
            </button>
          </div>
        </div>
        <div className="bg-coinsense-blue md:bg-transparent pt-[2rem] pb-[6rem] mt-[2rem] flex relative overflow-hidden">
          <div className="absolute hidden sm:block left-[-15rem] top-[2rem] bg-[#eeeffa] w-[35rem] h-[35rem] rounded-full z-0"></div>
          <div className="z-10 px-8 md:px-20 flex flex-col md:flex-row w-full items-start">
            <div className="z-20 pt-10 md:pt-28 w-full md:w-[40%] md:text-left">
              <p className="text-6xl md:text-7xl font-bold text-white md:text-coinsense-blue">
                Welcome to CoinSense
              </p>
              <p className="text-white md:text-black text-left my-4 text-sm md:text-base font-medium">
                Take control of your financial journey with CoinSense.
                Effortlessly monitor your investments, execute trades with
                precision, and stay ahead of market trends. Empower your
                portfolio with CoinSense today.
              </p>
              <button className="mt-4 text-xs font-medium rounded-full px-5 py-2 text-black bg-white md:text-white md:bg-coinsense-blue">
                View Demo
              </button>
            </div>
            <div className="hidden sm:block w-[full] md:w-[60%] mt-8 md:mt-0">
              <img
                src={BannerImg}
                alt="Banner"
                className="ml-10 w-full md:w-[55rem]"
              />
            </div>
          </div>
        </div>

        <div className="py-[6rem] bg-[#f6f6f6] flex flex-col items-center">
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
          <div className="hidden sm:block absolute right-0 md:right-[25rem] top-[5rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
          <div className="hidden sm:block absolute right-0 bottom-[3rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
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
        <div className="pt-[4rem] flex items-center bg-white justify-center relative">
          <div className="hidden sm:block absolute left-[28rem] top-[5rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
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
        <div className="pt-[18rem] pb-[10rem] flex items-center bg-white justify-center relative">
          <div className="hidden sm:block absolute left-[-4rem] md:right-[25rem] top-[12rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
          <div className="hidden sm:block absolute right-0 top-[30rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
          <div className="z-10 w-[100%] px-4 md:px-[10rem] flex flex-col md:flex-row gap-10 items-center">
            <div className="pt-5 z-20 w-[50%]">
              <div className="text-[13px]">
                <p className="text-3xl md:text-5xl font-semibold text-coinsense-blue">
                  Investments
                </p>
                <p className="my-4 font-normal pt-3">
                  The CoinSense Investments page provides a comprehensive
                  overview of a user's investment portfolio, detailing recent
                  transactions, total invested amount, and market options. Users
                  can view their investments in different markets, track the
                  performance of individual assets, and analyze investment
                  trends with graphical representations.
                </p>
                <p className="my-4 font-normal">
                  The page ensures an organized display of essential
                  information, making it easy for users to monitor and manage
                  their investments effectively.
                </p>
              </div>
              <div className="pt-4">
                <p className="text-lg font-semibold pb-4">Key Features</p>
                <div className="flex flex-row text-[13px] gap-3 mb-5">
                  <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                  <p>
                    <span className="font-medium">Recent Transactions:</span>{" "}
                    Displays the latest investment activities with time stamps
                    and transaction types (buy/sell).
                  </p>
                </div>
                <div className="flex flex-row text-[13px] gap-3 mb-5">
                  <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                  <p>
                    <span className="font-medium">Total Invested:</span> Shows
                    the cumulative amount invested by the user.
                  </p>
                </div>
                <div className="flex flex-row text-[13px] gap-3 mb-5">
                  <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                  <p>
                    <span className="font-medium">Market Options:</span>{" "}
                    Provides options to view investments in different markets
                    such as Cryptocurrency and Stock Market.
                  </p>
                </div>
                <div className="flex flex-row text-[13px] gap-3 mb-5">
                  <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                  <p>
                    <span className="font-medium">Asset Tracking: </span>{" "}
                    Summarizes the total number of assets and offers a detailed
                    view.
                  </p>
                </div>
                <div className="flex flex-row text-[13px] gap-3 mb-5">
                  <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                  <p>
                    <span className="font-medium">Price Charts: </span> Total
                    Graphical representation of asset performance over time,
                    such as Bitcoin and Apple Inc. stock prices.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[50%]">
              <img src={InvestmentsImg} alt="Dashboard" className="w-full" />
            </div>
          </div>
        </div>
        <div className="pt-[6rem] pb-[10rem] flex items-center bg-white justify-center relative">
          <div className="hidden sm:block absolute left-[28rem] top-[6rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
          <div className="w-[100%] z-10 px-4 md:px-[10rem] flex flex-col md:flex-row gap-10 items-center">
            <div className="w-[50%]">
              <img src={WalletImg} alt="Dashboard" className="w-full" />
            </div>
            <div className="w-[50%] pt-5 z-20">
              <div className="text-[13px]">
                <p className="text-3xl md:text-5xl font-semibold text-coinsense-blue">
                  Wallets
                </p>
                <p className="my-4 font-normal pt-3">
                  The CoinSense Wallets page hv, displaying essential
                  information such as current balances and card details. Users
                  can manage their wallets directly from this interface, adding
                  new wallets or viewing specific wallet information.
                </p>
                <p className="my-4 font-normal pt-3">
                  The page offers a clear and organized presentation of all
                  associated cards, including masked card numbers for security,
                  and the option to navigate to the trading wallet or add a new
                  wallet for better financial management.
                </p>
              </div>
              <div className="pt-4">
                <p className="text-lg font-semibold pb-4">Key Features</p>
                <div className="flex flex-row text-[13px] gap-3 mb-5">
                  <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                  <p>
                    <span className="font-medium">Wallet Overview: </span>{" "}
                    Detailed view of each wallet with current balance and card
                    details.
                  </p>
                </div>
                <div className="flex flex-row text-[13px] gap-3 mb-5">
                  <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                  <p>
                    <span className="font-medium">Card Information: </span>{" "}
                    Masked card numbers for security and card type (e.g.,
                    Mastercard, Visa).
                  </p>
                </div>
                <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
                  <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                  <p>
                    <span className="font-medium">Manage Wallets: </span>{" "}
                    Options to manage each wallet individually.
                  </p>
                </div>
                <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
                  <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                  <p>
                    <span className="font-medium">Add Wallet: </span> Button to
                    add a new wallet.
                  </p>
                </div>
                <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
                  <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
                  <p>
                    <span className="font-medium">Trading Wallet: </span>Quick
                    access to the trading wallet section.
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
