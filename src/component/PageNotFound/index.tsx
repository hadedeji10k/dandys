import React from "react";
import { useNavigate } from "react-router";

const PageError = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-3">
      <h1 className="text-5xl xs:text-4xl font-bold mb-2">Error!!!</h1>
      <p className="text-2xl xs:text-base font-semibold text-center">
        Something wrong while loading this page, kindly go back to home.
      </p>

      <button
        onClick={() => navigate(-1 || "/")}
        className="bg-[#679B71]/90 w-[70%] max-w-[350px] mx-auto py-5 rounded-lg text-shades-white mt-6 hover:bg-[#679B71] transition-all"
      >
        Go back
      </button>
    </div>
  );
};

export default PageError;
