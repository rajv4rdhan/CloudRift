"use client"

import { useState } from "react"
import { Upload, FileText, X, Check, AlertCircle, Folder, Archive } from "lucide-react"

export default function ProjectEdit({ project }) {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadType, setUploadType] = useState(null) // null, "files", "zip"

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Convert FileList to Array
      const fileArray = Array.from(e.dataTransfer.files)
      setFiles([...files, ...fileArray])
    }
  }

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Convert FileList to Array
      const fileArray = Array.from(e.target.files)
      setFiles([...files, ...fileArray])
    }
  }

  // Handle folder input change
  const handleFolderChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files)
      setFiles([...files, ...fileArray])
    }
  }

  // Remove file from list
  const removeFile = (index) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (files.length === 0) return

    setUploading(true)

    // Simulate API call
    setTimeout(() => {
      setUploading(false)
      setUploadComplete(true)
    }, 2000)
  }

  // Reset form
  const resetForm = () => {
    setFiles([])
    setUploadComplete(false)
    setUploadType(null)
  }

  return (
    <div className="space-y-6">
      {/* Upload Type Selection */}
      {!uploadType && !uploadComplete && (
        <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
          <h3 className="text-white font-medium mb-6 text-center">Choose Upload Method</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Files Upload Option */}
            <div
              className="bg-[#121212] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#4ADE80] transition-all cursor-pointer flex flex-col items-center"
              onClick={() => setUploadType("files")}
            >
              <div className="w-16 h-16 bg-[#4ADE80]/10 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-[#4ADE80]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Upload Files</h3>
              <p className="text-[#B0B0B0] text-center mb-4">
                Upload individual files or folders to update your project
              </p>
              <button
                className="mt-auto px-4 py-2 bg-[#4ADE80] text-[#121212] rounded-md hover:bg-[#3AC070]"
                onClick={() => setUploadType("files")}
              >
                Select Files
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
              <h3 className="text-xl font-semibold text-white mb-2">Upload ZIP</h3>
              <p className="text-[#B0B0B0] text-center mb-4">Upload a ZIP file containing your entire project</p>
              <button
                className="mt-auto px-4 py-2 bg-[#4ADE80] text-[#121212] rounded-md hover:bg-[#3AC070]"
                onClick={() => setUploadType("zip")}
              >
                Select ZIP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Files Upload Form */}
      {uploadType === "files" && !uploadComplete && (
        <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
          <form onSubmit={handleSubmit}>
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
                <div className="bg-[#121212] rounded-md border border-[#2A2A2A] divide-y divide-[#2A2A2A] max-h-60 overflow-y-auto">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-[#4ADE80]" />
                        <div>
                          <p className="text-sm text-white">{file.name}</p>
                          <p className="text-xs text-[#707070]">{(file.size / 1024).toFixed(2)} KB</p>
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
                disabled={files.length === 0 || uploading}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                  files.length === 0 || uploading
                    ? "bg-[#4ADE80]/50 cursor-not-allowed text-[#121212]"
                    : "bg-[#4ADE80] hover:bg-[#3AC070] text-[#121212]"
                }`}
              >
                {uploading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-[#121212] border-t-transparent rounded-full" />
                    <span>Uploading...</span>
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
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ZIP Upload Form */}
      {uploadType === "zip" && !uploadComplete && (
        <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
          <form onSubmit={handleSubmit}>
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
                <Archive className="h-12 w-12 text-[#4ADE80] mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Drag and drop your ZIP file here</h3>
                <p className="text-[#B0B0B0] mb-4">or click to browse</p>

                <div>
                  <input type="file" id="zip-upload" className="hidden" accept=".zip" onChange={handleFileChange} />
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

            {files.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[#E0E0E0] mb-2">Selected ZIP File</h3>
                <div className="bg-[#121212] rounded-md border border-[#2A2A2A] p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Archive className="h-5 w-5 text-[#4ADE80]" />
                      <div>
                        <p className="text-sm text-white">{files[0]?.name}</p>
                        <p className="text-xs text-[#707070]">{(files[0]?.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFiles([])}
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
                disabled={files.length === 0 || uploading}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                  files.length === 0 || uploading
                    ? "bg-[#4ADE80]/50 cursor-not-allowed text-[#121212]"
                    : "bg-[#4ADE80] hover:bg-[#3AC070] text-[#121212]"
                }`}
              >
                {uploading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-[#121212] border-t-transparent rounded-full" />
                    <span>Uploading...</span>
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
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Upload Success */}
      {uploadComplete && (
        <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="h-20 w-20 bg-gradient-to-br from-[#4ADE80]/20 to-[#4ADE80]/10 rounded-full flex items-center justify-center mb-6">
              <Check className="h-10 w-10 text-[#4ADE80]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Upload Successful!</h3>
            <p className="text-[#B0B0B0] max-w-md mx-auto mb-6">
              Your project has been updated and is now being deployed. This process may take a few minutes.
            </p>
            <button onClick={resetForm} className="px-4 py-2 bg-[#4ADE80] text-[#121212] rounded-md hover:bg-[#3AC070]">
              Upload More Files
            </button>
          </div>
        </div>
      )}

      {/* Current Project Files */}
      <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-white font-medium mb-4">Current Project Files</h3>
        <div className="bg-[#121212] rounded-md border border-[#2A2A2A] divide-y divide-[#2A2A2A] max-h-80 overflow-y-auto">
          {project.files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[#4ADE80]" />
                <div>
                  <p className="text-sm text-white">{file.path}</p>
                  <p className="text-xs text-[#707070]">{file.size}</p>
                </div>
              </div>
              <span className="text-xs text-[#707070]">Last modified: {file.lastModified}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-full bg-[#4ADE80]/10">
            <AlertCircle className="h-5 w-5 text-[#4ADE80]" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Tips for updating your project</h3>
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
    </div>
  )
}
