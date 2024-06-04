import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useDeleteAccount = () => {
  const { ...userInfo } = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const deleteAccount = async () => {
    setIsLoading(true);

    // Delete user from DB
    const deleteUser = async () => {
      const account = JSON.parse(localStorage.getItem("account"));
      const id = account.user_id;
      console.log(id);

      const response = await fetch(
        "https://coinsense-mix7.onrender.com/user/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      if (!response.ok) {
        setError("Could not delete user.");
        setIsLoading(false);
        return;
      }

      const details = await response.json();
      console.log(details);
    };

    // Delete Account from DB
    const deleteAccount = async () => {
      const account = JSON.parse(localStorage.getItem("account"));
      const id = account._id;

      const response = await fetch(
        "https://coinsense-mix7.onrender.com/account/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      if (!response.ok) {
        setError("Could not delete account.");
        setIsLoading(false);
        return;
      }

      const details = await response.json();
      console.log(details);
    };

    // Delete all the transactions associate with the user
    const deleteWallets = async () => {
      const account = JSON.parse(localStorage.getItem("account"));
      const id = account.user_id;
      console.log(id);

      const response = await fetch(
        "https://coinsense-mix7.onrender.com/wallets/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      if (!response.ok) {
        setError("Could not delete wallets.");
        setIsLoading(false);
        return;
      }

      const details = await response.json();
      console.log(details);
    };

    // Delete all wallets associate with the user
    const deleteTransactions = async () => {
      const account = JSON.parse(localStorage.getItem("account"));
      const id = account.user_id;

      const response = await fetch(
        "https://coinsense-mix7.onrender.com/transactions/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      if (!response.ok) {
        setError("Could not delete account.");
        setIsLoading(false);
        return;
      }

      const details = await response.json();
      console.log(details);
    };

    // Delete Profile Photo
    const deleteProfilePhoto = async () => {
      const account = JSON.parse(localStorage.getItem("account"));
      const id = account.user_id;

      const response = await fetch(
        "https://coinsense-mix7.onrender.com/image/account/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      if (!response.ok) {
        setError("Could not delete account.");
        setIsLoading(false);
        return;
      }

      const details = await response.json();
      console.log(details);
    };

    deleteAccount();
    deleteUser();
    deleteWallets();
    deleteTransactions();
    deleteProfilePhoto();

    setIsLoading(false);
  };

  return { deleteAccount, isLoading, error };
};
