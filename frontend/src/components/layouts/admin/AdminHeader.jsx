import { Menu, Bell, ChevronDown } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-20 border-b border-gray-200 bg-white lg:left-64">
      <div className="flex h-full items-center justify-between px-5 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-secondary hover:bg-gray-100 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div>
            <h2 className="font-cormorant text-2xl font-semibold text-secondary sm:text-3xl">
              Dashboard
            </h2>

            <p className="hidden text-xs text-gray-400 sm:block">
              Welcome back, Admin
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-primary"
          >
            <Bell size={19} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>

          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <span className="font-cormorant text-lg font-semibold text-primary">
                A
              </span>
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-secondary">Admin</p>

              <p className="text-[10px] text-gray-400">Administrator</p>
            </div>

            <ChevronDown size={15} className="hidden text-gray-400 sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
