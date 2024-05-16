import React, { useState, useEffect } from "react";

const EditAssetModal = ({ isOpen, onClose, editAssetId, assetDetails }) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    if (
      assetDetails &&
      assetDetails.find((asset) => asset._id === editAssetId)
    ) {
      setSelectedType(
        assetDetails.find((asset) => asset._id === editAssetId).type
      );
    }
  }, [assetDetails, editAssetId]);

  function statusSelecterHandler(event) {
    setSelectedStatus(event.target.value);
  }

  function typeSelecterHandler(event) {
    setSelectedType(event.target.value);
  }

  const details =
    assetDetails && assetDetails.find((asset) => asset._id === editAssetId);
  if (!isOpen) return null;
  console.log(details);
  const closeModal = () => {
    onClose();
  };

  const deleteHandler = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("http://localhost:4000/asset/" + editAssetId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Could not delete asset.");
    }

    window.location.reload();
  };

  const editHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);

      const user = JSON.parse(localStorage.getItem("user"));

      const assetData = {
        name: formData.get("name"),
        amount: formData.get("amount"),
        type: formData.get("type"),
        category: formData.get("category"),
        status: formData.get("status"),
      };

      const response = await fetch(
        "http://localhost:4000/asset/" + editAssetId,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(assetData),
        }
      );

      if (!response.ok) {
        throw new Error("Could not save.");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error editing asset:", error.message);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-50"
        onClick={closeModal}
      ></div>
      <dialog open className="w-[40%] top-20 z-50 rounded-xl">
        <div className="z-4 px-7 pb-9 flex flex-row rounded-xl">
          <div className="w-[100%] leading-6">
            <div className="flex flex-wrap justify-between items-center pt-2">
              <h2 className="font-semibold">Edit Asset</h2>
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
                <label htmlFor="">Asset Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  defaultValue={details ? details.name : ""}
                ></input>
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="">Amount ($)</label>
                <input
                  id="amount"
                  type="float"
                  name="amount"
                  defaultValue={details ? details.amount : ""}
                ></input>
              </div>

              <div className="flex flex-row justify-between w-[100%] gap-3">
                <div className="my-2 flex flex-col w-[49.5%]">
                  <label htmlFor="">Asset type : </label>
                  <select
                    name="type"
                    id="type"
                    className="rounded-m p-1 rounded-md text-sm font-medium"
                    onChange={typeSelecterHandler}
                    value={selectedType}
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
                      defaultValue={details ? details.category : ""}
                    >
                      <option value=""></option>
                      <option value="Real Estate">Real estate</option>
                      <option value="Vehicle">Vehicle</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Furniture">Furniture</option>
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
                      defaultValue={details ? details.category : ""}
                    >
                      <option value=""></option>
                      <option value="Patent">Patent</option>
                      <option value="Trademark">Trademark</option>
                      <option value="Software">Software</option>
                      <option value="Website">Website</option>
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
                  defaultValue={details ? details.status : ""}
                >
                  <option value=""></option>
                  <option value="Owned">Owned</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={deleteHandler}
                  className="bg-transparent border-none text-red-500 text-sm mt-8 py-1 px-3 font-medium"
                >
                  Remove
                </button>
                <button
                  type="submit"
                  className="mt-8 py-1 px-3 w-[25%] text-sm items-end hover:bg-coinsense-blue-darker"
                >
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

export default EditAssetModal;
