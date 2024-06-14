import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { HandMetal } from "lucide-react";
import LogoutButton from "@/components/buttons/LogoutButton";

const Navbar = async () => {

  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-center bg-gray-100 py-2 border-b border-s-zinc-200 w-full px-3">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <HandMetal/>
        </Link>
        {session?.user ? (
          <LogoutButton/>
        ) : (
          <Link
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            href="/login"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;