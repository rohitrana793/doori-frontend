import {
  Menu,
  Bell,
  ChevronDown,
  User,
  LockKeyhole,
  LogOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AdminHeader = ({ setShowMobileSidebar, setShowLogoutModal }) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-16 border-b border-gray-200 bg-white lg:left-64">
      <div className="flex h-full items-center justify-between px-4 sm:px-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowMobileSidebar(true)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-secondary transition hover:bg-gray-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>

          <div>
            <h2 className="font-cormorant text-xl font-semibold text-secondary sm:text-2xl">
              Dashboard
            </h2>

            <p className="hidden text-[11px] text-gray-400 sm:block">
              Welcome back, Admin
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-primary"
            aria-label="Notifications"
          >
            <Bell size={17} />

            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>

          <div className="hidden h-7 w-px bg-gray-200 sm:block" />

          <div ref={modalRef} className="relative">
            <button
              type="button"
              onClick={() => setShowModal((prev) => !prev)}
              className="flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1 transition hover:bg-gray-50"
              aria-label="Open account menu"
              aria-expanded={showModal}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <span className="font-cormorant text-base font-semibold text-primary">
                  A
                </span>
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold text-secondary">Admin</p>

                <p className="text-[9px] text-gray-400">Administrator</p>
              </div>

              <ChevronDown
                size={14}
                className={`hidden text-gray-400 transition-transform sm:block ${
                  showModal ? "rotate-180" : ""
                }`}
              />
            </button>

            {showModal && (
              <div className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                <div className="p-1.5">
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-left text-xs text-gray-700 transition hover:bg-primary/5 hover:text-primary"
                  >
                    <User size={16} className="text-gray-500" />

                    <span className="flex-1">Profile</span>
                  </button>

                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-left text-xs text-gray-700 transition hover:bg-primary/5 hover:text-primary"
                  >
                    <LockKeyhole size={16} className="text-gray-500" />

                    <span className="flex-1">Change Password</span>
                  </button>

                  <div className="my-1 border-t border-gray-100" />

                  <button
                    type="button"
                    onClick={() => setShowLogoutModal(true)}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-left text-xs text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={16} />

                    <span className="flex-1">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
