import React from "react";
import AccountImg from "../../../../Images/account-homepage.png";
import MobileAccountImg from "../../../../Images/mobile-account-homepage.png";

const Account = () => {
  return (
    <div className="pt-[5rem] pb-[10rem] flex items-center bg-white justify-center relative">
      <div className="hidden lg:block absolute left-[28rem] top-[6rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
      <div className="w-[100%] z-10 px-8 md:px-12 lg:px-[10rem] flex flex-col md:flex-row gap-10 items-center">
        <div className="hidden lg:block w-[50%]">
          <img src={AccountImg} alt="Dashboard" className="w-full" />
        </div>
        <div className="pt-5 z-20 lg:w-[50%]">
          <div className="text-[13px]">
            <p className="text-3xl md:text-5xl font-medium lg:font-semibold text-coinsense-blue">
              Account
            </p>
            <p className="my-4 font-normal pt-3">
              The CoinSense Account page provides users with a detailed view of
              their personal account information, displaying essential details
              such as contact information and user profile data. Users can
              manage their account settings directly from this interface,
              including editing contact details or deleting the account.
            </p>
            <p className="my-4 font-normal pt-3">
              The page offers a clear and organized presentation of all
              associated information, and quick links to various sections of the
              platform for better account management.
            </p>
          </div>
          <div className="flex flex-row justify-center lg:hidden">
            <img src={MobileAccountImg} alt="Dashboard" className="mt-2 mb-4" />
          </div>
          <div className="pt-2 lg:pt-4">
            <p className="text-lg font-semibold pb-4">Key Features</p>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">User Profile Overview: </span>{" "}
                Displays user profile information including the username, join
                date, and profile picture.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Contact Information: </span> Shows
                detailed contact information such as email, address, phone
                number, birthday, and gender.
              </p>
            </div>
            <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Edit Contact Information: </span>{" "}
                Option to edit contact details for keeping information
                up-to-date.
              </p>
            </div>
            <div className="flex flex-row items-start  text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Quick Links: </span> Easy
                navigation to various sections including assets, incomes,
                expenses, crypto trading, stock trading, trading wallet, and all
                investments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
