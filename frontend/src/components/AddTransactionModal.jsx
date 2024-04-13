import React, { useState } from "react";
import { Form } from "react-router-dom";

const AddTransactionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  };

  return (
    <dialog open>
      <div className="bg-black p-9">
        <div className="leading-10">
          <button onClick={closeModal}>X</button>
          <h2 className="text-white">Add Transaction</h2>
          <Form method="post" className="flex flex-col">
            <input type="text" name="transaction"></input>
            <input type="date" name="date"></input>
            <input type="number" name="amount"></input>
            <input type="text" name="status"></input>
            <button>Add</button>
          </Form>
        </div>
      </div>
    </dialog>
  );
};

export default AddTransactionModal;
