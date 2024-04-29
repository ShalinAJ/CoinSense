import React, { useState } from "react";
import { Form } from "react-router-dom";

const TopupWalletModal = ({ isOpen, onClose, walletCards, onFormSubmit }) => {
  const [selectedCard, setSelectedCard] = useState("");

  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  };

  function cardSelecterHandler(event) {
    setSelectedCard(event.target.value);
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-50"
        onClick={closeModal}
      ></div>
      <dialog open className="mt-[90px] w-[40%] z-50 rounded-xl">
        <div className="z-4 px-7 pb-9 flex flex-row rounded-xl">
          <div className="w-[100%] leading-6">
            <div className="flex flex-wrap justify-between items-center pt-2">
              <h2 className="font-semibold">Top up trading wallet</h2>
              <button
                className="bg-white border-none pr-0 text-black"
                onClick={closeModal}
              >
                &#10006;
              </button>
            </div>

            <Form method="post" className="flex flex-col">
              <div className="flex flex-col my-4">
                <label htmlFor="">
                  Amount ($)<seciton className="text-red-600">*</seciton>
                </label>
                <input id="amount" type="float" name="amount"></input>
              </div>
              <div className="my-1">
                <label htmlFor="">
                  Card used for top up
                  <seciton className="text-red-600">*</seciton> :{" "}
                </label>
                <select
                  name="cardName"
                  id="cardName"
                  className="rounded-m p-1 mt-2 ml-3 text-center rounded-md text-sm font-medium"
                  onChange={cardSelecterHandler}
                  value={selectedCard}
                >
                  {walletCards.map((card) => (
                    <option key={card} value={card.number}>
                      {card.nickname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-end ">
                {selectedCard ? (
                  <div className="flex flex-row items-center">
                    <div
                      className={`${
                        selectedCard && "bg-blue-400"
                      } text-green w-[8px] h-[8px] mt-8 mr-2 rounded-full`}
                    ></div>
                    <p className="text-[10px] mt-8 py-1">
                      {selectedCard &&
                        `Top up will be done from card XXXX XXXX XXXX ${selectedCard.slice(
                          12,
                          16
                        )}`}
                    </p>
                  </div>
                ) : (
                  <p></p>
                )}
                <button className="mt-8 py-1 px-3 w-[25%] text-sm items-end hover:bg-coinsense-blue-darker">
                  Top up
                </button>
              </div>
            </Form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default TopupWalletModal;
