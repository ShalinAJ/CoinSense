import React, { useState } from "react";
import EditAssetModal from "./EditAssetModal";
import editImg from "../assets/edit.png";
import FadeIn from "./animations/FadeIn";

const AssetsTable = ({ filteredAssets }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [assetIdHandler, setAssetIdHandler] = useState();

  const openModal = (assetId) => {
    setModalOpen(true);
    setAssetIdHandler(assetId);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <EditAssetModal
        editAssetId={assetIdHandler}
        isOpen={modalOpen}
        onClose={closeModal}
        assetDetails={filteredAssets}
      />
      <div className="overflow-y-auto h-[13rem] max-h-[15rem] lg:h-[19rem] lg:max-h-[20rem] w-[100%]">
        <table className="w-[100%]">
          <tbody className="text-[10px] lg:text-xs">
            <tr className="leading-[35px] lg:leading-[45px]">
              <th className="text-left pl-3 w-[25%]">
                <FadeIn>Asset</FadeIn>
              </th>
              <th className="text-center pr-3 w-[25%]">
                <FadeIn>Asset type</FadeIn>
              </th>
              <th className="text-center pl-3 w-[25%]">
                <FadeIn>Value</FadeIn>
              </th>
              <th className="text-center lg:pl-24 w-[25%]">
                <FadeIn>Status</FadeIn>
              </th>
            </tr>
            {Array.isArray(filteredAssets) && filteredAssets.length > 0 ? (
              filteredAssets.map((asset, index) => (
                <tr key={index}>
                  <td className="text-left pl-3 w-[25%] ">
                    <FadeIn>{asset.name}</FadeIn>
                  </td>
                  <td className="text-center pr-3 w-[25%] leading-[35px] lg:leading-[45px]">
                    <FadeIn>{asset.type}</FadeIn>
                  </td>
                  <td className="text-center pl-3 w-[25%] leading-[35px] lg:leading-[45px]">
                    <FadeIn>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(asset.amount)}
                    </FadeIn>
                  </td>
                  <td className="mt-3 text-center text-xs flex justify-end pr-2 leading-[35px] lg:leading-[45px]">
                    <p
                      className={
                        (asset.status === "Owned" &&
                          "text-[10px] lg:text-xs px-1 lg:py-1 lg:w-[45%] h-[20px] lg:h-auto flex flex-row items-center lg:block bg-[#bcffde] text-[#02B15A] rounded-xl") ||
                        (asset.status === "Sold" &&
                          "text-[10px] lg:text-xs px-1 lg:py-1 lg:w-[45%] h-[20px] lg:h-auto flex flex-row items-center lg:block bg-[#ff00001f] text-[#ff0000] rounded-xl")
                      }
                    >
                      <FadeIn>{asset.status}</FadeIn>
                    </p>

                    <button
                      onClick={() => openModal(asset._id)}
                      className="pl-1 pr-0 lg:px-1 pb-1 pt-1 bg-transparent border-none"
                    >
                      <FadeIn>
                        <img src={editImg} alt="" className="w-3 lg:w-4" />
                      </FadeIn>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No assets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AssetsTable;
