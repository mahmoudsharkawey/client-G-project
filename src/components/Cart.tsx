import { useCart } from "../context/Cart/CartContext";
import { toast } from "sonner";

const Cart = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemInCart,
    clearCart,
  } = useCart();

  const handleRemoveItem = (productId: string) => {
    removeItemInCart(productId);
    toast.success("Item removed successfully");
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully");
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateItemInCart(productId, quantity);
  };

  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {cartItems.map((item, index) => (
                  <li key={item.productId} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="size-16 rounded object-cover"
                    />

                    <div className="flex-grow">
                      <h3 className="text-sm text-gray-900">{item.title}</h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Price:</dt>
                          <dd className="inline">
                            ${item.unitPrice.toFixed(2)}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex items-center justify-center mr-4 gap-2">
                      <button
                        className="h-8 w-8 rounded border border-gray-200 bg-gray-50 text-gray-600 transition hover:bg-gray-100"
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        id={`Line${index + 1}Qty`}
                        onChange={(e) =>
                          handleQuantityChange(item.productId, parseInt(e.target.value))
                        }
                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <button
                        className="h-8 w-8 rounded border border-gray-200 bg-gray-50 text-gray-600 transition hover:bg-gray-100"
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="text-gray-600 transition hover:text-red-600"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      <span className="sr-only">Remove item</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex justify-between border-t border-gray-100 pt-8">
                <button
                  onClick={handleClearCart}
                  className="rounded bg-red-600 p-2 h-10 w-20 text-sm text-white transition hover:bg-red-500"
                >
                  Clear Cart
                </button>

                <div>
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-end !text-base font-medium">
                      <dt className="mr-2">Total:</dt>
                      <dd>${totalAmount.toFixed(2)}</dd>
                    </div>
                  </dl>

                  <a
                    href="#"
                    className="mt-4 inline-block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
