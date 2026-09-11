import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { deleteRequest, getRequest } from "../../../api/apiRequest";
import PageHeader from "../../../components/commom/PageHeader";
import DataTable from "../../../components/commom/DataTable";
import DeleteModal from "../../../components/commom/DeleteModal";
import { showToast } from "../../../utils/customToast";

const OrderPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  const columns = [
    { header: "SN", key: "sn" },
    { header: "Name", key: "full_name" },
    { header: "Username", key: "username" },
    { header: "Email", key: "email" },
    { header: "Mobile", key: "phone_number" },
  ];

  // Post & Update
  const submitForm = async () => {
    setLoading(true);
    try {
      if (!id) {
      } else {
      }
      reset();
      setShowForm(false);
      setId("");
      getAdmin();
    } catch (error) {
      showToast({ error });
    } finally {
      setLoading(false);
    }
  };

  // getById
  const handleEdit = async (id) => {
    try {
      setId(id);
      const response = await { url: `/auth/admin/${id}/` };
      showToast({ response: response.message });
      setShowForm(true);
    } catch (error) {}
  };

  // get
  const getAdmin = async () => {
    try {
      const response = await getRequest({ url: "/auth/admin/" });
      setData(response.data);
    } catch (error) {}
  };

  // delete
  const handleDelete = async () => {
    try {
      const response = await deleteRequest({ url: `/auth/admin/${deleteId}/` });
      getAdmin();
      setShowDeleteModal(false);
    } catch (error) {}
  };

  const handleClose = () => {
    setShowForm(false);
    setId("");
    reset({
      fullName: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    });
  };

  // handle search
  const handleSearch = useCallback(async (value) => {
    try {
      const keyword = value.trim();
      const url = keyword
        ? `/auth/admin/search/?keyword=${encodeURIComponent(keyword)}`
        : "/auth/admin/";
      const response = await getRequest({ url });
      setData(response.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <div>
      <PageHeader
        title="Order"
        setShowForm={setShowForm}
        handleSearch={handleSearch}
      />
      <DataTable
        columns={columns}
        rows={data}
        setShowForm={setShowForm}
        setShowDeleteModal={setShowDeleteModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
        setDeleteId={setDeleteId}
      />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-secondary">
                  {id ? "Update Order" : "Create Order"}
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  {id ? "Update order details" : "Enter customer details"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(submitForm)} className="px-5 py-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-1.5 block text-xs font-medium text-gray-700"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    {...register("fullName")}
                    placeholder="Enter full name"
                    autoFocus
                    className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none transition focus:border-[#1B5420] focus:ring-2 focus:ring-[#1B5420]/10 placeholder:text-gray-400"
                  />

                  {errors.fullName && (
                    <p className="mt-1 text-[11px] text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="mb-1.5 block text-xs font-medium text-gray-700"
                  >
                    Username <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="username"
                    type="text"
                    {...register("username")}
                    placeholder="Enter username"
                    className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none transition focus:border-[#1B5420] focus:ring-2 focus:ring-[#1B5420]/10 placeholder:text-gray-400"
                  />

                  {errors.username && (
                    <p className="mt-1 text-[11px] text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-medium text-gray-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter email address"
                    className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none transition focus:border-[#1B5420] focus:ring-2 focus:ring-[#1B5420]/10 placeholder:text-gray-400"
                  />

                  {errors.email && (
                    <p className="mt-1 text-[11px] text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="mb-1.5 block text-xs font-medium text-gray-700"
                  >
                    Mobile Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="phoneNumber"
                    type="tel"
                    {...register("phoneNumber")}
                    placeholder="Enter mobile number"
                    maxLength={10}
                    className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none transition focus:border-[#1B5420] focus:ring-2 focus:ring-[#1B5420]/10 placeholder:text-gray-400"
                  />

                  {errors.phoneNumber && (
                    <p className="mt-1 text-[11px] text-red-500">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-24 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white transition hover:bg-submit-hover-button disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <LoaderCircle size={17} className="animate-spin" />
                  ) : id ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default OrderPage;
