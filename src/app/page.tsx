import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardButton from "@/components/buttons/DashboardButton";

const RootPage = async () => {

  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <h1 className="text-3xl font-semibold">Homepage</h1>
      {session && session.user ? (
        <>
          <p className="text-lg italic">Welcome back, {session.user.username}</p>
          <DashboardButton/>
        </>
      ) : (
        <p className="text-lg italic">
          You are not logged in
        </p>
      )}
    </div>
  );
}

export default RootPage;