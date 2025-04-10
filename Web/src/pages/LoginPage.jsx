import { Link } from "react-router-dom"
import { Shield } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-[#121212]">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <Shield className="h-8 w-8 text-[#4ADE80]" />
              <span className="font-bold text-2xl text-white">StaticShield</span>
            </Link>
            <h2 className="mt-2 text-3xl font-bold text-white">Sign in to your account</h2>
            <p className="mt-2 text-sm text-[#B0B0B0]">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-[#4ADE80] hover:text-[#3AC070]">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <div className="mt-6">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#E0E0E0]">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#E0E0E0]">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
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
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-[#B0B0B0]">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link to="#" className="font-medium text-[#4ADE80] hover:text-[#3AC070]">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070]"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2A2A2A]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-[#121212] px-2 text-[#707070]">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full py-2 px-4 rounded-md border border-[#2A2A2A] text-white hover:bg-[#1A1A1A] flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
                  </svg>
                  Google
                </button>

                <button className="w-full py-2 px-4 rounded-md border border-[#2A2A2A] text-white hover:bg-[#1A1A1A] flex items-center justify-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </div>
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
                Secure your static websites with enterprise-grade protection
              </h2>
              <p className="text-xl text-[#E0E0E0]">
                Join thousands of developers and companies who trust StaticShield for their hosting needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

