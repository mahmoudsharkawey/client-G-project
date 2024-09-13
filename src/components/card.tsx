import React, { useState } from "react";
import ProductModal from "./ProductModal";
// import { toast } from "sonner";
import { useCart } from "../context/Cart/CartContext";

export interface Product {
  _id: number;
  title: string;
  image: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
  discount?: number;
  description?: string; // Add this field to the Product interface
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { title, image, price, stock, rating, discount } = product;
  const finalPrice = discount ? price - price * (discount / 100) : price;
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addItemToCart, addItemToWishlist } = useCart();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-start bg-white relative w-[250px] p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="w-full h-[200px] mb-2 relative overflow-hidden rounded-md">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          />
          {discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {discount}% OFF
            </div>
          )}
          <button
            className="absolute top-2 right-2 p-2 bg-white bg-opacity-70 rounded-full transition-all duration-150 ease-in-out active:scale-90"
            onClick={() => {
              setIsLiked(!isLiked);
              addItemToWishlist(product._id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              className={`w-5 h-5 ${
                isLiked ? "text-red-500" : "text-gray-600"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        <h2 className="text-sm font-medium text-gray-800 mb-1 px-2 line-clamp-2 h-10 overflow-hidden">
          {title}
        </h2>

        {/* Rating and Stock Status in one line */}
        <div className="flex justify-between items-center w-full mb-1 px-2">
          <div className="flex items-center text-sm text-yellow-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill={index < Math.floor(rating) ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            ))}
          </div>
          <p
            className={`text-xs font-medium ${
              stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        {/* Price and Discount */}
        <p className="text-sm font-semibold text-gray-900 px-2 mb-8">
          ${finalPrice.toFixed(2)}{" "}
          {discount && (
            <span className="line-through text-gray-500 text-xs ml-2">
              ${price.toFixed(2)}
            </span>
          )}
        </p>

        <button
          className={`absolute bottom-2 right-2 ${
            stock > 0
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          } text-white p-2 rounded-full transition-all duration-150 ease-in-out ${
            stock > 0 ? "active:scale-90" : ""
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          onClick={() => {
            if (stock > 0) {
              addItemToCart(product._id);
            }
          }}
          disabled={stock === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>

        {/* Updated "More Details" button */}
        <button
          className="absolute bottom-2 left-2 text-sm text-blue-500 hover:text-blue-700 transition-colors duration-150 flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded-full"
          onClick={openModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>More Details</span>
        </button>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={product}
        onAddToCart={() => {
          addItemToCart(product._id);
        }}
      />
    </>
  );
};

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => (
  <section className="container mx-auto px-4 py-8 text-center">
    {/* <h1 className="text-2xl font-bold mb-6">ALL COLLECTIONS</h1> */}
    <div className="flex flex-wrap justify-center gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  </section>
);

export default ProductList;
