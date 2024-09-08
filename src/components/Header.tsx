import { useState } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const isLoggedIn = ()=>{
  const token = localStorage.getItem("token");
  console.log(token);
  return token ? true : false;
};

const EcommerceNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-500 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 z-40 transform ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:hidden`}
        >
          <div
            className={`absolute inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-in-out ${
              mobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={toggleMobileMenu}
          ></div>

          <div className="fixed inset-0 z-40 flex">
            <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={toggleMobileMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile menu content */}
              <div className="mt-2">
                <div className="border-b border-gray-200">
                  <div className="flex items-center justify-center space-x-8 px-4 py-2 ">
                    <Link to="/">
                      <span className="sr-only">Your Company</span>
                      <img
                        className="h-16 w-auto"
                        src="https://th.bing.com/th/id/OIP.ByAsL5GlaSkeGpjgow2sBQHaHa?rs=1&pid=ImgDetMain"
                        alt="Company logo"
                      />
                    </Link>
                  </div>
                </div>

                <div className="space-y-6 px-4 py-6">
                  <div className="flow-root">
                    <Link
                      to="/"
                      className={`-m-2 block p-5 font-medium ${
                        isActive("/")
                          ? "text-[#4f46e5]"
                          : "text-gray-900 hover:text-[#4f46e5]"
                      }`}
                      onClick={toggleMobileMenu}
                    >
                      Home
                    </Link>
                    <Link
                      to="/categories"
                      className={`-m-2 block p-5 font-medium ${
                        isActive("/categories")
                          ? "text-[#4f46e5]"
                          : "text-gray-900 hover:text-[#4f46e5]"
                      }`}
                      onClick={toggleMobileMenu}
                    >
                      Categories
                    </Link>
                    <Link
                      to="/collection"
                      className={`-m-2 block p-5 font-medium ${
                        isActive("/collection")
                          ? "text-[#4f46e5]"
                          : "text-gray-900 hover:text-[#4f46e5]"
                      }`}
                      onClick={toggleMobileMenu}
                    >
                      Collection
                    </Link>
                    <Link
                      to="/about"
                      className={`-m-2 block p-5 font-medium ${
                        isActive("/about")
                          ? "text-[#4f46e5]"
                          : "text-gray-900 hover:text-[#4f46e5]"
                      }`}
                      onClick={toggleMobileMenu}
                    >
                      About
                    </Link>
                    <Link
                      to="/contact"
                      className={`-m-2 block p-5 font-medium ${
                        isActive("/contact")
                          ? "text-[#4f46e5]"
                          : "text-gray-900 hover:text-[#4f46e5]"
                      }`}
                      onClick={toggleMobileMenu}
                    >
                      Contact
                    </Link>

                    {!isLoggedIn() && <Link
                      to="/login"
                      className={`-m-2 block p-5 font-medium ${
                        isActive("/login")
                          ? "text-[#4f46e5]"
                          : "text-gray-900 hover:text-[#4f46e5]"
                      }`}
                      onClick={toggleMobileMenu}
                    >
                      Sign in
                    </Link> }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex lg:flex-1">
              <Link to="/">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://th.bing.com/th/id/OIP.ByAsL5GlaSkeGpjgow2sBQHaHa?rs=1&pid=ImgDetMain"
                  alt="Company logo"
                />
              </Link>
            </div>

            {/* Centered links */}
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
              <div className="flex space-x-8">
                <Link
                  to="/categories"
                  className={`flex items-center text-sm font-medium ${
                    isActive("/categories")
                      ? "text-[#4f46e5]"
                      : "text-gray-700 hover:text-[#4f46e5]"
                  }`}
                >
                  Categories
                </Link>
                <Link
                  to="/collection"
                  className={`flex items-center text-sm font-medium ${
                    isActive("/collection")
                      ? "text-[#4f46e5]"
                      : "text-gray-700 hover:text-[#4f46e5]"
                  }`}
                >
                  Collection
                </Link>
                <Link
                  to="/about"
                  className={`flex items-center text-sm font-medium ${
                    isActive("/about")
                      ? "text-[#4f46e5]"
                      : "text-gray-700 hover:text-[#4f46e5]"
                  }`}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`flex items-center text-sm font-medium ${
                    isActive("/contact")
                      ? "text-[#4f46e5]"
                      : "text-gray-700 hover:text-[#4f46e5]"
                  }`}
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Right side items */}
            <div className="flex items-center lg:flex-1 lg:justify-end">
              {!isLoggedIn() ? <Link
                to="/login"
                className={`hidden lg:block text-sm font-medium ${
                  isActive("/login")
                    ? "text-[#4f46e5]"
                    : "text-gray-700 hover:text-[#4f46e5]"
                }`}
              >
                Sign in
              </Link> : <h1 className="text-sm font-black">{localStorage.getItem("name")}</h1>}

              {/* Wishlist icon with badge */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link
                  to="/wishlist"
                  className="group -m-2 flex items-center p-2"
                >
                    <span className="text-sm font-medium">Wishlist</span>
                  <div className="relative ml-2">
                    <Heart
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-indigo-600 text-[10px] font-medium text-white flex items-center justify-center">
                      0
                    </span>
                  </div>
                  <span className="sr-only">View wishlist</span>
                </Link>
              </div>

              {/* Shopping bag icon with badge */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link
                  to="/cart"
                  className="group -m-2 flex items-center p-2"
                >
                    <span className="text-sm font-medium">Cart</span>
                  <div className="relative  ml-2">
                    <ShoppingBag
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-indigo-600 text-[10px] font-medium text-white flex items-center justify-center">
                      0
                    </span>
                  </div>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                className="ml-4 -m-2 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default EcommerceNavigation;
