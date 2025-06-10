import axios from "./axiosAdmin";

export const fetchServices = (search = "", isActive?: boolean) =>
  axios.get("/services", {
    params: { search, isActive },
  });

export const createService = (data: { name: string; description: string }) =>{
    console.log("axios service API")
    axios.post("/services", data);
}
  

export const updateService = (id: string, updates: Partial<{ name: string; description: string }>) =>{
    axios.put(`/services/${id}`, updates);
}

export const activateService = (id: string) =>{
    axios.patch(`/services/${id}/activate`);
}

export const deactivateService = (id: string) =>{
    axios.patch(`/services/${id}/deactivate`);
}

export const deleteService = (id: string) =>{
    axios.delete(`/services/${id}`);
}