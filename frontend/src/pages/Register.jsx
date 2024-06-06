import { Link } from "react-router-dom";
import { useState } from "react";
import { useRegister } from "../Hooks/useRegister";
import addUser from "../assets/add-user.svg";
import loginInputEmail from "../assets/login-input-email.png";
import loginInputPswd from "../assets/login-input-pswd.png";
import registerInputProfile from "../assets/register-profile.png";
import backArrowWhite from "../assets/back-arrow-white.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Spring from "../components/animations/Spring";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { register, error } = useRegister();
  const [googleError, setGoogleError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    await register(name, email, password);
    setLoading(false);
  }

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setLoading(true);
    await register(
      String(decoded.name),
      String(decoded.email),
      String(decoded.sub)
    );
    setGoogleError("Account already exists.");
  };

  function clickLoader() {
    setLoading(true);
  }

  const handleError = (error) => {
    console.error("Google login failed:", error);
    setGoogleError("Google login failed. Please try again later.");
    setLoading(false);
  };

  return (
    <>
      <div className="h-[100%] flex flex-wrap flex-col content-center justify-center bg-coinsense-blue">
        <Spring>
          <div className="flex flex-row justify-center lg:justify-start pb-1">
            <Link to={".."} className="p-1 lg:mb-1 pt-6 lg:pt-0">
              <img src={backArrowWhite} alt="" className="w-4" />
            </Link>
          </div>
          <div className="lg:w-[350px] px-4 py-6 bg-white rounded-md">
            <form onSubmit={handleSubmit}>
              <div className="flex text-center">
                <img src={addUser} alt="add user sign" className="w-9 ml-20" />
                <p className="text-black font-medium flex justify-center mt-1 ml-5">
                  Sign Up
                </p>
              </div>

              <p className="mb-5 mt-6 text-[#626262] flex flex-left text-xs">
                Sign Up and create your CoinSense Account
              </p>

              <div className="flex flex-col text-left mb-4">
                <label
                  className="mb-1 text-black text-xs font-semibold"
                  htmlFor="name"
                >
                  Full Name <seciton className="text-red-600">*</seciton>
                </label>
                <div className="relative">
                  <img
                    src={registerInputProfile}
                    alt=""
                    className="absolute left-2 top-2 max-w-4"
                  />
                  <input
                    className="rounded-md py-2 pl-8 w-80 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                    id="name"
                    type="name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

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
                    {googleError === "" &&
                      error === "Email already in use" &&
                      error}
                  </div>
                </div>
              </div>

              <div className="flex flex-col text-left mb-6">
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
                    {error === "All fields must be filled" && error}
                  </div>
                </div>
              </div>

              <p>
                <button
                  onClick={clickLoader}
                  className="w-full bg-[#152DFF] hover:bg-coinsense-blue-darker"
                >
                  {loading === true ? "Loading..." : "Sign up"}
                </button>
              </p>
            </form>
            <div className="mt-4">
              <p className="flex content-center justify-center items-center text-xs font-medium text-black">
                Already have an account?{" "}
                <Link
                  className="text-xs font-medium py-0 text-[#152DFF]"
                  to="/login"
                >
                  Sign In
                </Link>
              </p>
            </div>
            <div className="mt-6 mb-3 flex items-center">
              <hr className="flex-1 border-t border-[#E0E0E0]" />
              <span className="mx-2 text-xs text-black">OR</span>
              <hr className="flex-1 border-t border-[#E0E0E0]" />
            </div>
            <div className="flex flex-col justify-center items-center pb-4">
              <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
              <div className="text-[11px] text-red-500 pt-1 text-center">
                {googleError}
              </div>
            </div>
          </div>
        </Spring>
      </div>
    </>
  );
};

export default RegisterPage;
