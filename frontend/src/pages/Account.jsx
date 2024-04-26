import { Suspense, useEffect, useState } from "react";
import { Await, json } from "react-router-dom";

import EditAccountInfo from "../components/EditAccountInfo";
import AccountDetails from "../components/AccountDetails";
import { useDeleteAccount } from "../Hooks/useDeleteAccount";

const AccountPage = () => {
  const { ...userInfo } = JSON.parse(localStorage.getItem("user"));
  const [modalOpen, setModalOpen] = useState(false);
  const [accountDetails, setAccountDetails] = useState({});
  const { deleteAccount } = useDeleteAccount();

  const handleDeleteAccount = async () => {
    await deleteAccount();
    localStorage.clear("account");
    localStorage.clear("user");
    location.reload();
  };

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
      location.reload();
    } catch (error) {
      console.error("Error saving account details:", error.message);
    }
  };

  // Get all account details
  useEffect(() => {
    const getAccountDetails = async () => {
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
    };

    getAccountDetails();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  console.log(accountDetails);

  return (
    <>
      <Suspense>
        <Await resolve={accountDetails}>
          {() => (
            <EditAccountInfo
              isOpen={modalOpen}
              onClose={closeModal}
              onHandleSubmit={handleSubmit}
            />
          )}
        </Await>
      </Suspense>
      <AccountDetails
        openModal={openModal}
        userInfo={userInfo}
        accountDetails={accountDetails}
        onDeleteAccount={handleDeleteAccount}
      />
    </>
  );
};

export default AccountPage;
