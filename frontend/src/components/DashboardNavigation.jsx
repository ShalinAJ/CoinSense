import Logo from "../assets/logo-homepage.png";
import dashboardImg from "../assets/dashboard.png";
import transactionsImg from "../assets/transactions.png";
import investmentImg from "../assets/investment.png";
import walletImg from "../assets/wallet.png";
import accountImg from "../assets/account.png";
import dashboardImgActive from "../assets/dashboard-active.png";
import transactionsImgActive from "../assets/transactions-active.png";
import investmentImgActive from "../assets/investment-active.png";
import walletImgActive from "../assets/wallet-active.png";
import accountImgActive from "../assets/account-active.png";
import logOut from "../assets/log-out.png";
import classes from "./DashboardNavigation.module.css";
import DashboardNavLinks from "./DashboardNavLinks";
import { Form } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

const DashboardNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="hidden lg:block w-[20%]">
        <div className="fixed w-[20%] top-0 left-0 h-screen h-fill bg-[#f3f3f3] px-[28px] py-[37px] mt-4 rounded-r-2xl">
          <div>
            <Link to="/">
              <h2 className="text-[26px] font-extrabold">CoinSense</h2>
            </Link>
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
                  title={"Investments"}
                  image={investmentImg}
                  activeImage={investmentImgActive}
                  link={"/dashboard/investment"}
                />
              </li>
              <li className={classes.list}>
                <DashboardNavLinks
                  title={"Wallets"}
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
              <Form
                action="/logout"
                method="post"
                className="fixed bottom-8 left-8"
              >
                <button className="p-3 bg-transparent border-solid border-2 border-red-400 hover:border-red-400 hover:bg-red-100">
                  <img className="w-4" src={logOut} alt="" />
                </button>
              </Form>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="lg:hidden px-4 pb-4 bg-coinsense-blue flex flex-row justify-between items-center pt-5 z-20">
          <div>
            <p className="text-white text-xl font-semibold">CoinSense</p>
          </div>
          <div className="flex items-center">
            <div onClick={toggleMenu} className="cursor-pointer">
              <div className="w-6 h-[0.2rem] rounded-full bg-white mb-1"></div>
              <div className="w-6 h-[0.2rem] rounded-full bg-white mb-1"></div>
              <div className="w-6 h-[0.2rem] rounded-full bg-white "></div>
            </div>
          </div>
        </div>
        <div
          className={`fixed z-30 top-0 right-0 w-full h-full bg-white transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center pt-[5rem] h-full">
            <div
              onClick={toggleMenu}
              className="cursor-pointer absolute top-8 right-8 text-lg"
            >
              &#10006;
            </div>

            <Link to="/dashboard" onClick={toggleMenu}>
              <p className="pb-3 text-2xl font-semibold text-coinsense-blue">
                Dashboard
              </p>
            </Link>
            <Link to="/dashboard/transactions" onClick={toggleMenu}>
              <p className="py-3 text-2xl font-semibold text-coinsense-blue">
                Transactions
              </p>
            </Link>
            <Link to="/dashboard/investment" onClick={toggleMenu}>
              <p className="py-3 text-2xl font-semibold text-coinsense-blue">
                Investments
              </p>
            </Link>
            <Link to="/dashboard/wallet" onClick={toggleMenu}>
              <p className="py-3 text-2xl font-semibold text-coinsense-blue">
                Wallets
              </p>
            </Link>
            <Link to="/dashboard/account" onClick={toggleMenu}>
              <p className="py-3 text-2xl font-semibold text-coinsense-blue">
                Account
              </p>
            </Link>
            <Form action="/logout" method="post">
              <button className="px-10 my-7 bg-transparent rounded-full border-solid border-2 text-red-600 border-red-400 hover:border-red-400 hover:bg-red-100">
                <p>Logout</p>
              </button>
            </Form>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default DashboardNavigation;
