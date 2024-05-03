import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";

const TradingForm = ({ currentPrice, tradeAmountType, transactionType }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [inputTotal, setInputTotal] = useState(0);
  const [total, setTotal] = useState();
  const [tradeType, setTradeType] = useState();
  const [disableInput, setDisableInput] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

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

  const handleSubmit = async (e) => {
    console.log("here");
    if (tradeAmountType == "market") {
      if (transactionType == "buy") {
        const response = await fetch("http://localhost:4000/orderhistory/new", {
          method: "POST",

          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "buy",
            transactionType: "buy",
            priceType: tradeAmountType,
            price: currentPrice,
            amount: totalAmount,
          }),
        });

        if (!response.ok) {
          throw json({ message: "Could not save." }, { status: 500 });
        }
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
        <div>Trading wallet info</div>
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
