import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3D8fP7LX24FGdE7S1ivZZcvu98Ikt2pQ`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );

      console.log("Signup Response:", response.data);
      alert("Successfully signed up 🎉");

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <section className="mt-10">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* Left column container with background */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://media.istockphoto.com/id/1322123064/photo/portrait-of-an-adorable-white-cat-in-sunglasses-and-an-shirt-lies-on-a-fabric-hammock.jpg?s=612x612&w=0&k=20&c=-G6l2c4jNI0y4cenh-t3qxvIQzVCOqOYZNvrRA7ZU5o="
              className="w-full"
              alt="Phone image"
            />
          </div>
          {/* Right column container with form */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
            <form onSubmit={handleSignUp}>
              <div className="mb-6">
                <input
                  type="email"
                  id="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-1 p-3 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-1 p-3 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="mt-1 p-3 w-full border rounded-md"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-md"
              >
                Sign up
              </button>
            </form>

            <div className="flex items-center justify-between pb-6">
              <p className="mb-0 mr-2">Have an account?</p>
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpPage;
