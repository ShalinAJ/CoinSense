import React from "react";
import Spring from "./animations/Spring";

const NetworthModal = ({
  isOpen,
  onClose,
  IOdifference,
  assets,
  wallets,
  topups,
  tradeData,
  total,
}) => {
  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  };

  if (topups == undefined) {
    topups = 0;
  }

  return (
    <>
      {" "}
      <div
        className="fixed inset-0 bg-black opacity-50 z-50"
        onClick={closeModal}
      ></div>
      <dialog open className="bg-transparent w-[40%] z-50">
        <Spring>
          <div className="bg-white mt-[90px] pb-1 rounded-xl ">
            <div className="z-4 px-7 pb-6 flex flex-row rounded-xl">
              <div className="w-[100%]">
                <div className="flex flex-wrap justify-between items-center pt-2">
                  <h2 className="font-semibold">Net Worth Overview</h2>
                  <button
                    className="bg-white border-none pr-0 text-black hover:text-red-500"
                    onClick={closeModal}
                  >
                    &#10006;
                  </button>
                </div>
              </div>
            </div>
            <div className="px-7 mb-12 text-xs font-medium flex flex-col gap-3">
              <p className="mb-6">
                The 'Net Worth Overview' provides a detailed breakdown of your
                current financial position. Here's what each section entails:
              </p>
              <div className="flex flex-row justify-between">
                <p>Difference of Income and Expenses</p>
                <p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(IOdifference)}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Balance total of all owned assets</p>
                <p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(assets)}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Stock and Crypto Total</p>
                <p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(tradeData[0] + tradeData[1])}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Balance total of all wallets</p>
                <p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(wallets)}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Balance total of trading wallet</p>
                <p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(topups)}
                </p>
              </div>
              <hr />
              <div className="flex flex-row justify-between">
                <p>Net Worth</p>
                <p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(total)}
                </p>
              </div>
              <hr />
            </div>
          </div>
        </Spring>
      </dialog>
    </>
  );
};

export default NetworthModal;
