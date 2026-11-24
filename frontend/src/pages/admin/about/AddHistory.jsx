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
import { addHistorySchema } from "../../../schema/addHistorySchema";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  const serverUrl = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

  return `${serverUrl}/${image.replace(/^\/+/, "")}`;
};

const imageUrlToFile = async (imageUrl, fileName) => {
  try {
    if (!imageUrl) {
      return null;
    }

    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch existing image: ${imageUrl}`);
    }

    const blob = await response.blob();

    const extension =
      blob.type === "image/png"
        ? "png"
        : blob.type === "image/webp"
          ? "webp"
          : blob.type === "image/jpeg"
            ? "jpg"
            : "jpg";

    return new File([blob], `${fileName}.${extension}`, {
      type: blob.type || "image/jpeg",
    });
  } catch (error) {
    console.error(`EXISTING ${fileName.toUpperCase()} ERROR:`, error);

    return null;
  }
};

const AddHistory = () => {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);

  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const [imagePreviews, setImagePreviews] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });
  const showCreateButton = true;
  const showSearch = true;
  const showActionButton = true;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addHistorySchema),

    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      location_text: "",

      image1: null,
      image2: null,
      image3: null,
      image4: null,
    },
  });

  const columns = [
    {
      header: "SN",
      key: "sn",
    },
    {
      header: "Title",
      key: "title",
    },
    {
      header: "Sub Title",
      key: "subtitle",
    },
    {
      header: "Description",
      key: "description",
    },
    {
      header: "Location",
      key: "location_text",
    },
    {
      header: "Image 1",
      key: "image1",
    },
    {
      header: "Image 2",
      key: "image2",
    },
    {
      header: "Image 3",
      key: "image3",
    },
    {
      header: "Image 4",
      key: "image4",
    },
  ];

  const getHistory = useCallback(async () => {
    try {
      const response = await getRequest("/about/history/");

      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      showToast({
        error,
      });

      setData([]);
    }
  }, []);

  const handleImageChange = (event, imageName) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImagePreviews((prev) => {
      const oldPreview = prev[imageName];

      if (oldPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(oldPreview);
      }

      return {
        ...prev,
        [imageName]: URL.createObjectURL(file),
      };
    });
  };

  const submitForm = async (formData) => {
    setLoading(true);

    try {
      const sendData = new FormData();

      sendData.append("title", formData.title);

      sendData.append("subtitle", formData.subtitle);

      sendData.append("description", formData.description);

      sendData.append("location_text", formData.location_text);

      if (formData.image1?.[0]) {
        sendData.append("image1", formData.image1[0]);
      } else if (id && imagePreviews.image1) {
        const existingImageFile = await imageUrlToFile(
          imagePreviews.image1,
          "history-image1",
        );

        if (existingImageFile) {
          sendData.append("image1", existingImageFile);
        } else {
          throw new Error("Unable to load existing Image 1.");
        }
      }

      if (formData.image2?.[0]) {
        sendData.append("image2", formData.image2[0]);
      } else if (id && imagePreviews.image2) {
        const existingImageFile = await imageUrlToFile(
          imagePreviews.image2,
          "history-image2",
        );

        if (existingImageFile) {
          sendData.append("image2", existingImageFile);
        } else {
          throw new Error("Unable to load existing Image 2.");
        }
      }

      if (formData.image3?.[0]) {
        sendData.append("image3", formData.image3[0]);
      } else if (id && imagePreviews.image3) {
        const existingImageFile = await imageUrlToFile(
          imagePreviews.image3,
          "history-image3",
        );

        if (existingImageFile) {
          sendData.append("image3", existingImageFile);
        } else {
          throw new Error("Unable to load existing Image 3.");
        }
      }

      if (formData.image4?.[0]) {
        sendData.append("image4", formData.image4[0]);
      } else if (id && imagePreviews.image4) {
        const existingImageFile = await imageUrlToFile(
          imagePreviews.image4,
          "history-image4",
        );

        if (existingImageFile) {
          sendData.append("image4", existingImageFile);
        } else {
          throw new Error("Unable to load existing Image 4.");
        }
      }

      for (const [key, value] of sendData.entries()) {
      }

      let response;

      if (!id) {
        response = await postRequest("/about/history/", sendData);
      } else {
        response = await updateRequest(`/about/history/${id}/`, sendData);
      }

      showToast({
        response: response.message,
      });

      reset({
        title: "",
        subtitle: "",
        description: "",
        location_text: "",
        image1: null,
        image2: null,
        image3: null,
        image4: null,
      });

      Object.values(imagePreviews).forEach((preview) => {
        if (preview?.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });

      setImagePreviews({
        image1: "",
        image2: "",
        image3: "",
        image4: "",
      });

      setShowForm(false);
      setId("");

      await getHistory();
    } catch (error) {
      showToast({
        error,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (historyId) => {
    try {
      setLoading(true);

      const response = await getRequest(`/about/history/${historyId}/`);

      const history = response.data;

      if (!history) {
        return;
      }

      setId(historyId);

      reset({
        title: history.title || "",

        subtitle: history.subtitle || "",

        description: history.description || "",

        location_text: history.location_text || "",

        image1: undefined,
        image2: undefined,
        image3: undefined,
        image4: undefined,
      });

      const existingImage1 = history.image1 ? getImageUrl(history.image1) : "";

      const existingImage2 = history.image2 ? getImageUrl(history.image2) : "";

      const existingImage3 = history.image3 ? getImageUrl(history.image3) : "";

      const existingImage4 = history.image4 ? getImageUrl(history.image4) : "";

      setImagePreviews({
        image1: existingImage1,
        image2: existingImage2,
        image3: existingImage3,
        image4: existingImage4,
      });

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

      const response = await deleteRequest(`/about/history/${deleteId}/`);

      showToast({
        response: response.message,
      });

      setShowDeleteModal(false);
      setDeleteId("");

      await getHistory();
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

    Object.values(imagePreviews).forEach((preview) => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    });

    setImagePreviews({
      image1: "",
      image2: "",
      image3: "",
      image4: "",
    });

    reset({
      title: "",
      subtitle: "",
      description: "",
      location_text: "",

      image1: null,
      image2: null,
      image3: null,
      image4: null,
    });
  };

  const handleSearch = useCallback(async (value) => {
    try {
      const keyword = value.trim();

      const url = keyword
        ? `/about/history/search/?keyword=${encodeURIComponent(keyword)}`
        : "/about/history/";

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
    getHistory();
  }, [getHistory]);

  useEffect(() => {
    return () => {
      Object.values(imagePreviews).forEach((preview) => {
        if (preview?.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [imagePreviews]);

  return (
    <div>
      <PageHeader
        title="History"
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
          <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="border-b border-gray-300 px-5 py-3 text-center">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-secondary">
                {id ? "UPDATE HISTORY" : "CREATE HISTORY"}
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                {id
                  ? "Update history information"
                  : "Add a new history to the system"}
              </p>
            </div>
            <form onSubmit={handleSubmit(submitForm)} className="px-4 py-3">
              <div>
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                  HISTORY INFORMATION
                </h3>

                <div className="mb-2.5">
                  <label
                    htmlFor="title"
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    Title
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    id="title"
                    type="text"
                    {...register("title")}
                    placeholder="Enter title"
                    autoFocus
                    className="h-9 w-full rounded-md border border-gray-300 bg-white px-2.5 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                  />

                  {errors.title && (
                    <p className="mt-0.5 text-[11px] text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="mb-2.5">
                  <label
                    htmlFor="subtitle"
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    Sub Title
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    id="subtitle"
                    type="text"
                    {...register("subtitle")}
                    placeholder="Enter subtitle"
                    className="h-9 w-full rounded-md border border-gray-300 bg-white px-2.5 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                  />

                  {errors.subtitle && (
                    <p className="mt-0.5 text-[11px] text-red-500">
                      {errors.subtitle.message}
                    </p>
                  )}
                </div>

                <div className="mb-2.5">
                  <label
                    htmlFor="description"
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    Description
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <textarea
                    id="description"
                    {...register("description")}
                    placeholder="Enter description"
                    rows={3}
                    className="w-full resize-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                  />

                  {errors.description && (
                    <p className="mt-0.5 text-[11px] text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="location_text"
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    Location
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <textarea
                    id="location_text"
                    {...register("location_text")}
                    placeholder="Enter location"
                    rows={2}
                    className="w-full resize-none rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                  />

                  {errors.location_text && (
                    <p className="mt-0.5 text-[11px] text-red-500">
                      {errors.location_text.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                  HISTORY IMAGES
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="image1"
                      className="mb-1 block text-xs font-medium text-gray-700"
                    >
                      Image 1
                    </label>

                    <div className="mb-1.5 flex h-20 w-full items-center justify-center overflow-hidden rounded-md border border-gray-300 bg-gray-50">
                      {imagePreviews.image1 ? (
                        <img
                          src={imagePreviews.image1}
                          alt="History image 1 preview"
                          className="h-full w-full object-cover"
                          onError={(event) => {
                            console.error(
                              "IMAGE 1 FAILED:",
                              imagePreviews.image1,
                            );
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-center text-[9px] font-medium uppercase tracking-wide text-gray-400">
                          IMAGE 1
                          <br />
                          PREVIEW
                        </span>
                      )}
                    </div>

                    <input
                      id="image1"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      {...register("image1", {
                        onChange: (event) => handleImageChange(event, "image1"),
                      })}
                      className="block h-9 w-full cursor-pointer rounded-md border border-gray-300 bg-white text-xs text-gray-600 file:mr-3 file:h-full file:border-0 file:border-r file:border-gray-300 file:bg-gray-50 file:px-2.5 file:text-[11px] file:font-medium file:text-gray-600 hover:file:bg-gray-100"
                    />

                    {errors.image1 && (
                      <p className="mt-0.5 text-[11px] text-red-500">
                        {errors.image1.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="image2"
                      className="mb-1 block text-xs font-medium text-gray-700"
                    >
                      Image 2
                    </label>

                    <div className="mb-1.5 flex h-20 w-full items-center justify-center overflow-hidden rounded-md border border-gray-300 bg-gray-50">
                      {imagePreviews.image2 ? (
                        <img
                          src={imagePreviews.image2}
                          alt="History image 2 preview"
                          className="h-full w-full object-cover"
                          onError={(event) => {
                            console.error(
                              "IMAGE 2 FAILED:",
                              imagePreviews.image2,
                            );
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-center text-[9px] font-medium uppercase tracking-wide text-gray-400">
                          IMAGE 2
                          <br />
                          PREVIEW
                        </span>
                      )}
                    </div>

                    <input
                      id="image2"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      {...register("image2", {
                        onChange: (event) => handleImageChange(event, "image2"),
                      })}
                      className="block h-9 w-full cursor-pointer rounded-md border border-gray-300 bg-white text-xs text-gray-600 file:mr-3 file:h-full file:border-0 file:border-r file:border-gray-300 file:bg-gray-50 file:px-2.5 file:text-[11px] file:font-medium file:text-gray-600 hover:file:bg-gray-100"
                    />

                    {errors.image2 && (
                      <p className="mt-0.5 text-[11px] text-red-500">
                        {errors.image2.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="image3"
                      className="mb-1 block text-xs font-medium text-gray-700"
                    >
                      Image 3
                    </label>

                    <div className="mb-1.5 flex h-20 w-full items-center justify-center overflow-hidden rounded-md border border-gray-300 bg-gray-50">
                      {imagePreviews.image3 ? (
                        <img
                          src={imagePreviews.image3}
                          alt="History image 3 preview"
                          className="h-full w-full object-cover"
                          onError={(event) => {
                            console.error(
                              "IMAGE 3 FAILED:",
                              imagePreviews.image3,
                            );
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-center text-[9px] font-medium uppercase tracking-wide text-gray-400">
                          IMAGE 3
                          <br />
                          PREVIEW
                        </span>
                      )}
                    </div>

                    <input
                      id="image3"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      {...register("image3", {
                        onChange: (event) => handleImageChange(event, "image3"),
                      })}
                      className="block h-9 w-full cursor-pointer rounded-md border border-gray-300 bg-white text-xs text-gray-600 file:mr-3 file:h-full file:border-0 file:border-r file:border-gray-300 file:bg-gray-50 file:px-2.5 file:text-[11px] file:font-medium file:text-gray-600 hover:file:bg-gray-100"
                    />

                    {errors.image3 && (
                      <p className="mt-0.5 text-[11px] text-red-500">
                        {errors.image3.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="image4"
                      className="mb-1 block text-xs font-medium text-gray-700"
                    >
                      Image 4
                    </label>

                    <div className="mb-1.5 flex h-20 w-full items-center justify-center overflow-hidden rounded-md border border-gray-300 bg-gray-50">
                      {imagePreviews.image4 ? (
                        <img
                          src={imagePreviews.image4}
                          alt="History image 4 preview"
                          className="h-full w-full object-cover"
                          onError={(event) => {
                            console.error(
                              "IMAGE 4 FAILED:",
                              imagePreviews.image4,
                            );
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-center text-[9px] font-medium uppercase tracking-wide text-gray-400">
                          IMAGE 4
                          <br />
                          PREVIEW
                        </span>
                      )}
                    </div>

                    <input
                      id="image4"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      {...register("image4", {
                        onChange: (event) => handleImageChange(event, "image4"),
                      })}
                      className="block h-9 w-full cursor-pointer rounded-md border border-gray-300 bg-white text-xs text-gray-600 file:mr-3 file:h-full file:border-0 file:border-r file:border-gray-300 file:bg-gray-50 file:px-2.5 file:text-[11px] file:font-medium file:text-gray-600 hover:file:bg-gray-100"
                    />

                    {errors.image4 && (
                      <p className="mt-0.5 text-[11px] text-red-500">
                        {errors.image4.message}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-1.5 text-[10px] text-gray-400">
                  JPG, JPEG, PNG
                </p>
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
                    "Update History"
                  ) : (
                    "Create History"
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

export default AddHistory;
