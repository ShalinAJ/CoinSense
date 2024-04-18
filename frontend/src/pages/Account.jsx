import React from "react";
import userImg from "../assets/user-image.png";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const { ...userInfo } = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-[80%]">
      <div className="flex flex-col items-center">
        <img
          src={userImg}
          alt=""
          className="w-[10rem] mt-[4rem] rounded-full box-shadow"
        />
        <p className="text-2xl font-bold pt-4">{userInfo.name}</p>
        <p className="text-xs pt-2">
          User since {userInfo.date ? userInfo.date : "2024"}
        </p>
      </div>
      <div className="flex flex-row justify-between px-[10rem] pt-[4.5rem]">
        <div className="w-[50%] flex flex-col">
          <p className="text-xs font-medium pb-3 text-gray-400">
            Contact Information
          </p>
          <div className=" flex flex-row">
            <div className="w-[30%]">
              <p className=" text-[13px] font-bold ">Email :</p>
            </div>
            <p className="w-[70%] text-[13px]  font-light pb-5">
              {userInfo.email}
            </p>
          </div>
          <div className="flex flex-row">
            <div className="w-[30%]">
              <p className="text-[13px] font-bold">Address :</p>
            </div>
            <p className="w-[70%] text-[13px]  font-light pb-5">
              {userInfo.address
                ? userInfo.address
                : "1306 Wilfredo Crest, West Conchitaport, DE 83119 United States"}
            </p>
          </div>
          <div className=" flex flex-row pb-6">
            <div className="w-[30%]">
              <p className=" text-[13px]  font-bold ">Phone :</p>
            </div>
            <p className="w-[70%] text-[13px]  font-light pb-5">
              {userInfo.phone ? userInfo.phone : "+1 123 456 7890"}
            </p>
          </div>
          <p className="text-xs font-medium pb-3 text-gray-400">
            Basic Information
          </p>
          <div className=" flex flex-row">
            <div className="w-[30%]">
              <p className=" text-[13px]  font-bold ">Birthday :</p>
            </div>
            <p className="w-[70%] text-[13px]  font-light pb-5">
              {userInfo.birthday ? userInfo.birthday : "January 1, 2048"}
            </p>
          </div>
          <div className="flex flex-row">
            <div className="w-[30%]">
              <p className="text-[13px]  font-bold">Gender :</p>
            </div>
            <p className="w-[70%] text-[13px]  font-light pb-5">
              {userInfo.gender ? userInfo.gender : "Male"}
            </p>
          </div>
        </div>
        <div>widget</div>
      </div>
    </div>
  );
};

export default AccountPage;
