import { X } from "lucide-react";

const DeleteModal = (setShowDeleteModal, handleDelete) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-lg">
        <div className="flex justify-end">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Delete Record?
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Are you sure you want to delete this record?
          </p>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="rounded-lg border border-gray-300 px-5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            No
          </button>

          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-5 py-1.5 text-sm font-medium text-white hover:bg-red-700"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
