import React from "react";

const EditWalletModal = ({ isOpen, onClose, editWalletId, walletDetails }) => {
  const details = walletDetails.find((wallet) => wallet._id === editWalletId);
  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
  };

  const deleteHandler = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(
      "http://localhost:4000/wallet/" + editWalletId,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Could not delete transaction.");
    }

    window.location.reload();
  };

  const editHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);

      const user = JSON.parse(localStorage.getItem("user"));

      const walletData = {
        name: formData.get("name"),
        number: formData.get("number"),
        expMonth: formData.get("expMonth"),
        expYear: formData.get("expYear"),
        nickname: formData.get("nickname"),
        cardbalance: formData.get("cardbalance"),
      };

      const response = await fetch(
        "http://localhost:4000/wallet/" + editWalletId,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(walletData),
        }
      );

      if (!response.ok) {
        throw new Error("Could not save.");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error editing wallet:", error.message);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-50"
        onClick={closeModal}
      ></div>
      <dialog open className="w-[40%] z-50 rounded-xl">
        <div className="z-4 px-7 pb-9 flex flex-row rounded-xl">
          <div className="w-[100%] leading-6">
            <div className="flex flex-wrap justify-between items-center pt-2">
              <h2 className="font-semibold">Edit Wallet</h2>
              <button
                className="bg-white border-none pr-0 text-black hover:text-red-500"
                onClick={closeModal}
              >
                &#10006;
              </button>
            </div>

            <form
              method="patch"
              onSubmit={editHandler}
              className="flex flex-col"
            >
              <div className="flex flex-col mb-2 mt-8">
                <label htmlFor="">Name on card</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  defaultValue={details ? details.name : ""}
                ></input>
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="">Card number</label>
                <input
                  id="number"
                  type="text"
                  name="number"
                  maxLength="16"
                  defaultValue={details ? details.number : ""}
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
                  defaultValue={details ? details.expMonth : ""}
                ></input>
                /
                <input
                  id="expYear"
                  type="number"
                  name="expYear"
                  maxLength="2"
                  className="w-[13%] mx-2"
                  defaultValue={details ? details.expYear : ""}
                ></input>
              </div>
              <div className="flex flex-row mb-3 mt-3 gap-5 justify-between intems-center">
                <div className="flex flex-col w-[50%]">
                  <input
                    id="nickname"
                    type="hidden"
                    name="nickname"
                    maxLength="10"
                    defaultValue={details ? details.nickname : ""}
                  ></input>
                </div>
                <div className="flex flex-col  w-[50%]">
                  <input
                    id="cardbalance"
                    type="hidden"
                    name="cardbalance"
                    defaultValue={details ? details.cardbalance : ""}
                  ></input>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={deleteHandler}
                  className="bg-transparent border-none text-red-500 text-sm mt-8 py-1 px-3 font-medium"
                >
                  Remove
                </button>
                <button className="mt-8 py-1 px-3 w-[25%] text-sm items-end hover:bg-coinsense-blue-darker">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditWalletModal;
