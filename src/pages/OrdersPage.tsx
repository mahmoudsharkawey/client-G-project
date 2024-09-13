import { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";

const OrdersPage = () => {
  const { myOrders, getMyOrders } = useAuth();

  useEffect(() => {
    getMyOrders();
  }, []);

  // Sort orders by date (assuming order.date exists)
  const sortedOrders = myOrders.reverse();

  return (
    <div className="container mx-auto p-4 sm:p-8 bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-indigo-900">Your Orders</h1>
      <div className="space-y-6 sm:space-y-8 m-auto w-full sm:w-3/4 lg:w-1/2">
        {sortedOrders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-0">Order ID: {order._id}</p>
              <p className="text-base sm:text-lg font-semibold text-indigo-900">${order.total.toFixed(2)}</p>
            </div>
            <p className="text-sm text-gray-700 mb-4">Shipping to: {order.address}</p>
            <div className="space-y-4">
              {order.orderItems.map((item: any) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 py-4 border-t border-gray-200"
                >
                  <img
                    src={item.productImage}
                    alt={item.title}
                    className="w-full sm:w-20 h-40 sm:h-20 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <p className="font-medium text-gray-900">{item.productTitle}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-indigo-900">${item.unitPrice.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
