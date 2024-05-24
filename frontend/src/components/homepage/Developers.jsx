import React from "react";
import SendImg from "../../assets/send.png";
import LinkedInImg from "../../assets/linkedin.png";
import GitImg from "../../assets/github.png";

const Developers = () => {
  return (
    <div className="lg:px-[10rem] py-[1rem] md:py-[3rem] lg:py-[6rem] bg-coinsense-blue lg:bg-[#f6f6f6] flex flex-col items-center">
      <div className="lg:bg-coinsense-blue text-white px-8 md:px-12 lg:px-10 py-10 w-full rounded-3xl">
        <div className="flex flex-col">
          <p className="text-3xl md:text-5xl text-white font-medium">
            Developers
          </p>
          <p className="text-[13px] text-white font-normal mt-5 lg:w-[60%]">
            Our names are Shalin and Nadun. We're the creative minds behind this
            project and we'd love to connect with you. Find us on LinkedIn or
            GitHub to chat, share ideas, or collaborate on something exciting!
          </p>
          <div className="pb-6 flex flex-col lg:flex-row w-[100%] gap-9 justify-between mt-8">
            <div className="px-4 lg:px-6 py-4 lg:py-6 lg:w-[50%] flex flex-row gap-4 bg-white text-black rounded-3xl">
              <img
                src="https://avatars.githubusercontent.com/u/77483574?v=4"
                alt=""
                className="rounded-full h-[5rem] w-[5rem] lg:h-[8rem] lg:w-[8rem]"
              />
              <div className="flex flex-col">
                <div className="flex flex-col md:flex-row items-start">
                  <p className="text-md md:text-lg lg:text-xl font-semibold md:pb-1 pr-2 md:w-[100%] lg:w-auto">
                    Shalin Jayatilleke
                  </p>
                  <div className="flex flex-row pb-1 md:pb-0">
                    <a href="" className="p-0 m-0">
                      <img src={LinkedInImg} alt="" className="w-6 md:w-8" />
                    </a>
                    <a href="" className="p-0">
                      <img src={GitImg} alt="" className="w-6 md:w-8" />
                    </a>
                  </div>
                </div>

                <p className="mb-2 py-1 px-2 text-[9px] lg:text-[11px] text-center w-[6rem] lg:w-[7rem] bg-[#bcffde] text-[#02B15A] rounded-xl">
                  Front end dev
                </p>
                <p className="text-[13px] mb-3">
                  I'm a developer passionate about designing and coding
                  applications. I love the creative challenge of building
                  visually stunning, user-friendly applications that offer a
                  smooth user experience.
                </p>
              </div>
            </div>
            <div className="px-4 lg:px-6 py-4 lg:py-6 lg:w-[50%] flex flex-row gap-4 bg-white text-black rounded-3xl">
              <img
                src="https://avatars.githubusercontent.com/u/84174559?v=4"
                alt=""
                className="rounded-full h-[5rem] w-[5rem] lg:h-[8rem] lg:w-[8rem]"
              />
              <div className="flex flex-col">
                <div className="flex flex-col md:flex-row items-start">
                  <p className="text-md md:text-lg lg:text-xl font-semibold md:pb-1 pr-2 md:w-[100%] lg:w-auto">
                    Nadun Weerakkody
                  </p>
                  <div className="flex flex-row pb-1 md:pb-0">
                    <a href="" className="p-0 m-0">
                      <img src={LinkedInImg} alt="" className="w-6 md:w-8" />
                    </a>
                    <a href="" className="p-0">
                      <img src={GitImg} alt="" className="w-6 md:w-8" />
                    </a>
                  </div>
                </div>

                <p className="mb-2 py-1 px-2 text-[9px] lg:text-[11px] text-center w-[6rem] lg:w-[7rem] bg-[#bcffde] text-[#02B15A] rounded-xl">
                  Front end dev
                </p>
                <p className="text-[13px] mb-3">
                  I am an Undergraduate Software Engineer at SLIIT from Sri
                  Lanka 🌍. I love to code my ideas to life, creating reliable
                  and unique applications that are a joy to use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
