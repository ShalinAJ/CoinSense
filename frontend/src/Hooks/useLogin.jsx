import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password, name) => {
    setIsLoading(true);

    console.log(email, password, name);

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the authContext
      dispatch({ type: "LOGIN", payload: json });

      // Get account details
      const user = JSON.parse(localStorage.getItem("user"));
      const accountResponse = await fetch("http://localhost:4000/account", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!accountResponse.ok) {
        setError("Could not fetch account details.");
        setIsLoading(false);
        return;
      }

      const accountJson = await accountResponse.json();

      // Save account details to local storage
      localStorage.setItem("account", JSON.stringify(accountJson[0]));

      setIsLoading(false);
      location.reload();
    }
  };

  return { login, isLoading, error };
};
