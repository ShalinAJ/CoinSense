import { Link } from "react-router-dom";
import { useState } from "react";
import { useRegister } from "../Hooks/useRegister";
import addUser from "../assets/add-user.svg";
import loginInputEmail from "../assets/login-input-email.png";
import loginInputPswd from "../assets/login-input-pswd.png";
import registerInputProfile from "../assets/register-profile.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { register, error, isLoading } = useRegister();

  async function handleSubmit(event) {
    event.preventDefault();

    await register(name, email, password);
  }

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    await register(
      String(decoded.name),
      String(decoded.email),
      String(decoded.iss)
    );
  };

  const handleError = () => {
    console.log("Google login failed");
  };

  return (
    <>
      <div className="h-[100%] flex flex-wrap flex-col content-center justify-center bg-coinsense-blue">
        <div className="w-[350px] px-4 py-6 bg-white rounded-md">
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
              </div>
            </div>

            <p>
              <button className="w-full bg-[#152DFF] hover:bg-coinsense-blue-darker">
                Sign up
              </button>
            </p>
            {error && "error"}
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
          <div className="pb-5 ml-12">
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
