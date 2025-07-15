import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import "./login.css";

const LoginPage = () => {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if(tokenResponse["code"]) {
        console.log(tokenResponse["code"])
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
    },
    flow: "auth-code",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Normal login clicked");
    // Implement traditional login logic here if needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex justify-center">
          <img
            alt="User Icon"
            className="w-20 h-20"
            src="https://storage.googleapis.com/a1aa/image/67a86d41-a808-42ca-5f9d-596165b741e7.jpg"
          />
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-800">Welcome Back</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full py-3 px-4 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 text-center text-base outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Login"
            type="text"
          />
          <input
            className="w-full py-3 px-4 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 text-center text-base outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Password"
            type="password"
          />
          <button
            className="w-full py-3 rounded-md bg-blue-600 text-white text-sm font-semibold shadow-md hover:bg-blue-700 transition-colors"
            type="submit"
          >
            LOG IN
          </button>
        </form>

        <button
          onClick={() => handleGoogleLogin()}
          className="w-full py-3 rounded-md bg-red-500 text-white text-sm font-semibold shadow-md hover:bg-red-600 transition-colors"
        >
          Sign in with Google
        </button>

        <div className="text-center pt-4">
          <a
            className="text-blue-600 text-sm font-medium hover:underline"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
