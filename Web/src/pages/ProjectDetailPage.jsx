"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import DashboardLayout from "../components/DashboardLayout"
import ProjectTabs from "../components/ProjectDetail/ProjectTabs"
import ProjectStats from "../components/ProjectDetail/ProjectStats"
import ProjectLogs from "../components/ProjectDetail/ProjectLogs"
import ProjectEdit from "../components/ProjectDetail/ProjectEdit"
import ProjectSettings from "../components/ProjectDetail/ProjectSettings"
import { ExternalLink, ArrowLeft, Globe, Shield, Clock } from "lucide-react"

export default function ProjectDetailPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("home")

  useEffect(() => {
    // Fetch project data
    const fetchProject = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock project data
        const mockProject = {
          id: id,
          name: "My Awesome Website",
          domain: "awesome-website",
          url: "https://awesome-website.staticshield.com",
          status: "online",
          framework: "react",
          buildCommand: "npm run build",
          outputDirectory: "build",
          environment: "production",
          createdAt: "2023-04-15T10:30:00Z",
          lastDeployed: "2023-04-20T14:45:00Z",
          stats: {
            views: 12543,
            bandwidth: 2.45,
            impressions: 8976,
            buildCount: 7,
          },
          environmentVariables: [
            { key: "API_URL", value: "https://api.example.com" },
            { key: "ANALYTICS_ID", value: "UA-12345678-1" },
          ],
          files: [
            { path: "index.html", size: "2.4 KB", lastModified: "Apr 20, 2023" },
            { path: "css/styles.css", size: "4.7 KB", lastModified: "Apr 20, 2023" },
            { path: "js/main.js", size: "12.1 KB", lastModified: "Apr 20, 2023" },
            { path: "images/logo.png", size: "24.5 KB", lastModified: "Apr 15, 2023" },
            { path: "images/hero.jpg", size: "156.2 KB", lastModified: "Apr 15, 2023" },
          ],
          logs: [
            {
              type: "build",
              status: "success",
              message: "Build completed successfully",
              details: "Build completed in 45 seconds",
              timestamp: "Apr 20, 2023 14:45:00",
            },
            {
              type: "deploy",
              status: "success",
              message: "Deployment completed successfully",
              details: "Deployed to production environment",
              timestamp: "Apr 20, 2023 14:46:30",
            },
            {
              type: "error",
              status: "error",
              message: "Failed to load resource",
              details: "404 Not Found: /images/missing.jpg",
              timestamp: "Apr 21, 2023 09:12:15",
            },
            {
              type: "warning",
              status: "warning",
              message: "Resource size warning",
              details: "Large image detected: hero.jpg (156.2 KB). Consider optimizing for better performance.",
              timestamp: "Apr 21, 2023 10:30:45",
            },
            {
              type: "build",
              status: "success",
              message: "Build started",
              details: "Triggered by push to main branch",
              timestamp: "Apr 20, 2023 14:40:00",
            },
          ],
          recentActivity: [
            {
              message: "Deployment completed successfully",
              time: "2 days ago",
              icon: <Shield className="h-4 w-4 text-[#4ADE80]" />,
            },
            {
              message: "Build completed successfully",
              time: "2 days ago",
              icon: <Clock className="h-4 w-4 text-[#4ADE80]" />,
            },
            {
              message: "Traffic spike detected",
              time: "3 days ago",
              icon: <Globe className="h-4 w-4 text-[#4ADE80]" />,
            },
          ],
        }

        setProject(mockProject)
      } catch (error) {
        console.error("Error fetching project:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-[#4ADE80] border-t-transparent rounded-full"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-xl font-bold text-white mb-2">Project not found</h2>
            <p className="text-[#B0B0B0] mb-4">
              The project you're looking for doesn't exist or you don't have access to it.
            </p>
            <Link to="/dashboard" className="text-[#4ADE80] hover:underline">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-[#B0B0B0] mb-2">
            <Link to="/dashboard" className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">{project.name}</h1>
              <div className="flex items-center gap-2 text-[#B0B0B0]">
                <Globe className="h-4 w-4" />
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4ADE80] flex items-center gap-1"
                >
                  {project.url}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
                <span className="px-2 py-0.5 bg-[#4ADE80]/10 text-[#4ADE80] text-xs font-medium rounded-full">
                  {project.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A] flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Visit Site</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ProjectTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        {activeTab === "home" && <ProjectStats project={project} />}
        {activeTab === "logs" && <ProjectLogs project={project} />}
        {activeTab === "edit" && <ProjectEdit project={project} />}
        {activeTab === "settings" && <ProjectSettings project={project} />}
      </div>
    </DashboardLayout>
  )
}
