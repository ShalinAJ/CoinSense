import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";

const TradingForm = ({ currentPrice, tradeAmountType }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [inputTotal, setInputTotal] = useState();
  const [total, setTotal] = useState();
  const [tradeType, setTradeType] = useState();
  const [disableInput, setDisableInput] = useState(false);

  useEffect(() => {
    if (tradeAmountType === "market") {
      const dataTotal = totalAmount * currentPrice;
      setTotal(dataTotal);
      setTradeType(currentPrice);
      setDisableInput(true);
    } else if (tradeAmountType === "limit") {
      const dataTotal = totalAmount * inputTotal;
      setTotal(dataTotal);
      setTradeType();
      setDisableInput(false);
    }
  }, [tradeAmountType, currentPrice]);

  return (
    <Form action="">
      <div className="flex flex-col pb-5">
        <label htmlFor="">Price (USDT)</label>

        <input
          type="number"
          value={tradeType}
          readOnly={disableInput}
          onChange={(event) => {
            setInputTotal(event.target.value);
          }}
        />
      </div>
      <div className="flex flex-col pb-5">
        <label htmlFor="">Amount (BTC)</label>
        <input
          type="number"
          onChange={(event) => {
            setTotalAmount(event.target.value);
          }}
        />
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
        <div className="flex flex-row items-center text-xs font-semibold gap-2">
          <p>{totalAmount} BTC</p>
          <p>=</p>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <button className="mt-8 py-1 px-3 w-[18%] text-sm items-end hover:bg-coinsense-blue-darker">
          Submit
        </button>
      </div>
    </Form>
  );
};

export default TradingForm;
