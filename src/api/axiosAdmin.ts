import axios from "axios";

const axiosInstanceAdmin = axios.create({
  baseURL: "http://localhost:5000/api", 
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceAdmin.interceptors.response.use(
  (response)=>response,
  async(error)=>{
    const orginalRequest = error.config;

    if(error.response?.status ===401 && !orginalRequest._retry){
      orginalRequest._retry = true;

      try{
        console.log("Trying to refresh token");
        
        await axiosInstanceAdmin.get("/refresh-token");

        return axiosInstanceAdmin(orginalRequest);
      }catch(refreshError){
        console.log("Refresh token expired or invalid");
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
)

export default axiosInstanceAdmin;