import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import RightSlide from "../animations/RightSlide";

const TradingWalletWidget = () => {
  const { topups, orderHistory } = useLoaderData();
  const [topupData, setTopupData] = useState();

  useEffect(() => {
    async function topupDataHandler() {
      const data = await topups;
      const dataAmount = data[0].amount;

      const orderHistoryData = await orderHistory;
      let totalAmount = 0;
      if (Array.isArray(orderHistoryData)) {
        orderHistoryData.forEach((item) => {
          if (item.transactionType == "buy") {
            totalAmount += item.amount * item.price;
          } else {
            totalAmount -= item.amount * item.price;
          }
        });
      }

      setTopupData(dataAmount + totalAmount);
    }
    topupDataHandler();
  }, [topups]);

  return (
    <RightSlide>
      <div>
        <div className="p-5 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300 h-[4.35rem]">
          <div>
            <div className="flex flex-row items-center gap-5 justify-between px-2">
              <p className="text-lg font-semibold">Trading wallet balance </p>
              <p className="text-xs font-semibold bg-coinsense-blue text-white px-10 py-[6px] rounded-3xl">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(topupData)}
              </p>{" "}
              <Link
                to={"/dashboard/investment/trading-wallet"}
                className="text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-8 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
              >
                Top up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </RightSlide>
  );
};

export default TradingWalletWidget;
