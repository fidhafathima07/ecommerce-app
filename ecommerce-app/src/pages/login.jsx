import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    data: users = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["users"],

    queryFn: async () => {
      const response = await fetch(`${API}/users`);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return response.json();
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    alert("Login successful");

    navigate("/products");
  };

  if (isLoading) {
    return <h2 className="p-10">Loading...</h2>;
  }

  if (isError) {
    return (
      <h2 className="p-10 text-red-500">
        Failed to load users
      </h2>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow">
      <h1 className="mb-6 text-3xl font-bold">
        Login
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded border p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full rounded bg-blue-600 p-3 text-white">
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-500">
        Email: fidha@gmail.com
        <br />
        Password: 1234
      </p>
    </div>
  );
}

export default Login;