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
import AssetTypeWidget from "../components/widgets/AssetTypeWidget";
import AssetCategoryWidget from "../components/widgets/AssetCategoryWidget.jsx";
import AssetsTable from "../components/AssetsTable.jsx";
import InfoModal from "../components/InfoModal.jsx";
import FadeIn from "../components/animations/FadeIn";
import RightSlide from "../components/animations/RightSlide";
import LeftSlide from "../components/animations/LeftSlide.jsx";

const AssetsPage = () => {
  const { assets } = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [assetType, setAssetType] = useState("All");
  const [modalType, setModalType] = useState();
  const [assetsDetails, setAssetsDetails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAssetsData() {
      const data = await assets;
      setAssetsDetails(data);
    }

    fetchAssetsData();
  }, [assets]);

  const filteredAssets = assetsDetails?.filter((asset) => {
    if (assetType === "All") {
      return true;
    } else {
      return asset.type === assetType;
    }
  });

  let total = 0;
  if (Array.isArray(filteredAssets)) {
    total = filteredAssets.reduce((acc, asset) => acc + asset.amount, 0);
  }

  function infoHandler() {
    setModalType("info");
    setModalOpen(true);
  }

  function addAssetHandler() {
    setModalType("asset");
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <>
      {modalType === "asset" && (
        <Suspense>
          <Await>
            {() => <AddAssetModal isOpen={modalOpen} onClose={closeModal} />}
          </Await>
        </Suspense>
      )}

      {modalType === "info" && (
        <Suspense>
          <Await>
            {() => (
              <InfoModal
                title={"Assets Management"}
                sub={
                  "Welcome to your Assets Management page! This page allows you to manage your assets effectively. Here's what you can do on this page:"
                }
                description={[
                  "Filter and check the assets you own, including tangible, intangible, or other assets, or view all assets at once.",
                  "View the total value of your assets, which updates dynamically when you apply filters. You can also see the total number of assets you own.",
                  "Add new assets to your portfolio seamlessly. After adding assets, you can edit or delete them by clicking on the respective options.",
                  "Explore visual representations of your asset data with two different charts, displaying asset type and category data using distinct colors.",
                  "Assets marked as 'Owned' contribute to your net worth, which is displayed on the main dashboard. If an asset's status changes to 'Sold', it will be removed from your net worth.",
                ]}
                footer={
                  "With these features available, you have everything you need to manage your assets efficiently and make informed investment decisions."
                }
                isOpen={modalOpen}
                onClose={closeModal}
              />
            )}
          </Await>
        </Suspense>
      )}

      <div className="w-[80%] h-[max-content] bg-white">
        <FadeIn>
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
              <button
                className="bg-transparent border-none p-0 m-0"
                onClick={infoHandler}
              >
                <img src={infoImg} alt="" className="w-5" />
              </button>
            </div>
          </div>
        </FadeIn>
        <RightSlide>
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
                  onClick={addAssetHandler}
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
                    {filteredAssets ? filteredAssets.length : ""}
                  </p>
                </div>
              </div>
              <hr />

              <AssetsTable filteredAssets={filteredAssets} />
            </div>
          </div>
        </RightSlide>
        <FadeIn>
          <div className="px-[28px] mb-[40px] flex flex-row justify-between gap-3">
            <AssetTypeWidget assetsDetails={assetsDetails} />

            <AssetCategoryWidget assetsDetails={assetsDetails} />
          </div>
        </FadeIn>
      </div>
    </>
  );
};

export default AssetsPage;
