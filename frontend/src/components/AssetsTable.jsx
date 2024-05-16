import React, { useState } from "react";
import EditAssetModal from "./EditAssetModal";
import editImg from "../assets/edit.png";

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
      <div className="overflow-y-auto h-[19rem] max-h-[20rem] w-[100%]">
        <table className="w-[100%]">
          <tbody className="text-xs">
            <tr className="leading-[45px]">
              <th className="text-left pl-3 w-[25%]">Asset</th>
              <th className="text-center pr-3 w-[25%]">Asset type</th>
              <th className="text-center pl-3 w-[25%]">Value</th>
              <th className="text-center pl-24 w-[25%]">Status</th>
            </tr>
            {Array.isArray(filteredAssets) && filteredAssets.length > 0 ? (
              filteredAssets.map((asset, index) => (
                <tr key={index} className="leading-[45px]">
                  <td className="text-left pl-3 w-[25%]">{asset.name}</td>
                  <td className="text-center pr-3 w-[25%]">{asset.type}</td>
                  <td className="text-center pl-3 w-[25%]">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(asset.amount)}
                  </td>
                  <td className="mt-3 text-center text-xs flex justify-end pr-2">
                    <p
                      className={
                        (asset.status === "Owned" &&
                          "py-1 w-[45%] bg-[#bcffde] text-[#02B15A] rounded-xl") ||
                        (asset.status === "Sold" &&
                          "py-1 w-[45%] bg-[#ff00001f] text-[#ff0000] rounded-xl")
                      }
                    >
                      {asset.status}
                    </p>

                    <button
                      onClick={() => openModal(asset._id)}
                      className="px-1 pb-1 pt-1 bg-transparent border-none"
                    >
                      <img src={editImg} alt="" className="w-4" />
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
