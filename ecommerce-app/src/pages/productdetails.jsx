import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { addToCart } from "../redux/cartSlice";

const API = import.meta.env.VITE_API_URL;

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["product", id],

    queryFn: async () => {
      const response = await fetch(
        `${API}/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Product not found");
      }

      return response.json();
    }
  });

  if (isLoading) {
    return (
      <h1 className="p-10 text-center">
        Loading product...
      </h1>
    );
  }

  if (isError) {
    return (
      <h1 className="p-10 text-center text-red-500">
        Product not found
      </h1>
    );
  }

  const increase = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }

    alert("Product added to cart");
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-lg bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">
          {product.name}
        </h1>

        <p className="mt-3 text-gray-500">
          Category: {product.category}
        </p>

        <p className="my-5 text-2xl font-bold">
          ₹{product.price}
        </p>

        <p className="mb-4">
          {product.description}
        </p>

        <p className="mb-5">
          Stock: {product.stock}
        </p>

        {product.stock === 0 ? (
          <p className="font-bold text-red-500">
            Out of Stock
          </p>
        ) : (
          <>
            <div className="mb-5 flex items-center gap-4">
              <button
                onClick={decrease}
                className="rounded bg-gray-300 px-4 py-2"
              >
                -
              </button>

              <span className="text-xl">
                {quantity}
              </span>

              <button      onClick={increase} className="rounded bg-gray-300 px-4 py-2"
              >
        +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="rounded bg-green-600 px-6 py-3 text-white"
            >
              Add to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;