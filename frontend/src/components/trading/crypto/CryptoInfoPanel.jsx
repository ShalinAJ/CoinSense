import React from "react";

const CryptoInfoPanel = () => {
  const sampleText =
    "Bitcoin (BTC) is a peer-to-peer cryptocurrency  that aims to function as a means of exchange that is independent of any central authority. BTC can be transferred electronically in a secure, verifiable, and immutable way. Launched in 2009, BTC is the first virtual currency to solve the double-spending issue by timestamping transactions before broadcasting them to all of the nodes in the Bitcoin network. The Bitcoin Protocol offered a solution to the Byzantine Generals' Problem with a blockchain network structure, a notion first created by Stuart Haber and W. Scott Stornetta in 1991. Bitcoin’s whitepaper was published pseudonymously in 2008 by an individual, or a group, with the pseudonym “Satoshi Nakamoto”, whose underlying identity has still not been verified. The Bitcoin protocol uses an SHA-256d-based Proof-of-Work (PoW) algorithm to reach network consensus. Its network has a target block time of 10 minutes and a maximum supply of 21 million tokens, with a decaying token emission rate. To prevent fluctuation of the block time, the network's block difficulty is re-adjusted through an algorithm based on the past 2016 block times. With a block size limit capped at 1 megabyte, the Bitcoin Protocol has supported both the Lightning Network, a second-layer infrastructure for payment channels, and Segregated Witness, a soft-fork to increase the number of transactions on a block, as solutions to network scalability.";

  return (
    <div className="mb-10 py-6 rounded-3xl border shadow-sm hover:shadow-lg shadow-grey-500/40 transition-shadow duration-300">
      <div className="flex flex-row h-[25rem] max-h-[24rem] overflow-y-auto ">
        <div className="flex flex-col justify-between h-max w-[100%] pr-7 pl-7">
          <div className="flex flex-row items-center gap-2">
            {" "}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/225px-Bitcoin.svg.png"
              alt=""
              className="w-5 h-5"
            />
            <div className="flex flex-row items-baseline gap-2">
              <p className="text-lg font-semibold">Bitcoin</p>
              <p className="text-xs text-gray-400">BTC</p>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col leading-9 mt-4 text-[12px] font-semibold ">
              <p>Ranking</p>
              <p>Market Capitalization</p>
              <p>Market Dominance Index</p>
              <p>Circulating Supply</p>
              <p>Maximum Supply</p>
              <p>Total</p>
              <p>Issue Date</p>
              <p>Historical High</p>
              <p>Historical Low</p>
            </div>
            <div className="flex flex-col leading-9 mt-4 text-[12px] font-semibold text-right">
              <p>No. 1</p>
              <p>$1,225,772.20M</p>
              <p>53.66%</p>
              <p>19,695,378 BTC</p>
              <p>21,000,000 BTC</p>
              <p>19,695,378 BTC</p>
              <p>2008-11-01</p>
              <div className="flex flex-row gap-3 items-center justify-end">
                <p className="text-xs text-gray-400 font-normal">2024-03-14</p>
                <p>$73,750.07385037997</p>
              </div>
              <div className="flex flex-row gap-3 items-center justify-end">
                <p className="text-xs text-gray-400 font-normal">2010-07-15</p>
                <p>$0.04864654</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pl-7 pr-7 w-[100%]">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Links</p>
            <div className="flex flex-row justify-start gap-4 mt-1">
              <a
                href=""
                className="border-1 text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-5 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
              >
                Official Website
              </a>
              <a
                href=""
                className="border-1 text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-5 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
              >
                Whitepaper
              </a>
              <a
                href=""
                className="border-1 text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-5 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
              >
                Whitepaper
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-7">
            <p className="text-sm font-semibold">Intro</p>
            <p className="text-xs leading-6">{sampleText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoInfoPanel;
