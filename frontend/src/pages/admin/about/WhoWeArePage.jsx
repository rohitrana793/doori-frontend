import { useCallback, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Plus, Trash2 } from "lucide-react";
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
import { whoWeAreSchema } from "../../../schema/whoWeAreSchema";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

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
    return null;
  }
};

const WhoWeArePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [imagePreviews, setImagePreviews] = useState({
    image1: "",
    image2: "",
  });
  const showCreateButton = true;
  const showSearch = true;
  const showActionButton = true;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(whoWeAreSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      services: [{ name: "" }],
      image1: undefined,
      image2: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
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
      header: "Services",
      key: "services",
    },
    {
      header: "Image 1",
      key: "image1",
    },
    {
      header: "Image 2",
      key: "image2",
    },
  ];

  const getAbout = useCallback(async () => {
    try {
      const response = await getRequest("/about/who-we-are/");
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      showToast({ error });
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

  const resetForm = useCallback(() => {
    reset({
      title: "",
      subtitle: "",
      description: "",
      services: [{ name: "" }],
      image1: undefined,
      image2: undefined,
    });

    setImagePreviews((prev) => {
      Object.values(prev).forEach((preview) => {
        if (preview?.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });

      return {
        image1: "",
        image2: "",
      };
    });

    setId("");
    setShowForm(false);
  }, [reset]);

  const submitForm = async (formData) => {
    setLoading(true);

    try {
      const sendData = new FormData();

      sendData.append("title", formData.title.trim());

      sendData.append("subtitle", formData.subtitle.trim());

      sendData.append("description", formData.description.trim());

      const services = formData.services
        .map((service) => service.name.trim())
        .filter(Boolean);

      sendData.append("services", JSON.stringify(services));

      if (formData.image1?.[0]) {
        sendData.append("image1", formData.image1[0]);
      } else if (id && imagePreviews.image1) {
        const existingImageFile = await imageUrlToFile(
          imagePreviews.image1,
          "who-we-are-image1",
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
          "who-we-are-image2",
        );

        if (existingImageFile) {
          sendData.append("image2", existingImageFile);
        } else {
          throw new Error("Unable to load existing Image 2.");
        }
      }

      for (const [key, value] of sendData.entries()) {
      }

      let response;

      if (!id) {
        response = await postRequest("/about/who-we-are/", sendData);
      } else {
        response = await updateRequest(`/about/who-we-are/${id}/`, sendData);
      }

      showToast({
        response: response.message,
      });

      resetForm();

      await getAbout();
    } catch (error) {
      showToast({
        error,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (aboutId) => {
    try {
      const response = await getRequest(`/about/who-we-are/${aboutId}/`);

      const about = response.data;

      setId(aboutId);

      let services = [];

      if (Array.isArray(about.services)) {
        services = about.services.map((service) => {
          if (typeof service === "string") {
            return {
              name: service,
            };
          }

          return {
            name: service?.name || "",
          };
        });
      } else if (typeof about.services === "string") {
        try {
          const parsedServices = JSON.parse(about.services);

          if (Array.isArray(parsedServices)) {
            services = parsedServices.map((service) => {
              if (typeof service === "string") {
                return {
                  name: service,
                };
              }

              return {
                name: service?.name || "",
              };
            });
          }
        } catch {
          services = about.services
            .split(",")
            .map((service) => ({
              name: service.trim(),
            }))
            .filter((service) => service.name);
        }
      }

      if (services.length === 0) {
        services = [
          {
            name: "",
          },
        ];
      }

      const existingImage1 = about.image1 ? getImageUrl(about.image1) : "";

      const existingImage2 = about.image2 ? getImageUrl(about.image2) : "";

      reset({
        title: about.title || "",
        subtitle: about.subtitle || "",
        description: about.description || "",
        services,
        image1: undefined,
        image2: undefined,
      });

      setImagePreviews({
        image1: existingImage1,
        image2: existingImage2,
      });

      setShowForm(true);
    } catch (error) {
      showToast({
        error,
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) {
      return;
    }

    setLoading(true);

    try {
      const response = await deleteRequest(`/about/who-we-are/${deleteId}/`);

      showToast({
        response: response.message,
      });

      setShowDeleteModal(false);
      setDeleteId("");

      await getAbout();
    } catch (error) {
      showToast({
        error,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (aboutId) => {
    setDeleteId(aboutId);
    setShowDeleteModal(true);
  };

  const handleClose = () => {
    if (loading) {
      return;
    }

    resetForm();
  };

  const handleSearch = useCallback(async (value) => {
    try {
      const keyword = value.trim();

      const url = keyword
        ? `/about/who-we-are/search/?keyword=${encodeURIComponent(keyword)}`
        : "/about/who-we-are/";

      const response = await getRequest(url);

      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      showToast({
        error,
      });
    }
  }, []);

  useEffect(() => {
    getAbout();
  }, [getAbout]);

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
        title="Who We Are"
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
        setDeleteId={setDeleteId}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        showActionButton={showActionButton}
      />

      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 px-4 py-6">
          <div className="mx-auto w-full max-w-2xl rounded-xl bg-white shadow-xl">
            <div className="border-b border-gray-300 px-6 py-4 text-center">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-secondary">
                {id ? "UPDATE WHO WE ARE" : "CREATE WHO WE ARE"}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                {id
                  ? "Update who we are information"
                  : "Add a new who we are to the system"}
              </p>
            </div>

            <form onSubmit={handleSubmit(submitForm)} className="px-4 py-3">
              <div>
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                  WHO WE ARE INFORMATION
                </h3>

                <div className="mb-2.5">
                  <label
                    htmlFor="title"
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    Title <span className="ml-1 text-red-500">*</span>
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
                    Sub Title <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    id="subtitle"
                    type="text"
                    {...register("subtitle")}
                    placeholder="Enter sub title"
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
                    Description <span className="ml-1 text-red-500">*</span>
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
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-xs font-medium text-gray-700">
                      Services <span className="ml-1 text-red-500">*</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => append({ name: "" })}
                      className="flex cursor-pointer items-center gap-1 text-xs font-medium text-secondary hover:underline"
                    >
                      <Plus size={13} />
                      Add Service
                    </button>
                  </div>

                  <div className="space-y-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-start gap-1.5">
                        <div className="flex-1">
                          <input
                            type="text"
                            {...register(`services.${index}.name`)}
                            placeholder={`Enter service ${index + 1}`}
                            className="h-9 w-full rounded-md border border-gray-300 bg-white px-2.5 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                          />

                          {errors.services?.[index]?.name && (
                            <p className="mt-0.5 text-[11px] text-red-500">
                              {errors.services[index].name.message}
                            </p>
                          )}
                        </div>

                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            title="Remove service"
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-red-200 text-red-500 transition hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {errors.services?.message && (
                    <p className="mt-0.5 text-[11px] text-red-500">
                      {errors.services.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-gray-700">
                  ABOUT IMAGES
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="image1"
                      className="mb-1 block text-xs font-medium text-gray-700"
                    >
                      Image 1
                    </label>

                    <input
                      id="image1"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      {...register("image1", {
                        onChange: (event) => handleImageChange(event, "image1"),
                      })}
                      className="block h-9 w-full cursor-pointer rounded-md border border-gray-300 bg-white text-xs text-gray-600 file:mr-3 file:h-full file:border-0 file:border-r file:border-gray-300 file:bg-gray-50 file:px-2.5 file:text-[11px] file:font-medium file:text-gray-600 hover:file:bg-gray-100"
                    />

                    {imagePreviews.image1 && (
                      <div className="mt-2">
                        <img
                          src={imagePreviews.image1}
                          alt="Image 1 Preview"
                          className="h-24 w-full rounded-md border border-gray-200 object-cover"
                        />
                      </div>
                    )}

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

                    <input
                      id="image2"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      {...register("image2", {
                        onChange: (event) => handleImageChange(event, "image2"),
                      })}
                      className="block h-9 w-full cursor-pointer rounded-md border border-gray-300 bg-white text-xs text-gray-600 file:mr-3 file:h-full file:border-0 file:border-r file:border-gray-300 file:bg-gray-50 file:px-2.5 file:text-[11px] file:font-medium file:text-gray-600 hover:file:bg-gray-100"
                    />

                    {imagePreviews.image2 && (
                      <div className="mt-2">
                        <img
                          src={imagePreviews.image2}
                          alt="Image 2 Preview"
                          className="h-24 w-full rounded-md border border-gray-200 object-cover"
                        />
                      </div>
                    )}

                    {errors.image2 && (
                      <p className="mt-0.5 text-[11px] text-red-500">
                        {errors.image2.message}
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
                  className="flex min-w-28 cursor-pointer items-center justify-center rounded-md bg-secondary px-4 py-1.5 text-xs font-medium text-white transition hover:bg-submit-hover-button disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <LoaderCircle size={14} className="animate-spin" />
                  ) : id ? (
                    "Update About"
                  ) : (
                    "Create About"
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

export default WhoWeArePage;
