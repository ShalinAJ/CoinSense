import { useState } from "react";
import { Form } from "react-router-dom";

const EditAccountInfo = ({ isOpen, onClose, onHandleSubmit }) => {
  const [formData, setFormData] = useState({
    address: "",
    phoneNo: "",
    birthday: "",
    gender: "",
  });

  if (!isOpen) return null;

  const handleChange = (identifier, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [identifier]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onHandleSubmit(formData);
    window.location.reload();
  };

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
              <h2 className="font-semibold">Edit Account Details</h2>
              <button
                className="bg-white border-none pr-0 text-black"
                onClick={closeModal}
              >
                &#10006;
              </button>
            </div>

            <Form
              method="post"
              className="flex flex-col"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col mb-2 mt-8">
                <label htmlFor="">Address</label>
                <input
                  id="name"
                  type="text"
                  name="address"
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="">Phone </label>
                <input
                  id="phoneNo"
                  type="number"
                  name="phoneNo"
                  onChange={(e) => handleChange("phoneNo", e.target.value)}
                />
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="">Birthday</label>
                <input
                  id="Birthday"
                  type="date"
                  name="Birthday"
                  onChange={(e) => handleChange("birthday", e.target.value)}
                />
              </div>
              <div className="my-2">
                <label htmlFor="">Gender : </label>
                <select
                  name="status"
                  id="status"
                  className="rounded-m p-1 mt-6 ml-3 text-center rounded-md text-sm font-medium"
                  onChange={(e) => handleChange("gender", e.target.value)}
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-row justify-end">
                <button className="mt-8 py-1 px-3 w-[25%] text-sm hover:bg-coinsense-blue-darker">
                  save
                </button>
              </div>
            </Form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditAccountInfo;
