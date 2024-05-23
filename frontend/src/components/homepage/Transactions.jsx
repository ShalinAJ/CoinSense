import React from "react";
import TransactionsImg from "../../assets/transactions-homepage.png";
import MobileTransactionsImg from "../../assets/mobile-transactions-homepage.png";

const Transactions = () => {
  return (
    <div className="pt-[5rem] lg:pt-[4rem] flex items-center bg-white justify-center relative">
      <div className="hidden lg:block absolute left-[28rem] top-[5rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
      <div className="w-[100%] z-10 px-8 md:px-12 lg:px-[10rem]  flex flex-col md:flex-row gap-10 items-center">
        <div className="hidden lg:block w-[50%]">
          <img src={TransactionsImg} alt="Dashboard" className="w-full" />
        </div>
        <div className="pt-5 z-20 lg:w-[50%]">
          <div className="text-[13px]">
            <p className="text-3xl md:text-5xl font-medium lg:font-semibold text-coinsense-blue">
              Transactions
            </p>
            <p className="my-4 font-normal pt-3">
              The Transactions page provides a detailed view of all financial
              transactions made by the user. This includes deposits,
              withdrawals, transfers, and purchases. Users can filter, search,
              and categorize their transactions to manage their finances
              effectively.
            </p>
          </div>
          <div className="block lg:hidden">
            <img
              src={MobileTransactionsImg}
              alt="Dashboard"
              className="w-full my-8 border shadow rounded-3xl"
            />
          </div>
          <div className="pt-2 lg:pt-4">
            <p className="text-lg font-semibold pb-4">Key Features</p>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Transaction List:</span> Displays
                all transactions in a table format, detailing the date,
                description, amount, and status of each transaction.
                Transactions are color-coded based on their status, such as
                withdraw, expense, income, or top-up.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Filters and Search:</span> Users
                can filter transactions by date range, transaction type, and
                amount range. A search bar enables finding specific transactions
                using keywords or descriptions.
              </p>
            </div>
            <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Add Transactions: </span> Allows
                users to manually add new transactions, featuring input fields
                for transaction name, amount, date, status, and the card used. A
                confirmation button adds the transaction to the list.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
