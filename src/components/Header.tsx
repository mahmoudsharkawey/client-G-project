import { useState } from "react";
import { ShoppingBag } from "lucide-react";

const EcommerceNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="relative z-40 lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25"></div>

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
                      <a href="/">
                        <span className="sr-only">Your Company</span>
                        <img
                          className="h-16 w-auto"
                          src="https://www.creativefabrica.com/wp-content/uploads/2021/03/17/online-shop-logo-designs-template-Graphics-9701619-1.jpg"
                          alt="Company logo"
                        />
                      </a>
                    </div>
                  </div>

                  <div className="space-y-6 px-4 py-6">
                    <div className="flow-root">
                      <a
                        href="/categories"
                        className="-m-2 block p-5 font-medium text-gray-900 hover:text-[#4f46e5]"
                      >
                        Categories
                      </a>
                      <a
                        href="/collection"
                        className="-m-2 block p-5 font-medium text-gray-900 hover:text-[#4f46e5]"
                      >
                        Collection
                      </a>
                      <a
                        href="/about"
                        className="-m-2 block p-5 font-medium text-gray-900 hover:text-[#4f46e5]"
                      >
                        About
                      </a>
                      <a
                        href="/contact"
                        className="-m-2 block p-5 font-medium text-gray-900 hover:text-[#4f46e5]"
                      >
                        Contact
                      </a>

                      <a
                        href="/login"
                        className="-m-2 block p-5 font-medium text-gray-900 hover:text-[#4f46e5]"
                      >
                        Sign in
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* Mobile menu toggle */}
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={toggleMobileMenu}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
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

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-16 w-auto"
                    src="https://www.creativefabrica.com/wp-content/uploads/2021/03/17/online-shop-logo-designs-template-Graphics-9701619-1.jpg"
                    alt="Company logo"
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  <a
                    href="/categories"
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-[#4f46e5]"
                  >
                    Categories
                  </a>
                  <a
                    href="/collection"
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-[#4f46e5]"
                  >
                    Collection
                  </a>
                  <a
                    href="/about"
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-[#4f46e5]"
                  >
                    About
                  </a>
                  <a
                    href="/contact"
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-[#4f46e5]"
                  >
                    Contact
                  </a>
                </div>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a
                    href="/login"
                    className="text-sm font-medium text-gray-700 hover:text-[#4f46e5]"
                  >
                    Sign in
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
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
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a
                    href="/cart"
                    className="group -m-2 flex items-center p-2 hover:text-purple-600"
                  >
                    <ShoppingBag
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default EcommerceNavigation;
