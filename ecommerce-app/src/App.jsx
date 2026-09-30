import { Link, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Products from "./pages/products";
import ProductDetails from "./pages/productdetails";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";

function App() {
  return (
    <>
      
      <nav className="flex items-center justify-between bg-gray-900 px-6 py-4 text-white">
       
        <Link to="/products" className="text-2xl font-bold">
         
          MyShop
        </Link>

        <div className="flex gap-5">
         
         
          <Link to="/products">Products</Link>

          <Link to="/cart">Cart</Link>

         
         <Link to="/login">Login</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;