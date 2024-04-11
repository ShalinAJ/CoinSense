import React from "react";
import { NavLink } from "react-router-dom";
import dashboardImg from "../assets/dashboard.svg";
import transactionsImg from "../assets/transactions.png";
import walletImg from "../assets/wallet.png";
import accountImg from "../assets/account.png";
import classes from "./Dashboard.module.css";

const DashboardNavigation = () => {
  return (
    <div className="w-[20%] h-fill bg-[#F3F3F3] px-[28px] py-[37px] mt-4 rounded-r-2xl">
      <div>
        <h2 className="text-[26px] font-extrabold">CoinSense</h2>
      </div>
      <div className="mt-[4.5rem]">
        <ul>
          <li className={classes.list}>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
              to={"/dashboard"}
            >
              <img className="w-4" src={dashboardImg}></img>Dashboard
            </NavLink>
          </li>
          <li className={classes.list}>
            {" "}
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to={"/dashboard/transactions"}
            >
              <img className="w-4" src={transactionsImg}></img>Transaction
            </NavLink>
          </li>
          <li className={classes.list}>
            {" "}
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to={"/dashboard/wallet"}
            >
              <img className="w-4" src={walletImg}></img>Wallet
            </NavLink>
          </li>
          <li className={classes.list}>
            {" "}
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to={"/dashboard/account"}
            >
              <img className="w-4" src={accountImg}></img>Account
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardNavigation;
