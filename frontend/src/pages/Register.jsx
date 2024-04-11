import { Link } from "react-router-dom";

const RegisterPage = () => {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <div className="h-[100%] flex flex-wrap flex-col content-center justify-center">
        <div className="w-[350px] px-4 py-6 bg-white rounded-md">
          <form onSubmit={handleSubmit}>
            <h2 className="text-black font-medium">Sign Up</h2>

            <p className="mb-5 mt-6 text-[#626262] flex flex-left text-xs">
              Sign Up and create your CoinSense Account
            </p>

            <div className="flex flex-col text-left mb-4">
              <label
                className="mb-1 text-black text-xs font-semibold"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                className="rounded-md py-2 pl-2  text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                id="name"
                type="name"
                name="name"
              />
            </div>

            <div className="flex flex-col text-left mb-4">
              <label
                className="mb-1 text-black text-xs font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="rounded-md py-2 pl-2 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                id="email"
                type="email"
                name="email"
              />
            </div>

            <div className="flex flex-col text-left mb-6">
              <label
                className="mb-1 text-black text-xs font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="rounded-md py-2 pl-2 text-xs text-black bg-white border border-grey-800 focus:outline-none focus:border-[#152DFF]"
                id="password"
                type="password"
                name="password"
              />
            </div>

            <p>
              <button className="w-full bg-[#152DFF]">Sign up</button>
            </p>
          </form>
          <div className="mt-4">
            <p className="text-xs font-medium text-black">
              Already have an account?{" "}
              <Link className="text-xs font-medium" to="/login">
                Sign In
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

export default RegisterPage;
