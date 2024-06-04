import React, { useState } from "react";
import { Form } from "react-router-dom";
import Spring from "./animations/Spring";

const AddTransactionModal = ({ isOpen, onClose, walletCards }) => {
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  };

  function cardSelecterHandler(event) {
    setSelectedCard(event.target.value);
  }

  function statusSelecterHandler(event) {
    setSelectedStatus(event.target.value);
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
                  <h2 className="font-semibold">Add Transaction</h2>
                  <button
                    className="bg-white border-none pr-0 text-black hover:text-red-500"
                    onClick={closeModal}
                  >
                    &#10006;
                  </button>
                </div>

                <Form method="post" className="flex flex-col">
                  <div className="flex flex-col mb-2 mt-4 lg:mt-8">
                    <label htmlFor="">Transaction</label>
                    <input
                      id="name"
                      type="text"
                      name="transaction"
                      required
                    ></input>
                  </div>
                  <div className="flex flex-col my-3">
                    <label htmlFor="">Amount ($)</label>
                    <input
                      id="amount"
                      type="float"
                      name="amount"
                      required
                    ></input>
                  </div>
                  <div className="flex flex-col my-2">
                    <label htmlFor="">Date</label>
                    <input id="date" type="date" name="date" required></input>
                  </div>
                  <div className="my-2">
                    <label htmlFor="">Status : </label>
                    <select
                      name="status"
                      id="status"
                      className="rounded-m p-1 mt-4 lg:mt-6 ml-3 text-center rounded-md text-sm font-medium"
                      onChange={statusSelecterHandler}
                      required
                    >
                      <option value=""></option>
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                    </select>
                  </div>
                  <div className="my-1">
                    <label htmlFor="">Card used for transaction : </label>
                    <select
                      name="card"
                      id="card"
                      className="rounded-m p-1 mt-4 lg:mt-6 ml-3 text-center rounded-md text-sm font-medium"
                      onChange={cardSelecterHandler}
                      value={selectedCard}
                      required
                    >
                      {walletCards.map((card) => (
                        <option key={card.number} value={card.number}>
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
                            (selectedStatus === "Income" && "bg-green-400") ||
                            (selectedStatus === "Expense" && "bg-red-400")
                          } text-green w-[8px] h-[8px] mt-8 mr-2 rounded-full`}
                        ></div>
                        <p className="text-[10px] mt-8 py-1">
                          {(selectedStatus === "Income" &&
                            `Transaction will be credited to card XXXX XXXX XXXX ${selectedCard.slice(
                              12,
                              16
                            )}`) ||
                            (selectedStatus === "Expense" &&
                              `Transaction will be debited from card XXXX XXXX XXXX  ${selectedCard.slice(
                                12,
                                16
                              )}`)}
                        </p>
                      </div>
                    ) : (
                      <p></p>
                    )}
                    <button className="mt-8 py-1 px-3 w-[25%] text-sm items-end hover:bg-coinsense-blue-darker">
                      Add
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

export default AddTransactionModal;
