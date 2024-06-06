import { useState } from "react";
import { Link } from "react-router-dom";
import LeftSlide from "../components/animations/LeftSlide";
import Spring from "../components/animations/Spring";
import backArrowWhite from "../assets/back-arrow-white.png";
import { useLogin } from "../Hooks/useLogin";
import addUser from "../assets/add-user.svg";
import loginInputEmail from "../assets/login-input-email.png";
import loginInputPswd from "../assets/login-input-pswd.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import FadeIn from "../components/animations/FadeIn";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useLogin();
  const [googleError, setGoogleError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    await login(email, password);
    setLoading(false);
  }

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    await login(
      String(decoded.email),
      String(decoded.sub),
      String(decoded.name)
    );
    setGoogleError("Unable to login with google.");
  };

  function clickLoader() {
    setLoading(true);
  }

  const handleError = () => {
    console.log("Google login failed");
  };

  return (
    <>
      <div className="fixed bg-coinsense-blue h-screen w-screen z-0"></div>
      <div className="z-10 px-[10px] lg:px-0 lg:h-[100%] flex flex-col lg:flex-row justify-between items-center bg-coinsense-blue">
        <div className="flex flex-row h-[100%] lg:pt-[8rem]">
          <LeftSlide>
            <div className="lg:ml-[10rem] lg:w-[80%] text-white mb-4 rounded-xl flex flex-col items-center lg:items-start">
              <Link to={".."} className="p-1 lg:mb-1 pt-6 lg:pt-0">
                <img src={backArrowWhite} alt="" className="w-4" />
              </Link>
              <p className="text-3xl lg:text-4xl font-bold">CoinSense</p>
              <p className="text-center lg:text-left text-base lg:text-6xl font-semibold lg:font-bold lg:mt-[4rem] pt-2 lg:pt-0 lg:leading-[4.5rem]">
                Begin your journey with CoinSense
              </p>
              <p className="mt-2 text-xs lg:text-sm text-center lg:text-left lg:mt-10 lg:w-[80%]">
                Unlock exclusive features and more by logging in or registering
                with us today. Your gateway to seamless financial management
                starts here!
              </p>
            </div>
          </LeftSlide>
        </div>

        <div className="z-30 mt-3 lg:mt-20 mb-5 lg:mb-20 lg:mr-[10rem] lg:w-[400px]">
          <Spring>
            <div className="px-4 py-6 border shadow-lg bg-white rounded-xl">
              <FadeIn>
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="flex text-center">
                      <img
                        src={addUser}
                        alt="add user sign"
                        className="w-9 ml-24 lg:ml-20"
                      />
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
                          {(googleError === "" &&
                            error === "Incorrect Password" &&
                            error) ||
                            (error === "All fields must be filled" && error)}
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex justify-end my-5">
                      <a
                        className="text-xs p-0 text-[#152DFF] font-medium"
                        href=""
                      >
                        Forgot Password
                      </a>
                    </div>

                    <p>
                      <button
                        onClick={clickLoader}
                        className="w-full bg-[#152DFF] hover:bg-coinsense-blue-darker"
                      >
                        {loading === true ? "Loading..." : "Sign in"}
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
                  <div className="flex flex-col justify-center items-center pb-4">
                    <GoogleLogin
                      onSuccess={handleSuccess}
                      onError={handleError}
                    />
                    <div className="text-[11px] text-red-500 pt-1 text-center">
                      {googleError}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Spring>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
