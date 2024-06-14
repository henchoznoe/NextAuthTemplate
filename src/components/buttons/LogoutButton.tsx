"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {

  const logoutHandler = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/"
    });
  }

  return (
    <>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </>
  );
}

export default LogoutButton;