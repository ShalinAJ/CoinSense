import React from "react";

const TradingForm = ({ currentPrice }) => {
  const handleInputChange = (event) => {};

  return (
    <form action="">
      <div className="flex flex-col pb-5">
        <label htmlFor="">Price (USDT)</label>
        <input
          type="text"
          defaultValue={currentPrice}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col pb-5">
        <label htmlFor="">Amount (BTC)</label>
        <input type="text" />
      </div>
      <div className="flex flex-row justify-between pb-5">
        <div>
          <label htmlFor="" className="mr-3">
            Payment Card
          </label>
          <select name="" id="">
            <option value="">Card 1</option>
          </select>
        </div>
        <div>Details</div>
      </div>
      <div className="flex flex-row justify-end">
        <button className="mt-8 py-1 px-3 w-[18%] text-sm items-end hover:bg-coinsense-blue-darker">
          Submit
        </button>
      </div>
    </form>
  );
};

export default TradingForm;
