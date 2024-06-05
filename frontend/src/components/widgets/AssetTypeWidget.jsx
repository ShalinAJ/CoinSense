import React from "react";
import AssetTypeChart from "../../charts/AssetDoughnutChart";

const AssetTypeWidget = ({ assetsDetails }) => {
  const calculateAssetData = (assetsDetails) => {
    if (
      !assetsDetails ||
      !Array.isArray(assetsDetails) ||
      assetsDetails.length === 0
    )
      return [];

    const assetTypes = {};
    const totalAssets = assetsDetails.length;

    assetsDetails.forEach((asset) => {
      const { type, status } = asset;
      if (status === "Owned") {
        assetTypes[type] = assetTypes[type] ? assetTypes[type] + 1 : 1;
      }
    });

    const assetData = Object.entries(assetTypes).map(([name, count]) => ({
      name,
      value: (count / totalAssets) * 100,
    }));

    return assetData;
  };

  return (
    <div className="lg:p-5 lg:w-[48.5%] lg:rounded-3xl flex flex-col lg:border lg:shadow-sm lg:hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
      <div className="pt-3 px-2 text-center lg:text-left">
        <p className="text-lg lg:text-xl font-semibold">Asset Type data</p>
        <p className="text-xs text-gray-400 py-1 lg:py-2">
          The chart illustrates the proportion of each asset type within your
          portfolio.
        </p>

        <div className="lg:px-6 py-3">
          <AssetTypeChart assetData={calculateAssetData(assetsDetails)} />
        </div>
      </div>
    </div>
  );
};

export default AssetTypeWidget;
