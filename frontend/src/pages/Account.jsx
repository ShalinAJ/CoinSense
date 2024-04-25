import { Suspense, useEffect, useState } from "react";
import userImg from "../assets/user-image.png";
import { Await, Link, json, useLoaderData } from "react-router-dom";
import EditAccountInfo from "../components/EditAccountInfo";

const AccountPage = () => {
  const { transactions, wallets } = useLoaderData();
  const { ...userInfo } = JSON.parse(localStorage.getItem("user"));
  const [transactionTotal, setTransactionTotal] = useState(0);
  const [walletTotal, setWalletTotal] = useState(0);
  const [investmentsTotal, setInvestmentsTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [AccountDetails, setAccountDetails] = useState({
    address: "",
    phoneNo: "",
    gender: "",
    birthday: "",
  });

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

  // handle submit in EditAccountInfo
  const handleSubmit = async (formData) => {
    const account = JSON.parse(localStorage.getItem("account"));
    const id = account._id;

    try {
      const response = await fetch("http://localhost:4000/account/" + id, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save account details");
      }

      console.log("Account details saved successfully");
      getAccountDetails();
      location.reload();
    } catch (error) {
      console.error("Error saving account details:", error.message);
    }
  };

  const getAccountDetails = async () => {
    try {
      const response = await fetch("http://localhost:4000/account", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      if (!response.ok) {
        return json(
          { message: "Could not fetch transactions." },
          { status: 500 }
        );
      } else {
        const details = await response.json();
        setAccountDetails(details[0]);
      }

      console.log("Account details saved successfully");
      getAccountDetails();
      location.reload();
    } catch (error) {
      console.error("Error saving account details:", error.message);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Suspense>
        <Await resolve={AccountDetails}>
          {() => (
            <EditAccountInfo
              isOpen={modalOpen}
              onClose={closeModal}
              onHandleSubmit={handleSubmit}
            />
          )}
        </Await>
      </Suspense>
      <div className="w-[80%]">
        <div className="flex flex-col items-center">
          <img
            src={userImg}
            alt=""
            className="w-[10rem] mt-[3.5rem] rounded-full box-shadow"
          />
          <p className="text-2xl font-bold pt-4">
            {userInfo.name ?? "Username"}
          </p>
          <p className="text-xs pt-2">User since {userInfo.date ?? "--"}</p>
        </div>
        <div className="flex flex-row justify-between px-[9rem] pt-[4.5rem]">
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
                {AccountDetails.address ? AccountDetails.address : "--"}
              </p>
            </div>
            <div className=" flex flex-row pb-6">
              <div className="w-[30%]">
                <p className=" text-[13px]  font-bold ">Phone :</p>
              </div>
              <p className="w-[70%] text-[13px]  font-light pb-5">
                {AccountDetails.phoneNo ?? "--"}
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
                {AccountDetails.birthday ?? "--"}
              </p>
            </div>
            <div className="flex flex-row">
              <div className="w-[30%]">
                <p className="text-[13px]  font-bold">Gender :</p>
              </div>
              <p className="w-[70%] text-[13px]  font-light pb-5">
                {AccountDetails.gender ?? "--"}
              </p>
            </div>
            <div>
              <button onClick={openModal}>Edit</button>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-5">
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
    </>
  );
};

export default AccountPage;
