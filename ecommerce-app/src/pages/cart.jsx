import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} from "../redux/cartSlice";

function Cart() {
const dispatch = useDispatch();

const cartItems = useSelector(
    (state) => state.cart.items
  );

  const total = cartItems.reduce(
(sum, item) =>
    sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
     <div className="p-10 text-center">
<h1 className="mb-5 text-3xl font-bold">
  Cart is Empty
    </h1>

        <Link
to="/products"
className="rounded bg-blue-600 px-5 py-3 text-white"
 >
    go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Shopping Cart
      </h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg bg-white p-5 shadow"
          >
            <div>
              <h2 className="text-xl font-bold">
                {item.name}
              </h2>

              <p>₹{item.price}</p>

              <p>
                Quantity: {item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch(
                    decreaseQuantity(item.id)
                  )
                }
                className="rounded bg-gray-300 px-3 py-2"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  dispatch(
                    increaseQuantity(item.id)
                  )
                }
                className="rounded bg-gray-300 px-3 py-2"
              >
                +
              </button>

              <button
                onClick={() =>
                  dispatch(
                    removeFromCart(item.id)
                  )
                }
                className="rounded bg-red-500 px-3 py-2 text-white"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <h2 className="text-2xl font-bold">
          Total: ₹{total}
        </h2>

        <div className="mt-5 flex gap-3">
          <button
            onClick={() => dispatch(clearCart())}
            className="rounded bg-red-600 px-5 py-3 text-white"
          >
            Clear Cart
          </button>

          <Link
            to="/checkout"
            className="rounded bg-green-600 px-5 py-3 text-white"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;