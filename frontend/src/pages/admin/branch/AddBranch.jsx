import { useCallback, useEffect, useRef, useState } from "react";
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
import { addBranchSchema } from "../../../schema/addBranchSchema";

const DAYS = [0, 1, 2, 3, 4, 5, 6];

const DAY_LABELS = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
  5: "Saturday",
  6: "Sunday",
};

const defaultOpeningHours = DAYS.reduce((acc, day) => {
  acc[day] = {
    status: "open",
    openingTime: "09:00",
    closingTime: "21:00",
  };

  return acc;
}, {});

const AddBranch = () => {
  const [showForm, setShowForm] = useState(false);
  const [restaurant, setRestaurant] = useState([]);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const showCreateButton = true;
  const showSearch = true;
  const showActionButton = true;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(addBranchSchema),

    defaultValues: {
      restaurantName: "",
      branchName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      email: "",
      phoneNumber: "",
      image: undefined,
      openingHours: defaultOpeningHours,
    },
  });

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    const baseUrl = import.meta.env.VITE_BASE_URL || "";

    const serverUrl = baseUrl.replace(/\/api\/v1\/?$/, "");

    return `${serverUrl}/${image.replace(/^\/+/, "")}`;
  };

  const columns = [
    {
      header: "SN",
      key: "sn",
    },
    {
      header: "Restaurant",
      key: "restaurant_name",
    },
    {
      header: "Branch",
      key: "name",
    },
    {
      header: "Address",
      key: "address",
    },
    {
      header: "City",
      key: "city",
    },
    {
      header: "State",
      key: "state",
    },
    {
      header: "Country",
      key: "country",
    },
    {
      header: "Email",
      key: "email",
    },
    {
      header: "Phone Number",
      key: "phone_number",
    },
    {
      header: "Image",
      key: "image",
    },
  ];

  const resetBranchForm = () => {
    reset({
      restaurantName: "",
      branchName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      email: "",
      phoneNumber: "",
      image: undefined,
      openingHours: defaultOpeningHours,
    });

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(null);
    setId("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getRestaurant = useCallback(async () => {
    try {
      const response = await getRequest("/restaurant/");

      const restaurants =
        response?.data?.data ?? response?.data?.results ?? response?.data ?? [];

      const restaurantList = Array.isArray(restaurants) ? restaurants : [];

      setRestaurant(restaurantList);

      return restaurantList;
    } catch (error) {
      showToast({ error });
      return [];
    }
  }, []);

  const getBranch = useCallback(async (restaurantList = []) => {
    try {
      const response = await getRequest("/restaurant/branch/");

      const branches =
        response?.data?.data ?? response?.data?.results ?? response?.data ?? [];

      const branchList = Array.isArray(branches) ? branches : [];

      const normalizedBranches = branchList.map((branch, index) => {
        const restaurantId =
          typeof branch.restaurant === "object"
            ? branch.restaurant?.id
            : branch.restaurant;

        const foundRestaurant = restaurantList.find(
          (item) => String(item.id) === String(restaurantId),
        );

        return {
          ...branch,

          sn: index + 1,

          restaurant_name:
            foundRestaurant?.name ||
            branch.restaurant_name ||
            (restaurantId ? String(restaurantId) : "—"),
        };
      });

      setData(normalizedBranches);
    } catch (error) {
      showToast({ error });
    }
  }, []);

  const buildFormData = (formData) => {
    const openingHoursArray = DAYS.map((day) => {
      const item = formData.openingHours?.[day];

      const isClosed = item?.status === "closed";

      const entry = {
        day,
        is_closed: isClosed,
      };

      if (isClosed) {
        entry.opening_time = null;
        entry.closing_time = null;
      } else {
        const openingTime = item?.openingTime || "09:00";

        const closingTime = item?.closingTime || "21:00";

        entry.opening_time =
          openingTime.length === 5 ? `${openingTime}:00` : openingTime;

        entry.closing_time =
          closingTime.length === 5 ? `${closingTime}:00` : closingTime;
      }

      return entry;
    });

    const fd = new FormData();

    fd.append("restaurant", String(formData.restaurantName));

    fd.append("name", formData.branchName || "");

    fd.append("address", formData.address || "");

    fd.append("city", formData.city || "");

    fd.append("state", formData.state || "");

    fd.append("country", formData.country || "");

    if (formData.email) {
      fd.append("email", formData.email);
    }

    if (formData.phoneNumber) {
      fd.append("phone_number", formData.phoneNumber);
    }

    if (formData.image?.[0]) {
      fd.append("image", formData.image[0]);
    }

    fd.append("opening_hours", JSON.stringify(openingHoursArray));

    return fd;
  };

  const submitForm = async (formData) => {
    setLoading(true);

    try {
      const restaurantId = formData.restaurantName;

      if (
        !restaurantId ||
        restaurantId === "undefined" ||
        restaurantId === "null"
      ) {
        showToast({
          error: {
            message: "Please select a valid restaurant.",
          },
        });

        return;
      }

      const payload = buildFormData(formData);

      for (const [key, value] of payload.entries()) {
      }

      let response;

      if (!id) {
        response = await postRequest("/restaurant/branch/", payload);

        showToast({
          response:
            response?.message ||
            response?.data?.message ||
            "Branch created successfully",
        });
      } else {
        response = await updateRequest(`/restaurant/branch/${id}/`, payload);

        showToast({
          response:
            response?.message ||
            response?.data?.message ||
            "Branch updated successfully",
        });
      }

      resetBranchForm();

      setShowForm(false);

      await getBranch(restaurant);
    } catch (error) {
      showToast({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (referenceId) => {
    try {
      setLoading(true);

      const response = await getRequest(`/restaurant/branch/${referenceId}/`);

      const branch = response?.data?.data ?? response?.data ?? null;

      if (!branch) {
        return;
      }

      setId(referenceId);

      const mappedOpeningHours = DAYS.reduce((acc, day) => {
        acc[day] = {
          ...defaultOpeningHours[day],
        };

        return acc;
      }, {});

      if (Array.isArray(branch.opening_hours)) {
        branch.opening_hours.forEach((item) => {
          const dayKey = Number(item.day);

          if (mappedOpeningHours[dayKey] !== undefined) {
            mappedOpeningHours[dayKey] = {
              status: item.is_closed ? "closed" : "open",

              openingTime: item.opening_time
                ? item.opening_time.slice(0, 5)
                : "09:00",

              closingTime: item.closing_time
                ? item.closing_time.slice(0, 5)
                : "21:00",
            };
          }
        });
      }

      let restaurantId = "";

      if (branch.restaurant && typeof branch.restaurant === "object") {
        restaurantId = branch.restaurant.id || "";
      } else {
        restaurantId = branch.restaurant || "";
      }

      reset({
        restaurantName: String(restaurantId),

        branchName: branch.name || "",

        address: branch.address || "",

        city: branch.city || "",

        state: branch.state || "",

        country: branch.country || "",

        email: branch.email || "",

        phoneNumber: branch.phone_number ? String(branch.phone_number) : "",

        image: undefined,

        openingHours: mappedOpeningHours,
      });

      setImagePreview(branch.image ? getImageUrl(branch.image) : null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setShowForm(true);
    } catch (error) {
      showToast({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDelete = (referenceId) => {
    setDeleteId(referenceId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) {
      return;
    }

    try {
      setLoading(true);

      const response = await deleteRequest(`/restaurant/branch/${deleteId}/`);

      showToast({
        response:
          response?.message ||
          response?.data?.message ||
          "Branch deleted successfully",
      });

      setShowDeleteModal(false);
      setDeleteId("");

      await getBranch(restaurant);
    } catch (error) {
      showToast({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowForm(false);
    resetBranchForm();
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  const imageRegister = register("image", {
    onChange: handleImageChange,
  });

  const handleSearch = useCallback(
    async (value) => {
      try {
        const keyword = value.trim();

        if (!keyword) {
          await getBranch(restaurant);
          return;
        }

        const response = await getRequest(
          `/restaurant/branch/search/?keyword=${encodeURIComponent(keyword)}`,
        );

        const branches =
          response?.data?.data ??
          response?.data?.results ??
          response?.data ??
          [];

        const branchList = Array.isArray(branches) ? branches : [];

        const normalizedBranches = branchList.map((branch, index) => {
          const restaurantId =
            typeof branch.restaurant === "object"
              ? branch.restaurant?.id
              : branch.restaurant;

          const foundRestaurant = restaurant.find(
            (item) => String(item.id) === String(restaurantId),
          );

          return {
            ...branch,

            sn: index + 1,

            restaurant_name:
              foundRestaurant?.name ||
              branch.restaurant_name ||
              (restaurantId ? String(restaurantId) : "—"),
          };
        });

        setData(normalizedBranches);
      } catch (error) {
        showToast({ error });
      }
    },
    [getBranch, restaurant],
  );

  useEffect(() => {
    const loadData = async () => {
      const restaurantList = await getRestaurant();

      await getBranch(restaurantList);
    };

    loadData();
  }, [getRestaurant, getBranch]);

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
        title="Branch"
        showSearch={showSearch}
        setShowForm={(value) => {
          if (value) {
            resetBranchForm();
          }
          setShowForm(value);
        }}
        handleSearch={handleSearch}
        showCreateButton={showCreateButton}
      />

      <DataTable
        columns={columns}
        rows={data}
        setShowForm={setShowForm}
        setShowDeleteModal={setShowDeleteModal}
        onEdit={handleEdit}
        onDelete={handleOpenDelete}
        setDeleteId={setDeleteId}
        showActionButton={showActionButton}
      />

      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 px-4 py-4">
          <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="border-b border-gray-300 px-5 py-3 text-center">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-secondary">
                {id ? "UPDATE BRANCH" : "CREATE BRANCH"}
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                {id
                  ? "Update branch information"
                  : "Add a new branch to the system"}
              </p>
            </div>

            <form onSubmit={handleSubmit(submitForm)} className="px-4 py-3">
              <div>
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                  BRANCH INFORMATION
                </h3>

                <div className="mb-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Restaurant Name
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <select
                      {...register("restaurantName")}
                      className="h-9 w-full cursor-pointer rounded-md border border-gray-300 bg-white px-2.5 text-xs text-gray-700 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                    >
                      <option value="">Select Restaurant</option>

                      {restaurant.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>

                    {errors.restaurantName && (
                      <p className="mt-0.5 text-[11px] text-red-500">
                        {errors.restaurantName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Branch Name
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      {...register("branchName")}
                      placeholder="Kathmandu Main Branch"
                      className="h-9 w-full rounded-md border border-gray-300 bg-white px-2.5 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                    />

                    {errors.branchName && (
                      <p className="mt-0.5 text-[11px] text-red-500">
                        {errors.branchName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-2.5">
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Address
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    {...register("address")}
                    placeholder="New Baneshwor"
                    className="h-9 w-full rounded-md border border-gray-300 bg-white px-2.5 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                  />

                  {errors.address && (
                    <p className="mt-0.5 text-[11px] text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="mb-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {[
                    ["city", "City", "Kathmandu"],
                    ["state", "State", "Bagmati"],
                    ["country", "Country", "Nepal"],
                  ].map(([name, label, placeholder]) => (
                    <div key={name}>
                      <label className="mb-1 block text-xs font-medium text-gray-700">
                        {label}
                      </label>

                      <input
                        type="text"
                        {...register(name)}
                        placeholder={placeholder}
                        className="h-9 w-full rounded-md border border-gray-300 bg-white px-2.5 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                      />
                    </div>
                  ))}
                </div>

                <div className="mb-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Email
                    </label>

                    <input
                      type="email"
                      {...register("email")}
                      placeholder="example@gmail.com"
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
                          onChange={(value) => field.onChange(value || "")}
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

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Branch Image
                    {!id && <span className="ml-1 text-red-500">*</span>}
                  </label>

                  {imagePreview && (
                    <div className="mb-2">
                      <img
                        src={imagePreview}
                        alt="Branch preview"
                        className="h-16 w-16 rounded-md object-cover ring-1 ring-gray-200"
                      />
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    {...imageRegister}
                    ref={(element) => {
                      imageRegister.ref(element);
                      fileInputRef.current = element;
                    }}
                    className="block h-9 w-full cursor-pointer rounded-md border border-gray-300 bg-white text-xs text-gray-600 file:mr-2 file:border-0 file:bg-gray-100 file:px-2.5 file:py-1.5 file:text-[11px]"
                  />

                  {errors.image && (
                    <p className="mt-0.5 text-[11px] text-red-500">
                      {errors.image.message}
                    </p>
                  )}

                  <p className="mt-0.5 text-[10px] text-gray-400">
                    {id
                      ? "Leave empty to keep existing image."
                      : "Required when creating a new branch."}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-300 pt-3">
                <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                  WEEKLY OPENING HOURS
                </h3>

                <div className="grid grid-cols-[1.1fr_1fr_1fr_1fr] gap-2 border-b border-gray-200 pb-1">
                  <div className="text-[11px] font-medium text-gray-600">
                    Day
                  </div>
                  <div className="text-[11px] font-medium text-gray-600">
                    Status
                  </div>
                  <div className="text-[11px] font-medium text-gray-600">
                    Opening Time
                  </div>
                  <div className="text-[11px] font-medium text-gray-600">
                    Closing Time
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {DAYS.map((day) => {
                    const statusVal = watch(`openingHours.${day}.status`);
                    const openVal = watch(`openingHours.${day}.openingTime`);
                    const closeVal = watch(`openingHours.${day}.closingTime`);

                    const isClosed = statusVal === "closed";

                    const timeError =
                      !isClosed && openVal && closeVal && openVal >= closeVal;

                    return (
                      <div
                        key={day}
                        className="grid grid-cols-[1.1fr_1fr_1fr_1fr] items-center gap-2 py-1.5 text-[11px]"
                      >
                        <span className="font-medium text-gray-700">
                          {DAY_LABELS[day]}
                        </span>

                        <div className="flex items-center gap-2">
                          <label className="inline-flex cursor-pointer items-center gap-1">
                            <input
                              type="radio"
                              value="open"
                              {...register(`openingHours.${day}.status`)}
                              className="text-secondary focus:ring-secondary/20"
                            />
                            <span className="text-gray-600">Open</span>
                          </label>

                          <label className="inline-flex cursor-pointer items-center gap-1">
                            <input
                              type="radio"
                              value="closed"
                              {...register(`openingHours.${day}.status`)}
                              className="text-secondary focus:ring-secondary/20"
                            />
                            <span className="text-gray-600">Closed</span>
                          </label>
                        </div>

                        <input
                          type="time"
                          disabled={isClosed}
                          {...register(`openingHours.${day}.openingTime`)}
                          className={`h-7 rounded border px-1.5 text-[11px] text-gray-700 disabled:bg-gray-100 disabled:text-gray-400 ${
                            timeError ? "border-red-500" : "border-gray-300"
                          }`}
                        />

                        <input
                          type="time"
                          disabled={isClosed}
                          {...register(`openingHours.${day}.closingTime`)}
                          className={`h-7 rounded border px-1.5 text-[11px] text-gray-700 disabled:bg-gray-100 disabled:text-gray-400 ${
                            timeError ? "border-red-500" : "border-gray-300"
                          }`}
                        />

                        {timeError && (
                          <p className="col-span-4 -mt-1 text-[9px] text-red-500">
                            {DAY_LABELS[day]}: Closing time must be after
                            opening time.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2 border-t border-gray-200 pt-3">
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
                  {loading && (
                    <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                  )}

                  {loading
                    ? id
                      ? "Updating..."
                      : "Creating..."
                    : id
                      ? "Update Branch"
                      : "Create Branch"}
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

export default AddBranch;
