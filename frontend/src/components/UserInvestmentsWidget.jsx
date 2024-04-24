import React from "react";

const UserInvestmentsWidget = ({ investmentTotal, recentInvestments }) => {
  return (
    <>
      <div className="p-5 rounded-3xl flex flex-col border shadow-lg shadow-grey-500/40 h-[23rem]">
        <div className="h-[30%] text-center pt-3">
          <p className="text-sm font-medium text-gray-400">Total Investment</p>
          <p className="text-[28px] font-bold pb-5">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(investmentTotal)}
          </p>
        </div>
        <div className="h-[50%] flex flex-col px-2">
          <p className="text-xs text-gray-400 font-medium">Recent</p>
          {recentInvestments.length > 0 ? (
            <div>
              {recentInvestments.slice(0, 3).map((investment, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between text-[13.5px] font-medium py-3"
                >
                  <p className="w-[30%] text-left">{investment.transaction}</p>
                  <p className="w-[40%] text-center">
                    {new Date(investment.date).toLocaleString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="w-[30%] text-right">PM</p>
                </div>
              ))}
            </div>
          ) : (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-row justify-between text-[13.5px] font-medium py-3"
              >
                <p className="w-[30%] text-left">--</p>
                <p className="w-[40%] text-center">--</p>
                <p className="w-[30%] text-right">--</p>
              </div>
            ))
          )}
        </div>
        <div className="h-[20%] flex flex-col justify-center items-center pt-6 pb-6">
          <button className="text-xs px-10">View all Investments</button>
        </div>
      </div>
    </>
  );
};

export default UserInvestmentsWidget;
