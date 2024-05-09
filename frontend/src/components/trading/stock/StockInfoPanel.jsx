import React from "react";

const StockInfoPanel = ({ generalData, selectToken }) => {
  let coinData;

  if (generalData && selectToken) {
    coinData = generalData.filter(
      (data) => data.symbol.toUpperCase() == selectToken.toUpperCase()
    )[0];
  } else {
    console.log("Error");
  }

  if (!coinData) {
    console.log("Error");
  }

  return (
    <div className="mb-10 py-6 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
      <div className="h-[25rem] max-h-[24rem] overflow-y-auto ">
        <div className="flex flex-row items-center gap-2 pb-10 pr-7 pl-7">
          {" "}
          <img src="" alt="selected stock image" className="w-5 h-5" />
          <div className="flex flex-row items-baseline gap-2">
            <p className="text-lg font-medium">Apple</p>
          </div>
        </div>
        <div className="flex flex-col pb-10 pr-7 pl-7">
          <p className="text-xs leading-5">
            Apple, Inc. engages in the design, manufacture, and sale of
            smartphones, personal computers, tablets, wearables and accessories,
            and other varieties of related services. It operates through the
            following geographical segments: Americas, Europe, Greater China,
            Japan, and Rest of Asia Pacific. The Americas segment includes North
            and South America. The Europe segment consists of European
            countries, as well as India, the Middle East, and Africa. The
            Greater China segment comprises China, Hong Kong, and Taiwan. The
            Rest of Asia Pacific segment includes Australia and Asian countries.
            Its products and services include iPhone, Mac, iPad, AirPods, Apple
            TV, Apple Watch, Beats products, AppleCare, iCloud, digital content
            stores, streaming, and licensing services. The company was founded
            by Steven Paul Jobs, Ronald Gerald Wayne, and Stephen G. Wozniak in
            April 1976 and is headquartered in Cupertino, CA. The listed name
            for AAPL is Apple Inc. Common Stock.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-[12px] font-semibold">
            <div>
              <p className="text-gray-400 pb-2">CEO</p>
              <p>Timothy Donald Cook</p>
            </div>
            <div>
              <p className="text-gray-400 pb-2">Employees</p>
              <p>161,000</p>
            </div>
            <div>
              <p className="text-gray-400 pb-2">Headquarters</p>
              <p>Cupertino, California</p>
            </div>
            <div>
              <p className="text-gray-400 pb-2">Founded</p>
              <p>1976</p>
            </div>
          </div>
        </div>
        <div className="px-5">
          <hr />
        </div>

        <div className="flex flex-col justify-between h-max pr-7 pl-7 w-[100%]">
          <p
            className="mt-7 mb-4 text-lg
           font-medium"
          >
            AAPL Key Statistics
          </p>
          <div className="grid grid-cols-4 gap-4 mt-4 w-[100%] text-[12px] font-semibold">
            <div className="pb-6">
              <p className="text-gray-400 pb-2">Market cap</p>
              <p>2.80T</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 pb-2">Price-Earnings ratio</p>
              <p>28.36</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 pb-2">Dividend yield</p>
              <p>0.53%</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 pb-2">Average volume</p>
              <p>73.83M</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 pb-2">High today</p>
              <p>$183.05</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 pb-2">Low today</p>
              <p>$181.46</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 pb-2">Open price</p>
              <p>$182.88</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 pb-2">Volume</p>
              <p>45.06M</p>
            </div>
            <div>
              <p className="text-gray-400 pb-2">52 Week high</p>
              <p>$199.62</p>
            </div>
            <div>
              <p className="text-gray-400 pb-2">52 Week low</p>
              <p>$164.08</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockInfoPanel;
