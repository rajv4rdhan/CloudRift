"use client"

import { useState } from "react"
import DashboardLayout from "../components/DashboardLayout"
import {
  Camera,
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  LinkIcon,
  Github,
  Twitter,
  Edit,
  Save,
  X,
  AlertCircle,
  Upload,
  PlusCircle,
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Mock user data
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    company: "Acme Inc.",
    role: "Full Stack Developer",
    location: "San Francisco, CA",
    bio: "Full stack developer with a passion for building beautiful, responsive web applications. Experienced with React, Node.js, and cloud infrastructure.",
    website: "https://johnsmith.dev",
    github: "johnsmith",
    twitter: "johnsmith",
    joinDate: "January 2023",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (e) => {
        setProfileImage(e.target.result)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // Simulate API call to save profile
    setTimeout(() => {
      setIsEditing(false)
      setSaveSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1000)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset any unsaved changes
    setProfileImage(null)
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Profile</h1>
            <p className="text-[#B0B0B0]">Manage your personal information and account settings.</p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A]"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-[#2A2A2A] text-[#E0E0E0] hover:bg-[#2A2A2A]"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070]"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>

        {saveSuccess && (
          <div className="mb-6 p-3 bg-[#4ADE80]/10 border border-[#4ADE80]/30 rounded-md flex items-center gap-2">
            <div className="p-1 rounded-full bg-[#4ADE80]/20">
              <AlertCircle className="h-4 w-4 text-[#4ADE80]" />
            </div>
            <p className="text-sm text-[#4ADE80]">Profile updated successfully!</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Profile image and basic info */}
          <div className="lg:col-span-1">
            <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full bg-[#2A2A2A] overflow-hidden">
                      {profileImage ? (
                        <img
                          src={profileImage || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#4ADE80]/10 text-[#4ADE80] text-4xl font-bold">
                          {userData.firstName.charAt(0)}
                          {userData.lastName.charAt(0)}
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <label
                        htmlFor="profile-image"
                        className="absolute bottom-0 right-0 w-8 h-8 bg-[#4ADE80] rounded-full flex items-center justify-center cursor-pointer"
                      >
                        <Camera className="h-4 w-4 text-[#121212]" />
                        <input
                          type="file"
                          id="profile-image"
                          className="hidden"
                          accept="image/*"
                          onChange={handleProfileImageChange}
                        />
                      </label>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-white mb-1">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="firstName"
                          value={userData.firstName}
                          onChange={handleInputChange}
                          className="w-24 px-2 py-1 bg-[#121212] border border-[#2A2A2A] rounded-md text-white text-center focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                        />
                        <input
                          type="text"
                          name="lastName"
                          value={userData.lastName}
                          onChange={handleInputChange}
                          className="w-24 px-2 py-1 bg-[#121212] border border-[#2A2A2A] rounded-md text-white text-center focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                        />
                      </div>
                    ) : (
                      `${userData.firstName} ${userData.lastName}`
                    )}
                  </h2>

                  <p className="text-[#B0B0B0] mb-4">
                    {isEditing ? (
                      <input
                        type="text"
                        name="role"
                        value={userData.role}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1 bg-[#121212] border border-[#2A2A2A] rounded-md text-white text-center focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                      />
                    ) : (
                      userData.role
                    )}
                  </p>

                  <div className="w-full space-y-3">
                    <div className="flex items-center gap-3 text-[#E0E0E0]">
                      <Mail className="h-4 w-4 text-[#4ADE80]" />
                      <span className="text-sm">
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                          />
                        ) : (
                          userData.email
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[#E0E0E0]">
                      <Briefcase className="h-4 w-4 text-[#4ADE80]" />
                      <span className="text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            name="company"
                            value={userData.company}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                          />
                        ) : (
                          userData.company
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[#E0E0E0]">
                      <MapPin className="h-4 w-4 text-[#4ADE80]" />
                      <span className="text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            name="location"
                            value={userData.location}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                          />
                        ) : (
                          userData.location
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[#E0E0E0]">
                      <Calendar className="h-4 w-4 text-[#4ADE80]" />
                      <span className="text-sm">Joined {userData.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-4">Social Links</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#E0E0E0]">
                    <LinkIcon className="h-4 w-4 text-[#4ADE80]" />
                    <span className="text-sm flex-1">
                      {isEditing ? (
                        <input
                          type="url"
                          name="website"
                          value={userData.website}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                          placeholder="https://yourwebsite.com"
                        />
                      ) : (
                        <a
                          href={userData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#4ADE80]"
                        >
                          {userData.website}
                        </a>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[#E0E0E0]">
                    <Github className="h-4 w-4 text-[#4ADE80]" />
                    <span className="text-sm flex-1">
                      {isEditing ? (
                        <div className="flex items-center">
                          <span className="text-[#707070] mr-1">github.com/</span>
                          <input
                            type="text"
                            name="github"
                            value={userData.github}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                          />
                        </div>
                      ) : (
                        <a
                          href={`https://github.com/${userData.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#4ADE80]"
                        >
                          github.com/{userData.github}
                        </a>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[#E0E0E0]">
                    <Twitter className="h-4 w-4 text-[#4ADE80]" />
                    <span className="text-sm flex-1">
                      {isEditing ? (
                        <div className="flex items-center">
                          <span className="text-[#707070] mr-1">twitter.com/</span>
                          <input
                            type="text"
                            name="twitter"
                            value={userData.twitter}
                            onChange={handleInputChange}
                            className="w-full px-2 py-1 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                          />
                        </div>
                      ) : (
                        <a
                          href={`https://twitter.com/${userData.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#4ADE80]"
                        >
                          twitter.com/{userData.twitter}
                        </a>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Bio and activity */}
          <div className="lg:col-span-2">
            <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-4">About</h3>

                {isEditing ? (
                  <textarea
                    name="bio"
                    value={userData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                  ></textarea>
                ) : (
                  <p className="text-[#E0E0E0]">{userData.bio}</p>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-6 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#4ADE80]/10 flex items-center justify-center flex-shrink-0">
                      <Upload className="h-5 w-5 text-[#4ADE80]" />
                    </div>
                    <div>
                      <p className="text-[#E0E0E0]">
                        Deployed <span className="text-white font-medium">portfolio.staticshield.com</span>
                      </p>
                      <p className="text-[#707070] text-sm">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#4ADE80]/10 flex items-center justify-center flex-shrink-0">
                      <Edit className="h-5 w-5 text-[#4ADE80]" />
                    </div>
                    <div>
                      <p className="text-[#E0E0E0]">
                        Updated <span className="text-white font-medium">blog.mycompany.com</span>
                      </p>
                      <p className="text-[#707070] text-sm">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#4ADE80]/10 flex items-center justify-center flex-shrink-0">
                      <PlusCircle className="h-5 w-5 text-[#4ADE80]" />
                    </div>
                    <div>
                      <p className="text-[#E0E0E0]">
                        Created <span className="text-white font-medium">product.staticshield.com</span>
                      </p>
                      <p className="text-[#707070] text-sm">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* API Keys */}
            <div className="mt-6 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-4">API Keys</h3>

                <div className="bg-[#121212] rounded-md border border-[#2A2A2A] p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-white font-medium">Production Key</p>
                      <p className="text-[#707070] text-sm">Created on Jan 15, 2023</p>
                    </div>
                    <button className="px-3 py-1 rounded-md bg-[#2A2A2A] text-[#E0E0E0] text-sm hover:bg-[#3A3A3A]">
                      Regenerate
                    </button>
                  </div>
                  <div className="flex items-center gap-2 bg-[#1A1A1A] p-2 rounded-md">
                    <code className="text-[#B0B0B0] text-sm flex-1">sk_live_••••••••••••••••••••••••••••••</code>
                    <button className="px-2 py-1 rounded-md bg-[#2A2A2A] text-[#E0E0E0] text-xs hover:bg-[#3A3A3A]">
                      Copy
                    </button>
                  </div>
                </div>

                <div className="bg-[#121212] rounded-md border border-[#2A2A2A] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-white font-medium">Development Key</p>
                      <p className="text-[#707070] text-sm">Created on Jan 15, 2023</p>
                    </div>
                    <button className="px-3 py-1 rounded-md bg-[#2A2A2A] text-[#E0E0E0] text-sm hover:bg-[#3A3A3A]">
                      Regenerate
                    </button>
                  </div>
                  <div className="flex items-center gap-2 bg-[#1A1A1A] p-2 rounded-md">
                    <code className="text-[#B0B0B0] text-sm flex-1">sk_test_••••••••••••••••••••••••••••••</code>
                    <button className="px-2 py-1 rounded-md bg-[#2A2A2A] text-[#E0E0E0] text-xs hover:bg-[#3A3A3A]">
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

