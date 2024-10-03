import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";
import { Trash2Icon } from "lucide-react";

const WhishListPage = () => {
  const { token } = useAuth();
  const [myWhishlist, setMyWhishlist] = useState<{ items: any[] }>({
    items: [],
  });
  const { addItemToCart, removeItemInWishlist } = useCart();
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
  }, []);

  const handleAddToCart = (productId: number) => {
    addItemToCart(productId);
  };

  const handleDeleteFromWishlist = async (wishlistItemId: string) => {
    await removeItemInWishlist(wishlistItemId);
    getMyWhishlist(); 
  };

  return (
    <div>
      <div className="container mx-auto p-4 sm:p-8 bg-gray-50">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-indigo-900">
          Your Wishlist
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {myWhishlist.items.map((item) => {
            const discount = item.product.discount || 0; // Get discount if available
            const discountedPrice =
              item.product.price - (item.product.price * discount) / 100; // Calculate discounted price
            return (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-full h-48 object-cover rounded-t-lg transform transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4 flex-grow">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {item.product.title}
                  </h2>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500">★★★★☆</span>{" "}
                    {/* Star rating */}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="flex flex-col">
                      <span className="text-lg font-bold text-indigo-600 mb-2">
                        ${discountedPrice.toFixed(2)}{" "}
                        {/* Display discounted price */}
                      </span>
                      <span className="text-sm text-gray-500 line-through mb-2">
                        ${item.product.price.toFixed(2)}{" "}
                        {/* Display original price */}
                      </span>
                    </span>
                    <span className="text-sm text-green-600 font-semibold">
                      In Stock
                    </span>{" "}
                    {/* Stock status */}
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleAddToCart(item.product._id)} // Changed to an arrow function
                      className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                    <button
                    type="button"
                    aria-label="Delete from Wishlist"
                      onClick={() => handleDeleteFromWishlist(item.product._id)} // New delete function
                      className="mt-2 ml-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhishListPage;
