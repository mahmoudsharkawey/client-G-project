import { useContext, useRef } from "react";
import { CartContext } from "../context/Cart/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRightIcon } from "lucide-react";
import { BASE_URL } from "../../constants";
import { AuthContext } from "../context/Auth/AuthContext";

const Checkout = () => {
  const { cartItems, totalAmount, clearCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const addressRef = useRef<HTMLInputElement>(null);

  const handlePayment = async () => {
    const address = addressRef.current?.value;
    if (!address) {
      toast.error("Please enter your address");
      addressRef.current?.focus();
      return;
    }
    const response = await fetch(`${BASE_URL}/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address,
      }),
    });
    if (!response.ok) return;
    navigate("/order-success");
    clearCart(); // Clear cart after payment
    toast.success("Payment successful!");
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <section className="w-full max-w-2xl">
          <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header className="text-center">
              <h1 className="text-xl font-bold text-indigo-900 sm:text-3xl">
                Checkout
              </h1>
            </header>
            <Link
              to="/cart"
              className="flex items-center gap-2 justify-end text-indigo-900 hover:text-gray-900"
            >
              Back to Cart
              <ArrowRightIcon className="w-4 h-4" />
            </Link>

            <input
              className="w-full mt-5 p-2 border border-gray-300 rounded-md"
              type="text"
              ref={addressRef}
              placeholder="Enter your address"
            />

            <div className="mt-8">
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div>
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <li
                        key={item.productId}
                        className="flex items-center gap-4"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="size-16 rounded object-cover"
                        />
                        <div className="flex-grow">
                          <h3 className="text-sm text-gray-900">
                            {item.title}
                          </h3>
                          <p className="text-gray-600">
                            {item.quantity} x $
                            {item.unitPrice != null ||
                            item.unitPrice != undefined
                              ? item.unitPrice
                              : 0}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <h2 className="mt-4 text-lg font-bold text-gray-900">
                    Total Amount: ${totalAmount.toFixed(2)}
                  </h2>
                  <button
                    onClick={handlePayment}
                    className="mt-4 w-full rounded bg-indigo-900 px-5 py-3 text-sm text-gray-100 transition hover:bg-indigo-600"
                  >
                    Pay Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Checkout;
