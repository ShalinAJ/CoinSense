import { useState } from "react";
import Logo from "../assets/logo-homepage.png";
import Banner from "../components/homepage/Banner";
import About from "../components/homepage/About";
import Dashboard from "../components/homepage/Dashboard";
import Transactions from "../components/homepage/Transactions";
import Investments from "../components/homepage/Investments";
import Wallets from "../components/homepage/Wallets";
import Developers from "../components/homepage/Developers";
import Assets from "../components/homepage/Assets";
import IncomeExpenses from "../components/homepage/IncomeExpenses";
import TradingWallet from "../components/homepage/TradingWallet";
import CryptoStock from "../components/homepage/CryptoStock";
import LoginRegister from "../components/homepage/LoginRegister";
import Account from "../components/homepage/Account";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="bg-white min-h-screen relative">
        <div className="mx-8 md:mx-12 lg:mx-20 bg-white flex flex-row justify-between items-center pt-8 z-20">
          <div>
            <img src={Logo} alt="" className="w-32" />
          </div>
          <div className="hidden md:flex flex-row">
            <div className="flex flex-row px-4 md:px-8 font-medium gap-10 items-center">
              <a href="#about" className="p-0 text-[13px]">
                <p>About</p>
              </a>
              <a href="#developers" className="p-0 text-[13px]">
                <p>Developers</p>
              </a>
            </div>
            <Link to="/login" className="p-0">
              <button className="text-xs font-medium rounded-full px-5 py-2">
                View Demo
              </button>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <div onClick={toggleMenu} className="cursor-pointer">
              <div className="w-6 h-[0.2rem] rounded-full bg-coinsense-blue mb-1"></div>
              <div className="w-6 h-[0.2rem] rounded-full bg-coinsense-blue mb-1"></div>
              <div className="w-6 h-[0.2rem] rounded-full bg-coinsense-blue"></div>
            </div>
          </div>
        </div>

        <div
          className={`fixed z-30 top-0 right-0 w-full h-full bg-white transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center pt-[10rem] h-full">
            <div
              onClick={toggleMenu}
              className="cursor-pointer absolute top-8 right-8 text-lg"
            >
              &#10006;
            </div>

            <a href="#about" onClick={toggleMenu}>
              <p className="py-8 text-3xl font-semibold text-coinsense-blue">
                About
              </p>
            </a>
            <a href="#developers" onClick={toggleMenu}>
              <p className="py-8 text-3xl font-semibold text-coinsense-blue">
                Developers
              </p>
            </a>
            <Link to="/login" className="p-0">
              <button className="text-lg font-semibold rounded-full px-5 py-2 mt-12 bg-coinsense-blue text-white">
                View Demo
              </button>
            </Link>
          </div>
        </div>

        <Banner />
        <About />
        <Dashboard />
        <Transactions />
        <Investments />
        <Wallets />
        <Assets />
        <IncomeExpenses />
        <TradingWallet />
        <CryptoStock />
        <LoginRegister />
        <Account />
        <Developers />
        <div className="pt-4 pb-5 flex flex-row justify-center">
          <p className="text-xs font-medium text-coinsense-blue">
            CoinSense © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
