import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";

const TradingForm = ({
  currentPrice,
  tradeAmountType,
  transactionType,
  topups,
}) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [inputTotal, setInputTotal] = useState(0);
  const [total, setTotal] = useState();
  const [tradeType, setTradeType] = useState();
  const [tradeWalletData, setTradeWalletData] = useState(0);
  const [disableInput, setDisableInput] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = JSON.parse(localStorage.getItem("account")).user_id;

  useEffect(() => {
    async function topupDataHandler() {
      const topupData = await topups;
      const totalAmount = topupData.reduce((accumulator, topup) => {
        return accumulator + topup.amount;
      }, 0);

      setTradeWalletData(totalAmount);
    }

    topupDataHandler();

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

  useEffect(() => {
    if (total > tradeWalletData) {
      setSubmitError(true);
    } else {
      setSubmitError(false);
    }
  }, [total]);

  const handleSubmit = async (e) => {
    let url = "";
    if (tradeAmountType == "market") {
      url = "orderhistory";
    } else if (tradeAmountType == "limit") {
      url = "openorders";
    }

    const response = await fetch(`http://localhost:4000/${url}/new`, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "bitcoin",
        transactionType,
        priceType: tradeAmountType,
        price: currentPrice,
        amount: totalAmount,
        user_id,
      }),
    });

    if (!response.ok) {
      throw json({ message: "Could not save." }, { status: 500 });
    }

    window.location.reload();
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
          type="float"
          onChange={(event) => {
            setTotalAmount(event.target.value);
          }}
        />
      </div>
      <div className="flex flex-row justify-between pb-5">
        <div className="flex flex-row items-center text-xs font-semibold gap-2">
          <p>Trading wallet balance : </p>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(tradeWalletData)}
          </p>
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
      <div className="flex flex-row justify-between mt-8">
        <p className="text-xs font-semibold text-red-500">
          {submitError && "Trading wallet balance insufficient"}
        </p>
        <button
          className="py-1 px-3 w-[18%] text-sm items-end hover:bg-coinsense-blue-darker"
          disabled={submitError}
        >
          Submit
        </button>
      </div>
    </Form>
  );
};

export default TradingForm;
