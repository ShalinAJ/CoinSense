import React from "react";
import IncomeExpenseImg from "../../../../Images/incomeExpense-homepage.png";
import MobileIncomeExpenseImg from "../../../../Images/mobile-incomeExpense-homepage.png";

const IncomeExpenses = () => {
  return (
    <div
      id="income-expenses"
      className="pt-[5rem] lg:pb-6 flex items-center bg-white justify-center relative"
    >
      <div className="hidden lg:block absolute left-[28rem] top-[6rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
      <div className="w-[100%] z-10 px-8 md:px-12 lg:px-[10rem] flex flex-col md:flex-row gap-10 items-center">
        <div className="hidden lg:block w-[50%]">
          <img src={IncomeExpenseImg} alt="Dashboard" className="w-full" />
        </div>
        <div className="pt-5 z-20 lg:w-[50%]">
          <div className="text-[13px]">
            <p className="text-3xl md:text-5xl font-medium lg:font-semibold text-coinsense-blue">
              Income & Expenses
            </p>
            <p className="my-4 font-normal pt-3">
              The CoinSense Income and Expense Data page offers a comprehensive
              view of all income and expense transactions, providing users with
              detailed insights into their spending habits. The page displays
              the total, the number of income and expense transactions, and
              allows users to add new transactions easily. Each transaction is
              listed with details such as the vendor, date, amount, and status,
              helping users manage and track their expenses effectively.
            </p>
          </div>
          <div className="flex flex-row justify-center lg:hidden">
            <img
              src={MobileIncomeExpenseImg}
              alt="Dashboard"
              className="mt-2 mb-4"
            />
          </div>
          <div className="pt-2 lg:pt-4">
            <p className="text-lg font-semibold pb-4">Key Features</p>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Income Expense List: </span>{" "}
                Detailed list of all income and expense transactions, including
                transaction, date, amount, and status.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Total Income and Expenses: </span>{" "}
                Displays the cumulative amount of all expenses.
              </p>
            </div>
            <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Transaction Management: </span>{" "}
                Option to add new transactions and delete existing ones.
              </p>
            </div>
            <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Income Expense Count: </span>{" "}
                Shows the total number of expense transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenses;
