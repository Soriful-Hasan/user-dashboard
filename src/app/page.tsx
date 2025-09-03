import UserPage from "./users/[id]/page";
import UserData from "./users/page";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <UserData />
    </div>
  );
}
