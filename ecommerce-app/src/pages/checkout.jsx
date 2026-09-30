import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { clearCart } from "../redux/cartSlice";

const API = import.meta.env.VITE_API_URL;

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const [address, setAddress] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const mutation = useMutation({
    mutationFn: async (order) => {
      const response = await fetch(
        `${API}/orders`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(order)
        }
      );

      if (!response.ok) {
        throw new Error("Order failed");
      }

      return response.json();
    },

    onSuccess: () => {
      dispatch(clearCart());

      alert("Order placed successfully");

      navigate("/products");
    }
  });

  const placeOrder = () => {
    if (!address) {
      alert("Please enter your address");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const order = {
      userId: user?.id,
      items: cartItems,
      address: address,
      total: total,
      date: new Date().toLocaleString()
    };

    mutation.mutate(order);
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Checkout
      </h1>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">
          Order Summary
        </h2>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="mb-3 flex justify-between"
          >
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}

        <hr className="my-5" />

        <h2 className="mb-5 text-xl font-bold">
          Total: ₹{total}
        </h2>

        <textarea
          className="mb-5 w-full rounded border p-3"
          placeholder="Enter delivery address"
          rows="4"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <button
          onClick={placeOrder}
          disabled={mutation.isPending}
          className="w-full rounded bg-green-600 p-3 text-white disabled:bg-gray-400"
        >
          {mutation.isPending
            ? "Placing Order..."
            : "Place Order"}
        </button>

        {mutation.isError && (
          <p className="mt-4 text-red-500">
            Failed to place order
          </p>
        )}
      </div>
    </div>
  );
}

export default Checkout;