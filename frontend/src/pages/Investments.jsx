import InvestmentChart from "../charts/InvestmentChart";

const InvestmentsPage = () => {
  return (
    <div className="w-[80%] h-[max-content] bg-white px-[28px] pt-[45px]">
      <div className="text-2xl font-bold">Investments Page</div>
      <p className="text-sm pt-2 font-light">
        Detailed view of your investments{" "}
      </p>
      <div className="flex flex-row justify-between pt-6 pb-10">
        <div className="w-[48.5%]">
          <div className="p-5 rounded-3xl flex flex-col border shadow-lg shadow-grey-500/40 h-[23rem]">
            <div className="text-center pt-3">
              <p className="text-sm font-medium text-gray-400">
                Total Investment
              </p>
              <p className="text-[28px] font-bold pb-5">$1244.99</p>
            </div>
            <div className="flex flex-col px-2">
              <p className="text-xs text-gray-400 font-medium">Recent</p>
              <div className="flex flex-row justify-between text-[13.5px] font-medium pb-3 pt-2">
                <p className="w-[30%] text-left">Investments</p>
                <p className="w-[40%] text-center">tue,19 Apr 2020</p>
                <p className="w-[30%] text-right">PM</p>
              </div>
              <div className="flex flex-row justify-between text-[13.5px] font-medium py-3">
                <p className="w-[30%] text-left">Investments</p>
                <p className="w-[40%] text-center">tue,19 Apr 2020</p>
                <p className="w-[30%] text-right">PM</p>
              </div>
              <div className="flex flex-row justify-between text-[13.5px] font-medium py-3">
                <p className="w-[30%] text-left">Investments</p>
                <p className="w-[40%] text-center">tue,19 Apr 2020</p>
                <p className="w-[30%] text-right">PM</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center pt-6 pb-6">
              <button className="text-xs px-10">View all Investments</button>
            </div>
          </div>
        </div>
        <div className="w-[48.5%]">
          <div className="p-5 rounded-3xl flex flex-col border shadow-lg shadow-grey-500/40 h-[23rem]">
            <div className="pt-3 px-2">
              <p className="text-xl font-semibold">Markets</p>
              <p className="text-xs text-gray-400 py-1">
                Choose a market to make your investment
              </p>
              <div className="flex flex-col">
                <button className="text-black rounded-full p-4 box-shadow bg-transparent border-[1px] border-[#152DFF] flex flex-row justify-between items-center mt-3 mb-2">
                  <p className="text-sm pl-4">Crypto</p>
                  <p className="text-sm pr-4">--V</p>
                </button>
                <button className="text-black rounded-full p-4 box-shadow bg-transparent border-[1px] border-[#152DFF] flex flex-row justify-between items-center my-2">
                  <p className="text-sm pl-4">Crypto</p>
                  <p className="text-sm pr-4">--V</p>
                </button>
                <button className="text-black rounded-full p-4 box-shadow bg-transparent border-[1px] border-[#152DFF] flex flex-row justify-between items-center my-2">
                  <p className="text-sm pl-4">Crypto</p>
                  <p className="text-sm pr-4">--V</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <InvestmentChart />
      </div>
    </div>
  );
};

export default InvestmentsPage;
