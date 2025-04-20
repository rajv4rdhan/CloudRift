"use client"

import { useState } from "react"
import DashboardLayout from "../components/DashboardLayout"
import {
  Upload,
  FileText,
  X,
  Check,
  AlertCircle,
  ExternalLink,
  Globe,
  LinkIcon,
  Copy,
  Folder,
  Archive,
  ChevronRight,
} from "lucide-react"
import toast from "react-hot-toast"
const VITE_API_URL = import.meta.env.VITE_API_URL

export default function UploadWebsitePage() {
  // Upload type selection state
  const [uploadType, setUploadType] = useState(null) // null, "website", or "zip"

  // Website upload states
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [websiteNameError, setWebsiteNameError] = useState("")
  const [websiteName, setWebsiteName] = useState("")
  const [domain, setDomain] = useState("")
  const [successResponse, setSuccessResponse] = useState(null)

  // Zip upload states
  const [zipFile, setZipFile] = useState(null)
  const [projectType, setProjectType] = useState("react")
  const [zipDragActive, setZipDragActive] = useState(false)
  const [zipUploading, setZipUploading] = useState(false)
  const [zipUploadComplete, setZipUploadComplete] = useState(false)
  const [zipNameError, setZipNameError] = useState("")
  const [zipProjectName, setZipProjectName] = useState("")
  const [zipSuccessResponse, setZipSuccessResponse] = useState(null)

  // Website upload handlers
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the files
      handleItems(e.dataTransfer.items)
    } else if (e.dataTransfer.files) {
      // Convert FileList to Array and handle as flat files
      const fileArray = Array.from(e.dataTransfer.files)
      setFiles([
        ...files,
        ...fileArray.map((file) => ({
          file,
          path: file.webkitRelativePath || file.name,
          type: file.type,
          size: file.size,
        })),
      ])
    }
  }

  const handleItems = async (items) => {
    const itemsArray = Array.from(items)
    const newFiles = []

    for (const item of itemsArray) {
      if (item.kind === "file") {
        const entry = item.webkitGetAsEntry ? item.webkitGetAsEntry() : null

        if (entry) {
          if (entry.isFile) {
            const file = await getFileFromEntry(entry)
            newFiles.push({
              file,
              path: file.name,
              type: file.type,
              size: file.size,
            })
          } else if (entry.isDirectory) {
            const dirFiles = await traverseDirectory(entry)
            newFiles.push(...dirFiles)
          }
        } else {
          // Fallback for browsers that don't support webkitGetAsEntry
          const file = item.getAsFile()
          if (file) {
            newFiles.push({
              file,
              path: file.name,
              type: file.type,
              size: file.size,
            })
          }
        }
      }
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const getFileFromEntry = (entry) => {
    return new Promise((resolve) => {
      entry.file(resolve)
    })
  }

  const traverseDirectory = async (dirEntry, path = "") => {
    const dirReader = dirEntry.createReader()
    const entries = await readAllDirectoryEntries(dirReader)

    const result = []
    for (const entry of entries) {
      const fullPath = path ? `${path}/${entry.name}` : entry.name

      if (entry.isFile) {
        const file = await getFileFromEntry(entry)
        result.push({
          file,
          path: dirEntry.fullPath ? `${dirEntry.fullPath.substring(1)}/${file.name}` : fullPath,
          type: file.type,
          size: file.size,
        })
      } else if (entry.isDirectory) {
        const subDirFiles = await traverseDirectory(entry, fullPath)
        result.push(...subDirFiles)
      }
    }

    return result
  }

  const readAllDirectoryEntries = async (reader) => {
    let entries = []
    let readEntries = await readEntriesPromise(reader)

    while (readEntries.length > 0) {
      entries = [...entries, ...readEntries]
      readEntries = await readEntriesPromise(reader)
    }

    return entries
  }

  const readEntriesPromise = (reader) => {
    return new Promise((resolve) => {
      reader.readEntries(resolve)
    })
  }

  // Handle individual file uploads
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files)
      const newFiles = fileArray.map((file) => ({
        file,
        path: file.webkitRelativePath || file.name,
        type: file.type,
        size: file.size,
      }))
      setFiles([...files, ...newFiles])
    }
  }

  // Handle folder uploads
  const handleFolderChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files)
      const newFiles = fileArray.map((file) => ({
        file,
        path: file.webkitRelativePath || file.name,
        type: file.type,
        size: file.size,
      }))
      setFiles([...files, ...newFiles])
    }
  }

  const removeFile = (index) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const handleWebsiteNameChange = (e) => {
    setWebsiteName(e.target.value)
    // Clear error when user starts typing
    if (websiteNameError) {
      setWebsiteNameError("")
    }
  }

  const resetForm = () => {
    setFiles([])
    setWebsiteName("")
    setDomain("")
    setWebsiteNameError("")
    setSuccessResponse(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate website name
    if (!websiteName.trim()) {
      setWebsiteNameError("Website name is required")
      return
    }

    if (files.length === 0) return

    setUploading(true)

    try {
      // Create FormData object
      const formData = new FormData()

      // Append website name and domain
      formData.append("projectName", websiteName)
      formData.append("tld", "tuneloom.cfd")
      if (domain) {
        formData.append("domain", domain)
      }

      // Append files with their paths
      files.forEach((fileObj) => {
        formData.append("file", fileObj.file)
        // Add the path as a separate field if needed by your backend
        formData.append("filePaths", fileObj.path)
      })

      const token = localStorage.getItem("token")
      // Make API request
      const response = await fetch(`${VITE_API_URL}/api/project/uploadfile`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error uploading files")
      }

      setUploadComplete(true)
      setSuccessResponse(data)

      // Reset form fields but keep success message
      setFiles([])
      setWebsiteName("")
      setDomain("")
    } catch (error) {
      // Show error using toast
      toast.error(error.message || "Failed to upload files")
    } finally {
      setUploading(false)
    }
  }

  // Zip upload handlers
  const handleZipDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setZipDragActive(true)
    } else if (e.type === "dragleave") {
      setZipDragActive(false)
    }
  }

  const handleZipDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setZipDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/zip" || file.name.endsWith(".zip")) {
        setZipFile(file)
      } else {
        toast.error("Please upload a ZIP file")
      }
    }
  }

  const handleZipFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === "application/zip" || file.name.endsWith(".zip")) {
        setZipFile(file)
      } else {
        toast.error("Please upload a ZIP file")
      }
    }
  }

  const handleZipProjectNameChange = (e) => {
    setZipProjectName(e.target.value)
    // Clear error when user starts typing
    if (zipNameError) {
      setZipNameError("")
    }
  }

  const resetZipForm = () => {
    setZipFile(null)
    setZipProjectName("")
    setProjectType("react")
    setZipNameError("")
    setZipSuccessResponse(null)
  }

  const handleZipSubmit = async (e) => {
    e.preventDefault()

    // Validate project name
    if (!zipProjectName.trim()) {
      setZipNameError("Project name is required")
      return
    }

    if (!zipFile) return

    setZipUploading(true)

    try {
      // Create FormData object
      const formData = new FormData()

      // Append project name and type
      formData.append("projectName", zipProjectName)
      formData.append("projectType", projectType)
      formData.append("file", zipFile)
      formData.append("tld", "tuneloom.cfd")
      if (domain) {
        formData.append("domain", domain)
      }

      const token = localStorage.getItem("token")
      // Make API request
      const response = await fetch(`${VITE_API_URL}/api/project/uploadZip`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error uploading zip file")
      }

      setZipUploadComplete(true)
      setZipSuccessResponse(data)

      // Reset form fields but keep success message
      setZipFile(null)
      setZipProjectName("")
      setProjectType("react")
    } catch (error) {
      // Show error using toast
      toast.error(error.message || "Failed to upload zip file")
    } finally {
      setZipUploading(false)
    }
  }

  // Reset all forms and go back to selection
  const goBackToSelection = () => {
    resetForm()
    resetZipForm()
    setUploadType(null)
  }

  // Render upload type selection
  const renderUploadTypeSelection = () => {
    return (
      <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Choose Upload Type</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Website Upload Option */}
            <div
              className="bg-[#121212] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#4ADE80] transition-all cursor-pointer flex flex-col items-center"
              onClick={() => setUploadType("website")}
            >
              <div className="w-16 h-16 bg-[#4ADE80]/10 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-[#4ADE80]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Upload Website</h3>
              <p className="text-[#B0B0B0] text-center mb-4">
                Upload individual files or folders to deploy a static website
              </p>
              <button
                className="mt-auto px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-[#E0E0E0] hover:bg-[#2A2A2A] flex items-center gap-2"
                onClick={() => setUploadType("website")}
              >
                Select <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Zip Upload Option */}
            <div
              className="bg-[#121212] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#4ADE80] transition-all cursor-pointer flex flex-col items-center"
              onClick={() => setUploadType("zip")}
            >
              <div className="w-16 h-16 bg-[#4ADE80]/10 rounded-full flex items-center justify-center mb-4">
                <Archive className="h-8 w-8 text-[#4ADE80]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Upload ZIP Project</h3>
              <p className="text-[#B0B0B0] text-center mb-4">Upload a ZIP file containing a React or Vue project</p>
              <button
                className="mt-auto px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-[#E0E0E0] hover:bg-[#2A2A2A] flex items-center gap-2"
                onClick={() => setUploadType("zip")}
              >
                Select <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show success message or form based on upload status for website uploads
  const renderWebsiteContent = () => {
    if (successResponse) {
      return (
        <>
          <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-8 shadow-lg">
            <div className="flex items-center justify-center flex-col text-center max-w-xl mx-auto">
              {/* Success Icon */}
              <div className="h-20 w-20 bg-gradient-to-br from-[#4ADE80]/20 to-[#4ADE80]/10 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-[#4ADE80]/5">
                <Check className="h-10 w-10 text-[#4ADE80]" />
              </div>

              {/* Success Message */}
              <h2 className="text-2xl font-bold text-white mb-4">Upload Successful!</h2>
              <p className="text-[#B0B0B0] max-w-md mb-10 px-4">{successResponse.message}</p>

              {/* URL Container */}
              <div className="bg-gradient-to-br from-[#151515] to-[#0D0D0D] w-full max-w-md p-6 rounded-xl border border-[#333333] mb-10 shadow-xl shadow-black/40 backdrop-filter backdrop-blur-sm">
                <div className="flex flex-col gap-3">
                  {/* URL Label */}
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-[#4ADE80]" />
                    <span className="text-[#E0E0E0] font-medium text-sm">WEBSITE URL</span>
                  </div>

                  {/* URL Display */}
                  <div className="group flex items-center justify-between bg-[#0A0A0A] rounded-lg border border-[#222222] hover:border-[#4ADE80]/30 transition-all duration-300 p-3.5">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-[#4ADE80]/10 p-1.5 rounded-md flex-shrink-0">
                        <LinkIcon className="h-4 w-4 text-[#4ADE80]" />
                      </div>
                      <a
                        href={successResponse.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E0E0E0] group-hover:text-[#4ADE80] transition-colors truncate max-w-[180px] sm:max-w-[240px] md:max-w-[280px]"
                      >
                        {successResponse.url}
                      </a>
                    </div>

                    <a
                      href={successResponse.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-[#4ADE80]/10 rounded-md text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-all flex-shrink-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Copy Button */}
                  <div className="flex justify-end mt-1.5">
                    <button
                      onClick={() => navigator.clipboard.writeText(successResponse.url)}
                      className="text-xs flex items-center gap-1.5 text-[#999999] hover:text-[#E0E0E0] transition-colors py-1 px-2 rounded hover:bg-[#1A1A1A]"
                    >
                      <Copy className="h-3 w-3" /> Copy URL
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 w-full max-w-md">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-3.5 bg-gradient-to-br from-[#4ADE80] to-[#3AC070] text-[#121212] font-medium rounded-lg hover:from-[#3AC070] hover:to-[#2DA060] transition-all duration-300 shadow-md shadow-[#4ADE80]/10"
                >
                  Upload Another Website
                </button>

                <button
                  type="button"
                  onClick={goBackToSelection}
                  className="flex-1 px-6 py-3.5 border border-[#2A2A2A] bg-[#121212]/60 text-[#E0E0E0] rounded-lg hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  Back to Selection
                </button>
              </div>
            </div>
          </div>
        </>
      )
    }

    return (
      <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="website-name" className="block text-sm font-medium text-[#E0E0E0] mb-2">
              Website Name
            </label>
            <input
              type="text"
              id="website-name"
              className={`w-full px-3 py-2 bg-[#121212] border ${
                websiteNameError ? "border-red-500" : "border-[#2A2A2A]"
              } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent`}
              placeholder="My Awesome Website"
              value={websiteName}
              onChange={handleWebsiteNameChange}
              required
            />
            {websiteNameError && <p className="mt-1 text-xs text-red-500">{websiteNameError}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="domain" className="block text-sm font-medium text-[#E0E0E0] mb-2">
              Domain (Optional)
            </label>
            <div className="flex">
              <input
                type="text"
                id="domain"
                className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                placeholder="mywebsite"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <span className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-[#2A2A2A] bg-[#121212] text-[#707070]">
                .tuneloom.cfd
              </span>
            </div>
            <p className="mt-1 text-xs text-[#707070]">
              Leave blank to use an auto-generated domain. You can add a custom domain later.
            </p>
          </div>

          <div
            className={`mb-6 border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? "border-[#4ADE80] bg-[#4ADE80]/5" : "border-[#2A2A2A]"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-12 w-12 text-[#4ADE80] mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Drag and drop your files or folders here</h3>
              <p className="text-[#B0B0B0] mb-4">or click to browse</p>

              <div className="flex flex-wrap gap-3 justify-center">
                {/* File upload button */}
                <div>
                  <input type="file" id="file-upload" className="hidden" multiple onChange={handleFileChange} />
                  <label
                    htmlFor="file-upload"
                    className="px-4 py-2 bg-[#4ADE80] text-[#121212] rounded-md cursor-pointer hover:bg-[#3AC070] flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Select Files</span>
                  </label>
                </div>

                {/* Folder upload button */}
                <div>
                  <input
                    type="file"
                    id="folder-upload"
                    className="hidden"
                    webkitdirectory=""
                    directory=""
                    multiple
                    onChange={handleFolderChange}
                  />
                  <label
                    htmlFor="folder-upload"
                    className="px-4 py-2 bg-[#1A1A1A] text-[#E0E0E0] border border-[#2A2A2A] rounded-md cursor-pointer hover:bg-[#2A2A2A] flex items-center gap-2"
                  >
                    <Folder className="h-4 w-4" />
                    <span>Select Folder</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#E0E0E0] mb-2">Selected Files ({files.length})</h3>
              <div className="bg-[#121212] rounded-md border border-[#2A2A2A] divide-y divide-[#2A2A2A]">
                {files.map((fileObj, index) => (
                  <div key={index} className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[#4ADE80]" />
                      <div>
                        <p className="text-sm text-white">{fileObj.path}</p>
                        <p className="text-xs text-[#707070]">{(fileObj.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 rounded-full hover:bg-[#2A2A2A] text-[#B0B0B0]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={files.length === 0 || uploading || uploadComplete}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                files.length === 0 || uploading || uploadComplete
                  ? "bg-[#4ADE80]/50 cursor-not-allowed text-[#121212]"
                  : "bg-[#4ADE80] hover:bg-[#3AC070] text-[#121212]"
              }`}
            >
              {uploading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-[#121212] border-t-transparent rounded-full" />
                  <span>Uploading...</span>
                </>
              ) : uploadComplete ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Uploaded!</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Upload & Deploy</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded-md border border-[#2A2A2A] text-[#E0E0E0] hover:bg-[#2A2A2A]"
              onClick={goBackToSelection}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    )
  }

  // Show success message or form based on upload status for zip uploads
  const renderZipContent = () => {
    if (zipSuccessResponse) {
      return (
        <>
          <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-8 shadow-lg">
            <div className="flex items-center justify-center flex-col text-center max-w-xl mx-auto">
              {/* Success Icon */}
              <div className="h-20 w-20 bg-gradient-to-br from-[#4ADE80]/20 to-[#4ADE80]/10 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-[#4ADE80]/5">
                <Check className="h-10 w-10 text-[#4ADE80]" />
              </div>

              {/* Success Message */}
              <h2 className="text-2xl font-bold text-white mb-4">Upload Successful!</h2>
              <p className="text-[#B0B0B0] max-w-md mb-10 px-4">{zipSuccessResponse.message}</p>

              {/* URL Container */}
              <div className="bg-gradient-to-br from-[#151515] to-[#0D0D0D] w-full max-w-md p-6 rounded-xl border border-[#333333] mb-10 shadow-xl shadow-black/40 backdrop-filter backdrop-blur-sm">
                <div className="flex flex-col gap-3">
                  {/* URL Label */}
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-[#4ADE80]" />
                    <span className="text-[#E0E0E0] font-medium text-sm">PROJECT URL</span>
                  </div>

                  {/* URL Display */}
                  <div className="group flex items-center justify-between bg-[#0A0A0A] rounded-lg border border-[#222222] hover:border-[#4ADE80]/30 transition-all duration-300 p-3.5">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-[#4ADE80]/10 p-1.5 rounded-md flex-shrink-0">
                        <LinkIcon className="h-4 w-4 text-[#4ADE80]" />
                      </div>
                      <a
                        href={zipSuccessResponse.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E0E0E0] group-hover:text-[#4ADE80] transition-colors truncate max-w-[180px] sm:max-w-[240px] md:max-w-[280px]"
                      >
                        {zipSuccessResponse.url}
                      </a>
                    </div>

                    <a
                      href={zipSuccessResponse.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-[#4ADE80]/10 rounded-md text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-all flex-shrink-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Copy Button */}
                  <div className="flex justify-end mt-1.5">
                    <button
                      onClick={() => navigator.clipboard.writeText(zipSuccessResponse.url)}
                      className="text-xs flex items-center gap-1.5 text-[#999999] hover:text-[#E0E0E0] transition-colors py-1 px-2 rounded hover:bg-[#1A1A1A]"
                    >
                      <Copy className="h-3 w-3" /> Copy URL
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 w-full max-w-md">
                <button
                  type="button"
                  onClick={resetZipForm}
                  className="flex-1 px-6 py-3.5 bg-gradient-to-br from-[#4ADE80] to-[#3AC070] text-[#121212] font-medium rounded-lg hover:from-[#3AC070] hover:to-[#2DA060] transition-all duration-300 shadow-md shadow-[#4ADE80]/10"
                >
                  Upload Another Project
                </button>

                <button
                  type="button"
                  onClick={goBackToSelection}
                  className="flex-1 px-6 py-3.5 border border-[#2A2A2A] bg-[#121212]/60 text-[#E0E0E0] rounded-lg hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  Back to Selection
                </button>
              </div>
            </div>
          </div>
        </>
      )
    }

    return (
      <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
        <form onSubmit={handleZipSubmit}>
          <div className="mb-6">
            <label htmlFor="zip-project-name" className="block text-sm font-medium text-[#E0E0E0] mb-2">
              Project Name
            </label>
            <input
              type="text"
              id="zip-project-name"
              className={`w-full px-3 py-2 bg-[#121212] border ${
                zipNameError ? "border-red-500" : "border-[#2A2A2A]"
              } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent`}
              placeholder="My React Project"
              value={zipProjectName}
              onChange={handleZipProjectNameChange}
              required
            />
            {zipNameError && <p className="mt-1 text-xs text-red-500">{zipNameError}</p>}
          </div>

          {/* Subdomain Input */}
          <div className="mb-6">
            <label htmlFor="domain" className="block text-sm font-medium text-[#E0E0E0] mb-2">
              Subdomain
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="domain"
                className="flex-1 px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                placeholder="myproject"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <span className="px-3 py-2 bg-[#0D0D0D] border border-l-0 border-[#2A2A2A] rounded-r-md text-[#707070]">
                .tuneloom.cdf
              </span>
            </div>
            <p className="mt-1 text-xs text-[#707070]">Choose a custom subdomain for your project URL.</p>
          </div>

          <div className="mb-6">
            <label htmlFor="project-type" className="block text-sm font-medium text-[#E0E0E0] mb-2">
              Project Type
            </label>
            <select
              id="project-type"
              className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              <option value="react">React Project</option>
              <option value="vue">Vue Project</option>
            </select>
            <p className="mt-1 text-xs text-[#707070]">Select the type of project contained in your ZIP file.</p>
          </div>

          <div
            className={`mb-6 border-2 border-dashed rounded-lg p-8 text-center ${
              zipDragActive ? "border-[#4ADE80] bg-[#4ADE80]/5" : "border-[#2A2A2A]"
            }`}
            onDragEnter={handleZipDrag}
            onDragLeave={handleZipDrag}
            onDragOver={handleZipDrag}
            onDrop={handleZipDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <Archive className="h-12 w-12 text-[#4ADE80] mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Drag and drop your ZIP file here</h3>
              <p className="text-[#B0B0B0] mb-4">or click to browse</p>

              <div>
                <input type="file" id="zip-upload" className="hidden" accept=".zip" onChange={handleZipFileChange} />
                <label
                  htmlFor="zip-upload"
                  className="px-4 py-2 bg-[#4ADE80] text-[#121212] rounded-md cursor-pointer hover:bg-[#3AC070] flex items-center gap-2"
                >
                  <Archive className="h-4 w-4" />
                  <span>Select ZIP File</span>
                </label>
              </div>
            </div>
          </div>

          {zipFile && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#E0E0E0] mb-2">Selected ZIP File</h3>
              <div className="bg-[#121212] rounded-md border border-[#2A2A2A] p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Archive className="h-5 w-5 text-[#4ADE80]" />
                    <div>
                      <p className="text-sm text-white">{zipFile.name}</p>
                      <p className="text-xs text-[#707070]">{(zipFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setZipFile(null)}
                    className="p-1 rounded-full hover:bg-[#2A2A2A] text-[#B0B0B0]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={!zipFile || zipUploading || zipUploadComplete}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                !zipFile || zipUploading || zipUploadComplete
                  ? "bg-[#4ADE80]/50 cursor-not-allowed text-[#121212]"
                  : "bg-[#4ADE80] hover:bg-[#3AC070] text-[#121212]"
              }`}
            >
              {zipUploading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-[#121212] border-t-transparent rounded-full" />
                  <span>Uploading...</span>
                </>
              ) : zipUploadComplete ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Uploaded!</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Upload & Deploy</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded-md border border-[#2A2A2A] text-[#E0E0E0] hover:bg-[#2A2A2A]"
              onClick={goBackToSelection}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    )
  }

  // Render tips section
  const renderTips = () => {
    if (uploadType === "website") {
      return (
        <div className="mt-8 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-full bg-[#4ADE80]/10">
              <AlertCircle className="h-5 w-5 text-[#4ADE80]" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-1">Tips for uploading websites</h3>
              <p className="text-[#B0B0B0]">Follow these guidelines for the best results.</p>
            </div>
          </div>

          <ul className="space-y-2 text-[#E0E0E0]">
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
              <span className="text-sm">
                Make sure your website has an{" "}
                <code className="text-[#4ADE80] bg-[#4ADE80]/10 px-1 rounded">index.html</code> file at the root.
              </span>
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
              <span className="text-sm">Use relative paths for all assets and links.</span>
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
              <span className="text-sm">Maximum upload size is 500 MB.</span>
            </li>
          </ul>
        </div>
      )
    } else if (uploadType === "zip") {
      return (
        <div className="mt-8 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-full bg-[#4ADE80]/10">
              <AlertCircle className="h-5 w-5 text-[#4ADE80]" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-1">Tips for uploading ZIP projects</h3>
              <p className="text-[#B0B0B0]">Follow these guidelines for the best results.</p>
            </div>
          </div>

          <ul className="space-y-2 text-[#E0E0E0]">
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
              <span className="text-sm">
                Make sure your ZIP file contains a valid {projectType === "react" ? "React" : "Vue"} project.
              </span>
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
              <span className="text-sm">
                Include a <code className="text-[#4ADE80] bg-[#4ADE80]/10 px-1 rounded">package.json</code> file at the
                root.
              </span>
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
              <span className="text-sm">Maximum ZIP file size is 100 MB.</span>
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
              <span className="text-sm">
                We support {projectType === "react" ? "React" : "Vue"} projects created with{" "}
                {projectType === "react" ? "Create React App, Next.js, and Vite" : "Vue CLI, Nuxt.js, and Vite"}.
              </span>
            </li>
          </ul>
        </div>
      )
    }

    return null
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Upload Website</h1>
          <p className="text-[#B0B0B0]">
            {uploadType === null
              ? "Choose how you want to upload your website."
              : uploadType === "website"
                ? "Upload your static website files to deploy them instantly."
                : "Upload a ZIP file containing your React or Vue project."}
          </p>
        </div>

        {uploadType === null
          ? renderUploadTypeSelection()
          : uploadType === "website"
            ? renderWebsiteContent()
            : renderZipContent()}

        {!successResponse && !zipSuccessResponse && renderTips()}
      </div>
    </DashboardLayout>
  )
}
