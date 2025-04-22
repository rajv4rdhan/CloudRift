"use client"

import { useState } from "react"
import { BarChart, Globe, Clock, RefreshCw, Download, Eye, Zap, Server } from "lucide-react"

export default function ProjectStats({ project }) {
  const [isLoading, setIsLoading] = useState(false)
  const [timeframe, setTimeframe] = useState("7d") // 24h, 7d, 30d, all

  const refreshStats = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Views"
          value={project.stats.views.toLocaleString()}
          icon={<Eye className="h-5 w-5 text-[#4ADE80]" />}
          change={+12.5}
        />
        <StatCard
          title="Bandwidth Used"
          value={`${project.stats.bandwidth.toFixed(2)} GB`}
          icon={<Download className="h-5 w-5 text-[#4ADE80]" />}
          change={+8.3}
        />
        <StatCard
          title="Impressions"
          value={project.stats.impressions.toLocaleString()}
          icon={<Globe className="h-5 w-5 text-[#4ADE80]" />}
          change={-2.1}
        />
        <StatCard
          title="Build Count"
          value={project.stats.buildCount}
          icon={<Server className="h-5 w-5 text-[#4ADE80]" />}
          change={0}
          hideChange
        />
      </div>

      {/* Time Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-medium">Performance Metrics</h3>
          <div className="px-2 py-1 bg-[#1A1A1A] rounded-md text-xs text-[#B0B0B0]">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#1A1A1A] rounded-md p-1">
            {["24h", "7d", "30d", "all"].map((time) => (
              <button
                key={time}
                onClick={() => setTimeframe(time)}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeframe === time ? "bg-[#2A2A2A] text-white" : "text-[#B0B0B0] hover:text-white"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
          <button
            onClick={refreshStats}
            disabled={isLoading}
            className="p-2 rounded-md bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A] transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-medium">Traffic Overview</h3>
            <p className="text-[#B0B0B0] text-sm">Visitors over time</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4ADE80]"></div>
              <span className="text-[#B0B0B0] text-sm">Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#60A5FA]"></div>
              <span className="text-[#B0B0B0] text-sm">Unique Visitors</span>
            </div>
          </div>
        </div>
        <div className="h-64 w-full flex items-center justify-center">
          <div className="text-[#707070] flex flex-col items-center">
            <BarChart className="h-10 w-10 mb-2" />
            <p>Chart visualization would appear here</p>
            <p className="text-sm">Showing data for last {timeframe}</p>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-white font-medium mb-4">Project Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem
            label="Created"
            value={new Date(project.createdAt).toLocaleDateString()}
            icon={<Clock className="h-4 w-4 text-[#4ADE80]" />}
          />
          <InfoItem
            label="Last Deployed"
            value={new Date(project.lastDeployed).toLocaleDateString()}
            icon={<Clock className="h-4 w-4 text-[#4ADE80]" />}
          />
          <InfoItem label="Framework" value={project.framework} icon={<Zap className="h-4 w-4 text-[#4ADE80]" />} />
          <InfoItem
            label="Environment"
            value={project.environment}
            icon={<Server className="h-4 w-4 text-[#4ADE80]" />}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-white font-medium mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {project.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-2 hover:bg-[#2A2A2A] rounded-md transition-colors">
              <div className="w-8 h-8 bg-[#4ADE80]/10 rounded-full flex items-center justify-center flex-shrink-0">
                {activity.icon}
              </div>
              <div>
                <p className="text-[#E0E0E0]">{activity.message}</p>
                <p className="text-[#707070] text-sm">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Helper components
function StatCard({ title, value, icon, change, hideChange = false }) {
  return (
    <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A2A]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#B0B0B0] text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
          {!hideChange && (
            <div className={`flex items-center mt-1 text-xs ${change >= 0 ? "text-[#4ADE80]" : "text-red-500"}`}>
              {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last period
            </div>
          )}
        </div>
        <div className="w-10 h-10 bg-[#4ADE80]/10 rounded-lg flex items-center justify-center">{icon}</div>
      </div>
    </div>
  )
}

function InfoItem({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#121212] rounded-md">
      <div className="p-2 rounded-full bg-[#4ADE80]/10">{icon}</div>
      <div>
        <p className="text-[#B0B0B0] text-xs">{label}</p>
        <p className="text-white">{value}</p>
      </div>
    </div>
  )
}
