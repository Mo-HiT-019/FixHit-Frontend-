import React, { useEffect, useState } from 'react';
import axiosInstanceTech from '@/api/axiosTechnician';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUpload, FaUserCircle, FaFileAlt, FaCheckCircle, FaTimesCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store";

interface Service {
  _id: string;
  name: string;
  description?: string;
}

const KERALA_DISTRICTS = [
  'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod',
  'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad',
  'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
].sort(); 

const TechnicianCompleteProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const technician = useSelector((state:RootState)=>state.technician.technician)

  console.log("technician fromstre",technician)

  const [formData, setFormData] = useState({
    gender: '',
    dob: '',

    address: {
      residential: '',
      city: '',
      district: '',
      state: 'Kerala', 
      pincode: ''
    },
    experience: '',
    certification: '',
    services: [] as string[],
    verificationRequested: true
  });

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [documents, setDocuments] = useState<FileList | null>(null);
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    const fetchServices = async () => {
      try {
        
        const res = await axiosInstanceTech.get('/services');
        console.log("getting services",res)
        setAvailableServices(res.data || []); 
      } catch (err) {
        toast.error('Failed to fetch services. Please try again.');
        console.error('Error fetching services:', err);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

  
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]; 
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => {
      const isSelected = prev.services.includes(serviceId);
      const newServices = isSelected
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId];

      return { ...prev, services: newServices };
    });
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePic(e.target.files[0]);
    } else {
      setProfilePic(null);
    }
  };

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocuments(e.target.files);
    } else {
      setDocuments(null);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    toast.info('Submitting your profile...', { autoClose: 2000 });

    try {
      const data = new FormData();

     
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'address') {
      
          Object.entries(value).forEach(([addressKey, addressValue]) => {
            data.append(`address[${addressKey}]`, addressValue as string);
          });
        } else if (Array.isArray(value)) {
          value.forEach((val) => data.append(key, val));
        } else {
          data.append(key, value);
        }
      });

    
      if (profilePic) {
        data.append('profilePic', profilePic);
      } else {
        toast.error('Profile picture is required.');
        setSubmitting(false);
        return;
      }

      if (documents) {
        Array.from(documents).forEach((doc) => {
          data.append('documents', doc);
        });
      }


      await axiosInstanceTech.patch(`/technicians/profile/${technician?._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Profile completed and updated successfully!');
      navigate('/technicians/profile');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Profile update failed. Please try again.';
      toast.error(errorMessage);
      console.error('Profile update failed:', err);
    } finally {
      setSubmitting(false);
    }
  };


  const selectedServiceNames = availableServices
    .filter(service => formData.services.includes(service._id))
    .map(service => service.name);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-2xl space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-800 mb-6">
          <FaUserCircle className="inline-block mr-2 text-blue-600" /> Complete Your Profile
        </h2>

    
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Personal Details</h3>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              id="dob"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
            />
          </div>


          <div className="pt-2">
            <h4 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-500" /> Address Details
            </h4>
            <div className="space-y-3">
              <div>
                <label htmlFor="residential" className="block text-sm font-medium text-gray-700 mb-1">Residential Address</label>
                <input
                  id="residential"
                  type="text"
                  name="address.residential" 
                  placeholder="House number, street, locality"
                  value={formData.address.residential}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    id="city"
                    type="text"
                    name="address.city"
                    placeholder="e.g., Kochi"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <select
                    id="district"
                    name="address.district"
                    value={formData.address.district}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    required
                  >
                    <option value="">Select District</option>
                    {KERALA_DISTRICTS.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    id="state"
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-gray-600 cursor-not-allowed"
                    readOnly 
                    required
                  />
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    id="pincode"
                    type="text" 
                    name="address.pincode"
                    placeholder="e.g., 682001"
                    value={formData.address.pincode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      
        <section className="space-y-4 pt-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Professional Details</h3>
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
            <input
              id="experience"
              type="number"
              name="experience"
              placeholder="e.g., 5"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
            />
          </div>

          <div>
            <label htmlFor="certification" className="block text-sm font-medium text-gray-700 mb-1">Certifications (if any)</label>
            <input
              id="certification"
              type="text"
              name="certification"
              placeholder="e.g., HVAC Certified, CompTIA A+"
              value={formData.certification}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </div>
        </section>

      
        <section className="space-y-4 pt-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Services You Offer <span className="text-red-500 text-sm">*</span></h3>

     
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <h4 className="text-md font-medium text-blue-800 mb-2">
              <FaCheckCircle className="inline-block mr-2 text-blue-600" /> Selected Services:
            </h4>
            {selectedServiceNames.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedServiceNames.map((serviceName, index) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full flex items-center shadow-sm"
                  >
                    {serviceName}
                    <FaTimesCircle
                      className="ml-2 cursor-pointer hover:text-red-300 transition-colors"
                      onClick={() => {
                        const serviceIdToRemove = availableServices.find(s => s.name === serviceName)?._id;
                        if (serviceIdToRemove) handleServiceToggle(serviceIdToRemove);
                      }}
                      title="Remove service"
                    />
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-blue-700 text-sm">No services selected yet. Click on the cards below to add.</p>
            )}
          </div>

   
          <div className="mt-4">
            {loadingServices ? (
              <p className="text-gray-600">Loading available services...</p>
            ) : availableServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableServices.map((service) => {
                  const isSelected = formData.services.includes(service._id);
                  return (
                    <div
                      key={service._id}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ease-in-out
                        ${isSelected
                          ? 'bg-green-100 border-green-500 shadow-md transform scale-[1.02]'
                          : 'bg-white border-gray-300 hover:border-blue-400 hover:shadow-sm'
                        }
                      `}
                      onClick={() => handleServiceToggle(service._id)}
                    >
                      <h5 className={`font-semibold text-lg ${isSelected ? 'text-green-800' : 'text-gray-800'}`}>
                        {service.name}
                      </h5>
                      {service.description && (
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      )}
                      {isSelected && (
                        <FaCheckCircle className="text-green-500 float-right mt-1" />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-500 text-center">No services available to select. Please contact support.</p>
            )}
          </div>
        </section>


        <section className="space-y-4 pt-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Documents for Verification</h3>
          <div>
            <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700 mb-1">
              <FaUserCircle className="inline-block mr-1 text-gray-500" /> Upload Profile Picture <span className="text-red-500">*</span>
            </label>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              required
            />
            {profilePic && <p className="text-xs text-gray-500 mt-1">Selected: {profilePic.name}</p>}
          </div>

          <div>
            <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-1">
              <FaFileAlt className="inline-block mr-1 text-gray-500" /> Upload Supporting Documents (e.g., certifications, ID)
            </label>
            <input
              id="documents"
              type="file"
              accept="application/pdf,image/*"
              multiple
              onChange={handleDocumentsChange}
              className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            {documents && documents.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Selected: {Array.from(documents).map(doc => doc.name).join(', ')}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">Accepts PDF and image files. Multiple files can be selected.</p>
          </div>
        </section>

        <button
          type="submit"
          className="mt-8 bg-blue-600 text-white w-full py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out font-semibold text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={submitting || formData.services.length === 0}
        >
          {submitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <FaUpload className="mr-2" /> Submit Profile
            </>
          )}
        </button>
        {formData.services.length === 0 && (
          <p className="text-red-500 text-sm text-center mt-2">Please select at least one service you offer.</p>
        )}
      </form>
    </div>
  );
};

export default TechnicianCompleteProfilePage;