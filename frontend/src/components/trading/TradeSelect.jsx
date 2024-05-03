const TradeSelect = ({ isOpen, onClose, cryptoData, tokenHandler }) => {
  if (!isOpen || !cryptoData) return null;

  const closeModal = () => {
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-50"
        onClick={closeModal}
      ></div>
      <dialog open className="mt-[90px] w-[30%] z-50 rounded-xl">
        <div className="z-4 px-7 pb-9 flex flex-row rounded-xl">
          <div className="w-[100%] leading-6">
            <div className="flex flex-wrap justify-between items-center pt-2">
              <h2 className="font-semibold">Choose Token</h2>
              <button
                className="bg-white border-none pr-0 text-black"
                onClick={closeModal}
              >
                &#10006;
              </button>
            </div>
            <ul className="max-h-[9rem] flex flex-col gap-3 my-5">
              {cryptoData.map((tokenData) => (
                <button
                  key={tokenData._id}
                  onClick={() => {
                    tokenHandler(tokenData);
                    closeModal();
                  }}
                  className="bg-transparent text-black border-1 border-gray-300"
                >
                  <div className="flex flex-row justify-center gap-3">
                    <img src={tokenData.image} alt="" className="w-6" />
                    <p>{tokenData.id}</p>
                  </div>
                </button>
              ))}
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default TradeSelect;
