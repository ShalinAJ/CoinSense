import React, { Suspense, useEffect, useState } from "react";
import {
  Await,
  Link,
  NavLink,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import AddAssetModal from "../components/AddAssetModal";
import backArrow from "../assets/back-arrow.png";
import classes from "./Assets.module.css";
import infoImg from "../assets/info.png";

const AssetsPage = () => {
  const { assets } = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [assetType, setAssetType] = useState("All");
  const [assetsDetails, setAssetsDetails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAssetsData() {
      const data = await assets;
      setAssetsDetails(data);
    }

    fetchAssetsData();
  }, [assets]);

  let total = 0;
  if (Array.isArray(assetsDetails)) {
    assetsDetails.forEach((asset) => {
      total += asset.amount;
    });
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const prevPage = () => {
    navigate(-1);
  };

  const filteredAssets = assetsDetails?.filter((asset) => {
    if (assetType === "All") {
      return true;
    } else {
      return asset.type === assetType;
    }
  });

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

          <div className="mr-3">
            <img src={infoImg} alt="" className="w-5" />
          </div>
        </div>
        <div className=" mx-[28px] my-9 py-4 mb-10 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
          <div className="px-5">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                <NavLink
                  className={`${classes.assetsLink} ${
                    assetType === "All" ? classes.active : ""
                  }`}
                  onClick={() => {
                    setAssetType("All");
                  }}
                >
                  All
                </NavLink>
                <NavLink
                  className={`${classes.assetsLink} ${
                    assetType === "Tangible" ? classes.active : ""
                  }`}
                  onClick={() => {
                    setAssetType("Tangible");
                  }}
                >
                  Tangible
                </NavLink>
                <NavLink
                  className={`${classes.assetsLink} ${
                    assetType === "Intangible" ? classes.active : ""
                  }`}
                  onClick={() => {
                    setAssetType("Intangible");
                  }}
                >
                  Intangible
                </NavLink>
                <NavLink
                  className={`${classes.assetsLink} ${
                    assetType === "Other" ? classes.active : ""
                  }`}
                  onClick={() => {
                    setAssetType("Other");
                  }}
                >
                  Other
                </NavLink>
              </div>
              <button
                onClick={openModal}
                className="bg-[#152DFF] text-white text-[11px] px-[3rem] hover:bg-coinsense-blue-darker"
              >
                Add Asset
              </button>
            </div>
            <div className="flex flex-row items-center gap-10 mt-5 mb-3">
              <div className="flex flex-row items-center gap-3">
                <p className="text-xs font-medium text-gray-400">
                  Total asset Value :
                </p>
                <p className="text-xs font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(total)}
                </p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <p className="text-xs font-medium text-gray-400">
                  Total assets :
                </p>
                <p className="text-sm font-semibold">
                  {assetsDetails ? assetsDetails.length : ""}
                </p>
              </div>
            </div>
            <hr />
            <div className="overflow-y-auto h-[26rem] max-h-[23rem] w-[100%]">
              <table className="w-[100%]">
                <tbody className="text-xs">
                  <tr className="leading-[45px]">
                    <th className="text-left pl-3 w-[25%]">Asset</th>
                    <th className="text-center pr-3 w-[25%]">Asset type</th>
                    <th className="text-center pl-3 w-[25%]">Value</th>
                    <th className="text-right pr-3 w-[25%]">Status</th>
                  </tr>
                  {Array.isArray(filteredAssets) &&
                  filteredAssets.length > 0 ? (
                    filteredAssets.map((asset, index) => (
                      <tr key={index} className="leading-[45px]">
                        <td className="text-left pl-3 w-[25%]">{asset.name}</td>
                        <td className="text-center pr-3 w-[25%]">
                          {asset.type}
                        </td>
                        <td className="text-center pl-3 w-[25%]">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(asset.amount)}
                        </td>
                        <td className="text-right pr-3 w-[25%]">
                          {asset.status}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetsPage;
