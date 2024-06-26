import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Spring from "../animations/Spring";

const WalletWidget = () => {
  const { wallets } = useLoaderData();
  const [walletList, setWalletList] = useState([]);

  useEffect(() => {
    async function walletDataHandler() {
      const walletData = await wallets;
      setWalletList(walletData);
    }
    walletDataHandler();
  }, [wallets]);

  return (
    <Spring>
      <div className="px-2 lg:p-5 rounded-3xl lg:border lg:shadow-sm lg:hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300 lg:h-[17.4rem]">
        <div className="flex flex-row justify-between pt-3 px-2 items-baseline">
          <div>
            <p className="text-base lg:text-xl font-semibold">Wallets</p>
            <p className="text-xs text-gray-400 pb-1 lg:py-1">
              View of your wallets
            </p>
          </div>

          <div className="h-[20%]  flex flex-col justify-center items-center pb-6">
            <Link
              to={"/dashboard/wallet"}
              className="text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-5 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
            >
              View more
            </Link>
          </div>
        </div>
        <hr />
        <div>
          <table className="w-[100%] ">
            <tbody>
              <tr className="flex flex-row justify-between text-[11px] text-gray-400 px-2 pt-4">
                <th className="text-left font-normal">Card Nickname</th>
                <th className="text-center font-normal">Card number</th>
                <th className="text-right font-normal">Balance</th>
              </tr>
              {walletList.slice(0, 4).map((data) => (
                <tr
                  key={data._id}
                  className="text-xs flex flex-row justify-between px-2 pt-2 lg:leading-[1.4rem]"
                >
                  <td className="text-[10px] lg:text-xs text-left lg:w-[30%] font-semibold">
                    {data.nickname}
                  </td>
                  <td className="text-center lg:w-[40%] pl-9 text-[10px] text-black font-light">
                    {data.number
                      ? "XXXX XXXX XXXX " + String(data.number).slice(-4)
                      : null}
                  </td>
                  <td className="text-[10px] lg:text-xs text-right lg:w-[30%] font-semibold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(data.cardbalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Spring>
  );
};

export default WalletWidget;
