import React from "react";
import LoginRegisterImg from "../../../../Images/loginRegister-homepage.png";
import MobileLoginRegisterImg from "../../../../Images/mobile-loginRegister-homepage.png";

const LoginRegister = () => {
  return (
    <div className="pt-[5rem] lg:pt-[18rem] lg:pb-[10rem] flex items-center bg-white justify-center relative">
      <div className="hidden lg:block absolute left-[-4rem] md:right-[25rem] top-[12rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
      <div className="hidden lg:block absolute right-0 top-[30rem] bg-[#EEF0FF] w-[20rem] md:w-[28rem] h-[20rem] md:h-[28rem] rounded-full z-0"></div>
      <div className="z-10 w-[100%] px-8 md:px-12 lg:px-[10rem]  flex flex-col md:flex-row gap-10 items-center">
        <div className="pt-5 z-20 lg:w-[50%]">
          <div className="text-[13px]">
            <p className="text-3xl md:text-5xl font-medium lg:font-semibold text-coinsense-blue">
              Login & Register
            </p>
            <p className="my-4 font-normal pt-3">
              The CoinSense Sign-In and Log-in page serves as the gateway to
              accessing the platform's exclusive features and financial
              management tools. Users can log in to their accounts using their
              email and password or sign in with their Google account for a
              seamless experience. The page is designed with simplicity and
              security in mind, ensuring that users can quickly and safely
              access their financial information.
            </p>
          </div>
          <div className="block lg:hidden">
            <img
              src={MobileLoginRegisterImg}
              alt="Dashboard"
              className="w-full my-8 rounded-3xl"
            />
          </div>
          <div className="pt-2 lg:pt-4">
            <p className="text-lg font-semibold pb-4">Key Features</p>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Trading Wallet Overview:</span>{" "}
                Detailed view of the trading wallet with the current balance and
                total top-ups.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">User Authentication:</span> Secure
                login using email and password.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Google Sign-In:</span> Option to
                sign in with a Google account for convenience.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">Account Management: </span> Easy
                navigation to sign up for a new account or recover a forgotten
                password.
              </p>
            </div>
            <div className="flex flex-row text-[13px] gap-3 mb-5">
              <div className="w-[0.6rem] h-[0.6rem] mt-[0.3rem] flex-shrink-0 bg-coinsense-blue rounded-full"></div>
              <p>
                <span className="font-medium">User-Friendly Interface: </span>{" "}
                Clean and straightforward design for effortless access to the
                CoinSense platform.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-[50%]">
          <img src={LoginRegisterImg} alt="Dashboard" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
