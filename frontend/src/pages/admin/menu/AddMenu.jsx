import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";

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
import { addMenuSchema } from "../../../schema/addMenuSchema";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  const serverUrl = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

  return `${serverUrl}/${image.replace(/^\/+/, "")}`;
};

const imageUrlToFile = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch existing menu image");
    }

    const blob = await response.blob();

    const extension =
      blob.type === "image/png"
        ? "png"
        : blob.type === "image/webp"
          ? "webp"
          : "jpg";

    return new File([blob], `menu-image.${extension}`, {
      type: blob.type || "image/jpeg",
    });
  } catch (error) {
    return null;
  }
};

const AddMenu = () => {
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
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addMenuSchema),

    defaultValues: {
      name: "",
      description: "",
      image: undefined,
    },
  });

  const columns = [
    { header: "SN", key: "sn" },
    { header: "Name", key: "name" },
    { header: "Description", key: "description" },
    { header: "Image", key: "image" },
  ];

  const getMenu = useCallback(async () => {
    try {
      const response = await getRequest("/menu/");
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      showToast({
        error,
      });
      setData([]);
    }
  }, []);

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

  const submitForm = async (formData) => {
    setLoading(true);

    try {
      const sendData = new FormData();

      sendData.append("name", formData.name);
      sendData.append("description", formData.description || "");

      if (formData.image?.[0]) {
        sendData.append("image", formData.image[0]);
      } else if (id && imagePreview) {
        const existingImageFile = await imageUrlToFile(imagePreview);

        if (existingImageFile) {
          sendData.append("image", existingImageFile);
        } else {
          throw new Error("Unable to load existing menu image.");
        }
      }

      for (const [key, value] of sendData.entries()) {
      }

      let response;

      if (!id) {
        response = await postRequest("/menu/", sendData);

        showToast({
          response: response.message,
        });
      } else {
        response = await updateRequest(`/menu/${id}/`, sendData);

        showToast({
          response: response.message,
        });
      }

      reset({
        name: "",
        description: "",
        image: undefined,
      });

      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }

      setImagePreview("");

      setShowForm(false);
      setId("");

      await getMenu();
    } catch (error) {
      showToast({
        error,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (menuId) => {
    try {
      setLoading(true);

      const response = await getRequest(`/menu/${menuId}/`);

      const menu = response.data;

      if (!menu) {
        return;
      }

      setId(menuId);

      reset({
        name: menu.name || "",
        description: menu.description || "",
        image: undefined,
      });

      const existingImage = menu.image ? getImageUrl(menu.image) : "";

      setImagePreview(existingImage);

      setShowForm(true);
    } catch (error) {
      showToast({
        error,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) {
      return;
    }

    try {
      setLoading(true);

      const response = await deleteRequest(`/menu/${deleteId}/`);

      showToast({
        response: response.message,
      });

      setShowDeleteModal(false);
      setDeleteId("");

      await getMenu();
    } catch (error) {
      showToast({
        error,
      });
    } finally {
      setLoading(false);
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
      description: "",
      image: undefined,
    });
  };

  const handleSearch = useCallback(async (value) => {
    try {
      const keyword = value.trim();

      const url = keyword
        ? `/menu/search/?keyword=${encodeURIComponent(keyword)}`
        : "/menu/";

      const response = await getRequest(url);

      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      showToast({
        error,
      });

      setData([]);
    }
  }, []);

  useEffect(() => {
    getMenu();
  }, [getMenu]);

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
        title="Menu"
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 px-4 py-4">
          <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="border-b border-gray-300 px-5 py-3 text-center">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-secondary">
                {id ? "UPDATE MENU" : "CREATE MENU"}
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                {id
                  ? "Update menu information"
                  : "Add a new menu to the system"}
              </p>
            </div>
            <form onSubmit={handleSubmit(submitForm)} className="px-4 py-3">
              <div>
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                  MENU INFORMATION
                </h3>

                <div className="mb-2.5">
                  <label
                    htmlFor="name"
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    Menu Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    placeholder="Enter menu name"
                    autoFocus
                    className="h-9 w-full rounded-md border border-gray-300 bg-white px-2.5 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                  />

                  {errors.name && (
                    <p className="mt-0.5 text-[11px] text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-2.5">
                  <label
                    htmlFor="description"
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    {...register("description")}
                    placeholder="Enter menu description"
                    rows={3}
                    className="w-full resize-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                  />

                  {errors.description && (
                    <p className="mt-0.5 text-[11px] text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                  MENU IMAGE
                </h3>

                <div className="flex items-center gap-3">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-300 bg-gray-50">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Menu preview"
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          console.error("MENU IMAGE FAILED:", imagePreview);

                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-center text-[9px] font-medium uppercase tracking-wide text-gray-400">
                        IMAGE
                        <br />
                        PREVIEW
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor="image"
                      className="mb-1 block text-xs font-medium text-gray-700"
                    >
                      Choose menu image
                    </label>

                    <input
                      id="image"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      {...register("image", {
                        onChange: handleImageChange,
                      })}
                      className="block h-9 w-full cursor-pointer rounded-md border border-gray-300 bg-white text-xs text-gray-600 file:mr-3 file:h-full file:border-0 file:border-r file:border-gray-300 file:bg-gray-50 file:px-2.5 file:text-[11px] file:font-medium file:text-gray-600 hover:file:bg-gray-100"
                    />

                    <p className="mt-0.5 text-[10px] text-gray-400">
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

              <div className="mt-4 flex justify-end gap-2 border-t border-gray-200 pt-3">
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
                    "Update Menu"
                  ) : (
                    "Create Menu"
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

export default AddMenu;
