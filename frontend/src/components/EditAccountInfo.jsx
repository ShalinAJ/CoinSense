import { Form } from "react-router-dom";

const EditAccountInfo = ({ isOpen, onClose, walletCards }) => {
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
              <h2 className="font-semibold">Edit Account Details</h2>
              <button
                className="bg-white border-none pr-0 text-black"
                onClick={closeModal}
              >
                &#10006;
              </button>
            </div>

            <Form method="post" className="flex flex-col">
              <div className="flex flex-col mb-2 mt-8">
                <label htmlFor="">Address</label>
                <input id="name" type="text" name="address"></input>
              </div>
              <div className="flex flex-col my-3">
                <label htmlFor="">Phone </label>
                <input id="phoneNum" type="text" name="phoneNum"></input>
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="">Birthday</label>
                <input id="Birthday" type="date" name="Birthday"></input>
              </div>
              <div className="my-2">
                <label htmlFor="">Gender : </label>
                <select
                  name="status"
                  id="status"
                  className="rounded-m p-1 mt-6 ml-3 text-center rounded-md text-sm font-medium"
                >
                  <option value=""></option>
                  <option value="Income">Male</option>
                  <option value="Expense">Female</option>
                  <option value="Investment">Other</option>
                </select>
              </div>
            </Form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditAccountInfo;
