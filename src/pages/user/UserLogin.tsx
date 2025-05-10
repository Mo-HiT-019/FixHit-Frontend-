import { Link } from "react-router-dom";
import Header from '../../components/layouts/Header';


const Login = () => {
  return (
    <>
      <Header />

      
      <div
        className="min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: "url('/images/auth.jpg')" }}
      >
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md backdrop-blur-sm bg-opacity-90">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm mb-4">
              <Link to="/forgot-password" className="text-black hover:underline">
                Forgot password?
              </Link>
              <Link to="/signup-email" className="text-black hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
