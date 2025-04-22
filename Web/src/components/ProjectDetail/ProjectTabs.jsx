"use client"

import { useEffect } from "react"
import { Home, FileText, Edit, Settings } from "lucide-react"

export default function ProjectTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "home", label: "Overview", icon: <Home className="h-4 w-4" /> },
    { id: "logs", label: "Logs", icon: <FileText className="h-4 w-4" /> },
    { id: "edit", label: "Edit Project", icon: <Edit className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ]

  // Handle URL hash for direct tab access
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash && tabs.some((tab) => tab.id === hash)) {
      setActiveTab(hash)
    }
  }, [setActiveTab])

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    window.location.hash = tabId
  }

  return (
    <div className="border-b border-[#2A2A2A] mb-6">
      <div className="flex overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 px-5 py-4 font-medium transition-colors relative whitespace-nowrap
              ${
                activeTab === tab.id ? "text-[#4ADE80] border-b-2 border-[#4ADE80]" : "text-[#B0B0B0] hover:text-white"
              }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
