import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function ErrorPage() {
  const [errorCode, setErrorCode] = useState(404);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const errorCodeFromParams = searchParams.get("error");

    if (errorCodeFromParams) {
      setErrorCode(parseInt(errorCodeFromParams));
    }
  }, [location.search]);

  useEffect(() => {
    let message = "";
    switch (errorCode) {
      case 404:
        message = "Page not found";
        break;
      case 500:
        message = "Internal server error";
        break;
      default:
        message = "An error occurred";
    }
    setErrorMessage(message);
  }, [errorCode]);

  return (
    <div className="bg-coinsense-blue h-screen flex flex-col justify-center items-center">
      <h1 className="text-[5rem] lg:text-[10rem] font-bold text-white">
        {errorCode}
      </h1>
      <p className="text-sm lg:text-lg font-semibold text-white">
        {errorMessage}
      </p>
      <Link
        to={"../dashboard"}
        className="px-4 lg:px-6 py-1 lg:py-2 bg-white text-coinsense-blue lg:text-xs font-semibold mt-3 lg:mt-6 rounded-full"
      >
        Back
      </Link>
    </div>
  );
}

export default ErrorPage;
