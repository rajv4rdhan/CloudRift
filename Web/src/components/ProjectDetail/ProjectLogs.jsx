"use client"

import { useState } from "react"
import {
  Download,
  Filter,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  ChevronDown,
  ChevronRight,
  Clock,
  Terminal,
  RefreshCw,
} from "lucide-react"

export default function ProjectLogs({ project }) {
  const [logType, setLogType] = useState("all") // all, build, deploy, error
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedLogs, setExpandedLogs] = useState({})
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Filter logs based on type and search query
  const filteredLogs = project.logs.filter((log) => {
    const matchesType = logType === "all" || log.type === logType
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const getLogIcon = (type, status) => {
    if (type === "error") return <XCircle className="h-4 w-4 text-red-500" />
    if (type === "warning") return <AlertCircle className="h-4 w-4 text-yellow-500" />
    if (status === "success") return <CheckCircle className="h-4 w-4 text-[#4ADE80]" />
    return <Info className="h-4 w-4 text-[#60A5FA]" />
  }

  const getLogClass = (type) => {
    if (type === "error") return "border-red-500/20 bg-red-500/5"
    if (type === "warning") return "border-yellow-500/20 bg-yellow-500/5"
    return "border-[#2A2A2A] bg-[#1A1A1A]"
  }

  const getStatusBadgeClass = (type, status) => {
    if (type === "error") return "bg-red-500/10 text-red-500 border-red-500/20"
    if (type === "warning") return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    if (status === "success") return "bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20"
    return "bg-[#60A5FA]/10 text-[#60A5FA] border-[#60A5FA]/20"
  }

  const toggleLogExpansion = (logId) => {
    setExpandedLogs((prev) => ({
      ...prev,
      [logId]: !prev[logId],
    }))
  }

  const refreshLogs = () => {
    setIsRefreshing(true)
    // Simulate API call to refresh logs
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setLogType("all")}
            className={`px-3 py-1.5 text-sm rounded-md ${
              logType === "all" ? "bg-[#4ADE80] text-[#121212]" : "bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A]"
            }`}
          >
            All Logs
          </button>
          <button
            onClick={() => setLogType("build")}
            className={`px-3 py-1.5 text-sm rounded-md ${
              logType === "build" ? "bg-[#4ADE80] text-[#121212]" : "bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A]"
            }`}
          >
            Build
          </button>
          <button
            onClick={() => setLogType("deploy")}
            className={`px-3 py-1.5 text-sm rounded-md ${
              logType === "deploy" ? "bg-[#4ADE80] text-[#121212]" : "bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A]"
            }`}
          >
            Deploy
          </button>
          <button
            onClick={() => setLogType("error")}
            className={`px-3 py-1.5 text-sm rounded-md ${
              logType === "error" ? "bg-[#4ADE80] text-[#121212]" : "bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A]"
            }`}
          >
            Errors
          </button>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#707070]" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
            />
          </div>
          <button
            className="p-2 rounded-md bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A] transition-colors"
            onClick={refreshLogs}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
          <button className="p-2 rounded-md bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A] transition-colors">
            <Filter className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-md bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A] transition-colors">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Logs */}
      <div className="bg-[#121212] rounded-xl border border-[#2A2A2A] overflow-hidden">
        <div className="p-4 border-b border-[#2A2A2A] bg-[#1A1A1A]">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium">Deployment Logs</h3>
            <span className="text-[#B0B0B0] text-sm">{filteredLogs.length} entries</span>
          </div>
        </div>
        <div className="max-h-[600px] overflow-y-auto">
          {filteredLogs.length === 0 ? (
            <div className="p-6 text-center text-[#707070]">
              <AlertCircle className="h-8 w-8 mx-auto mb-2" />
              <p>No logs found matching your criteria</p>
            </div>
          ) : (
            <div className="divide-y divide-[#2A2A2A]">
              {filteredLogs.map((log, index) => (
                <div key={index} className={`transition-all duration-200 ${getLogClass(log.type)}`}>
                  {/* Log Header - Always visible */}
                  <div
                    className="p-4 cursor-pointer hover:bg-[#1A1A1A]/50 transition-colors"
                    onClick={() => toggleLogExpansion(index)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        {expandedLogs[index] ? (
                          <ChevronDown className="h-4 w-4 text-[#707070]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[#707070]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-shrink-0">{getLogIcon(log.type, log.status)}</div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">{log.message}</span>
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full border ${getStatusBadgeClass(log.type, log.status)}`}
                              >
                                {log.type.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-[#707070] text-xs">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{log.timestamp}</span>
                            </div>
                            <div className="bg-[#2A2A2A] px-2 py-0.5 rounded">
                              ID: {log.id || `log-${index + 1000}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Log Details - Visible when expanded */}
                  {expandedLogs[index] && (
                    <div className="px-4 pb-4 pt-0 ml-7 border-t border-[#2A2A2A]/30">
                      <div className="bg-[#0C0C0C] rounded-md p-3 font-mono text-sm">
                        <div className="flex items-center gap-2 mb-2 text-[#707070]">
                          <Terminal className="h-3.5 w-3.5" />
                          <span className="text-xs uppercase">Log Details</span>
                        </div>
                        <div className="text-[#B0B0B0] whitespace-pre-wrap">
                          {log.details}
                          {log.code && (
                            <div className="mt-3 p-2 bg-[#121212] border border-[#2A2A2A] rounded text-xs overflow-x-auto">
                              <pre className="text-[#E0E0E0]">{log.code}</pre>
                            </div>
                          )}
                          {log.errorDetails && (
                            <div className="mt-3 p-2 bg-red-500/5 border border-red-500/20 rounded text-xs overflow-x-auto">
                              <div className="text-red-400 font-medium mb-1">Error Details:</div>
                              <pre className="text-red-300">{log.errorDetails}</pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
