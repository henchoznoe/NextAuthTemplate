"use client";

import Link from "next/link";

const DashboardButton = () => {
  return (
    <>
      <Link
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        href="/dashboard"
      >
        Dashboard
      </Link>
    </>
  );
}

export default DashboardButton;