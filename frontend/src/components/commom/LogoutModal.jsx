import { LogOut, X } from "lucide-react";

const LogoutModal = ({ setShowLogoutModal, handleLogout }) => {
  return (
    <div className="fixed inset-0 z-9999 flex items-start justify-center bg-gray-900/45 px-4 pt-24">
      <div className="w-full max-w-xs overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
        <div className="flex justify-end px-4 pt-3">
          <button
            onClick={() => setShowLogoutModal(false)}
            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
            <LogOut size={20} className="text-red-500" />
          </div>
        </div>

        <div className="px-5 pb-4 pt-3 text-center">
          <h2 className="text-base font-semibold text-gray-800">Logout?</h2>

          <p className="mt-1 text-xs leading-4 text-gray-500">
            Are you sure you want to logout?
          </p>
        </div>

        <div className="flex gap-2 border-t border-gray-100 px-4 py-3">
          <button
            onClick={() => setShowLogoutModal(false)}
            className="flex-1 rounded-md border border-gray-200 bg-white py-1.5 text-xs font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-800 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 rounded-md bg-red-500 py-1.5 text-xs font-medium text-white transition-all hover:bg-red-600 active:scale-[0.98] cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
