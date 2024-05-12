import React from "react";

const CryptoInfoPanel = ({ generalData, selectToken }) => {
  let coinData;

  if (generalData && selectToken) {
    coinData = generalData.filter(
      (data) => data.symbol.toUpperCase() == selectToken.toUpperCase()
    )[0];
  } else {
    return null;
  }

  if (!coinData) {
    return null; // Return null if coinData is not found
  }

  const capitalized_id =
    coinData.id.charAt(0).toUpperCase() + coinData.id.slice(1);

  console.log(coinData);

  return (
    <div className="mb-10 py-6 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
      <div className="flex flex-row h-[25rem] max-h-[24rem] overflow-y-auto ">
        <div className="flex flex-col justify-between h-max w-[100%] pr-7 pl-7">
          <div className="flex flex-row items-center gap-2">
            {" "}
            <img
              src={coinData.image}
              alt="selected crypto image"
              className="w-5 h-5 rounded-md"
            />
            <div className="flex flex-row items-baseline gap-2">
              <p className="text-lg font-medium">{capitalized_id}</p>
              <p className="text-xs text-gray-400">
                {coinData.symbol.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col leading-9 mt-4 text-[12px] font-semibold ">
              <p>Ranking</p>
              <p>Market Capitalization</p>
              <p>Market Dominance Index</p>
              <p>Circulating Supply</p>
              <p>Maximum Supply</p>
              <p>Total</p>
              <p>Issue Date</p>
              <p>Historical High</p>
              <p>Historical Low</p>
            </div>
            <div className="flex flex-col leading-9 mt-4 text-[12px] font-semibold text-right">
              <p>{coinData.market_cap_rank}</p>
              <p>
                {coinData.market_cap.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p>{coinData.doninance_index}%</p>
              <p>
                {coinData.circulating_supply.toLocaleString("en-US")}{" "}
                {coinData.symbol.toUpperCase()}
              </p>
              <p>
                {coinData.max_supply
                  ? coinData.max_supply.toLocaleString("en-US") +
                    " " +
                    coinData.symbol.toUpperCase()
                  : "No Max Supply"}
              </p>
              <p>
                {coinData.total_supply.toLocaleString("en-US")}{" "}
                {coinData.symbol.toUpperCase()}
              </p>
              <p>{coinData.issue_date}</p>
              <div className="flex flex-row gap-3 items-center justify-end">
                <p className="text-xs text-gray-400 font-normal">
                  {coinData.historical_high_date}
                </p>
                <p>
                  $
                  {coinData.historical_high.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="flex flex-row gap-3 items-center justify-end">
                <p className="text-xs text-gray-400 font-normal">
                  {coinData.historical_low_date}
                </p>
                <p>
                  $
                  {coinData.historical_low.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pl-7 pr-7 w-[100%]">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Links</p>
            <div className="flex flex-row justify-start gap-4 mt-1">
              <a
                href={coinData.official_website}
                target="_blank"
                className="border-1 text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-5 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
              >
                Official Website
              </a>
              <a
                href={coinData.white_Paper}
                target="_blank"
                className="border-1 text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-5 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
              >
                Whitepaper
              </a>
              <a
                href={coinData.block_explorer}
                target="_blank"
                className="border-1 text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-5 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
              >
                Block Explorer
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-7">
            <p className="text-sm font-semibold">Intro</p>
            <p className="text-xs leading-5">{coinData.intro}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoInfoPanel;
