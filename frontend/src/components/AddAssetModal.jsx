import React, { useState } from "react";
import { Form } from "react-router-dom";

const AddAssetModal = ({ isOpen, onClose }) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  if (!isOpen) return null;

  function statusSelecterHandler(event) {
    setSelectedStatus(event.target.value);
  }

  function typeSelecterHandler(event) {
    setSelectedType(event.target.value);
  }

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
              <h2 className="font-semibold">Add Asset</h2>
              <button
                className="bg-white border-none pr-0 text-black hover:text-red-500"
                onClick={closeModal}
              >
                &#10006;
              </button>
            </div>

            <Form method="post" className="flex flex-col">
              <div className="flex flex-col mb-2 mt-8">
                <label htmlFor="">Asset Name</label>
                <input id="name" type="text" name="transaction"></input>
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="">Amount ($)</label>
                <input id="amount" type="float" name="amount"></input>
              </div>

              <div className="flex flex-row justify-between w-[100%] gap-3">
                <div className="my-2 flex flex-col w-[49.5%]">
                  <label htmlFor="">Asset type : </label>
                  <select
                    name="type"
                    id="type"
                    className="rounded-m p-1 rounded-md text-sm font-medium"
                    onChange={typeSelecterHandler}
                  >
                    <option value=""></option>
                    <option value="Tangible">Tangible</option>
                    <option value="Intangible">Intangible</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {selectedType === "Tangible" && (
                  <div className="my-2 flex flex-col w-[49.5%]">
                    <label htmlFor="">Tangible asset category</label>
                    <select
                      name="category"
                      id="category"
                      className="rounded-m p-1 rounded-md text-sm font-medium"
                    >
                      <option value=""></option>
                      <option value="Real Estate">Real estate</option>
                      <option value="Vehicle">Vehicle</option>
                    </select>
                  </div>
                )}
                {selectedType === "Intangible" && (
                  <div className="my-2 flex flex-col w-[49.5%]">
                    <label htmlFor="">Intangible asset category</label>
                    <select
                      name="category"
                      id="category"
                      className="rounded-m p-1 rounded-md text-sm font-medium"
                    >
                      <option value=""></option>
                      <option value="Patent">Patent</option>
                      <option value="Tradmark">Tradmark</option>
                    </select>
                  </div>
                )}
                {selectedType === "Other" && (
                  <input
                    type="hidden"
                    name="category"
                    id="category"
                    value="other"
                  />
                )}
              </div>

              <div className="my-2">
                <label htmlFor="">Status : </label>
                <select
                  name="status"
                  id="status"
                  className="rounded-m p-1 mt-6 ml-3 text-center rounded-md text-sm font-medium"
                  onChange={statusSelecterHandler}
                >
                  <option value=""></option>
                  <option value="owned">Owned</option>
                  <option value="sold">Sold</option>
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

export default AddAssetModal;
