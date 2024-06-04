import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (name, email, password) => {
    setIsLoading(true);

    console.log(name, email, password);

    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
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

      const accountResponse = await fetch("/account/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const json2 = await accountResponse.json();
      console.log(json2);

      if (accountResponse.ok) {
        localStorage.setItem("account", JSON.stringify(json2));
      }

      // upload image file with null accountImg when account created
      const imageResponse = await fetch("/image/account/new/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!imageResponse.ok) {
        throw new Error("Could not upload.");
      } else {
        console.log("account File created successfully");
      }

      //create a new trading wallet
      const topupData = {
        cardName: "",
        amount: 0,
        status: "",
      };

      const tradingWalletResponse = await fetch("/tradingwallet/new", {
        method: "POST",

        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(topupData),
      });

      console.log(tradingWalletResponse);

      if (!tradingWalletResponse.ok) {
        console.log("not ok");
        throw json({ message: "Could not save." }, { status: 500 });
      }

      setIsLoading(false);
      location.reload();
    }
  };
  return { register, isLoading, error };
};
