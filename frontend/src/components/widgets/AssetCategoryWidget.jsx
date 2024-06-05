import React from "react";
import AssetTypeChart from "../../charts/AssetDoughnutChart";

const AssetCategoryWidget = ({ assetsDetails }) => {
  const calculateAssetData = (assetsDetails) => {
    if (
      !assetsDetails ||
      !Array.isArray(assetsDetails) ||
      assetsDetails.length === 0
    )
      return [];

    const assetCategories = {};
    let totalOwnedAssets = 0;

    assetsDetails.forEach((asset) => {
      const { category, status } = asset;
      if (status === "Owned") {
        assetCategories[category] = assetCategories[category]
          ? assetCategories[category] + 1
          : 1;
        totalOwnedAssets++;
      }
    });

    const assetData = Object.entries(assetCategories).map(([name, count]) => ({
      name,
      value: (count / totalOwnedAssets) * 100,
    }));

    return assetData;
  };

  return (
    <>
      <hr className="block lg:hidden pb-4 mt-4" />
      <div className="lg:p-5 lg:w-[48.5%] lg:rounded-3xl flex flex-col lg:border lg:shadow-sm lg:hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
        <div className="pt-3 px-2 text-center lg:text-left">
          <p className="text-lg lg:text-xl font-semibold">
            Asset Category data
          </p>
          <p className="text-xs text-gray-400 py-1 lg:py-2">
            The chart illustrates the proportion of each asset category within
            your portfolio.
          </p>

          <div className="px-6 py-3">
            <AssetTypeChart assetData={calculateAssetData(assetsDetails)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetCategoryWidget;
