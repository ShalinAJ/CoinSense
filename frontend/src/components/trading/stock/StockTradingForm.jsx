import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";

const StockTradingForm = ({
  currentPrice,
  tradeAmountType,
  transactionType,
  topups,
  selectToken,
  investedTotal,
  orderHistoryData,
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
  const [orderHistory, setOrderHistory] = useState(null);

  useEffect(() => {
    async function fetchOrderHistoryData() {
      const data = await orderHistoryData;
      setOrderHistory(data);
    }

    fetchOrderHistoryData();
  }, [orderHistoryData]);

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
  }, [tradeAmountType, currentPrice, totalAmount, inputTotal]);

  useEffect(() => {
    if (transactionType == "buy") {
      if (total > tradeWalletData) {
        setSubmitError(true);
        return;
      }
    }
    setSubmitError(false);
  }, [total, transactionType]);

  const handleSubmit = async (e) => {
    let url = "";
    let price = 0;
    if (tradeAmountType == "market") {
      url = "orderhistory";
      price = currentPrice;
    } else if (tradeAmountType == "limit") {
      url = "openorder";
      price = inputTotal;
    }

    if (transactionType == "sell") {
      let sellTotal = 0;
      orderHistory.forEach((order) => {
        if (order.transactionType == "buy") {
          if (selectToken == order.name) {
            sellTotal += order.price * order.amount;
          }
        } else if (order.transactionType == "sell") {
          if (selectToken == order.name) {
            sellTotal -= order.price * order.amount;
          }
        }
      });
      if (price * totalAmount >= sellTotal) {
        setSubmitError(true);
        console.log("don't hv funds");
        throw json({ message: "You don't have enough funds" });
      }
    }

    const response = await fetch(`http://localhost:4000/${url}/new`, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: selectToken,
        transactionType,
        price,
        amount: totalAmount,
        status: "Crypto",
        prevPrice: +currentPrice,
        user_id,
      }),
    });

    if (!response.ok) {
      throw json({ message: "Could not save." }, { status: 500 });
    }

    window.location.reload();
  };

  let tradingWalletRemaining = tradeWalletData;

  if (Array.isArray(orderHistory)) {
    orderHistory.forEach((item) => {
      if (item.transactionType == "buy") {
        tradingWalletRemaining -= item.amount * item.price;
      }
      if (item.transactionType == "sell") {
        tradingWalletRemaining += item.amount * item.price;
      }
    });
  }

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
        <label htmlFor="">Amount ({selectToken})</label>
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
            }).format(tradingWalletRemaining)}
          </p>
        </div>
        <div className="flex flex-row items-center text-xs font-semibold gap-2">
          <p>
            {totalAmount} {selectToken}
          </p>
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

export default StockTradingForm;
