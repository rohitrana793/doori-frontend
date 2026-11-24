import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import {
  deleteRequest,
  getRequest,
  postRequest,
  updateRequest,
} from "../../../api/apiRequest";

import PageHeader from "../../../components/commom/PageHeader";
import DataTable from "../../../components/commom/DataTable";
import DeleteModal from "../../../components/commom/DeleteModal";

import { showToast } from "../../../utils/customToast";
import { addRestaurantSchema } from "../../../schema/addRestaurantSchema";

const AddRestaurant = () => {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const showCreateButton = true;
  const showSearch = true;
  const showActionButton = true;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addRestaurantSchema),

    defaultValues: {
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
      image: undefined,
    },
  });

  const columns = [
    { header: "SN", key: "sn" },
    { header: "Name", key: "name" },
    { header: "Address", key: "address" },
    { header: "Email", key: "email" },
    { header: "Phone Number", key: "phone_number" },
    { header: "Image", key: "logo" },
  ];

  const getRestaurant = async () => {
    try {
      const response = await getRequest("/restaurant/");
      setData(response.data || []);
    } catch (error) {
      showToast({ error });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImagePreview("");
      return;
    }

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const sendData = new FormData();
      sendData.append("name", formData.name);
      sendData.append("address", formData.address);
      sendData.append("email", formData.email);
      sendData.append("phone_number", formData.phoneNumber);
      if (formData.image?.[0]) {
        sendData.append("logo", formData.image[0]);
      }
      for (const [key, value] of sendData.entries()) {
      }

      if (!id) {
        const response = await postRequest("/restaurant/", sendData);

        showToast({
          response: response.message,
        });
      } else {
        const response = await updateRequest(`/restaurant/${id}/`, sendData);
        showToast({
          response: response.message,
        });
      }
      reset({
        name: "",
        address: "",
        email: "",
        phoneNumber: "",
        image: undefined,
      });
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview("");
      setShowForm(false);
      setId("");
      getRestaurant();
    } catch (error) {
      showToast({
        error,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (restaurantId) => {
    try {
      setId(restaurantId);
      const response = await getRequest(`/restaurant/${restaurantId}/`);
      const restaurant = response.data;
      reset({
        name: restaurant.name || "",
        address: restaurant.address || "",
        email: restaurant.email || "",
        phoneNumber: restaurant.phone_number
          ? String(restaurant.phone_number)
          : "",
      });
      setImagePreview(restaurant.image || "");
      setShowForm(true);
    } catch (error) {
      showToast({ error });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteRequest(`/restaurant/${deleteId}/`);
      showToast({
        response: response.message,
      });
      setShowDeleteModal(false);
      setDeleteId("");
      getRestaurant();
    } catch (error) {
      showToast({ error });
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setId("");

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview("");
    reset({
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
      image: undefined,
    });
  };

  const handleSearch = async (value) => {
    try {
      const keyword = value.trim();
      const url = keyword
        ? `/restaurant/search/?keyword=${encodeURIComponent(keyword)}`
        : "/restaurant/";

      const response = await getRequest(url);
      setData(response.data || []);
    } catch (error) {
      showToast({ error });
    }
  };

  useEffect(() => {
    getRestaurant();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div>
      <PageHeader
        title="Restaurant"
        showSearch={showSearch}
        setShowForm={setShowForm}
        handleSearch={handleSearch}
        showCreateButton={showCreateButton}
      />

      <DataTable
        columns={columns}
        rows={data}
        setShowForm={setShowForm}
        setShowDeleteModal={setShowDeleteModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
        setDeleteId={setDeleteId}
        showActionButton={showActionButton}
      />

      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 px-4 py-6">
          <div className="mx-auto w-full max-w-xl rounded-xl bg-white shadow-xl">
            <div className="border-b border-gray-300 px-6 py-4 text-center">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-secondary">
                {id ? "UPDATE RESTAURANT" : "CREATE RESTAURANT"}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                {id
                  ? "Update restaurant information"
                  : "Add a new restaurant to the system"}
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-4">
              <div>
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                  RESTAURANT INFORMATION
                </h3>

                <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-xs font-medium text-gray-700"
                    >
                      Restaurant Name
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      id="name"
                      type="text"
                      {...register("name")}
                      placeholder="Enter restaurant name"
                      autoFocus
                      className="h-9 w-full rounded-md border border-gray-300 bg-white px-2.5 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                    />

                    {errors.name && (
                      <p className="mt-0.5 text-[11px] text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="mb-1 block text-xs font-medium text-gray-700"
                    >
                      Address
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <textarea
                      id="address"
                      {...register("address")}
                      placeholder="Enter restaurant address"
                      rows={1}
                      className="h-9 w-full resize-none rounded-md border border-gray-300 bg-white px-2.5 py-2 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                    />

                    {errors.address && (
                      <p className="mt-0.5 text-[11px] text-red-500">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-xs font-medium text-gray-700"
                    >
                      Email
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="restaurant@example.com"
                      className="h-9 w-full rounded-md border border-gray-300 bg-white px-2.5 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                    />

                    {errors.email && (
                      <p className="mt-0.5 text-[11px] text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="mb-1 block text-xs font-medium text-gray-700"
                    >
                      Phone Number
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <PhoneInput
                          id="phoneNumber"
                          limitMaxLength={15}
                          international
                          defaultCountry="NP"
                          countryCallingCodeEditable={false}
                          placeholder="Enter phone number"
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value || "");
                          }}
                          onBlur={field.onBlur}
                          className="phone-input h-9 w-full rounded-md border border-gray-300 bg-white px-2.5 text-xs text-gray-700 outline-none transition focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/10"
                        />
                      )}
                    />

                    {errors.phoneNumber && (
                      <p className="mt-0.5 text-[11px] text-red-500">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                  RESTAURANT IMAGE
                </h3>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-300 bg-gray-50">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Restaurant preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-center text-[9px] font-medium uppercase tracking-wide text-gray-400">
                        IMAGE
                        <br />
                        PREVIEW
                      </span>
                    )}
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="image"
                      className="mb-1 block text-xs font-medium text-gray-700"
                    >
                      Choose restaurant image
                    </label>

                    <input
                      id="image"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      {...register("image", {
                        onChange: handleImageChange,
                      })}
                      className="block h-9 w-full cursor-pointer rounded-md border border-gray-300 bg-white text-xs text-gray-600 file:mr-3 file:h-full file:border-0 file:border-r file:border-gray-300 file:bg-gray-50 file:px-2.5 file:text-[11px] file:font-medium file:text-gray-600 hover:file:bg-gray-100"
                    />

                    <p className="mt-0.5 text-[11px] text-gray-400">
                      JPG, JPEG, PNG
                    </p>

                    {errors.image && (
                      <p className="mt-0.5 text-[11px] text-red-500">
                        {errors.image.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2.5 border-t border-gray-200 pt-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="cursor-pointer rounded-md border border-gray-300 px-4 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex min-w-28 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-secondary px-4 py-1.5 text-xs font-medium text-white transition hover:bg-submit-hover-button disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={14} className="animate-spin" />

                      <span>{id ? "Updating..." : "Creating..."}</span>
                    </>
                  ) : id ? (
                    "Update Restaurant"
                  ) : (
                    "Create Restaurant"
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

export default AddRestaurant;
