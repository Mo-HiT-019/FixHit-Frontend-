import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import banner from '@/assets/images/bannerOrg.jpg'

const UserHomePage = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="relative w-full aspect-video md:aspect-[21/8] overflow-hidden">
        <img
          src={banner}
          alt="User Home Banner"
          className="absolute inset-0 w-full h-full object-fill rounded-b-2xl shadow-lg"
        />

         <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-black z-10" />

        <div className="absolute inset-0 bg-opacity-40 flex items-center  z-20  px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg text-shadow-transparent text-left px-4 ml-6 ">Find & Book Trusted Technicians <br /> In Minutes</h1>
          {/*<h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg text-center px-4">
            Welcome {user?.user?.fullname || "User"}!
          </h1>*/}
        </div>
      </div>

      <div className="p-6 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Explore Services
        </h2>
        <p className="text-gray-600">
          Browse through our wide range of services and book a technician in just a few clicks!
        </p>
      </div>
    </div>
  );
};

export default UserHomePage;