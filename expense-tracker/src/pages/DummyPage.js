import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DummyPage() {
  const [isProfileComplete, setIsProfileComplete] = useState(false);

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
        console.log(response.data, isProfileComplete);
        const userData = response.data.users[0];
        const profileComplete = !! userData;
        setIsProfileComplete(profileComplete);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []); 

  return (
    <div className="text-right">
      {isProfileComplete ? (
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
    </div>
  );
}

export default DummyPage;
