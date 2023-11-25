import React, { useState } from "react";
import axios from "axios";

function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [profilePhotoURL, setProfilePhotoURL] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    const idToken = localStorage.getItem("idToken");
    const updateProfileEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD3D8fP7LX24FGdE7S1ivZZcvu98Ikt2pQ`;

    try {
      const response = await axios.post(updateProfileEndpoint, {
        idToken,
        displayName: fullName,
        photoUrl: profilePhotoURL,
        returnSecureToken: true,
      });

      console.log("Profile updated successfully!", response.data);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }

    setFullName("");
    setProfilePhotoURL("");
  };

  return (
    <div className="container my-24 mx-auto md:px-6">
      <section className="mb-32">
        <div className="relative h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat bg-[url('https://mdbcdn.b-cdn.net/img/new/textures/full/284.jpg')]"></div>
        <div className="container px-6 md:px-12">
          <div className="block rounded-lg bg-[hsla(0,0%,100%,0.8)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px]">
            <div className="flex flex-wrap">
              <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                <form onSubmit={submitHandler}>
                  <div className="relative mb-6">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="peer block min-h-[auto] w-full rounded border-2 border-white bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput90"
                      placeholder="Full Name"
                      required
                    />
                    <label
                      className={`absolute left-3 transition-all duration-200 ease-out 
        ${fullName ? "" : "-translate-y-[1.6rem] text-xs text-primary"}
        text-neutral-500 dark:text-neutral-200`}
                      htmlFor="exampleInput90"
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative mb-6">
                    <input
                      type="text"
                      value={profilePhotoURL}
                      onChange={(e) => setProfilePhotoURL(e.target.value)}
                      className="peer block min-h-[auto] w-full rounded border-2 border-white bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleInput91"
                      placeholder="Profile Photo URL"
                      required
                    />
                    <label
                      className={`absolute left-3 transition-all duration-200 ease-out 
        ${profilePhotoURL ? "" : "-translate-y-[1.6rem] text-xs text-primary"}
        text-neutral-500 dark:text-neutral-200`}
                      htmlFor="exampleInput91"
                    >
                      Profile Photo URL
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="mb-6 inline-block w-full rounded bg-purple-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
      transition duration-150 ease-in-out hover:bg-purple-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
      focus:bg-purple-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 
      active:bg-purple-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] 
      dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
      dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] lg:mb-0"
                  >
                    Update
                  </button>
                </form>
                ;
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
