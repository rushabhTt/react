import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../store/auth";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const authData = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isLoginForm) {
        // Handle login form submission
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3D8fP7LX24FGdE7S1ivZZcvu98Ikt2pQ`,
          {
            email: email,
            password: password,
            returnSecureToken: true,
          }
        );
        // localStorage.setItem("idToken", response.data.idToken);
        dispatch(
          login({
            token: response.data.idToken,
            userId: response.data.localId,
          })
        );
        setEmail("");
        setPassword("");
        navigate("/dummy");
      } else {
        // Handle password reset form submission
        await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD3D8fP7LX24FGdE7S1ivZZcvu98Ikt2pQ`,
          {
            email: resetEmail,
            requestType: "PASSWORD_RESET",
          }
        );
        alert(
          "Password reset email sent. Check your email to reset your password."
        );
        setResetEmail("");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const toggleForm = () => {
    // Switch between login and password reset forms
    setIsLoginForm(!isLoginForm);
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">
                {isLoginForm ? "Login to your account" : "Password Reset"}
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="divide-y divide-gray-200">
                {isLoginForm ? (
                  // Login Form
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Email address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Password"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md px-2 py-1"
                      >
                        Login 😎
                      </button>
                    </div>
                  </div>
                ) : (
                  // Password Reset Form
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="resetEmail"
                        name="resetEmail"
                        type="text"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Email address"
                      />
                      <label
                        htmlFor="resetEmail"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md px-2 py-1"
                      >
                        Send Reset Email
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
            <div className="text-center">
              {isLoginForm ? (
                <>
                  <span>Don't have an account?</span>
                  <Link to="/signup" className="text-blue-500 hover:underline">
                    {" "}
                    Sign up
                  </Link>
                  <span className="ml-1">|</span>
                  <button
                    type="button"
                    className="text-blue-500 hover:underline ml-1"
                    onClick={toggleForm}
                  >
                    Forgot Password?
                  </button>
                </>
              ) : (
                <>
                  <span>Remember your password?</span>
                  <button
                    type="button"
                    className="text-blue-500 hover:underline ml-1"
                    onClick={toggleForm}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
