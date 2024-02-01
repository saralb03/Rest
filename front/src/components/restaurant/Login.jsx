import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRest } from "../../api/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const headers = {
        // Define your headers here (e.g., content-type, authorization, etc.)
      };
      const data = { email, psw: password };
      const response = await postRest(data, "login");

      if (response.data) {
        console.log(response.data);
        const { token, restaurantId } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("restaurantId", restaurantId);
        navigate(`/restaurantOwner/${restaurantId}`);
        window.location.reload();
      } else {
        setError("Unexpected response format");
      }
    } catch (error) {
      setError(error.response.data.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mt-2">{`Error: ${error}`}</div>
          )}
          <div>
            <button
              type="submit"
              className="mt-4 bg-amber-700 text-white p-2 rounded-md w-full hover:bg-amber-600"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
