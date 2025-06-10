import { useEffect, useState } from "react";
import {
  fetchServices,
  createService,
  updateService,
  activateService,
  deactivateService,
  deleteService,
} from "../../api/serviceAPI";

import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface Service {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchServices(search).then((res) => setServices(res.data));
  }, [search, refresh]);

  const resetForm = () => {
    setForm({ name: "", description: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (editingId) {
      await updateService(editingId, form);
    } else {
      await createService(form);
    }
    resetForm();
    setRefresh((prev) => !prev);
    fetchServices(search).then((res) => setServices(res.data));
  };

  const handleEdit = (service: Service) => {
    setEditingId(service._id);
    setForm({ name: service.name, description: service.description });
    setShowForm(true);
  };

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    isActive ? await deactivateService(id) : await activateService(id);
    setRefresh((prev) => !prev);
  };

  const handleDelete = async (id: string) => {
    await deleteService(id);
    setRefresh((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
   
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Service Management
          </h2>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-gray-800 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 w-full sm:w-auto"
          >
            <PlusIcon className="h-5 w-5" />
            Add New Service
          </button>
        </div>

     
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
          />
        </div>

      
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">
              {editingId ? "Edit Service" : "Create Service"}
            </h3>
            <input
              type="text"
              placeholder="Service Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={4}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-base resize-y"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-green-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 w-full sm:w-auto"
              >
                {editingId ? "Update Service" : "Create Service"}
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-400 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-gray-500 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

  
        <div className="space-y-4">
          {services.length === 0 && (
            <p className="text-center text-gray-600 text-lg py-8">No services found. Add a new one!</p>
          )}
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white p-5 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-gray-200 hover:shadow-lg transition duration-200 ease-in-out"
            >
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-2 leading-relaxed text-base">
                  {service.description}
                </p>
                <p
                  className={`text-sm font-semibold px-2 py-0.5 rounded-full inline-block ${
                    service.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {service.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex items-center justify-center gap-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 ease-in-out shadow-sm text-sm font-medium w-full"
                >
                  <PencilSquareIcon className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() =>
                    handleToggleStatus(service._id, service.isActive)
                  }
                  className={`flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-white transition duration-200 ease-in-out shadow-sm text-sm font-medium w-full ${
                    service.isActive
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {service.isActive ? (
                    <>
                      <XCircleIcon className="h-4 w-4" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-4 w-4" />
                      Activate
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="flex items-center justify-center gap-1 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition duration-200 ease-in-out shadow-sm text-sm font-medium w-full"
                >
                  <TrashIcon className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}