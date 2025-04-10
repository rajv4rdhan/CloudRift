"use client"

import { useState } from "react"
import DashboardLayout from "../components/DashboardLayout"
import { Save, AlertCircle, CreditCard, Key, Bell, Globe, Shield, Eye, EyeOff, Loader2 } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSaveSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
          <p className="text-[#B0B0B0]">Manage your account settings and preferences.</p>
        </div>

        {saveSuccess && (
          <div className="mb-6 p-3 bg-[#4ADE80]/10 border border-[#4ADE80]/30 rounded-md flex items-center gap-2">
            <div className="p-1 rounded-full bg-[#4ADE80]/20">
              <AlertCircle className="h-4 w-4 text-[#4ADE80]" />
            </div>
            <p className="text-sm text-[#4ADE80]">Settings updated successfully!</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab("account")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                    activeTab === "account" ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#2A2A2A]"
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </button>

                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                    activeTab === "security" ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#2A2A2A]"
                  }`}
                >
                  <Key className="h-5 w-5" />
                  <span>Security</span>
                </button>

                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                    activeTab === "notifications"
                      ? "bg-[#4ADE80]/10 text-[#4ADE80]"
                      : "text-[#E0E0E0] hover:bg-[#2A2A2A]"
                  }`}
                >
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </button>

                <button
                  onClick={() => setActiveTab("billing")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                    activeTab === "billing" ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#2A2A2A]"
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Billing</span>
                </button>

                <button
                  onClick={() => setActiveTab("domains")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                    activeTab === "domains" ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "text-[#E0E0E0] hover:bg-[#2A2A2A]"
                  }`}
                >
                  <Globe className="h-5 w-5" />
                  <span>Domains</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Account Settings */}
            {activeTab === "account" && (
              <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Account Settings</h2>

                  <form onSubmit={handleSave}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                            First name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            defaultValue="John"
                            className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                            Last name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            defaultValue="Smith"
                            className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          defaultValue="john.smith@example.com"
                          className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          defaultValue="Acme Inc."
                          className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="timezone" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                          Timezone
                        </label>
                        <select
                          id="timezone"
                          name="timezone"
                          defaultValue="America/Los_Angeles"
                          className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                        >
                          <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                          <option value="America/Denver">Mountain Time (US & Canada)</option>
                          <option value="America/Chicago">Central Time (US & Canada)</option>
                          <option value="America/New_York">Eastern Time (US & Canada)</option>
                          <option value="UTC">UTC</option>
                          <option value="Europe/London">London</option>
                          <option value="Europe/Paris">Paris</option>
                          <option value="Asia/Tokyo">Tokyo</option>
                        </select>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070] disabled:bg-[#4ADE80]/50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4" />
                              <span>Save Changes</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Change Password</h2>

                    <form onSubmit={handleSave}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                            Current password
                          </label>
                          <div className="relative">
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              id="currentPassword"
                              name="currentPassword"
                              className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent pr-10"
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#707070] hover:text-white"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                              {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                            New password
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              id="newPassword"
                              name="newPassword"
                              className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent pr-10"
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#707070] hover:text-white"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                            Confirm new password
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              id="confirmPassword"
                              name="confirmPassword"
                              className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent pr-10"
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#707070] hover:text-white"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                          <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070] disabled:bg-[#4ADE80]/50 disabled:cursor-not-allowed"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Updating...</span>
                              </>
                            ) : (
                              <>
                                <Save className="h-4 w-4" />
                                <span>Update Password</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Two-Factor Authentication</h2>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#E0E0E0]">Protect your account with 2FA</p>
                        <p className="text-[#707070] text-sm">Add an extra layer of security to your account</p>
                      </div>

                      <button className="px-4 py-2 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070]">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Sessions</h2>

                    <div className="space-y-4">
                      <div className="flex items-start justify-between p-3 bg-[#121212] rounded-md border border-[#2A2A2A]">
                        <div>
                          <p className="text-white font-medium">Current Session</p>
                          <p className="text-[#707070] text-sm">Chrome on macOS • San Francisco, CA • 192.168.1.1</p>
                          <p className="text-[#707070] text-sm">Started 2 hours ago</p>
                        </div>
                        <div className="px-2 py-1 rounded-md bg-[#4ADE80]/10 text-[#4ADE80] text-xs">Active</div>
                      </div>

                      <div className="flex items-start justify-between p-3 bg-[#121212] rounded-md border border-[#2A2A2A]">
                        <div>
                          <p className="text-white font-medium">Mobile App</p>
                          <p className="text-[#707070] text-sm">iOS • New York, NY • 203.0.113.1</p>
                          <p className="text-[#707070] text-sm">Last active 3 days ago</p>
                        </div>
                        <button className="px-2 py-1 rounded-md bg-[#2A2A2A] text-[#E0E0E0] text-xs hover:bg-[#3A3A3A]">
                          Revoke
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button className="text-[#E0E0E0] text-sm hover:text-[#4ADE80]">
                        Sign out of all other sessions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>

                  <form onSubmit={handleSave}>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-3">Email Notifications</h3>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[#E0E0E0]">Security alerts</p>
                              <p className="text-[#707070] text-sm">Get notified about security events</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-11 h-6 bg-[#2A2A2A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4ADE80]"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[#E0E0E0]">Deployment notifications</p>
                              <p className="text-[#707070] text-sm">Get notified when deployments succeed or fail</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-11 h-6 bg-[#2A2A2A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4ADE80]"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[#E0E0E0]">Billing alerts</p>
                              <p className="text-[#707070] text-sm">Get notified about billing events</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-11 h-6 bg-[#2A2A2A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4ADE80]"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[#E0E0E0]">Marketing emails</p>
                              <p className="text-[#707070] text-sm">Receive product updates and news</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-[#2A2A2A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4ADE80]"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070] disabled:bg-[#4ADE80]/50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4" />
                              <span>Save Preferences</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Billing Settings */}
            {activeTab === "billing" && (
              <div className="space-y-6">
                <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-white">Current Plan</h2>
                      <span className="px-3 py-1 rounded-full bg-[#4ADE80]/10 text-[#4ADE80] text-sm">Pro Plan</span>
                    </div>

                    <div className="bg-[#121212] rounded-md border border-[#2A2A2A] p-4 mb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-white font-medium">Pro Plan</p>
                          <p className="text-[#707070] text-sm">$29/month • Renews on May 15, 2023</p>
                          <ul className="mt-2 space-y-1">
                            <li className="flex items-start gap-2 text-[#E0E0E0] text-sm">
                              <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                                <svg className="h-2 w-2 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>10 websites</span>
                            </li>
                            <li className="flex items-start gap-2 text-[#E0E0E0] text-sm">
                              <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                                <svg className="h-2 w-2 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>1 TB bandwidth/month</span>
                            </li>
                            <li className="flex items-start gap-2 text-[#E0E0E0] text-sm">
                              <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                                <svg className="h-2 w-2 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>Advanced DDoS protection</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <button className="px-3 py-1 rounded-md bg-[#2A2A2A] text-[#E0E0E0] text-sm hover:bg-[#3A3A3A]">
                            Change Plan
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button className="text-[#E0E0E0] text-sm hover:text-[#4ADE80]">View billing history</button>
                      <button className="text-red-500 text-sm hover:text-red-400">Cancel subscription</button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Payment Method</h2>

                    <div className="bg-[#121212] rounded-md border border-[#2A2A2A] p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-6 bg-[#2A2A2A] rounded flex items-center justify-center">
                            <svg
                              className="h-4 w-4 text-white"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22 10V9C22 6.17157 22 4.75736 21.1213 3.87868C20.2426 3 18.8284 3 16 3H8C5.17157 3 3.75736 3 2.87868 3.87868C2 4.75736 2 6.17157 2 9V15C2 17.8284 2 19.2426 2.87868 20.1213C3.75736 21 5.17157 21 8 21H16C18.8284 21 20.2426 21 21.1213 20.1213C22 19.2426 22 17.8284 22 15V14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path d="M2 9H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M6 15H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-white font-medium">Visa ending in 4242</p>
                            <p className="text-[#707070] text-sm">Expires 12/2025</p>
                          </div>
                        </div>
                        <button className="px-3 py-1 rounded-md bg-[#2A2A2A] text-[#E0E0E0] text-sm hover:bg-[#3A3A3A]">
                          Update
                        </button>
                      </div>
                    </div>

                    <button className="text-[#E0E0E0] text-sm hover:text-[#4ADE80]">Add payment method</button>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Billing Information</h2>

                    <form onSubmit={handleSave}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="companyName" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                            Company name
                          </label>
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            defaultValue="Acme Inc."
                            className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="billingEmail" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                            Billing email
                          </label>
                          <input
                            type="email"
                            id="billingEmail"
                            name="billingEmail"
                            defaultValue="billing@acme.com"
                            className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                            Address
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            defaultValue="123 Main St"
                            className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              defaultValue="San Francisco"
                              className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label htmlFor="zipCode" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                              ZIP / Postal code
                            </label>
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              defaultValue="94103"
                              className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="state" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                              State / Province
                            </label>
                            <input
                              type="text"
                              id="state"
                              name="state"
                              defaultValue="CA"
                              className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-[#E0E0E0] mb-1">
                              Country
                            </label>
                            <select
                              id="country"
                              name="country"
                              defaultValue="US"
                              className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                            >
                              <option value="US">United States</option>
                              <option value="CA">Canada</option>
                              <option value="UK">United Kingdom</option>
                              <option value="AU">Australia</option>
                              <option value="DE">Germany</option>
                              <option value="FR">France</option>
                            </select>
                          </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                          <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070] disabled:bg-[#4ADE80]/50 disabled:cursor-not-allowed"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Saving...</span>
                              </>
                            ) : (
                              <>
                                <Save className="h-4 w-4" />
                                <span>Save Information</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Domains Settings */}
            {activeTab === "domains" && (
              <div className="space-y-6">
                <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-white">Custom Domains</h2>
                      <button className="px-4 py-2 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070]">
                        Add Domain
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-[#121212] rounded-md border border-[#2A2A2A] p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-white font-medium">example.com</p>
                              <span className="px-2 py-0.5 rounded-full bg-[#4ADE80]/10 text-[#4ADE80] text-xs">
                                Active
                              </span>
                            </div>
                            <p className="text-[#707070] text-sm">Added on Jan 15, 2023</p>
                            <div className="mt-2 flex items-center gap-2">
                              <Shield className="h-4 w-4 text-[#4ADE80]" />
                              <span className="text-[#E0E0E0] text-sm">SSL: Active</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1 rounded-md bg-[#2A2A2A] text-[#E0E0E0] text-sm hover:bg-[#3A3A3A]">
                              Settings
                            </button>
                            <button className="px-3 py-1 rounded-md bg-[#2A2A2A] text-red-500 text-sm hover:bg-[#3A3A3A]">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#121212] rounded-md border border-[#2A2A2A] p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-white font-medium">blog.example.com</p>
                              <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-xs">
                                Pending
                              </span>
                            </div>
                            <p className="text-[#707070] text-sm">Added on Apr 2, 2023</p>
                            <div className="mt-2 flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-yellow-500" />
                              <span className="text-[#E0E0E0] text-sm">DNS verification required</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1 rounded-md bg-[#2A2A2A] text-[#E0E0E0] text-sm hover:bg-[#3A3A3A]">
                              Verify
                            </button>
                            <button className="px-3 py-1 rounded-md bg-[#2A2A2A] text-red-500 text-sm hover:bg-[#3A3A3A]">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Domain Protection</h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#E0E0E0]">DDoS Protection</p>
                          <p className="text-[#707070] text-sm">Protect your domains from DDoS attacks</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-[#2A2A2A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4ADE80]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#E0E0E0]">SSL Enforcement</p>
                          <p className="text-[#707070] text-sm">Redirect all HTTP traffic to HTTPS</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-[#2A2A2A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4ADE80]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#E0E0E0]">HSTS Preload</p>
                          <p className="text-[#707070] text-sm">Enable HTTP Strict Transport Security</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-[#2A2A2A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4ADE80]"></div>
                        </label>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#2A2A2A] flex justify-end">
                      <button
                        type="button"
                        disabled={loading}
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070] disabled:bg-[#4ADE80]/50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            <span>Save Settings</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function User(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

