"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Shield,
  LayoutDashboard,
  Upload,
  PlusCircle,
  Settings,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react"

export default function DashboardLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#2A2A2A] bg-[#121212]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-[#4ADE80]" />
              <span className="font-bold text-xl text-white">CloudRift</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full text-[#E0E0E0] hover:bg-[#1A1A1A]">
              <Bell className="h-5 w-5" />
            </button>

            <div className="relative">
              <Link
                to="/profile"
                className="flex items-center gap-2 p-2 rounded-full text-[#E0E0E0] hover:bg-[#1A1A1A]"
              >
                <div className="w-8 h-8 rounded-full bg-[#4ADE80] flex items-center justify-center text-[#121212] font-medium">
                  JS
                </div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-white hover:bg-[#1A1A1A]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 border-r border-[#2A2A2A] bg-[#121212] overflow-y-auto fixed h-[calc(100vh-65px)]">
          <div className="p-4 h-full flex flex-col">
            <nav className="space-y-1 mt-6">
              <Link
                to="/dashboard"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  isActive("/dashboard") ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#1A1A1A]"
                }`}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/upload"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  isActive("/upload") ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#1A1A1A]"
                }`}
              >
                <Upload className="h-5 w-5" />
                <span>Upload Website</span>
              </Link>

              <Link
                to="/create"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  isActive("/create") ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#1A1A1A]"
                }`}
              >
                <PlusCircle className="h-5 w-5" />
                <span>Create New</span>
              </Link>

              <Link
                to="/ai-generate"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  isActive("/ai-generate") ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#1A1A1A]"
                }`}
              >
                <Sparkles className="h-5 w-5" />
                <div className="flex items-center">
                  <span>AI Generate</span>
                  <span className="ml-2 px-1.5 py-0.5 bg-[#4ADE80]/10 text-[#4ADE80] text-xs font-medium rounded-full">
                    BETA
                  </span>
                </div>
              </Link>

              <Link
                to="/settings"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  isActive("/settings") ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#1A1A1A]"
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </nav>

            <div className="mt-auto pt-4 border-t border-[#2A2A2A]">
              <Link
                to="/profile"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  isActive("/profile") ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#1A1A1A]"
                }`}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>

              <Link
                to="/logout"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-[#E0E0E0] hover:bg-[#1A1A1A]"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-[#121212] md:hidden">
            <div className="pt-20 px-4">
              <nav className="space-y-1">
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/dashboard") ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#1A1A1A]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/upload"
                  className={`flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/upload") ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#1A1A1A]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Website</span>
                </Link>

                <Link
                  to="/create"
                  className={`flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/create") ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#1A1A1A]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Create New</span>
                </Link>

                <Link
                  to="/ai-generate"
                  className={`flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/ai-generate") ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#1A1A1A]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Sparkles className="h-5 w-5" />
                  <div className="flex items-center">
                    <span>AI Generate</span>
                    <span className="ml-2 px-1.5 py-0.5 bg-[#4ADE80]/10 text-[#4ADE80] text-xs font-medium rounded-full">
                      BETA
                    </span>
                  </div>
                </Link>

                <Link
                  to="/settings"
                  className={`flex items-center gap-3 px-3 py-3 rounded-md ${
                    isActive("/settings") ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#1A1A1A]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>

                <div className="pt-4 mt-4 border-t border-[#2A2A2A]">
                  <Link
                    to="/profile"
                    className={`flex items-center gap-3 px-3 py-3 rounded-md ${
                      isActive("/profile") ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#1A1A1A]"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>

                  <Link
                    to="/logout"
                    className="flex items-center gap-3 px-3 py-3 rounded-md text-[#E0E0E0] hover:bg-[#1A1A1A]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 md:ml-64 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
