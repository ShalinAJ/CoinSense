import React, { useState } from "react";
import { Form } from "react-router-dom";

const AddTransactionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  };

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
              <h2 className="font-semibold">Add Transaction</h2>
              <button
                className="bg-white border-none pr-0 text-black"
                onClick={closeModal}
              >
                &#10006;
              </button>
            </div>

            <Form method="post" className="flex flex-col">
              <div className="flex flex-col mb-2 mt-8">
                <label htmlFor="">Transaction</label>
                <input id="name" type="text" name="transaction"></input>
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="">Amount ($)</label>
                <input id="amount" type="float" name="amount"></input>
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="">Date</label>
                <input id="date" type="date" name="date"></input>
              </div>
              <div className="my-2">
                <label htmlFor="">Status : </label>
                <select
                  name="status"
                  id="status"
                  className="rounded-m p-1 mt-6 ml-3 text-center rounded-md text-sm font-medium"
                >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                  <option value="Investment">Investment</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button className="mt-8 py-1 px-3 w-[25%] text-sm items-end hover:bg-coinsense-blue-darker">
                  Add
                </button>
              </div>
            </Form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddTransactionModal;
