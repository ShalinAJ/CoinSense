import React, { Suspense, useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import AddAssetModal from "../components/AddAssetModal";
import backArrow from "../assets/back-arrow.png";

const AssetsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <>
      <Suspense>
        <Await>
          {() => <AddAssetModal isOpen={modalOpen} onClose={closeModal} />}
        </Await>
      </Suspense>

      <div className="w-[80%] h-[max-content] bg-white">
        <div className="flex items-start justify-between px-[28px] pt-[29px]">
          <div>
            <Link onClick={prevPage} className="p-0 m-0 w-4">
              <img src={backArrow} alt="" />
            </Link>
            <h2 className="text-2xl font-bold">Assets Data</h2>
            <p className="text-sm pt-2 font-light">
              Detailed view of all your assets
            </p>
          </div>
          <div className="bg-[#bcffde] text-[#02B15A] rounded-lg flex flex-row justify-center py-2 px-4 mr-3 text-[13px]">
            <p className="text-black pr-2">Asset count: </p>
            <p className="font-semibold">123</p>
          </div>
        </div>
        <div className="flex justify-center mt-1 mb-3">
          <div className="flex flex-col justify-center items-center my-10 ">
            <p className="text-sm font-medium text-gray-400">
              Total asset Value
            </p>
            <p className="text-[28px] font-bold pb-1">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(123)}
            </p>
            <button
              onClick={openModal}
              className="bg-[#152DFF] text-white text-xs px-[3rem] hover:bg-coinsense-blue-darker"
            >
              Add Asset
            </button>
          </div>
        </div>
        <hr className="mx-6" />
      </div>
    </>
  );
};

export default AssetsPage;
