import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import totalIncomeImg from "../assets/total-income.png";
import totalExpenseImg from "../assets/total-expenses.png";
import totalInvestmentImg from "../assets/total-investments.png";
import InflowOutflowChart from "../charts/InflowOutflowChart";
import BalanceEvolutionChart from "../charts/BalanceEvolutionChart";

const DashboardPage = () => {
  const headingText = "Here's what's happening with your money today.";
  return (
    <>
      <div className="w-[80%]">
        <div className="bg-white flex flex-col items-start justify-between px-[28px] pt-[45px]">
          <div className="mr-20 mb-8">
            <p className="text-2xl font-bold">Welcome Back, Ali 👋</p>
            <p className="text-sm pt-2 font-light">{headingText} </p>
          </div>
          <div className="flex flex-row gap-5 mb-11 w-[100%]">
            <div className="basis-1/3">
              <button className="flex gap-4 w-[100%] p-4 bg-coinsense-blue text-white rounded-xl	">
                <img src={totalIncomeImg} alt="" className="w-12" />
                <div>
                  <p className="text-sm font-medium">Total Income</p>
                  <p className="text-lg font-semibold">$602.000</p>
                </div>
              </button>
            </div>
            <div className="basis-1/3">
              <button className="flex gap-4 w-[100%] p-4 bg-coinsense-blue text-white rounded-xl	">
                <img src={totalExpenseImg} alt="" className="w-12" />
                <div>
                  <p className="text-sm font-medium">Total Expences</p>
                  <p className="text-lg font-semibold">$602.000</p>
                </div>
              </button>
            </div>
            <div className="basis-1/3">
              <button className="flex gap-4 w-[100%] p-4 bg-coinsense-blue text-white rounded-xl	">
                <img src={totalInvestmentImg} alt="" className="w-12" />
                <div>
                  <p className="text-sm font-medium">Total Investments</p>
                  <p className="text-lg font-semibold">$602.000</p>
                </div>
              </button>
            </div>
          </div>
          <div className="w-[100%] h-[100%]">
            <div className="border-[3px] border-coinsense-blue rounded-xl p-4">
              <h2 className="p-3 text-base font-medium">
                Financial Inflow Outflow
              </h2>
              <InflowOutflowChart />
            </div>
            <div className="border-[3px] border-coinsense-blue rounded-xl p-4 mt-10 mb-10">
              <h2 className="p-3 text-base font-medium">Balance Evolution</h2>
              <BalanceEvolutionChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
