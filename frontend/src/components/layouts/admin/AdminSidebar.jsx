import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { navLink } from "./Navigation";

const AdminSidebar = ({ setShowLogoutModal }) => {
  const location = useLocation();
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 bg-optional lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="font-cormorant text-2xl font-bold text-white">
              A
            </span>
          </div>

          <div>
            <h1 className="font-cormorant text-2xl font-semibold text-white">
              ADMIN
            </h1>

            <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
              Dashboard
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navLink.map((nav) => {
            const isActive = location.pathname === nav.key;
            return (
              <Link
                key={nav.key}
                to={nav.key}
                className={`flex h-11 items-center gap-3 rounded-lg  px-3 text-sm font-medium text-white ${isActive ? "bg-primary" : ""} transition-all`}
              >
                {nav.icon}
                {nav.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          className="flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-white transition hover:bg-primary/10 hover:text-primary cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
