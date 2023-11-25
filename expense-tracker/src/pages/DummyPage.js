import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ExpenseForm from "../components/ExpenseForm";

function DummyPage() {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idToken = localStorage.getItem("idToken");
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD3D8fP7LX24FGdE7S1ivZZcvu98Ikt2pQ`,
          {
            idToken: idToken,
          }
        );
        console.log(response.data);
        const userData = response.data.users[0];
        const profileComplete = !!userData;
        setIsProfileComplete(profileComplete);
        setEmailVerified((prev) => userData.emailVerified);
        console.log(userData.emailVerified);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setCheckingProfile(false);
      }
    };
    fetchData();
  }, []);

  const sendVerificationEmail = async () => {
    try {
      const idToken = localStorage.getItem("idToken");
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
    localStorage.removeItem("idToken");
    navigate("/login");
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
      </div>
      <ExpenseForm />
    </>
  );
}

export default DummyPage;
