import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    console.log(name, email, password);
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();

    if (!response) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      await dispatch({ type: "LOGIN", payload: json });

      // create a account details
      const user = JSON.parse(localStorage.getItem("user"));
      const accountResponse = await fetch("http://localhost:4000/account/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const json2 = await accountResponse.json();
      console.log(json2);

      setIsLoading(false);
    }
  };
  return { register, isLoading, error };
};
