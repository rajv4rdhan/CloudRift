"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Shield, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight, Loader2 } from "lucide-react"

export default function SignupPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    role: "",
    agreeTerms: false,
    agreeUpdates: false,
  })

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    if (name === "password") {
      checkPasswordStrength(value)
    }
  }

  const checkPasswordStrength = (password) => {
    const hasMinLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)

    let score = 0
    if (hasMinLength) score++
    if (hasUppercase) score++
    if (hasLowercase) score++
    if (hasNumber) score++
    if (hasSpecialChar) score++

    setPasswordStrength({
      score,
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
    })
  }

  const getPasswordStrengthLabel = () => {
    const { score } = passwordStrength
    if (score === 0) return { label: "Very Weak", color: "bg-red-500" }
    if (score === 1) return { label: "Weak", color: "bg-red-500" }
    if (score === 2) return { label: "Fair", color: "bg-yellow-500" }
    if (score === 3) return { label: "Good", color: "bg-yellow-500" }
    if (score === 4) return { label: "Strong", color: "bg-[#4ADE80]" }
    if (score === 5) return { label: "Very Strong", color: "bg-[#4ADE80]" }
  }

  const validateStep1 = () => {
    if (!formData.firstName.trim()) return "First name is required"
    if (!formData.lastName.trim()) return "Last name is required"
    if (!formData.email.trim()) return "Email is required"
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Email is invalid"
    return null
  }

  const validateStep2 = () => {
    if (!formData.password) return "Password is required"
    if (passwordStrength.score < 3) return "Password is too weak"
    if (formData.password !== formData.confirmPassword) return "Passwords do not match"
    if (!formData.agreeTerms) return "You must agree to the Terms of Service"
    return null
  }

  const handleNextStep = () => {
    const error = validateStep1()
    if (error) {
      setError(error)
      return
    }

    setError("")
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const error = validateStep2()
    if (error) {
      setError(error)
      return
    }

    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to dashboard on success
      navigate("/dashboard")
    } catch (err) {
      setError("An error occurred during signup. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <Shield className="h-8 w-8 text-[#4ADE80]" />
              <span className="font-bold text-2xl text-white">StaticShield</span>
            </Link>
            <h2 className="mt-2 text-3xl font-bold text-white mb-2">Create your account</h2>
            <p className="text-sm text-[#B0B0B0]">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-[#4ADE80] hover:text-[#3AC070]">
                Sign in
              </Link>
            </p>
          </div>

          {/* Progress indicator */}
          <div className="mt-8 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-[#4ADE80] text-[#121212]" : "bg-[#2A2A2A] text-[#707070]"
                  }`}
                >
                  {step > 1 ? <CheckCircle className="h-5 w-5" /> : "1"}
                </div>
                <span className="text-xs mt-1 text-[#B0B0B0]">Account</span>
              </div>

              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-[#4ADE80]" : "bg-[#2A2A2A]"}`}></div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-[#4ADE80] text-[#121212]" : "bg-[#2A2A2A] text-[#707070]"
                  }`}
                >
                  2
                </div>
                <span className="text-xs mt-1 text-[#B0B0B0]">Security</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      required
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      required
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                    Company (optional)
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    autoComplete="organization"
                    className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                    Role (optional)
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                  >
                    <option value="">Select your role</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="product_manager">Product Manager</option>
                    <option value="marketing">Marketing</option>
                    <option value="business">Business / Operations</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070]"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      required
                      className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#707070] hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Password strength meter */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex space-x-1 flex-1">
                          {[1, 2, 3, 4, 5].map((segment) => (
                            <div
                              key={segment}
                              className={`h-1 flex-1 rounded-full ${
                                passwordStrength.score >= segment ? getPasswordStrengthLabel().color : "bg-[#2A2A2A]"
                              }`}
                            ></div>
                          ))}
                        </div>
                        <span className="text-xs ml-2 text-[#B0B0B0]">
                          {formData.password ? getPasswordStrengthLabel().label : ""}
                        </span>
                      </div>

                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mt-2">
                        <li
                          className={`flex items-center gap-1 ${
                            passwordStrength.hasMinLength ? "text-[#4ADE80]" : "text-[#707070]"
                          }`}
                        >
                          <CheckCircle className="h-3 w-3" /> At least 8 characters
                        </li>
                        <li
                          className={`flex items-center gap-1 ${
                            passwordStrength.hasUppercase ? "text-[#4ADE80]" : "text-[#707070]"
                          }`}
                        >
                          <CheckCircle className="h-3 w-3" /> Uppercase letter
                        </li>
                        <li
                          className={`flex items-center gap-1 ${
                            passwordStrength.hasLowercase ? "text-[#4ADE80]" : "text-[#707070]"
                          }`}
                        >
                          <CheckCircle className="h-3 w-3" /> Lowercase letter
                        </li>
                        <li
                          className={`flex items-center gap-1 ${
                            passwordStrength.hasNumber ? "text-[#4ADE80]" : "text-[#707070]"
                          }`}
                        >
                          <CheckCircle className="h-3 w-3" /> Number
                        </li>
                        <li
                          className={`flex items-center gap-1 ${
                            passwordStrength.hasSpecialChar ? "text-[#4ADE80]" : "text-[#707070]"
                          }`}
                        >
                          <CheckCircle className="h-3 w-3" /> Special character
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                      required
                      className={`w-full px-3 py-2 bg-[#1A1A1A] border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent pr-10 ${
                        formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword
                          ? "border-red-500"
                          : "border-[#2A2A2A]"
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#707070] hover:text-white"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                  )}
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                      className="h-4 w-4 rounded border-[#2A2A2A] bg-[#1A1A1A] text-[#4ADE80] focus:ring-[#4ADE80] mt-1"
                    />
                    <label htmlFor="agreeTerms" className="ml-2 block text-sm text-[#B0B0B0]">
                      I agree to the{" "}
                      <Link to="#" className="font-medium text-[#4ADE80] hover:text-[#3AC070]">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="#" className="font-medium text-[#4ADE80] hover:text-[#3AC070]">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div className="flex items-start">
                    <input
                      id="agreeUpdates"
                      name="agreeUpdates"
                      type="checkbox"
                      checked={formData.agreeUpdates}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-[#2A2A2A] bg-[#1A1A1A] text-[#4ADE80] focus:ring-[#4ADE80] mt-1"
                    />
                    <label htmlFor="agreeUpdates" className="ml-2 block text-sm text-[#B0B0B0]">
                      I'd like to receive product updates and news via email
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070] disabled:bg-[#4ADE80]/50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <span>Create account</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1)
                      setError("")
                    }}
                    className="text-sm text-[#B0B0B0] hover:text-white"
                  >
                    Back to previous step
                  </button>
                </div>
              </div>
            )}
          </form>

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
                  <p className="text-xl text-[#E0E0E0]">Deploy static websites with enterprise-grade security</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#4ADE80]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-[#4ADE80]" />
                  </div>
                  <p className="text-xl text-[#E0E0E0]">
                    Global CDN with 200+ edge locations for lightning-fast load times
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#4ADE80]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-[#4ADE80]" />
                  </div>
                  <p className="text-xl text-[#E0E0E0]">Advanced DDoS protection and SSL encryption included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

