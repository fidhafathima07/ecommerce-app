import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "../redux/cartSlice";

const API = import.meta.env.VITE_API_URL;

function Products() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const {
    data: products = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["products"],

    queryFn: async () => {
      const response = await fetch(
        `${API}/products`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="p-10 text-center">
        
    <h1 className="text-2xl">
          Loading products...
        </h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl text-red-500">
          Failed to load products
        </h1>
      </div>
    );
  }

  let filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (category !== "") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  if (sort === "low") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Products
      </h1>

      {/* Search / Filter / Sort */}

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search product..."
          className="rounded border bg-white p-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="rounded border bg-white p-3"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">All Categories</option>
          <option value="Electronics">
            Electronics
          </option>
          <option value="Fashion">
            Fashion
          </option>
        </select>

        <select
          className="rounded border bg-white p-3"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by price</option>
          <option value="low">
            Low to High
          </option>
          <option value="high">
            High to Low
          </option>
        </select>
      </div>

      {/* Empty state */}

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500">
          No products found.
        </p>
      )}

      {/* Products */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-lg bg-white p-5 shadow"
          >
            <h2 className="text-xl font-bold">
              {product.name}
            </h2>

            <p className="mt-2 text-gray-500">
              {product.category}
            </p>

            <p className="my-3 text-xl font-bold">
              ₹{product.price}
            </p>

            <p className="mb-4">
              Stock: {product.stock}
            </p>

            <div className="flex gap-2">
              <Link to={`/products/${product.id}`}
                className="rounded bg-blue-600 px-4 py-2 text-white"
              >
                Details
              </Link>

              <button  disabled={product.stock === 0} onClick={() =>dispatch(addToCart(product))
                }
                className="rounded bg-green-600 px-4 py-2 text-white disabled:bg-gray-400"
              >
        Add Cart
         </button>
        </div>
              </div>
        ))}
      
      </div>
    </div>
  );
}

export default Products;