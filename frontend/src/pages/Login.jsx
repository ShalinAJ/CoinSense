import { useState } from "react";
import { Link } from "react-router-dom";

import { useLogin } from "../Hooks/useLogin";
import addUser from "../assets/add-user.svg";
import loginInputEmail from "../assets/login-input-email.png";
import loginInputPswd from "../assets/login-input-pswd.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  async function handleSubmit(event) {
    event.preventDefault();

    await login(email, password);
  }

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    await login(
      String(decoded.email),
      String(decoded.sub),
      String(decoded.name)
    );
  };

  const handleError = () => {
    console.log("Google login failed");
  };

  return (
    <>
      <div className="h-[100%] flex justify-between items-center bg-coinsense-blue">
        <div className="flex flex-row h-[100%] pt-[8rem]">
          <div className="ml-[10rem] w-[80%] text-white mb-4 rounded-xl pt-10 flex flex-col">
            <p className="text-4xl font-bold">CoinSense</p>
            <p className="text-6xl font-bold mt-[4rem] leading-[4.5rem]">
              Begin your journey with CoinSense
            </p>
            <p className="mt-10 w-[80%]">
              Unlock exclusive features and more by logging in or registering
              with us today. Your gateway to seamless financial management
              starts here!
            </p>
          </div>
        </div>
        <div className=" w-[400px] px-4 py-6 border shadow-lg bg-white rounded-xl mt-20 mb-20 mr-[10rem]">
          <form onSubmit={handleSubmit}>
            <div className="flex text-center">
              <img src={addUser} alt="add user sign" className="w-9 ml-20" />
              <p className="text-black font-medium flex justify-center mt-1 ml-5">
                Sign In
              </p>
            </div>

            <p className="mb-5 mt-6 text-[#626262] flex flex-left text-xs">
              Sign in to your CoinSense Account
            </p>

            <div className="flex flex-col text-left mb-4">
              <label
                className="mb-1 text-black text-xs font-semibold"
                htmlFor="email"
              >
                Email <seciton className="text-red-600">*</seciton>
              </label>
              <div className="relative">
                <img
                  src={loginInputEmail}
                  alt=""
                  className="absolute left-2 top-2 max-w-4"
                />
                <input
                  className="rounded-md py-2 pl-8 w-80 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                  id="email"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="text-[11px] text-red-500 pt-1 pl-1">
                  {error && error === "Incorrect Email" && error}
                </div>
              </div>
            </div>

            <div className="flex flex-col text-left">
              <label
                className="mb-1 text-black text-xs font-semibold"
                htmlFor="password"
              >
                Password <seciton className="text-red-600">*</seciton>
              </label>
              <div className="relative">
                <img
                  src={loginInputPswd}
                  alt=""
                  className="absolute left-2 top-2 max-w-4"
                />
                <input
                  className="rounded-md py-2 pl-8 w-80 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                  id="password"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-[11px] text-red-500 pt-1 pl-1">
                  {(error && error === "Incorrect Password" && error) ||
                    (error === "All fields must be filled" && error)}
                </div>
              </div>
            </div>

            <div className="text-right flex justify-end my-5">
              <a className="text-xs p-0 text-[#152DFF] font-medium" href="">
                Forgot Password
              </a>
            </div>

            <p>
              <button className="w-full bg-[#152DFF] hover:bg-coinsense-blue-darker">
                Sign in
              </button>
            </p>
          </form>
          <div className="mt-4">
            <p className="flex content-center justify-center items-center text-xs font-medium text-black">
              Dont have an account?
              <Link
                className="text-xs font-medium py-0 text-[#152DFF]"
                to="/register"
              >
                Sign Up
              </Link>
            </p>
          </div>
          <div className="mt-6 mb-3 flex items-center">
            <hr className="flex-1 border-t border-[#E0E0E0]" />
            <span className="mx-2 text-xs text-black">OR</span>
            <hr className="flex-1 border-t border-[#E0E0E0]" />
          </div>
          <div className="pb-5 ml-12">
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            <div className="text-[11px] text-red-500 pt-1 pl-1">
              {error === "Account not registered yet" && error}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
