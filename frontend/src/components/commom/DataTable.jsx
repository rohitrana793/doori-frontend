import { Pencil, Trash2, KeyRound } from "lucide-react";

const DataTable = ({
  columns = [],
  rows = [],
  setShowForm,
  setShowDeleteModal,
  setShowResetModal,
  onEdit,
  onDelete,
  onReset,
  setDeleteId,
}) => {
  return (
    <div className="mx-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md mt-3">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-secondary text-white">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-6 py-2 text-left text-sm font-semibold"
                >
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-2 text-center text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              rows.map((val, index) => (
                <tr
                  key={val.id || index}
                  className="transition-colors hover:bg-green-50"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-2 text-sm">
                      {col.key === "sn" ? index + 1 : (val[col.key] ?? "-")}
                    </td>
                  ))}

                  <td className="px-6 py-2">
                    <div className="flex justify-center gap-1">
                      <button
                        type="button"
                        title="Edit"
                        onClick={() => {
                          setShowForm(true);
                          onEdit?.(val.reference_id || val.id);
                        }}
                        className="relative cursor-pointer rounded-lg p-2 text-amber-600 transition hover:bg-amber-100 group"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                        <span
                          className="
    absolute -top-8 left-1/2 -translate-x-1/2
    px-2 py-0.5 text-xs text-white bg-gray-800 rounded
    opacity-0 group-hover:opacity-100 transition-opacity
    whitespace-nowrap pointer-events-none
    after:content-[''] after:absolute after:top-full after:left-1/2
    after:-translate-x-1/2 after:border-4 after:border-transparent
    after:border-t-gray-800
  "
                        >
                          Edit
                        </span>
                      </button>

                      <button
                        type="button"
                        // onClick={() => onDelete?.(val.reference_id || val.id)}
                        onClick={() => {
                          {
                            setShowDeleteModal(true);
                            setDeleteId(val.reference_id || val.id);
                          }
                        }}
                        className="relative cursor-pointer rounded-lg p-2 text-red-600 transition hover:bg-red-100 group"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                        <span
                          className="
    absolute -top-8 left-1/2 -translate-x-1/2
    px-2 py-0.5 text-xs text-white bg-gray-800 rounded
    opacity-0 group-hover:opacity-100 transition-opacity
    whitespace-nowrap pointer-events-none
    after:content-[''] after:absolute after:top-full after:left-1/2
    after:-translate-x-1/2 after:border-4 after:border-transparent
    after:border-t-gray-800
  "
                        >
                          Delete
                        </span>
                      </button>

                      {resetButton && (
                        <button
                          type="button"
                          // onClick={() => onReset?.(val.reference_id || val.id)}
                          onClick={() => {
                            setShowResetModal(true);
                            setResetId(val.reference_id || val.id);
                          }}
                          className="relative cursor-pointer rounded-lg p-2 text-blue-600 transition hover:bg-blue-100 group"
                          aria-label="Reset Password"
                        >
                          <KeyRound size={16} />
                          <span
                            className="
    absolute -top-8 left-1/2 -translate-x-1/2
    px-2 py-0.5 text-xs text-white bg-gray-800 rounded
    opacity-0 group-hover:opacity-100 transition-opacity
    whitespace-nowrap pointer-events-none
    after:content-[''] after:absolute after:top-full after:left-1/2
    after:-translate-x-1/2 after:border-4 after:border-transparent
    after:border-t-gray-800
  "
                          >
                            Reset Password
                          </span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
