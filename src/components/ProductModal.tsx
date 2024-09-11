import React, { useEffect, useState } from "react";
import { Product } from "./card";


interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Match this with the total transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    onAddToCart();
  };

  return (
    <div
      className={`fixed inset-0 bg-black flex items-end justify-center z-50 transition-all duration-300 ease-in-out ${
        isOpen ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-8 rounded-t-xl w-full max-w-6xl h-[95vh] overflow-y-auto shadow-2xl transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100 delay-150"
            : "translate-y-full opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-4xl font-bold text-gray-800">{product.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors active:scale-90 m-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 h-96 object-cover rounded-lg"
          />
          <div className="flex-1">
            <p className="text-gray-600 mb-6 text-xl">{product.description}</p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-semibold text-gray-700">Price:</p>
                <p className="text-2xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-semibold text-gray-700">Category:</p>
                <p className="text-lg">{product.category}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-semibold text-gray-700">Stock:</p>
                <p className="text-lg">{product.stock}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-semibold text-gray-700">Rating:</p>
                <p className="text-lg">{product.rating} / 5</p>
              </div>
              {product.discount && (
                <div className="bg-gray-100 p-4 rounded-lg col-span-2">
                  <p className="font-semibold text-gray-700">Discount:</p>
                  <p className="text-lg text-red-600 font-bold">
                    {product.discount}% OFF
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-xl flex items-center justify-center ${
                isOutOfStock
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              }`}
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
