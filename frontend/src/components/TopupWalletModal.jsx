import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import Spring from "./animations/Spring";

const TopupWalletModal = ({ isOpen, onClose, walletCards }) => {
  const [selectedCard, setSelectedCard] = useState({});
  const [amount, setAmount] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (selectedCard.cardbalance <= 0 || amount > selectedCard.cardbalance) {
      setError(true);
    } else {
      setError(false);
    }
  }, [selectedCard, amount]);

  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  };

  function cardSelecterHandler(event) {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const cardId = selectedOption.getAttribute("data-id");
    const cardbalance = selectedOption.getAttribute("data-cardbalance");
    setSelectedCard({
      cardNumber: event.target.value,
      _id: cardId,
      cardbalance: cardbalance,
    });
  }
  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-50"
        onClick={closeModal}
      ></div>
      <dialog open className="w-[90%] lg:w-[40%] z-50 bg-transparent">
        <Spring>
          <div className="bg-white mt-[90px] pb-1 rounded-xl ">
            <div className="z-4 px-7 pb-9 flex flex-row rounded-xl">
              <div className="w-[100%] leading-6">
                <div className="flex flex-wrap justify-between items-center pt-2">
                  <h2 className="font-semibold">Top up trading wallet</h2>
                  <button
                    className="bg-white border-none pr-0 text-black hover:text-red-500"
                    onClick={closeModal}
                  >
                    &#10006;
                  </button>
                </div>

                <Form method="post" className="flex flex-col">
                  <div className="flex flex-col my-4">
                    <label htmlFor="" className="flex flex-row">
                      Amount ($)<section className="text-red-600">*</section>
                    </label>
                    <input
                      required
                      id="amount"
                      type="float"
                      name="amount"
                      defaultValue={amount}
                      onChange={(event) =>
                        setAmount(parseFloat(event.target.value))
                      }
                    ></input>
                  </div>
                  <div className="my-1 flex flex-row items-center">
                    <label htmlFor="" className="flex flex-row">
                      Card used for top up
                      <section className="text-red-600">*</section> :{" "}
                    </label>
                    <select
                      required
                      name="cardName"
                      id="cardName"
                      className="rounded-m p-1 mt-2 ml-3 text-center rounded-md text-sm font-medium"
                      onChange={cardSelecterHandler}
                      value={selectedCard.cardNumber}
                    >
                      {walletCards.map((card) => (
                        <option
                          key={card._id}
                          value={card.number}
                          data-id={card._id}
                          data-cardbalance={card.cardbalance}
                        >
                          {card.nickname}
                        </option>
                      ))}
                    </select>
                    <input
                      type="hidden"
                      name="cardId"
                      id="cardId"
                      value={selectedCard._id}
                    />
                    <input
                      type="hidden"
                      name="cardbalance"
                      id="cardbalance"
                      value={selectedCard.cardbalance}
                    />
                    <input
                      type="hidden"
                      name="status"
                      id="status"
                      value="topup"
                    />
                  </div>
                  <div className="flex justify-between">
                    <div>
                      {!error && selectedCard.cardNumber && (
                        <div className="flex flex-row items-center">
                          <div
                            className={`${
                              selectedCard.cardNumber && "bg-blue-400"
                            } text-green w-[8px] h-[8px] mt-8 mr-2 rounded-full`}
                          ></div>
                          <p className="text-[10px] mt-8 py-1">
                            {selectedCard.cardNumber &&
                              `Top up will be done from card ${selectedCard.cardNumber.slice(
                                12,
                                16
                              )}`}
                          </p>
                        </div>
                      )}
                      {error && (
                        <div className="flex flex-row items-center">
                          <div
                            className={`${
                              selectedCard.cardNumber && "bg-red-500"
                            } text-green w-[8px] h-[8px] mt-8 mr-2 rounded-full`}
                          ></div>
                          <p className="text-[10px] mt-8 py-1 text-red-500">
                            {selectedCard.cardNumber &&
                              `Insufficient balance in card ${selectedCard.cardNumber.slice(
                                12,
                                16
                              )}`}
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      className="mt-8 py-1 px-3 w-[25%] text-sm items-end hover:bg-coinsense-blue-darker"
                      disabled={error}
                    >
                      Top up
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Spring>
      </dialog>
    </>
  );
};

export default TopupWalletModal;
