import React, { useEffect, useState } from "react";

const HorizontalMarketBar = () => {
  const { ...userInfo } = JSON.parse(localStorage.getItem("user"));
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const getCryptoGeneralData = async () => {
      try {
        const response = await fetch("http://localhost:4000/crypto/general", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        const cryptoDetails = await response.json();
        setCryptoData(cryptoDetails);
      } catch (error) {
        console.error("Error fetching crypto data: ", error);
      }
    };

    getCryptoGeneralData();
  }, []);

  //console.log(cryptoData);
  return (
    <div className="flex flex-row justify-between px-10 py-4 mb-10 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
      <div className="w-[30%] flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <img
            src={cryptoData[0].image}
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">{cryptoData[0].current_price}</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <img
            src={cryptoData[1].image}
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">$60,000.00</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <img
            src="https://en.wikipedia.org/wiki/File:Bitcoin.svg"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">$60,000.00</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
      </div>
      <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
      <div className="w-[30%] flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <img
            src="https://en.wikipedia.org/wiki/File:Bitcoin.svg"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">$60,000.00</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <img
            src="https://en.wikipedia.org/wiki/File:Bitcoin.svg"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">$60,000.00</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <img
            src="https://en.wikipedia.org/wiki/File:Bitcoin.svg"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">$60,000.00</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
      </div>
      <div className="border-r-[1px] border-gray-300 w-[2px]"></div>
      <div className="w-[30%] flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <img
            src="https://en.wikipedia.org/wiki/File:Bitcoin.svg"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">$60,000.00</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <img
            src="https://en.wikipedia.org/wiki/File:Bitcoin.svg"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">$60,000.00</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <img
            src="https://en.wikipedia.org/wiki/File:Bitcoin.svg"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <p className="text-sm font-medium">$60,000.00</p>
          <p className="text-sm font-medium text-[#02B15A]">+1.48%</p>
        </div>
      </div>
    </div>
  );
};

export default HorizontalMarketBar;
