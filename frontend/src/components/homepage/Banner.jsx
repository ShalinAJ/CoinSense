import React from "react";
import BannerImg from "../../assets/banner-image.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-coinsense-blue lg:bg-transparent pt-[2rem] pb-[6rem] mt-[2rem] flex relative overflow-hidden">
      <div className="absolute hidden lg:block left-[-15rem] top-[2rem] bg-[#eeeffa] w-[35rem] h-[35rem] rounded-full z-0"></div>
      <div className="z-10 px-8 md:px-12 lg:px-20 flex flex-col md:flex-row w-full items-start">
        <div className="z-20 pt-10 lg:pt-28 w-full lg:w-[40%] flex flex-col justify-start items-start md:text-left">
          <p className="text-6xl md:text-7xl font-bold text-white lg:text-coinsense-blue">
            Welcome to CoinSense
          </p>
          <p className="text-white lg:text-black text-left my-4 text-sm md:text-base font-medium">
            Take control of your financial journey with CoinSense. Effortlessly
            monitor your investments, execute trades with precision, and stay
            ahead of market trends. Empower your portfolio with CoinSense today.
          </p>
          <Link
            to="/login"
            className="mt-4 text-xs font-medium rounded-full px-5 py-[9px] text-black bg-white lg:text-white lg:bg-coinsense-blue"
          >
            View Demo
          </Link>
        </div>
        <div className="hidden lg:block w-[full] md:w-[60%] mt-8 md:mt-0">
          <img
            src={BannerImg}
            alt="Banner"
            className="ml-10 w-full md:w-[55rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
