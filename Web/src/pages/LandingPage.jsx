"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Shield, Globe, Zap, Server, Lock, BarChart, Menu, X } from "lucide-react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-[#121212]">
      {/* Header */}
      <header className="border-b border-[#2A2A2A] bg-[#121212]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-[#4ADE80]" />
            <span className="font-bold text-xl text-white">CloudRift</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#features" className="text-[#E0E0E0] hover:text-[#4ADE80] transition-colors">
              Features
            </Link>
            <Link to="#pricing" className="text-[#E0E0E0] hover:text-[#4ADE80] transition-colors">
              Pricing
            </Link>
            <Link to="#testimonials" className="text-[#E0E0E0] hover:text-[#4ADE80] transition-colors">
              Testimonials
            </Link>
            <Link to="#faq" className="text-[#E0E0E0] hover:text-[#4ADE80] transition-colors">
              FAQ
            </Link>
            <div className="flex items-center gap-4 ml-6">
              <Link to="/login">
                <button className="px-4 py-2 rounded-md text-[#E0E0E0] hover:text-[#4ADE80] hover:bg-[#1A1A1A]">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070] font-medium">
                  Sign up
                </button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-[#1A1A1A]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1A1A1A] border-b border-[#2A2A2A]">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                to="#features"
                className="text-[#E0E0E0] hover:text-[#4ADE80] py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="#pricing"
                className="text-[#E0E0E0] hover:text-[#4ADE80] py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="#testimonials"
                className="text-[#E0E0E0] hover:text-[#4ADE80] py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                to="#faq"
                className="text-[#E0E0E0] hover:text-[#4ADE80] py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t border-[#2A2A2A]">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full text-left px-4 py-2 rounded-md text-[#E0E0E0] hover:bg-[#1A1A1A] hover:text-[#4ADE80]">
                    Log in
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-4 py-2 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070]">
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] to-[#121212] z-0"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#4ADE80]/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#4ADE80]/5 rounded-full filter blur-3xl"></div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMyQTJBMkEiIGZpbGwtb3BhY2l0eT0iMC4wNSIgZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-block px-3 py-1 bg-[#4ADE80]/10 rounded-full text-[#4ADE80] text-sm font-medium mb-6 border border-[#4ADE80]/20">
                The Future of Static Hosting
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Static Hosting with{" "}
                <span className="text-[#4ADE80] relative">
                  Unmatched Protection
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.5C32.3333 1.16667 96.6 -4.5 144 5.5C191.4 15.5 277.667 11.1667 299 5.5"
                      stroke="#4ADE80"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-[#B0B0B0] mb-12 leading-relaxed max-w-3xl mx-auto">
                Deploy your static websites with global caching, advanced DDoS protection, and lightning-fast
                performance. All in one secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
                <Link to="/signup">
                  <button className="w-full sm:w-auto bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070] text-lg px-10 py-6 rounded-md font-medium transition-all duration-200 shadow-lg shadow-[#4ADE80]/20 hover:shadow-xl hover:shadow-[#4ADE80]/30 hover:translate-y-[-2px]">
                    Start for free
                  </button>
                </Link>
                <button className="w-full sm:w-auto border border-[#2A2A2A] text-white hover:bg-[#1A1A1A] text-lg px-10 py-6 rounded-md transition-all duration-200 hover:border-[#4ADE80]/30 hover:translate-y-[-2px]">
                  View demo
                </button>
              </div>

              {/* Premium Terminal */}
              <div className="bg-gradient-to-b from-[#1E1E1E] to-[#141414] p-1 rounded-xl border border-[#2A2A2A] max-w-4xl mx-auto shadow-2xl shadow-black/50 transform hover:scale-[1.02] transition-all duration-300 group">
                {/* Terminal header */}
                <div className="bg-gradient-to-r from-[#2A2A2A] to-[#1E1E1E] rounded-t-lg px-4 py-3 flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] flex items-center justify-center group-hover:bg-[#FF4945] transition-colors">
                      <svg
                        className="w-2 h-2 text-[#930005] opacity-0 group-hover:opacity-100 transition-opacity"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 6L6 18M6 6l12 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] flex items-center justify-center group-hover:bg-[#FFAC00] transition-colors">
                      <svg
                        className="w-2 h-2 text-[#9A5F00] opacity-0 group-hover:opacity-100 transition-opacity"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#28CA41] flex items-center justify-center group-hover:bg-[#1DB933] transition-colors">
                      <svg
                        className="w-2 h-2 text-[#006500] opacity-0 group-hover:opacity-100 transition-opacity"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12h14M12 5v14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 flex-1 text-center">
                    <div className="text-[#9B9B9B] text-xs font-medium flex items-center justify-center gap-1.5">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="currentColor" />
                        <path
                          d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      CloudRift — zsh — 100×20
                    </div>
                  </div>
                </div>

                {/* Terminal content - shorter version */}
                <div className="bg-[#0C0C0C] rounded-b-lg p-5 font-mono text-base text-[#E0E0E0] text-left overflow-hidden">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-[#4ADE80] mr-2">➜</span>
                      <span className="text-[#C678DD]">~</span>
                      <span className="text-[#E0E0E0] mr-2">$</span>
                      <div className="typing-animation">
                        <span className="text-[#E0E0E0]">npm create CloudRift-app my-website</span>
                      </div>
                    </div>

                    <div className="text-[#707070] pl-4 space-y-1">
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-[#4ADE80]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Setting up project...</span>
                      </div>
                      <p className="text-[#98C379]">
                        ✓ <span className="text-[#707070]">CloudRift SDK</span> installed
                      </p>
                    </div>

                    <div className="flex items-start">
                      <span className="text-[#4ADE80] mr-2">➜</span>
                      <span className="text-[#C678DD]">~</span>
                      <span className="text-[#E0E0E0] mr-2">$</span>
                      <div className="typing-animation-2">
                        <span className="text-[#E0E0E0]">cd my-website && npm run deploy</span>
                      </div>
                    </div>

                    <div className="text-[#707070] pl-4 space-y-1">
                      <p className="text-[#98C379]">
                        ✓{" "}
                        <span className="text-white font-medium">Deployed to https://my-website.CloudRift.com</span>
                      </p>
                      <p className="text-[#98C379]">
                        ✓ <span className="text-[#707070]">Global CDN propagation</span> complete
                      </p>
                    </div>

                    <div className="flex items-start">
                      <span className="text-[#4ADE80] mr-2">➜</span>
                      <span className="text-[#C678DD]">my-website</span>
                      <span className="text-[#E0E0E0] mr-2">$</span>
                      <span className="animate-pulse">▊</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trusted by section */}
            <div className="mt-20 text-center">
              <p className="text-[#707070] uppercase text-sm font-medium tracking-wider mb-8">
                Trusted by innovative companies
              </p>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                <div className="text-[#707070] hover:text-[#B0B0B0] transition-colors">
                  <svg className="h-8" viewBox="0 0 124 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4a8 8 0 110 16 8 8 0 010-16z" />
                    <path d="M40 5.5c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 4a4 4 0 110 8 4 4 0 010-8z" />
                    <path d="M72 5.5c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 4a4 4 0 110 8 4 4 0 010-8z" />
                    <path d="M96 5.5a8 8 0 100 16h16a8 8 0 100-16H96zm0 4h16a4 4 0 110 8H96a4 4 0 110-8z" />
                  </svg>
                </div>
                <div className="text-[#707070] hover:text-[#B0B0B0] transition-colors">
                  <svg className="h-8" viewBox="0 0 124 24" fill="currentColor">
                    <path d="M6 6h12v12H6z" />
                    <path d="M26 6h4v12h-4z" />
                    <path d="M36 6h12v4H36z" />
                    <path d="M36 14h12v4H36z" />
                    <path d="M56 6h12v12H56zm4 4h4v4h-4z" />
                    <path d="M76 6h12v12H76zm4 4v4h4v-4h-4z" />
                    <path d="M96 6h4v12h-4z" />
                    <path d="M106 6h12v12h-12zm4 4h4v4h-4z" />
                  </svg>
                </div>
                <div className="text-[#707070] hover:text-[#B0B0B0] transition-colors">
                  <svg className="h-8" viewBox="0 0 124 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4a8 8 0 110 16 8 8 0 010-16z" />
                    <path d="M36 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" />
                    <path d="M60 6c-3.314 0-6 2.686-6 6s2.686 6 6 6h12c3.314 0 6-2.686 6-6s-2.686-6-6-6H60z" />
                    <path d="M96 6c-3.314 0-6 2.686-6 6s2.686 6 6 6h12c3.314 0 6-2.686 6-6s-2.686-6-6-6H96z" />
                  </svg>
                </div>
                <div className="text-[#707070] hover:text-[#B0B0B0] transition-colors">
                  <svg className="h-8" viewBox="0 0 124 24" fill="currentColor">
                    <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" />
                    <path d="M36 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" />
                    <path d="M60 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" />
                    <path d="M84 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" />
                    <path d="M108 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-[#151515] relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-40 right-20 w-72 h-72 bg-[#4ADE80]/5 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#4ADE80]/5 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-block px-3 py-1 bg-[#4ADE80]/10 rounded-full text-[#4ADE80] text-sm font-medium mb-4 border border-[#4ADE80]/20">
                Features
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Enterprise-Grade Protection, <span className="text-[#4ADE80]">Simplified</span>
              </h2>
              <p className="text-xl text-[#B0B0B0] max-w-2xl mx-auto">
                Our platform combines cutting-edge security with effortless deployment, giving you peace of mind without
                the complexity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#2A2A2A] hover:border-[#4ADE80] transition-all duration-300 group hover:shadow-xl hover:shadow-black/20 hover:translate-y-[-5px]">
                <div className="w-14 h-14 bg-[#4ADE80]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#4ADE80]/20 transition-colors">
                  <Globe className="h-7 w-7 text-[#4ADE80]" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Global CDN</h3>
                <p className="text-[#B0B0B0] leading-relaxed">
                  Deliver content from 200+ edge locations worldwide for lightning-fast load times and reduced latency.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#2A2A2A] hover:border-[#4ADE80] transition-all duration-300 group hover:shadow-xl hover:shadow-black/20 hover:translate-y-[-5px]">
                <div className="w-14 h-14 bg-[#4ADE80]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#4ADE80]/20 transition-colors">
                  <Shield className="h-7 w-7 text-[#4ADE80]" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">DDoS Protection</h3>
                <p className="text-[#B0B0B0] leading-relaxed">
                  Advanced mitigation systems that automatically detect and block malicious traffic before it reaches
                  your site.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#2A2A2A] hover:border-[#4ADE80] transition-all duration-300 group hover:shadow-xl hover:shadow-black/20 hover:translate-y-[-5px]">
                <div className="w-14 h-14 bg-[#4ADE80]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#4ADE80]/20 transition-colors">
                  <Zap className="h-7 w-7 text-[#4ADE80]" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Instant Deployment</h3>
                <p className="text-[#B0B0B0] leading-relaxed">
                  Push to Git and we'll automatically build and deploy your site. Zero configuration required.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#2A2A2A] hover:border-[#4ADE80] transition-all duration-300 group hover:shadow-xl hover:shadow-black/20 hover:translate-y-[-5px]">
                <div className="w-14 h-14 bg-[#4ADE80]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#4ADE80]/20 transition-colors">
                  <Server className="h-7 w-7 text-[#4ADE80]" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Serverless Functions</h3>
                <p className="text-[#B0B0B0] leading-relaxed">
                  Add dynamic functionality to your static sites with our secure, scalable serverless functions.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#2A2A2A] hover:border-[#4ADE80] transition-all duration-300 group hover:shadow-xl hover:shadow-black/20 hover:translate-y-[-5px]">
                <div className="w-14 h-14 bg-[#4ADE80]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#4ADE80]/20 transition-colors">
                  <Lock className="h-7 w-7 text-[#4ADE80]" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">SSL Encryption</h3>
                <p className="text-[#B0B0B0] leading-relaxed">
                  Automatic HTTPS for all sites with custom domains. Free SSL certificates that renew automatically.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#2A2A2A] hover:border-[#4ADE80] transition-all duration-300 group hover:shadow-xl hover:shadow-black/20 hover:translate-y-[-5px]">
                <div className="w-14 h-14 bg-[#4ADE80]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#4ADE80]/20 transition-colors">
                  <BarChart className="h-7 w-7 text-[#4ADE80]" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Analytics</h3>
                <p className="text-[#B0B0B0] leading-relaxed">
                  Real-time insights into traffic, performance, and security events with our intuitive dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-[#121212]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Simple, <span className="text-[#4ADE80]">Transparent</span> Pricing
              </h2>
              <p className="text-[#B0B0B0] max-w-2xl mx-auto">
                No hidden fees or surprises. Choose the plan that works for your needs and scale as you grow.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter Plan */}
              <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
                  <p className="text-[#B0B0B0] mb-4">Perfect for personal projects</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">$0</span>
                    <span className="text-[#B0B0B0]">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">1 website</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">100 GB bandwidth/month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">Basic DDoS protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">Community support</span>
                    </li>
                  </ul>
                  <button className="w-full py-2 px-4 rounded-md bg-transparent border border-[#4ADE80] text-[#4ADE80] hover:bg-[#4ADE80]/10">
                    Get started
                  </button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="bg-[#1A1A1A] rounded-xl border border-[#4ADE80] relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#4ADE80] text-[#121212] text-xs font-medium px-3 py-1">
                  Popular
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
                  <p className="text-[#B0B0B0] mb-4">For growing businesses</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">$29</span>
                    <span className="text-[#B0B0B0]">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">10 websites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">1 TB bandwidth/month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">Advanced DDoS protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">Priority support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">Custom domains</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">Analytics dashboard</span>
                    </li>
                  </ul>
                  <button className="w-full py-2 px-4 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070]">
                    Get started
                  </button>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
                  <p className="text-[#B0B0B0] mb-4">For large organizations</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">$99</span>
                    <span className="text-[#B0B0B0]">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">Unlimited websites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">Unlimited bandwidth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">Enterprise DDoS protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">24/7 dedicated support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">Advanced analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-[#E0E0E0] text-sm">Custom SLA</span>
                    </li>
                  </ul>
                  <button className="w-full py-2 px-4 rounded-md bg-transparent border border-[#4ADE80] text-[#4ADE80] hover:bg-[#4ADE80]/10">
                    Contact sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#151515]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to <span className="text-[#4ADE80]">secure</span> your static websites?
              </h2>
              <p className="text-[#B0B0B0] mb-8 text-lg">
                Join thousands of developers and companies who trust CloudRift for their hosting needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <button className="w-full sm:w-auto bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070] text-lg px-8 py-6 rounded-md font-medium">
                    Get started for free
                  </button>
                </Link>
                <button className="w-full sm:w-auto border border-[#2A2A2A] text-white hover:bg-[#1A1A1A] text-lg px-8 py-6 rounded-md">
                  Schedule a demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] border-t border-[#2A2A2A] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-[#4ADE80]" />
                <span className="font-bold text-xl text-white">CloudRift</span>
              </Link>
              <p className="text-[#B0B0B0] mb-4">
                Secure, fast, and reliable static website hosting with advanced protection.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    Security
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    Customers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-[#B0B0B0] hover:text-[#4ADE80]">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#2A2A2A] mt-12 pt-8 text-center">
            <p className="text-[#707070]">&copy; {new Date().getFullYear()} CloudRift. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .typing-animation {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3.5s steps(40, end);
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink {
          from, to { opacity: 0 }
          50% { opacity: 1 }
        }
      `}</style>
    </div>
  )
}
