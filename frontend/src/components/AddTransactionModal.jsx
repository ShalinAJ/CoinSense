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
        <div className="z-4  bg-[#f3f3f3] px-7 pb-9 flex flex-row rounded-xl">
          <div className="w-[100%] leading-10">
            <div className="flex flex-wrap justify-between items-center pt-2">
              <h2 className="font-semibold">Add Transaction</h2>
              <button
                className="bg-[#f3f3f3] border-none pr-0 text-black"
                onClick={closeModal}
              >
                &#10006;
              </button>
            </div>

            <Form method="post" className="flex flex-col">
              <div className="flex flex-col my-1">
                <label htmlFor="">Transaction</label>
                <input id="name" type="text" name="transaction"></input>
              </div>
              <div className="flex flex-col my-1">
                <label htmlFor="">Amount</label>
                <input id="amount" type="number" name="amount"></input>
              </div>
              <div className="flex flex-col my-1">
                <label htmlFor="">Date</label>
                <input id="date" type="date" name="date"></input>
              </div>
              <div className="my-1">
                <label htmlFor="">Status : </label>
                <select
                  name="status"
                  id="status"
                  className="rounded-m p-1 mt-6 ml-3 text-center rounded-md text-sm font-medium"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                  <option value="investment">Investment</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button className="mt-8 py-1 px-3 w-[25%] text-xs items-end">
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
