import React from "react";
import SendImg from "../../assets/send.png";
import LinkedInImg from "../../assets/linkedin.png";
import GitImg from "../../assets/github.png";

const Developers = () => {
  return (
    <div className="px-8 md:px-12 lg:px-[10rem] py-[1rem] md:py-[3rem] lg:py-[6rem] bg-white lg:bg-[#f6f6f6] flex flex-col items-center">
      <div className="lg:bg-coinsense-blue text-white px-8 md:px-12 lg:px-10 py-10 w-full rounded-3xl">
        <div className="flex flex-col">
          <p className="text-3xl md:text-5xl text-coinsense-blue lg:text-white font-medium">
            Developers
          </p>
          <p className="text-sm mt-5 w-[60%]">
            Our names are Shalin and Nadun. We're the creative minds behind this
            project and we'd love to connect with you. Find us on LinkedIn or
            GitHub to chat, share ideas, or collaborate on something exciting!
          </p>
          <div className="pb-6 flex flex-row w-[100%] gap-9 justify-between mt-8">
            <div className="px-10 py-8 w-[50%] flex flex-row gap-5 bg-white text-black rounded-3xl">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRYuhkBpBrPdYPAMykdDrr1KyESoTO850SQLYMH0SVHQ&s"
                alt=""
                className="rounded-full w-[10rem] h-[10rem]"
              />
              <div className="flex flex-col">
                <div className="flex flex-row items-start gap-3">
                  <p className="text-xl font-semibold pb-1">
                    Shalin Jayatilleke
                  </p>{" "}
                  <a href="" className="p-0">
                    <img src={LinkedInImg} alt="" className="w-8" />
                  </a>
                  <a href="" className="p-0">
                    <img src={GitImg} alt="" className="w-8" />
                  </a>
                </div>

                <p className="mb-3 py-1 px-2 text-xs text-center w-[35%] bg-[#bcffde] text-[#02B15A] rounded-xl">
                  Front end dev
                </p>
                <p className="text-sm mb-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  fuga impedit sint eos quasi animi tempora
                </p>
                <a href="mailto:someone@example.com" className="p-0">
                  <button className="bg-coinsense-blue px-5 py-2 text-xs rounded-full m-0 flex flex-row gap-2">
                    Contact
                    <img src={SendImg} alt="" className="w-4" />
                  </button>
                </a>
              </div>
            </div>
            <div className="px-10 py-8 w-[50%] flex flex-row gap-5 bg-white text-black rounded-3xl">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRYuhkBpBrPdYPAMykdDrr1KyESoTO850SQLYMH0SVHQ&s"
                alt=""
                className="rounded-full w-[10rem] h-[10rem]"
              />
              <div className="flex flex-col">
                <div className="flex flex-row items-start gap-3">
                  <p className="text-xl font-semibold pb-1">Nadun Weerakkody</p>{" "}
                  <a href="" className="p-0">
                    <img src={LinkedInImg} alt="" className="w-8" />
                  </a>
                  <a href="" className="p-0">
                    <img src={GitImg} alt="" className="w-8" />
                  </a>
                </div>

                <p className="mb-3 py-1 px-2 text-xs text-center w-[35%] bg-[#bcffde] text-[#02B15A] rounded-xl">
                  Front end dev
                </p>
                <p className="text-sm mb-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  fuga impedit sint eos quasi animi tempora
                </p>
                <a href="mailto:someone@example.com" className="p-0">
                  <button className="bg-coinsense-blue px-5 py-2 text-xs rounded-full m-0 flex flex-row gap-2">
                    Contact
                    <img src={SendImg} alt="" className="w-4" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
