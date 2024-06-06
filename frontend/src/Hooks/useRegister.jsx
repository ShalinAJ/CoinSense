import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (name, email, password) => {
    setIsLoading(true);

    const response = await fetch(
      "https://coinsense-mix7.onrender.com/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      await dispatch({ type: "LOGIN", payload: json });

      // create a account details
      const user = JSON.parse(localStorage.getItem("user"));

      const accountResponse = await fetch(
        "https://coinsense-mix7.onrender.com/account/new",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json2 = await accountResponse.json();

      if (accountResponse.ok) {
        localStorage.setItem("account", JSON.stringify(json2));
      }

      // upload image file with null accountImg when account created
      const imageResponse = await fetch(
        "https://coinsense-mix7.onrender.com/image/account/new/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!imageResponse.ok) {
        throw new Error("Could not upload.");
      } else {
        console.log("...");
      }

      //create a new trading wallet
      const topupData = {
        cardName: "",
        amount: 0,
        status: "",
      };

      const tradingWalletResponse = await fetch(
        "https://coinsense-mix7.onrender.com/tradingwallet/new",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(topupData),
        }
      );

      if (!tradingWalletResponse.ok) {
        throw json({ message: "Could not save." }, { status: 500 });
      }

      setIsLoading(false);
      location.reload();
    }
  };
  return { register, isLoading, error };
};
