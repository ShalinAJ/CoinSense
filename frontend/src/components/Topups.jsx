import { useState } from "react";
import classes from "./Topups.module.css";
import { NavLink } from "react-router-dom";
import TopupsTable from "./TopupsTable";
import WithdrawalsTable from "./WithdrawalsTable";

const Topups = ({ tradingWallet }) => {
  const [transactionType, setTransactionType] = useState("top-up");

  return (
    <div className="px-4 mb-3 mt-[0.4rem]">
      <div className="flex flex-row pb-[0.35rem] gap-3">
        <NavLink
          className={`${classes.tradingWallet} ${
            transactionType === "top-up" ? classes.active : ""
          }`}
          onClick={() => setTransactionType("top-up")}
        >
          Top-ups
        </NavLink>
        <NavLink
          className={`${classes.tradingWallet} ${
            transactionType === "withdraw" ? classes.active : ""
          }`}
          onClick={() => setTransactionType("withdraw")}
        >
          Withdrawals
        </NavLink>
      </div>
      <hr />
      {transactionType === "top-up" && (
        <TopupsTable tradingWallet={tradingWallet} />
      )}
      {transactionType === "withdraw" && (
        <WithdrawalsTable tradingWallet={tradingWallet} />
      )}
    </div>
  );
};

export default Topups;
