import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

import userImg from "../assets/user-image.png";
import editImg from "../assets/edit.png";

const AccountDetails = ({
  openModal,
  userInfo,
  accountDetails,
  onDeleteAccount,
}) => {
  const [transactionTotal, setTransactionTotal] = useState(0);
  const [walletTotal, setWalletTotal] = useState(0);
  const { transactions, wallets } = useLoaderData();
  const [investmentsTotal, setInvestmentsTotal] = useState(0);
  const { ...accountInfo } = JSON.parse(localStorage.getItem("account"));
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function dataTotalHandler() {
      try {
        const transactionData = await transactions;
        const walletData = await wallets;
        const transactionDataTotal = transactionData.length;
        const investmentTransactions = transactionData.filter(
          (transaction) => transaction.status === "Investment"
        );
        const investmentsTotal = investmentTransactions.length;
        const walletDataTotal = walletData.length;
        setTransactionTotal(transactionDataTotal);
        setInvestmentsTotal(investmentsTotal);
        setWalletTotal(walletDataTotal);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    dataTotalHandler();
  }, [transactions]);

  const handleFileChange = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      //console.log(reader.result);
      setSelectedFile(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error ", error);
    };
  };

  async function getImg() {
    const response = await fetch("http://localhost:4000/image/account", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      return json({ message: "Could not fetch photo." }, { status: 500 });
    } else {
      const photo = await response.json();
      console.log(photo[0].accountImg);
      setProfilePhoto(photo[0].accountImg);
    }
  }

  useEffect(() => {
    const handleUpload = async () => {
      if (selectedFile) {
        const response = await fetch(
          "http://localhost:4000/image/account/new",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ accountImg: selectedFile }),
          }
        );

        if (!response.ok) {
          throw new Error("Could not upload."); // Fixed error handling
        } else {
          console.log("ok");
        }
      } else {
        console.log("no selected file");
      }
    };
    handleUpload();
    getImg();
  }, [selectedFile]);

  return (
    <div className="w-[80%]">
      <div className="flex flex-col items-center">
        <form>
          <label htmlFor="avatar" className="relative">
            <img
              src={profilePhoto ? profilePhoto : userImg}
              alt=""
              className="w-[10rem] mt-[3.5rem] rounded-full box-shadow cursor-pointer"
            />
            <div className=" w-[10rem] mt-[3.5rem] absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-full cursor-pointer">
              Upload Image
            </div>
            <input
              accept="image/*"
              type="file"
              id="avatar"
              name="avatar"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
          <button type="submit" style={{ display: "none" }}>
            Upload
          </button>
        </form>

        <p className="text-2xl font-bold pt-4">{userInfo.name ?? "Username"}</p>
        <p className="text-xs pt-2">
          User since {accountInfo.createdAt.split("-")[0] ?? "--"}
        </p>
      </div>
      <div className="flex flex-row justify-between px-[9rem] pt-[4.5rem]">
        <div className="w-[50%] flex flex-col">
          <div className="flex flex-row items-center pb-6 gap-3">
            <p className="text-xs font-medium  text-gray-400">
              Contact Information
            </p>
            <div>
              <button
                onClick={openModal}
                className="bg-transparent p-0 m-0 border-none text-black flex flex-row items-center justify-end text-xs font-light gap-1"
              >
                <img src={editImg} alt="" className="w-[14px]" />
              </button>
            </div>
          </div>

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
            <p className="w-[70%] text-[13px] font-light pb-5">
              {accountDetails && accountDetails.address
                ? accountDetails.address
                : "--"}
            </p>
          </div>
          <div className=" flex flex-row pb-6">
            <div className="w-[30%]">
              <p className=" text-[13px]  font-bold ">Phone :</p>
            </div>
            <p className="w-[70%] text-[13px]  font-light pb-5">
              {accountDetails && accountDetails.phoneNo
                ? accountDetails.phoneNo
                : "--"}
            </p>
          </div>
          <div className="flex flex-row">
            <div className="w-[30%]">
              <p className=" text-[13px]  font-bold ">Birthday :</p>
            </div>
            <p className="w-[70%] text-[13px]  font-light pb-5">
              {accountDetails && accountDetails.birthday
                ? accountDetails.birthday
                : "--"}
            </p>
          </div>
          <div className="flex flex-row">
            <div className="w-[30%]">
              <p className="text-[13px]  font-bold">Gender :</p>
            </div>
            <p className="w-[70%] text-[13px]  font-light pb-5">
              {accountDetails && accountDetails.gender
                ? accountDetails.gender
                : "--"}
            </p>
          </div>
          <div>
            <button
              onClick={onDeleteAccount}
              className="bg-transparent text-red-500 font-medium border-none text-xs p-0 mt-5"
            >
              Delete Account
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            to={"../transactions"}
            className="gap-0 p-2 px-[6rem] box-shadow rounded-full flex flex-col items-center border-[2px] border-[#152DFF]"
          >
            <p className="text-mediums font-semibold">Transactions</p>
            <p className="text-lg font-semibold text-[#152DFF]">
              {transactionTotal ? transactionTotal : 0}
            </p>
          </Link>
          <Link
            to={"../wallet"}
            className="gap-0 p-2 px-[6rem] box-shadow rounded-full flex flex-col items-center border-[2px] border-[#152DFF]"
          >
            <p className="text-mediums font-semibold">Wallets</p>
            <p className="text-lg font-semibold text-[#152DFF]">
              {walletTotal ? walletTotal : 0}
            </p>
          </Link>
          <Link className="gap-0 p-2 px-[6rem] box-shadow rounded-full flex flex-col items-center border-[2px] border-[#152DFF]">
            <p className="text-mediums font-semibold">Investments</p>
            <p className="text-lg font-semibold text-[#152DFF]">
              {investmentsTotal ? investmentsTotal : 0}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
