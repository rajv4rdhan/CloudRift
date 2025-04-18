import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Shield, CheckCircle } from "lucide-react"
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password: password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to login");
      }

      // Handle successful login (e.g., redirect or store token)
      console.log("Login successful");
      const { token } = await response.json();
      localStorage.setItem("token", token);
      navigate("/dashboard")
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <Shield className="h-8 w-8 text-[#4ADE80]" />
              <span className="font-bold text-2xl text-white">
                StaticShield
              </span>
            </Link>
            <h2 className="mt-2 text-3xl font-bold text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-[#B0B0B0]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-[#4ADE80] hover:text-[#3AC070]"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="text-sm text-red-500">{error}</p>}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#E0E0E0]"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="string"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#E0E0E0]"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-[#2A2A2A] bg-[#1A1A1A] text-[#4ADE80] focus:ring-[#4ADE80]"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-[#B0B0B0]"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="#"
                      className="font-medium text-[#4ADE80] hover:text-[#3AC070]"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded-md ${
                      loading ? "bg-[#3AC070]" : "bg-[#4ADE80]"
                    } text-[#121212] hover:bg-[#3AC070]`}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-[#1A1A1A]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4ADE80]/20 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-white mb-6">
                Join thousands of developers building with StaticShield
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#4ADE80]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-[#4ADE80]" />
                  </div>
                  <p className="text-xl text-[#E0E0E0]">
                    Deploy static websites with enterprise-grade security
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#4ADE80]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-[#4ADE80]" />
                  </div>
                  <p className="text-xl text-[#E0E0E0]">
                    Global CDN with 200+ edge locations for lightning-fast load
                    times
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#4ADE80]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-[#4ADE80]" />
                  </div>
                  <p className="text-xl text-[#E0E0E0]">
                    Advanced DDoS protection and SSL encryption included
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
