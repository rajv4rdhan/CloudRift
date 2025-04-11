import { Link } from "react-router-dom"
import DashboardLayout from "../components/DashboardLayout"
import { Globe, Users, BarChart, Shield, Clock, ExternalLink, Edit, Trash2, PlusCircle, Upload } from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const authToken = localStorage.getItem("token");
        const response = await axios.get(`${VITE_API_URL}/api/project/getProject`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const projectList = response.data.projectList;

        const updatedProjects = projectList.map(project => {
          const lastDeployed = calculateTimeDifference(project.createdAt);
          const status = checkWebsiteStatus(project.projectUrl);
          return {
            id: project._id,
            name: project.projectName,
            domain: new URL(project.projectUrl).hostname,
            status: status,
            visitors: Math.floor(Math.random() * 2000),
            lastDeployed,
            url: project.projectUrl
          };
        });

        setProjects(updatedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  function calculateTimeDifference(createdAt) {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffInMs = now - createdDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    return diffInHours > 24
      ? `${Math.floor(diffInHours / 24)} days ago`
      : `${diffInHours} hours ago`;
  }

  async function checkWebsiteStatus(url) {
    try {
      console.log("Checking status for:", url);
      const response = await axios.get(url, { timeout: 5000 });
      return response.status === 200 ? "online" : "offline";
    } catch (error) {
      console.error("Error checking website status:", error.message);
      return "offline";
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-[#B0B0B0]">Welcome back, John! Here's an overview of your websites.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A2A]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#B0B0B0] text-sm">Total Websites</p>
                <h3 className="text-2xl font-bold text-white mt-1">{projects.length}</h3>
              </div>
              <div className="w-10 h-10 bg-[#4ADE80]/10 rounded-lg flex items-center justify-center">
                <Globe className="h-5 w-5 text-[#4ADE80]" />
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A2A]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#B0B0B0] text-sm">Total Visitors</p>
                <h3 className="text-2xl font-bold text-white mt-1">15.8K</h3>
              </div>
              <div className="w-10 h-10 bg-[#4ADE80]/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-[#4ADE80]" />
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A2A]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#B0B0B0] text-sm">Bandwidth Used</p>
                <h3 className="text-2xl font-bold text-white mt-1">128 GB</h3>
              </div>
              <div className="w-10 h-10 bg-[#4ADE80]/10 rounded-lg flex items-center justify-center">
                <BarChart className="h-5 w-5 text-[#4ADE80]" />
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A2A]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#B0B0B0] text-sm">Threats Blocked</p>
                <h3 className="text-2xl font-bold text-white mt-1">2.4K</h3>
              </div>
              <div className="w-10 h-10 bg-[#4ADE80]/10 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-[#4ADE80]" />
              </div>
            </div>
          </div>
        </div>

        {/* Websites */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Your Websites</h2>
          <div className="flex gap-2">
            <Link to="/upload">
              <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A]">
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </button>
            </Link>
            <Link to="/create">
              <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070]">
                <PlusCircle className="h-4 w-4" />
                <span>Create New</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-[#E0E0E0]">Loading your websites...</div>
          ) : projects.length === 0 ? (
            <div className="p-8 text-center text-[#E0E0E0]">
              <p>You don't have any websites yet.</p>
              <Link to="/create" className="text-[#4ADE80] mt-2 inline-block">
                Create your first website
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2A2A2A]">
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#B0B0B0] uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#B0B0B0] uppercase tracking-wider">
                      Domain
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#B0B0B0] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#B0B0B0] uppercase tracking-wider">
                      Visitors
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#B0B0B0] uppercase tracking-wider">
                      Last Deployed
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[#B0B0B0] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((website) => (
                    <tr key={website.id} className="border-b border-[#2A2A2A] last:border-b-0">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{website.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#E0E0E0]">{website.domain}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          website.status === "active" ? "bg-[#4ADE80]/10 text-[#4ADE80]" : "bg-[#F87171]/10 text-[#F87171]"
                        }`}>
                          {website.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#E0E0E0]">
                        {website.visitors.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#E0E0E0]">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-[#B0B0B0]" />
                          <span>{website.lastDeployed}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#E0E0E0] text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a href={website.url} target="_blank" rel="noopener noreferrer" className="p-1 rounded-md text-[#E0E0E0] hover:bg-[#2A2A2A]" title="Visit">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                          <button className="p-1 rounded-md text-[#E0E0E0] hover:bg-[#2A2A2A]" title="Edit">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 rounded-md text-[#E0E0E0] hover:bg-[#2A2A2A]" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-2 hover:bg-[#2A2A2A] rounded-md transition-colors">
                <div className="w-8 h-8 bg-[#4ADE80]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-4 w-4 text-[#4ADE80]" />
                </div>
                <div>
                  <p className="text-[#E0E0E0]">
                    DDoS attack blocked on <span className="text-white font-medium">portfolio.staticshield.com</span>
                  </p>
                  <p className="text-[#707070] text-sm">30 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2 hover:bg-[#2A2A2A] rounded-md transition-colors">
                <div className="w-8 h-8 bg-[#4ADE80]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="h-4 w-4 text-[#4ADE80]" />
                </div>
                <div>
                  <p className="text-[#E0E0E0]">
                    New deployment for <span className="text-white font-medium">blog.mycompany.com</span>
                  </p>
                  <p className="text-[#707070] text-sm">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2 hover:bg-[#2A2A2A] rounded-md transition-colors">
                <div className="w-8 h-8 bg-[#4ADE80]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-[#4ADE80]" />
                </div>
                <div>
                  <p className="text-[#E0E0E0]">
                    Traffic spike on <span className="text-white font-medium">product.staticshield.com</span>
                  </p>
                  <p className="text-[#707070] text-sm">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}