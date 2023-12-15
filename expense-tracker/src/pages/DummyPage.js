import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import ExpenseForm from "../components/ExpenseForm";
import PremiumNav from "../components/PremiumNav";
import { logout } from "../store/auth";

function DummyPage() {
  const dispatch = useDispatch();
  const showPremiumButton = useSelector(
    (state) => state.expenses.showPremiumButton
  );

  const idToken = localStorage.getItem("idToken") || "";
  const tokenFromState = useSelector((state) => state.auth.token);

  const [isProfileComplete, setIsProfileComplete] = useState(
    JSON.parse(localStorage.getItem("isProfileComplete")) || false
  );
  const [verificationSent, setVerificationSent] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [emailVerified, setEmailVerified] = useState(
    JSON.parse(localStorage.getItem("emailVerified")) || false
  );
  const [isPremiumActivated, setPremiumActivation] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tokenFromState) {
          localStorage.setItem("idToken", tokenFromState);
        }
        const idToken = localStorage.getItem("idToken");
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD3D8fP7LX24FGdE7S1ivZZcvu98Ikt2pQ`,
          {
            idToken: idToken,
          }
        );
        // console.log(response.data);
        const userData = response.data.users[0];
        const profileComplete = !!userData;
        setIsProfileComplete(profileComplete);
        setEmailVerified((prev) => userData.emailVerified);
        // console.log(userData.emailVerified);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setCheckingProfile(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "isProfileComplete",
      JSON.stringify(isProfileComplete)
    );
    localStorage.setItem("emailVerified", JSON.stringify(emailVerified));
  }, [isProfileComplete, emailVerified]);

  const sendVerificationEmail = async () => {
    try {
      // const idToken = localStorage.getItem("idToken");
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD3D8fP7LX24FGdE7S1ivZZcvu98Ikt2pQ`,
        {
          requestType: "VERIFY_EMAIL",
          idToken: idToken,
        }
      );
      setVerificationSent(true);
    } catch (error) {
      console.error("Error sending verification email:", error.response?.data);
      if (error.response?.data?.error?.message === "INVALID_ID_TOKEN") {
        alert("Your session has expired. Please sign in again.");
      } else if (error.response?.data?.error?.message === "USER_NOT_FOUND") {
        alert("User not found. Please sign up first.");
      } else {
        alert("An error occurred while sending the verification email.");
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleActivatePremium = () => {
    // Activate premium
    setPremiumActivation(true);
  };

  return (
    <>
      <div className="text-right">
        <div>
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        {checkingProfile ? (
          "Checking your profile..."
        ) : isProfileComplete ? (
          "Your profile is complete."
        ) : (
          <>
            Your profile is incomplete:
            <Link
              to="/profile"
              className={`text-blue-500 ${
                isProfileComplete ? "line-through" : "underline"
              }`}
              onClick={(e) => !isProfileComplete && e.preventDefault()}
            >
              Complete your profile!
            </Link>
          </>
        )}
        {!emailVerified && (
          <div>
            {verificationSent ? (
              <span>Verification email sent. Check your email to verify.</span>
            ) : (
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                onClick={sendVerificationEmail}
              >
                Verify Email Address
              </button>
            )}
          </div>
        )}
        {showPremiumButton && !isPremiumActivated && (
          <button
            className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md"
            onClick={handleActivatePremium}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
            Activate Premium
          </button>
        )}
      </div>
      {isPremiumActivated && <PremiumNav onLogoutClick={handleLogout} />}
      <ExpenseForm />
    </>
  );
}

export default DummyPage;
