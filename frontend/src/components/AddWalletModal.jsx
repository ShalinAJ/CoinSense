import React from "react";
import { Form } from "react-router-dom";

const AddWalletModal = ({ isOpen, onClose }) => {
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
              <h2 className="font-semibold">Add Wallet</h2>
              <button
                className="bg-white border-none pr-0 text-black"
                onClick={closeModal}
              >
                &#10006;
              </button>
            </div>

            <Form method="post" className="flex flex-col">
              <div className="flex flex-col mb-2 mt-8">
                <label htmlFor="">Name on card</label>
                <input id="name" type="text" name="name"></input>
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="">Card number</label>
                <input
                  id="number"
                  type="text"
                  name="number"
                  maxLength="16"
                ></input>
              </div>
              <div className="flex flex-row items-center my-4 ">
                <label htmlFor="">Expiry date : </label>
                <input
                  id="expMonth"
                  type="number"
                  name="expMonth"
                  maxLength="2"
                  className="w-[13%] mx-2"
                ></input>
                /
                <input
                  id="expYear"
                  type="number"
                  name="expYear"
                  maxLength="2"
                  className="w-[13%123] mx-2"
                ></input>
              </div>
              {/* not sure about the bottom input field */}
              {/* 
              <div className="flex flex-row items-center my-3">
                <label htmlFor="">Last balance :</label>
                <input
                  id="lastbalance"
                  type="float"
                  name="lastbalance"
                  className="w-[40%] ml-3 "
                ></input>
              </div> */}
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

export default AddWalletModal;
