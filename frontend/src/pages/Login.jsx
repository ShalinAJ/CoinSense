import { useState } from "react";
import { Link } from "react-router-dom";

import { useLogin } from "../Hooks/useLogin";
import addUser from "../assets/add-user.svg";
import loginInputEmail from "../assets/login-input-email.png";
import loginInputPswd from "../assets/login-input-pswd.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();

  async function handleSubmit(event) {
    event.preventDefault();

    await login(email, password);
    location.reload();
  }

  return (
    <>
      <div className="h-[100%] flex flex-wrap flex-rowcontent-center">
        <div className="bg-coinsense-blue text-white max-w-[450px] mt-4 mb-4 ml-4 rounded-xl p-10 mr-72 ">
          <p className="text-3xl font-bold">CoinSense</p>
          <p className="text-4xl font-semibold mt-40">
            Start Your <br /> Journy with Us.
          </p>
          <p className="mt-4 ">
            Register to CoinSense - enjoy exclusive features & many more
          </p>
          <div className="border-2 mt-20 rounded-2xl p-4 bg-[#525dfc]">
            Simple unbelievable! I am really satisfied by Cubik Agencys work.
            They are absolutely an amazing team!
          </div>
        </div>
        <div className=" w-[350px] px-4 py-6 bg-white rounded-md mt-20 mb-20">
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
        </div>
      </div>
    </>
  );
};

export default LoginPage;
