import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const DashboardPage = () => {
  const headingText = "Here's what's happening with your money today.";
  return (
    <>
      <div className="ml-10 mt-8">
        <div className="mr-20 mb-10">
          <p className="text-xl font-bold">Welcome Back, Ali 👋</p>
          <p>{headingText} </p>
        </div>
        <div className="flex flex-row gap-20 mb-20">
          <div className="basis-1/3">
            <button className="w-[200px] h-[72px] bg-coinsense-blue text-white rounded-xl	">
              <p>Total Income</p>
              <p>$602.000</p>
            </button>
          </div>
          <div className="basis-1/3">
            <button className="w-[200px] h-[72px] bg-coinsense-blue text-white rounded-xl	">
              <p>Total Expences</p>
              <p>$602.000</p>
            </button>
          </div>
          <div className="basis-1/3">
            <button className="w-[200px] h-[72px] bg-coinsense-blue text-white rounded-xl	">
              <p>Total Investments</p>
              <p>$602.000</p>
            </button>
          </div>
        </div>
        <div>
          <div className="border-4 border-coinsense-blue rounded-xl p-4">
            <Bar
              data={{
                labels: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                datasets: [
                  {
                    backgroundColor: "#152DFF",
                    label: "inflow",
                    data: [
                      200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
                      1300,
                    ],
                  },
                  {
                    backgroundColor: "#C4C4C4",
                    label: "outflow",
                    data: [
                      200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
                      1300,
                    ],
                  },
                ],
              }}
            />
          </div>
          <div className="border-4 border-coinsense-blue rounded-xl p-4 mt-10"></div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
