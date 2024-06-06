import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Spring from "./animations/Spring";
import RightSlide from "./animations/RightSlide";

import userImg from "../assets/user-image.png";
import editImg from "../assets/edit.png";
import FadeIn from "./animations/FadeIn";

const AccountDetails = ({
  openModal,
  userInfo,
  accountDetails,
  onDeleteAccount,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = JSON.parse(localStorage.getItem("account")).user_id;
  const { ...accountInfo } = JSON.parse(localStorage.getItem("account"));
  const { transactions, wallets } = useLoaderData();

  const [transactionTotal, setTransactionTotal] = useState(0);
  const [walletTotal, setWalletTotal] = useState(0);
  const [investmentsTotal, setInvestmentsTotal] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

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
      setSelectedFile(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error ", error);
    };
  };

  // get image from DB
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
      setProfilePhoto(photo[0].accountImg);
    }
  }

  useEffect(() => {
    getImg();
  }, []);

  // send photo to DB
  useEffect(() => {
    const handleUpload = async () => {
      if (selectedFile) {
        const response = await fetch(
          `http://localhost:4000/image/account/${user_id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ accountImg: selectedFile }),
          }
        );

        if (!response.ok) {
          throw new Error("Could not upload.");
        } else {
          location.reload();
        }
      } else {
        console.log("Error");
      }
    };

    handleUpload();
  }, [selectedFile]);

  return (
    <div className="lg:w-[80%]">
      <div className="flex flex-col items-center">
        <form>
          <label htmlFor="avatar" className="relative">
            <Spring>
              <img
                src={profilePhoto ? profilePhoto : userImg}
                alt=""
                className="w-[8rem] h-[8rem] lg:w-[10rem] lg:h-[10rem] mt-[3rem] lg:mt-[3.5rem] rounded-full box-shadow cursor-pointer"
              />
            </Spring>
            <div className="hidden lg:flex w-[8rem] h-[8rem] lg:w-[10rem] lg:h-[10rem] mt-[3rem] lg:mt-[3.5rem] absolute inset-0 items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-full cursor-pointer">
              Upload Image
            </div>
            <input
              accept="image/*"
              type="file"
              id="avatar"
              name="avatar"
              className="hidden lg:block"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
          <button
            className="hidden lg:block"
            type="submit"
            style={{ display: "none" }}
          >
            Upload
          </button>
        </form>

        <p className="text-lg lg:text-2xl font-bold pt-3 lg:pt-4">
          <FadeIn> {userInfo.name ?? "Username"}</FadeIn>
        </p>
        <p className="text-[10px] lg:text-xs pt-1 lg:pt-2">
          <FadeIn>
            {" "}
            User since {accountInfo.createdAt.split("-")[0] ?? "--"}
          </FadeIn>
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between px-[10px] lg:px-[9rem] pt-[2.5rem] lg:pt-[4.5rem] lg:mb-16">
        <div className="lg:w-[60%] flex flex-col">
          <div className="flex flex-row items-center pb-4 lg:pb-6 gap-2 lg:gap-3">
            <p className="text-xs font-medium  text-gray-400">
              <FadeIn>Contact Information</FadeIn>
            </p>
            <div>
              <button
                onClick={openModal}
                className="bg-transparent p-0 m-0 border-none text-black flex flex-row items-center justify-end text-xs font-light gap-1"
              >
                <FadeIn>
                  <img src={editImg} alt="" className="w-[14px]" />
                </FadeIn>
              </button>
            </div>
          </div>

          <div className=" flex flex-row">
            <div className="w-[30%]">
              <p className=" text-[13px] font-bold ">
                <FadeIn>Email :</FadeIn>
              </p>
            </div>
            <p className="w-[70%] text-[13px]  font-light pb-5">
              <FadeIn>{userInfo.email}</FadeIn>
            </p>
          </div>
          <div className="flex flex-row">
            <div className="w-[30%]">
              <p className="text-[13px] font-bold">
                <FadeIn>Address :</FadeIn>
              </p>
            </div>
            <p className="w-[70%] text-[13px] font-light pb-5">
              <FadeIn>
                {accountDetails && accountDetails.address
                  ? accountDetails.address
                  : "--"}
              </FadeIn>
            </p>
          </div>
          <div className=" flex flex-row pb-4 lg:pb-6">
            <div className="w-[30%]">
              <p className="text-[13px]  font-bold ">
                <FadeIn>Phone :</FadeIn>
              </p>
            </div>
            <p className="w-[70%] text-[13px]  font-light pb-5">
              <FadeIn>
                {accountDetails && accountDetails.phoneNo
                  ? accountDetails.phoneNo
                  : "--"}
              </FadeIn>
            </p>
          </div>
          <div className="flex flex-row">
            <div className="w-[30%]">
              <p className=" text-[13px]  font-bold ">
                <FadeIn>Birthday :</FadeIn>
              </p>
            </div>
            <p className="w-[70%] text-[13px]  font-light pb-5">
              <FadeIn>
                {accountDetails && accountDetails.birthday
                  ? accountDetails.birthday
                  : "--"}
              </FadeIn>
            </p>
          </div>
          <div className="flex flex-row">
            <div className="w-[30%]">
              <p className="text-[13px]  font-bold">
                <FadeIn>Gender :</FadeIn>
              </p>
            </div>
            <p className="lg:w-[70%] text-[13px] font-light pb-3 lg:pb-5">
              <FadeIn>
                {accountDetails && accountDetails.gender
                  ? accountDetails.gender
                  : "--"}
              </FadeIn>
            </p>
          </div>
          {userInfo.email === "Johndoe@mail.com" ? undefined : (
            <div>
              {confirmDelete === false ? (
                <button
                  onClick={() => {
                    setConfirmDelete(true);
                  }}
                  className="bg-transparent text-red-500 font-medium border-none text-xs p-0 mt-5"
                >
                  <FadeIn>Delete Account</FadeIn>
                </button>
              ) : (
                <div className="flex flex-row gap-5">
                  <p className="text-black font-medium border-none text-xs mt-5">
                    Confirm to delete account :
                  </p>
                  <button
                    onClick={onDeleteAccount}
                    className="bg-transparent text-red-500 font-medium border-none text-xs p-0 mt-5"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setConfirmDelete(false);
                    }}
                    className="bg-transparent text-black font-medium border-none text-xs p-0 mt-5"
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="hidden lg:flex flex-col lg:w-[40%] pt-5">
          <RightSlide>
            <p className="text-xs font-medium pb-3 text-gray-400">
              Quick Links
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-3">
                <Link
                  to={"../investment/assets"}
                  className="text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-8 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
                >
                  Assets
                </Link>

                <Link
                  to={"../income"}
                  className="text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-8 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
                >
                  Incomes
                </Link>
                <Link
                  to={"../expense"}
                  className="text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-8 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
                >
                  Expenses
                </Link>
              </div>
              <div className="flex flex-row gap-3">
                <Link
                  to={"../investment/crypto-trading"}
                  className="text-coinsense-blue border-[1px] col-span-2 border-coinsense-blue text-[11px] px-8 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
                >
                  Crypto Trading
                </Link>
                <Link
                  to={"../investment/stock-trading"}
                  className="text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-8 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
                >
                  Stock Trading
                </Link>
              </div>
              <div className="flex flex-row gap-3">
                <Link
                  to={"../investment/trading-wallet"}
                  className="text-coinsense-blue border-[1px] col-span-1 border-coinsense-blue text-[11px] px-8 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
                >
                  Trading Wallet
                </Link>
                <Link
                  to={"../investment/user-investments"}
                  className="text-coinsense-blue border-[1px] border-coinsense-blue text-[11px] px-8 py-[5px] bg-transparent rounded-3xl hover:text-white hover:bg-coinsense-blue duration-300"
                >
                  All Investments
                </Link>
              </div>
            </div>
          </RightSlide>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
