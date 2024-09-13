import { useState, useRef, useEffect, useCallback } from "react";
import { ShoppingBag, Heart, User, LogOut, Package } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/Cart/CartContext";
import { BASE_URL } from "../../constants";

const getUserName = () => {
  const email = localStorage.getItem("email");
  if (email) {
    try {
      const name = email.split("@")[0]; // Get the part before @
      return name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter
    } catch (error) {
      console.error("Error parsing email:", error);
    }
  }
  return "User";
};

const EcommerceNavigation = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const location = useLocation();
  const userName = getUserName();
  const isActive = (path: string) => location.pathname === path;
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const { cartItems } = useCart();
  const [myWhishlist, setMyWhishlist] = useState<{ items: any[] }>({
    items: [],
  });
  const { token } = useAuth();

  const getMyWhishlist = async () => {
    const response = await fetch(`${BASE_URL}/wishlist`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) return;
    const data = await response.json();
    setMyWhishlist(data);
  };

  useEffect(() => {
    getMyWhishlist();
  }, [myWhishlist]);

  // Calculate total items in cart
  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
                    <h1 className="text-2xl font-bold text-indigo-900">Divo</h1>
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
                            to="/my-orders"
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
                <h1 className="text-2xl font-bold text-indigo-900">Divo</h1>
                </Link>
            </div>

            {/* Centered links */}
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-start">
              <div className="flex space-x-8">
                <Link
                  to="/"
                  className={`flex items-center text-sm font-medium ${
                    isActive("/")
                      ? "text-[#4f46e5]"
                      : "text-gray-700 hover:text-[#4f46e5]"
                  }`}
                >
                  Home
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
                            to="/my-orders"
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
                      {myWhishlist.items.length}
                    </span>
                  </div>
                  <span className="sr-only">View wishlist</span>
                </Link>
              </div>

              {/* Shopping bag icon with badge */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link to="/cart" className="group -m-2 flex items-center p-2">
                  <span className="text-sm font-medium">Cart</span>
                  <div className="relative ml-2">
                    <ShoppingBag
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-indigo-600 text-[10px] font-medium text-white flex items-center justify-center">
                      {totalItemsInCart}
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
