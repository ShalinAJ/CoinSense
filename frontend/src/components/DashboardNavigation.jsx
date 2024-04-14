import dashboardImg from "../assets/dashboard.png";
import transactionsImg from "../assets/transactions.png";
import walletImg from "../assets/wallet.png";
import accountImg from "../assets/account.png";
import dashboardImgActive from "../assets/dashboard-active.png";
import transactionsImgActive from "../assets/transactions-active.png";
import walletImgActive from "../assets/wallet-active.png";
import accountImgActive from "../assets/account-active.png";
import classes from "./DashboardNavigation.module.css";
import DashboardNavLinks from "./DashboardNavLinks";
import { Form } from "react-router-dom";

const DashboardNavigation = () => {
  return (
    <div className="w-[20%] h-fill bg-[#F3F3F3] px-[28px] py-[37px] mt-4 rounded-r-2xl">
      <div>
        <h2 className="text-[26px] font-extrabold">CoinSense</h2>
      </div>
      <div className="mt-[4.5rem]">
        <ul>
          <li className={classes.list}>
            <DashboardNavLinks
              title={"Dashboard"}
              image={dashboardImg}
              activeImage={dashboardImgActive}
              link={"/dashboard"}
            />
          </li>
          <li className={classes.list}>
            <DashboardNavLinks
              title={"Transactions"}
              image={transactionsImg}
              activeImage={transactionsImgActive}
              link={"/dashboard/transactions"}
            />
          </li>
          <li className={classes.list}>
            <DashboardNavLinks
              title={"Wallet"}
              image={walletImg}
              activeImage={walletImgActive}
              link={"/dashboard/wallet"}
            />
          </li>
          <li className={classes.list}>
            <DashboardNavLinks
              title={"Account"}
              image={accountImg}
              activeImage={accountImgActive}
              link={"/dashboard/account"}
            />
          </li>
        </ul>
        <p>
          <Form action="/logout" method="post">
            <button>Logout</button>
          </Form>
        </p>
      </div>
    </div>
  );
};

export default DashboardNavigation;
