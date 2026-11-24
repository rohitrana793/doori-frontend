import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { deleteRequest, getRequest } from "../../../api/apiRequest";
import PageHeader from "../../../components/commom/PageHeader";
import DataTable from "../../../components/commom/DataTable";
import DeleteModal from "../../../components/commom/DeleteModal";
import { showToast } from "../../../utils/customToast";
import { customerDetailsSchema } from "../../../schema/customerDetailsSchema";

const ContactList = () => {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const showCreateButton = false;
  const showSearch = false;
  const showActionButton = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(customerDetailsSchema),
  });

  const columns = [
    { header: "SN", key: "sn" },
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Message", key: "message" },
    {
      header: "Branch",
      key: "branch_name",
    },
  ];

  const handleEdit = async (id) => {};

  const getContact = async () => {
    try {
      const response = await getRequest("/contact/list/");
      setData(response.data);
    } catch (error) {
      showToast({ error });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteRequest(`/contact/${deleteId}/`);
      getContact();
      setShowDeleteModal(false);
      showToast({ response: response.message });
    } catch (error) {
      showToast({ error });
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setId("");
    reset({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleSearch = useCallback(async (value) => {
    try {
    } catch (error) {}
  }, []);

  useEffect(() => {
    getContact();
  }, []);

  return (
    <div>
      <PageHeader
        title="Contact"
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
                {id ? "UPDATE Contact" : "CREATE Contact"}
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                {id
                  ? "Update contact information"
                  : "Add a new contact to the system"}
              </p>
            </div>

            <form onSubmit={handleSubmit(submitForm)} className="px-5 py-4">
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-700">
                  CONTACT INFORMATION
                </h3>

                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    placeholder="Enter name"
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                    autoFocus
                  />

                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Email
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    id="email"
                    type="text"
                    {...register("email")}
                    placeholder="Enter email"
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                    autoFocus
                  />

                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Message
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <textarea
                    id="message"
                    {...register("message")}
                    placeholder="Enter message"
                    rows={4}
                    className="w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
                  />

                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="cursor-pointer rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex min-w-28 cursor-pointer items-center justify-center rounded-md bg-secondary px-5 py-2 text-sm font-medium text-white transition hover:bg-submit-hover-button disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <LoaderCircle size={16} className="animate-spin" />
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

export default ContactList;
