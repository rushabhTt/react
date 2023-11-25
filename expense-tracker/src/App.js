import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DummyPage from "./pages/DummyPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <RootLayout />,
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/signup",
          element: <SignUpPage />,
        },
        { path: "/dummy", element: <DummyPage /> },
        { path: "/profile", element: <ProfilePage /> },
      ],
    },
  ]);

  return (
    <RouterProvider router={router}>
      <div className="App"></div>
    </RouterProvider>
  );
}

export default App;
