
import UserHeader from "../../components/layouts/user/HeaderUser";

const UserHomePage = () => {
  return (
    <>
      <UserHeader />
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <h1 className="text-4xl text-white font-bold">Welcome</h1>
      </div>
    </>
  );
};

export default UserHomePage;