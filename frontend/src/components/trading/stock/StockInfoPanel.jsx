import React from "react";

const StockInfoPanel = ({ generalData, selectToken, tokenDataSet }) => {
  let stockData;

  if (generalData && selectToken && tokenDataSet) {
    stockData = generalData.filter((data) => data.ticker == selectToken)[0];
  } else {
    console.log("Error");
    return null;
  }

  if (!stockData || !tokenDataSet) {
    return null;
  }

  return (
    <div className="mb-10 py-6 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
      <div className="h-[25rem] max-h-[24rem] overflow-y-auto ">
        <div className="flex flex-row items-center gap-2 pb-10 pr-7 pl-7">
          {" "}
          <img
            src={stockData.logo}
            alt="selected stock image"
            className="w-5 h-5 rounded-md"
          />
          <div className="flex flex-row items-baseline gap-2">
            <p className="text-lg font-medium">{stockData.name}</p>
          </div>
        </div>
        <div className="flex flex-col pb-10 pr-7 pl-7">
          <p className="text-xs leading-5">{stockData.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-[12px] font-semibold">
            <div>
              <p className="text-gray-400 pb-2">CEO</p>
              <p>{stockData.ceo}</p>
            </div>
            <div>
              <p className="text-gray-400 pb-2">Employees</p>
              <p>{parseInt(stockData.employees).toLocaleString("en-US")}</p>
            </div>
            <div>
              <p className="text-gray-400 pb-2">Headquarters</p>
              <p>{stockData.headquarters}</p>
            </div>
            <div>
              <p className="text-gray-400 pb-2">Founded</p>
              <p>{stockData.founded}</p>
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
            {stockData.ticker} Key Statistics
          </p>
          <div className="grid grid-cols-4 gap-4 mt-4 w-[100%] text-[12px] font-semibold">
            <div className="pb-6">
              <p className="text-gray-400 pb-2">Market cap</p>
              <p>
                {stockData.marketCapitalization.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>

            <div className="pb-6">
              <p className="text-gray-400 pb-2">Change</p>
              <p>
                {parseInt(tokenDataSet.change).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 pb-2">Change Precentage</p>
              <p>{tokenDataSet.changePercentage}%</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 pb-2">High today</p>
              <p>${tokenDataSet.dayHigh}</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 pb-2">Low today</p>
              <p>${tokenDataSet.dayLow}</p>
            </div>
            <div className="pb-6">
              <p className="text-gray-400 pb-2">Volume</p>
              <p>
                {tokenDataSet.volume.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-400 pb-2">52 Week high</p>
              <p>${tokenDataSet.fiftyTwoWeekHigh}</p>
            </div>
            <div>
              <p className="text-gray-400 pb-2">52 Week low</p>
              <p>${tokenDataSet.fiftyTwoWeekLow}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockInfoPanel;
