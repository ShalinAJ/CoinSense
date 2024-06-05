import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spring from "../animations/Spring";
import FadeIn from "../animations/FadeIn";

const UserInvestmentsWidget = ({ investmentTotal, recentInvestments }) => {
  return (
    <>
      <Spring>
        <div className="lg:p-5 rounded-3xl flex flex-col lg:border lg:shadow-sm lg:hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300 lg:h-[23rem]">
          <div className="h-[30%] text-center pt-3">
            <p className="text-xs lg:text-sm font-medium text-gray-400">
              Total Invested
            </p>
            <p className="text-lg lg:text-[24px] font-bold pb-5">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(investmentTotal)}
            </p>
          </div>
          <div className="lg:h-[50%] flex flex-col px-2">
            <p className="text-xs text-gray-400 font-medium">Recent</p>
            {recentInvestments.length > 0 ? (
              <div>
                {recentInvestments.slice(0, 3).map((investment, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between text-xs lg:text-[13.5px] font-medium py-1 lg:py-3"
                  >
                    <p className="w-[30%] text-left">
                      <FadeIn>{investment.name}</FadeIn>
                    </p>
                    <p className="w-[40%] text-center">
                      <FadeIn>
                        {new Date(investment.createdAt).toLocaleString(
                          "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </FadeIn>
                    </p>
                    <div
                      className={"w-[30%] flex flex-row justify-end text-xs"}
                    >
                      <p
                        className={`${
                          investment.transactionType === "buy"
                            ? "bg-[#bcffde] text-[#02B15A]"
                            : "bg-[#ff00001f] text-[#ff0000]"
                        } text-right px-[6px] py-[6px] rounded-lg`}
                      >
                        <FadeIn>{investment.transactionType}</FadeIn>
                      </p>
                    </div>
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
          <div className="h-[20%]  flex flex-col justify-center items-center pt-4 pb-8 lg:pt-6 lg:pb-6">
            <Link
              to={"/dashboard/investment/user-investments"}
              className="text-white text-xs px-10 py-[7.5px] bg-coinsense-blue rounded-full lg:rounded-lg"
            >
              View all Investments
            </Link>
          </div>
        </div>
      </Spring>
    </>
  );
};

export default UserInvestmentsWidget;
