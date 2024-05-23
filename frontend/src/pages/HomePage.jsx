import { Link } from "react-router-dom";
import Logo from "../assets/logo-homepage.png";
import Banner from "../components/homepage/Banner";
import About from "../components/homepage/About";
import Dashboard from "../components/homepage/Dashboard";
import Transactions from "../components/homepage/Transactions";
import Investments from "../components/homepage/Investments";
import Wallets from "../components/homepage/Wallets";

const HomePage = () => {
  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="mx-8 md:mx-12 lg:mx-20 bg-white flex flex-row justify-between items-center pt-8 z-20">
          <div>
            <img src={Logo} alt="" className="w-32" />
          </div>
          <div className="hidden md:flex flex-row gap-3">
            <div className="flex flex-row text-[13px] px-4 md:px-8 font-medium gap-10 items-center">
              <p>About</p>
              <p>Contact</p>
              <p>Components</p>
            </div>
            <button className="text-xs font-medium rounded-full px-5 py-2">
              View Demo
            </button>
          </div>
        </div>
        <Banner />
        <About />
        <Dashboard />
        <Transactions />
        <Investments />
        <Wallets />
      </div>
    </>
  );
};

export default HomePage;
