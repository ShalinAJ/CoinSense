import React from "react";
import infoImg from "../assets/info.png";
import Spring from "./animations/Spring";

const InfoModal = ({ isOpen, onClose, title, sub, description, footer }) => {
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
      <dialog open className="w-[40%] z-50 bg-transparent">
        <Spring>
          <div className="bg-white mt-[90px] pb-1 rounded-xl ">
            <div className="z-4 px-7 pb-9 flex flex-row rounded-xl">
              <div className="w-[100%] leading-6">
                <div className="flex flex-wrap justify-between items-center pt-4">
                  <div className="flex flex-row gap-2 items-center">
                    <img src={infoImg} alt="" className="w-5" />
                    <h2 className="font-semibold">Info</h2>
                  </div>
                  <button
                    className="bg-white border-none pr-0 text-black hover:text-red-500"
                    onClick={closeModal}
                  >
                    &#10006;
                  </button>
                </div>
                <div className="flex flex-col gap-4 text-sm font-medium mb-6">
                  <p className="font-semibold mt-6">{title}</p>
                  <p className="text-xs font-medium mb-3">{sub}</p>
                  {description &&
                    description.map((item, index) => (
                      <div key={index} className="flex flex-row text-xs gap-2">
                        <p>•</p>
                        <p>{item}</p>
                      </div>
                    ))}
                  {footer && (
                    <p className="text-xs font-medium mt-3">{footer}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Spring>
      </dialog>
    </>
  );
};

export default InfoModal;
