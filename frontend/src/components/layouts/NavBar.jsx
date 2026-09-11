import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef(null);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (name) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleMobileDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "bg-secondary shadow-lg"
            : isHomePage
              ? isScrolled
                ? "bg-secondary backdrop-blur-md shadow-lg"
                : "bg-transparent backdrop-blur-none"
              : "bg-secondary backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="container mx-auto px-6 font-karla tracking-wider md:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            <Link
              to="/"
              className="flex items-center"
              onClick={closeMobileMenu}
            >
              <img
                src="/images/logo-copy.png"
                alt="DOORI Logo"
                className="h-12 w-auto object-contain md:h-16 lg:h-20"
              />
            </Link>

            <nav className="hidden items-center gap-6 md:flex lg:gap-8">
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("order")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-1 text-xs font-medium text-white transition-colors duration-500 hover:text-primary lg:text-sm"
                >
                  ORDER HERE
                  <ChevronDown size={14} />
                </button>

                {openDropdown === "order" && (
                  <div className="absolute left-0 top-full mt-2 w-52 border border-gray-100 bg-white shadow-lg">
                    <Link
                      to="/helsingborg/"
                      className="block px-4 py-2.5 text-sm text-black transition hover:bg-[#F7FAFC]"
                    >
                      HELSINGBORG
                    </Link>

                    <Link
                      to="/malmo/"
                      className="block px-4 py-2.5 text-sm text-black transition hover:bg-[#F7FAFC]"
                    >
                      MALMO BERGSGATAN
                    </Link>

                    <Link
                      to="/malmo-vastra-hamnen/"
                      className="block px-4 py-2.5 text-sm text-black transition hover:bg-[#F7FAFC]"
                    >
                      MALMO WESTERN HARBOUR
                    </Link>

                    <Link
                      to="/vaxjo/"
                      className="block px-4 py-2.5 text-sm text-black transition hover:bg-[#F7FAFC]"
                    >
                      VAXJO
                    </Link>

                    <Link
                      to="/copenhagen/"
                      className="block px-4 py-2.5 text-sm text-black transition hover:bg-[#F7FAFC]"
                    >
                      COPENHAGEN
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/menu/"
                className="text-xs font-medium text-white transition-colors duration-500 hover:text-primary lg:text-sm"
              >
                OUR FOOD
              </Link>

              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-1 text-xs font-medium text-white transition-colors duration-500 hover:text-primary lg:text-sm"
                >
                  ABOUT US
                  <ChevronDown size={14} />
                </button>

                {openDropdown === "about" && (
                  <div className="absolute left-0 top-full mt-2 w-48 border border-gray-100 bg-white shadow-lg">
                    <Link
                      to="/about-us/"
                      className="block px-4 py-2.5 text-sm text-black transition hover:bg-[#F7FAFC]"
                    >
                      ABOUT US
                    </Link>

                    <Link
                      to="/contact/"
                      className="block px-4 py-2.5 text-sm text-black transition hover:bg-[#F7FAFC]"
                    >
                      FRANCHISE
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/catering/"
                className="text-xs font-medium text-white transition-colors duration-500 hover:text-primary lg:text-sm"
              >
                CATERING
              </Link>

              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/Doorikoreanskmat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white transition-colors hover:text-primary"
                >
                  <FaFacebook size={18} />
                </a>

                <a
                  href="https://www.instagram.com/doori_koreanskmat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white transition-colors hover:text-primary"
                >
                  <IoLogoInstagram size={22} />
                </a>
              </div>
            </nav>

            <button
              type="button"
              className="text-white md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="border-t border-white/10 bg-secondary py-4 md:hidden">
              <nav className="flex flex-col">
                <div>
                  <button
                    type="button"
                    onClick={() => toggleMobileDropdown("order")}
                    className="flex w-full cursor-pointer items-center justify-between px-2 py-3 text-sm font-medium text-white transition hover:text-primary"
                  >
                    <span>ORDER HERE</span>

                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        openDropdown === "order" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "order" && (
                    <div className="ml-2 border-l border-primary/40 pl-3">
                      <Link
                        to="/helsingborg/"
                        onClick={closeMobileMenu}
                        className="block py-2.5 text-xs text-white transition hover:text-primary"
                      >
                        HELSINGBORG
                      </Link>

                      <Link
                        to="/malmo/"
                        onClick={closeMobileMenu}
                        className="block py-2.5 text-xs text-white transition hover:text-primary"
                      >
                        MALMO BERGSGATAN
                      </Link>

                      <Link
                        to="/malmo-vastra-hamnen/"
                        onClick={closeMobileMenu}
                        className="block py-2.5 text-xs text-white transition hover:text-primary"
                      >
                        MALMO WESTERN HARBOUR
                      </Link>

                      <Link
                        to="/vaxjo/"
                        onClick={closeMobileMenu}
                        className="block py-2.5 text-xs text-white transition hover:text-primary"
                      >
                        VAXJO
                      </Link>

                      <Link
                        to="/copenhagen/"
                        onClick={closeMobileMenu}
                        className="block py-2.5 text-xs text-white transition hover:text-primary"
                      >
                        COPENHAGEN
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/menu/"
                  className="px-2 py-3 text-sm font-medium text-white transition hover:text-primary"
                  onClick={closeMobileMenu}
                >
                  OUR FOOD
                </Link>

                <div>
                  <button
                    type="button"
                    onClick={() => toggleMobileDropdown("about")}
                    className="flex w-full cursor-pointer items-center justify-between px-2 py-3 text-sm font-medium text-white transition hover:text-primary"
                  >
                    <span>ABOUT US</span>

                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        openDropdown === "about" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "about" && (
                    <div className="ml-2 border-l border-primary/40 pl-3">
                      <Link
                        to="/about-us/"
                        onClick={closeMobileMenu}
                        className="block py-2.5 text-xs text-white transition hover:text-primary"
                      >
                        ABOUT US
                      </Link>

                      <Link
                        to="/contact/"
                        onClick={closeMobileMenu}
                        className="block py-2.5 text-xs text-white transition hover:text-primary"
                      >
                        FRANCHISE
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/catering/"
                  className="px-2 py-3 text-sm font-medium text-white transition hover:text-primary"
                  onClick={closeMobileMenu}
                >
                  CATERING
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
