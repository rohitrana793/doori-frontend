import { Pencil, Trash2 } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const getImageUrl = (image) => {
  if (!image) return "";
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  const serverUrl = API_BASE_URL.replace(/\/api\/v1\/?$/, "");
  return `${serverUrl}/${image.replace(/^\/+/, "")}`;
};

const DataTable = ({
  columns = [],
  rows = [],
  setShowForm,
  setShowDeleteModal,
  onEdit,
  setDeleteId,
  setResetId,
  showActionButton,
}) => {
  const imageKeys = ["logo", "image", "image1", "image2", "image3", "image4"];

  const renderServices = (services) => {
    if (!services) {
      return <span className="text-xs text-gray-400">-</span>;
    }

    let serviceList = [];

    if (Array.isArray(services)) {
      serviceList = services;
    } else if (typeof services === "string") {
      try {
        const parsed = JSON.parse(services);

        if (Array.isArray(parsed)) {
          serviceList = parsed;
        } else {
          serviceList = [services];
        }
      } catch {
        serviceList = services
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    if (serviceList.length === 0) {
      return <span className="text-xs text-gray-400">-</span>;
    }

    return (
      <div className="flex max-w-[240px] flex-wrap gap-1">
        {serviceList.map((service, index) => {
          const serviceName =
            typeof service === "string" ? service : service?.name || "";

          if (!serviceName) return null;

          return (
            <span
              key={`${serviceName}-${index}`}
              className="inline-flex rounded-full bg-gray-100 px-1.5 py-0.5 text-[11px] font-medium text-gray-700"
            >
              {serviceName}
            </span>
          );
        })}
      </div>
    );
  };

  const renderValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return <span className="text-xs text-gray-400">-</span>;
    }

    return value;
  };

  return (
    <div className="mx-6 mt-2 overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead className="bg-secondary text-white">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`
                    whitespace-nowrap
                    px-2.5
                    py-1.5
                    text-left
                    text-xs
                    font-semibold
                    ${col.key === "sn" ? "w-10" : ""}
                    ${col.key === "title" ? "min-w-[140px]" : ""}
                    ${col.key === "subtitle" ? "min-w-[150px]" : ""}
                    ${col.key === "description" ? "min-w-[200px]" : ""}
                    ${col.key === "message" ? "min-w-[220px]" : ""}
                    ${col.key === "services" ? "min-w-[240px]" : ""}
                    ${imageKeys.includes(col.key) ? "w-[75px]" : ""}
                  `}
                >
                  {col.header}
                </th>
              ))}
              {showActionButton && (
                <th className="w-[85px] whitespace-nowrap px-2.5 py-1.5 text-center text-xs font-semibold">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-xs">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-3 py-6 text-center text-xs text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr
                  key={row.reference_id || row.id || index}
                  className="align-middle transition-colors hover:bg-gray-50"
                >
                  {columns.map((col) => {
                    if (col.key === "sn") {
                      return (
                        <td
                          key={col.key}
                          className="px-2.5 py-1 text-xs font-medium text-gray-700"
                        >
                          {index + 1}
                        </td>
                      );
                    }

                    if (imageKeys.includes(col.key)) {
                      const image = row[col.key];

                      return (
                        <td key={col.key} className="px-2.5 py-1">
                          {image ? (
                            <div className="flex items-center">
                              <img
                                src={getImageUrl(image)}
                                alt={col.header}
                                className="h-8 w-12 rounded border border-gray-200 object-cover"
                                onError={(e) => {
                                  console.error(
                                    `${col.header} image failed to load:`,
                                    getImageUrl(image),
                                  );

                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            </div>
                          ) : (
                            <span className="text-[11px] text-gray-400">
                              No Image
                            </span>
                          )}
                        </td>
                      );
                    }

                    if (col.key === "services") {
                      return (
                        <td key={col.key} className="px-2.5 py-1 text-xs">
                          {renderServices(row[col.key])}
                        </td>
                      );
                    }

                    if (col.key === "description" || col.key === "message") {
                      return (
                        <td key={col.key} className="max-w-[260px] px-2.5 py-1">
                          <p
                            className="line-clamp-2 text-xs leading-4 text-gray-600"
                            title={row[col.key] || ""}
                          >
                            {renderValue(row[col.key])}
                          </p>
                        </td>
                      );
                    }

                    if (col.key === "title" || col.key === "subtitle") {
                      return (
                        <td key={col.key} className="max-w-[180px] px-2.5 py-1">
                          <p
                            className="line-clamp-2 text-xs leading-4 text-gray-700"
                            title={row[col.key] || ""}
                          >
                            {renderValue(row[col.key])}
                          </p>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={col.key}
                        className="px-2.5 py-1 text-xs text-gray-700"
                      >
                        {renderValue(row[col.key])}
                      </td>
                    );
                  })}
                  {showActionButton && (
                    <td className="px-2.5 py-1">
                      <div className="flex items-center justify-center gap-0.5">
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => {
                            const rowId = row.reference_id || row.id;

                            setShowForm?.(true);
                            onEdit?.(rowId);
                          }}
                          className="group relative flex h-7 w-7 cursor-pointer items-center justify-center rounded text-amber-600 transition hover:bg-amber-100"
                          aria-label="Edit"
                        >
                          <Pencil size={14} />

                          <span className="pointer-events-none absolute -top-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                            Edit
                          </span>
                        </button>

                        <button
                          type="button"
                          title="Delete"
                          onClick={() => {
                            const rowId = row.reference_id || row.id;
                            setDeleteId?.(rowId);
                            setShowDeleteModal?.(true);
                          }}
                          className="group relative flex h-7 w-7 cursor-pointer items-center justify-center rounded text-red-600 transition hover:bg-red-100"
                          aria-label="Delete"
                        >
                          <Trash2 size={14} />

                          <span className="pointer-events-none absolute -top-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                            Delete
                          </span>
                        </button>
                      </div>
                    </td>
                  )}
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
