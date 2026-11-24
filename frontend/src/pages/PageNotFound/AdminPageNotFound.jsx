import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, AlertTriangle } from "lucide-react";

const AdminPageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
        </div>

        <h1 className="text-8xl font-bold tracking-tight text-gray-800">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500 leading-6">
          The admin page you are looking for doesn't exist or may have been
          moved to another location.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300
                       bg-white px-5 py-2.5 text-sm font-medium text-gray-700
                       transition hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-primary
                       px-5 py-2.5 text-sm font-medium text-white
                       transition hover:opacity-90"
          >
            <Home size={18} />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPageNotFound;
