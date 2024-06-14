import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Dashboard = async () => {

  const session = await getServerSession(authOptions);

  if ( !session?.user ) {
    return (
      <div className="flex flex-col items-center gap-5 w-full">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-lg italic">
          You need to be logged in to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="text-lg italic">
        Welcome back, {session!.user.username}
      </p>
      <p>
        {JSON.stringify(session!.user)}
      </p>
    </div>
  );
}

export default Dashboard;