import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", 
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response)=>response,
  async(error)=>{
    const orginalRequest = error.config;

    if(error.response?.status ===401 && !orginalRequest._retry){
      orginalRequest._retry = true;

      try{
        console.log("Trying to refresh token");
        
        await axiosInstance.get("/refresh-token");

        return axiosInstance(orginalRequest);
      }catch(refreshError){
        console.log("Refresh token expired or invalid");
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
)

export default axiosInstance;