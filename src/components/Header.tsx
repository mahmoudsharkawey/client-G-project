import { useState, useRef, useEffect, useCallback } from "react";
import {
  ShoppingBag,
  Heart,
  User,
  LogOut,
  Package,
  Smartphone,
  ShirtIcon,
  Home,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const getUserName = () => {
  const tokenObj = localStorage.getItem("token");
  if (tokenObj) {
    try {
      const { name } = JSON.parse(tokenObj);
      return name || "User"; // Fallback to 'User' if name is not present
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  }
  return "User";
};

const categories = [
  { name: "Electronics", icon: Smartphone, path: "/categories/electronics" },
  { name: "Clothing", icon: ShirtIcon, path: "/categories/clothing" },
  { name: "Home Decor", icon: Home, path: "/categories/home-decor" },
  // Add more categories as needed

  // Add more categories as needed
];

const EcommerceNavigation = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const location = useLocation();
  const userName = getUserName();
  const isActive = (path: string) => location.pathname === path;
  //   const [showDropdown, setShowDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<
    string | null
  >(null);

  const toggleMobileCategoryExpansion = (categoryName: string) => {
    setMobileExpandedCategory((prev) =>
      prev === categoryName ? null : categoryName
    );
  };

  const toggleCategoryDropdown = useCallback(() => {
    setShowCategoryDropdown((prev) => !prev);
  }, []);

  const toggleUserDropdown = useCallback(() => {
    setShowUserDropdown((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // setShowDropdown(false);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
    // setShowDropdown(false); // Close dropdown if open
    setMobileMenuOpen(false); // Close mobile menu if open
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-500 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-40 lg:hidden"
            >
              <div
                className="absolute inset-0 bg-black bg-opacity-25"
                onClick={toggleMobileMenu}
              ></div>

              <div className="relative flex w-full max-w-xs flex-col overflow-y-auto h-full bg-white pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4 pt-5 pb-2">
                  <Link to="/" onClick={toggleMobileMenu}>
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto"
                      src="https://th.bing.com/th/id/OIP.ByAsL5GlaSkeGpjgow2sBQHaHa?rs=1&pid=ImgDetMain"
                      alt="Company logo"
                    />
                  </Link>
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
                      <div className="py-2">
                        <button
                          onClick={() => toggleMobileCategoryExpansion("main")}
                          className={`flex items-center justify-between w-full -m-2 p-2 font-medium ${
                            mobileExpandedCategory === "main"
                              ? "text-[#4f46e5]"
                              : "text-gray-900 hover:text-[#4f46e5]"
                          }`}
                        >
                          Categories
                          <motion.svg
                            animate={{
                              rotate:
                                mobileExpandedCategory === "main" ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </motion.svg>
                        </button>
                        <AnimatePresence>
                          {mobileExpandedCategory === "main" && (
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={dropdownVariants}
                              className="mt-2 space-y-2"
                            >
                              {categories.map((category) => (
                                <motion.div
                                  key={category.name}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Link
                                    to={category.path}
                                    className="flex items-center p-2 -m-2 text-gray-700 hover:bg-gray-100 rounded-md"
                                    onClick={toggleMobileMenu}
                                  >
                                    <category.icon className="w-5 h-5 mr-3 text-gray-500" />
                                    <span className="text-sm font-medium">
                                      {category.name}
                                    </span>
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
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
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6">
                    <div className="flow-root px-4">
                      {isAuthenticated ? (
                        <div>
                          <div className="flex items-center mb-4">
                            <User size={20} fill="#6366f1" className="mr-2" />
                            <span className="text-sm font-medium">
                              {userName}
                            </span>
                          </div>
                          <Link
                            to="/orders"
                            className="flex items-center -m-2 p-2 font-medium text-gray-900"
                            onClick={toggleMobileMenu}
                          >
                            <Package size={20} className="mr-2" />
                            Orders
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full -m-2 p-2 font-medium text-gray-900 mt-2"
                          >
                            <LogOut size={20} className="mr-2" />
                            Logout
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <User size={20} />
                          <Link
                            to="/login"
                            className="-m-2 block p-2 font-medium text-gray-900"
                            onClick={toggleMobileMenu}
                          >
                            Sign in
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                <div className="relative" ref={categoryDropdownRef}>
                  <div
                    className={`flex items-center text-sm font-medium cursor-pointer ${
                      isActive("/categories") || showCategoryDropdown
                        ? "text-[#4f46e5]"
                        : "text-gray-700 hover:text-[#4f46e5]"
                    }`}
                    onClick={toggleCategoryDropdown}
                  >
                    Categories
                  </div>
                  <AnimatePresence>
                    {showCategoryDropdown && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        className="absolute left-0 mt-2 w-auto bg-white rounded-md shadow-lg py-2 z-10"
                      >
                        <div className="flex space-x-4 px-4">
                          {categories.map((category) => (
                            <motion.div
                              key={category.name}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Link
                                to={category.path}
                                className="flex flex-col items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                              >
                                <category.icon className="w-8 h-8 mb-1 text-gray-500" />
                                <span className="text-xs font-medium text-center">
                                  {category.name}
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
              {/* Only show on larger screens */}
              <div className="hidden lg:flex lg:items-center">
                {isAuthenticated ? (
                  <div className="relative" ref={userDropdownRef}>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={toggleUserDropdown}
                    >
                      <h1 className="text-sm font-medium mr-2">{userName}</h1>
                      <User size={25} fill="#6366f1" />
                    </div>
                    <AnimatePresence>
                      {showUserDropdown && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={dropdownVariants}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                        >
                          <Link
                            to="/orders"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Package className="mr-2" size={18} />
                            Orders
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <LogOut className="mr-2" size={18} />
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-[#4f46e5] flex items-center gap-2"
                  >
                    Sign in
                    <User size={20} />
                  </Link>
                )}
              </div>

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
                <Link to="/cart" className="group -m-2 flex items-center p-2">
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
