import { useEffect, useState } from "react";
import { ChevronDown, ShieldCheck, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { navLink } from "./Navigation";

const AdminSidebar = ({ showMobileSidebar, setShowMobileSidebar }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const activeParent = navLink.find(
      (nav) =>
        Array.isArray(nav.children) &&
        nav.children.some((child) => child.key === location.pathname),
    );

    setOpenMenu(activeParent?.label ?? null);
  }, [location.pathname]);

  const handleToggle = (label) => {
    setOpenMenu((current) => (current === label ? null : label));
  };

  const closeMobileSidebar = () => {
    setShowMobileSidebar(false);
  };

  return (
    <>
      {showMobileSidebar && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-64 flex-col
          border-r border-white/10
          bg-optional
          transform
          transition-transform duration-300 ease-in-out
          ${showMobileSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="relative flex h-16 shrink-0 items-center border-b border-white/10 px-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/20">
              <ShieldCheck size={20} strokeWidth={2} className="text-white" />
            </div>

            <div>
              <h1 className="font-cormorant text-xl font-bold tracking-wide text-white">
                ADMIN
              </h1>

              <p className="text-[8px] uppercase tracking-[0.25em] text-white/40">
                Dashboard
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeMobileSidebar}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2.5 py-3">
          <div className="space-y-1">
            {navLink.map((nav) => {
              const hasChildren =
                Array.isArray(nav.children) && nav.children.length > 0;

              if (!hasChildren) {
                const isActive = location.pathname === nav.key;

                return (
                  <Link
                    key={nav.key}
                    to={nav.key}
                    onClick={closeMobileSidebar}
                    className={`
                      group relative flex h-10
                      items-center gap-2.5
                      rounded-lg px-2.5
                      text-xs font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "text-white/65 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    {isActive && (
                      <span className="absolute left-0 h-5 w-0.5 rounded-r-full bg-white" />
                    )}

                    <span
                      className={`
                        transition-transform duration-200
                        group-hover:scale-110
                        ${isActive ? "text-white" : "text-white/50"}
                      `}
                    >
                      {nav.icon}
                    </span>

                    <span>{nav.label}</span>
                  </Link>
                );
              }

              const isChildActive = nav.children.some(
                (child) => location.pathname === child.key,
              );

              const isOpen = openMenu === nav.label;

              return (
                <div key={nav.label}>
                  <button
                    type="button"
                    onClick={() => handleToggle(nav.label)}
                    aria-expanded={isOpen}
                    className={`
                      group relative flex h-10
                      w-full
                      cursor-pointer
                      items-center justify-between
                      rounded-lg px-2.5
                      text-xs font-medium
                      transition-all duration-200
                      ${
                        isChildActive
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "text-white/65 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    {isChildActive && (
                      <span className="absolute left-0 h-5 w-0.5 rounded-r-full bg-white" />
                    )}

                    <span className="flex items-center gap-2.5">
                      <span
                        className={`
                          transition-transform duration-200
                          group-hover:scale-110
                          ${isChildActive ? "text-white" : "text-white/50"}
                        `}
                      >
                        {nav.icon}
                      </span>

                      <span>{nav.label}</span>
                    </span>

                    <ChevronDown
                      size={14}
                      className={`
                        text-white/40
                        transition-transform duration-300
                        ${isOpen ? "rotate-180 text-white" : ""}
                      `}
                    />
                  </button>

                  <div
                    className={`
                      grid overflow-hidden
                      transition-all duration-300
                      ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }
                    `}
                  >
                    <div className="min-h-0">
                      <div className="relative ml-4 mt-1 space-y-0.5 border-l border-white/10 pl-2.5">
                        {nav.children.map((child) => {
                          const isActive = location.pathname === child.key;

                          return (
                            <Link
                              key={child.key}
                              to={child.key}
                              onClick={closeMobileSidebar}
                              className={`
                                group flex h-9
                                items-center gap-2.5
                                rounded-md px-2.5
                                text-xs
                                transition-all duration-200
                                ${
                                  isActive
                                    ? "bg-white/10 text-white"
                                    : "text-white/45 hover:bg-white/5 hover:text-white"
                                }
                              `}
                            >
                              <span
                                className={`
                                  transition-all duration-200
                                  ${
                                    isActive
                                      ? "text-primary"
                                      : "text-white/40 group-hover:text-white/70"
                                  }
                                `}
                              >
                                {child.icon}
                              </span>

                              <span>{child.label}</span>

                              {isActive && (
                                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
