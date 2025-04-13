"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
  Upload,
  FileText,
  X,
  Check,
  AlertCircle,
  ExternalLink,
  Globe,
  Link,
  Copy,
} from "lucide-react";
import toast from "react-hot-toast";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function UploadWebsitePage() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [websiteNameError, setWebsiteNameError] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [domain, setDomain] = useState("");
  const [successResponse, setSuccessResponse] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Convert FileList to Array
      const fileArray = Array.from(e.dataTransfer.files);
      setFiles([...files, ...fileArray]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Convert FileList to Array
      const fileArray = Array.from(e.target.files);
      setFiles([...files, ...fileArray]);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleWebsiteNameChange = (e) => {
    setWebsiteName(e.target.value);
    // Clear error when user starts typing
    if (websiteNameError) {
      setWebsiteNameError("");
    }
  };

  const resetForm = () => {
    setFiles([]);
    setWebsiteName("");
    setDomain("");
    setWebsiteNameError("");
    setSuccessResponse(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate website name
    if (!websiteName.trim()) {
      setWebsiteNameError("Website name is required");
      return;
    }

    if (files.length === 0) return;

    setUploading(true);

    try {
      // Create FormData object
      const formData = new FormData();

      // Append website name and domain
      formData.append("projectName", websiteName);
      formData.append("tld", "tuneloom.cfd");
      if (domain) {
        formData.append("domain", domain);
      }

      // Append files
      files.forEach((file) => {
        formData.append("file", file);
      });

      const token = localStorage.getItem("token");
      // Make API request
      const response = await fetch(`${VITE_API_URL}/api/project/uploadFile`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error uploading files");
      }

      setUploadComplete(true);
      setSuccessResponse(data);

      // Reset form fields but keep success message
      setFiles([]);
      setWebsiteName("");
      setDomain("");
    } catch (error) {
      // Show error using toast
      toast.error(error.message || "Failed to upload files");
    } finally {
      setUploading(false);
    }
  };

  // Show success message or form based on upload status
  const renderContent = () => {
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
              <h2 className="text-2xl font-bold text-white mb-4">
                Upload Successful!
              </h2>
              <p className="text-[#B0B0B0] max-w-md mb-10 px-4">
                {successResponse.message}
              </p>

              {/* URL Container */}
              <div className="bg-gradient-to-br from-[#151515] to-[#0D0D0D] w-full max-w-md p-6 rounded-xl border border-[#333333] mb-10 shadow-xl shadow-black/40 backdrop-filter backdrop-blur-sm">
                <div className="flex flex-col gap-3">
                  {/* URL Label */}
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-[#4ADE80]" />
                    <span className="text-[#E0E0E0] font-medium text-sm">
                      WEBSITE URL
                    </span>
                  </div>

                  {/* URL Display */}
                  <div className="group flex items-center justify-between bg-[#0A0A0A] rounded-lg border border-[#222222] hover:border-[#4ADE80]/30 transition-all duration-300 p-3.5">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-[#4ADE80]/10 p-1.5 rounded-md flex-shrink-0">
                        <Link className="h-4 w-4 text-[#4ADE80]" />
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
                      onClick={() =>
                        navigator.clipboard.writeText(successResponse.url)
                      }
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

                <a
                  href={successResponse.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3.5 border border-[#2A2A2A] bg-[#121212]/60 text-[#E0E0E0] rounded-lg hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  Visit Website <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="website-name"
              className="block text-sm font-medium text-[#E0E0E0] mb-2"
            >
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
            {websiteNameError && (
              <p className="mt-1 text-xs text-red-500">{websiteNameError}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="domain"
              className="block text-sm font-medium text-[#E0E0E0] mb-2"
            >
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
              Leave blank to use an auto-generated domain. You can add a custom
              domain later.
            </p>
          </div>

          <div
            className={`mb-6 border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive
                ? "border-[#4ADE80] bg-[#4ADE80]/5"
                : "border-[#2A2A2A]"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-12 w-12 text-[#4ADE80] mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                Drag and drop your files here
              </h3>
              <p className="text-[#B0B0B0] mb-4">
                or click to browse your files
              </p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="px-4 py-2 bg-[#4ADE80] text-[#121212] rounded-md cursor-pointer hover:bg-[#3AC070]"
              >
                Select Files
              </label>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#E0E0E0] mb-2">
                Selected Files ({files.length})
              </h3>
              <div className="bg-[#121212] rounded-md border border-[#2A2A2A] divide-y divide-[#2A2A2A]">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[#4ADE80]" />
                      <div>
                        <p className="text-sm text-white">{file.name}</p>
                        <p className="text-xs text-[#707070]">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
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
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Upload Website</h1>
          <p className="text-[#B0B0B0]">
            Upload your static website files to deploy them instantly.
          </p>
        </div>

        {renderContent()}

        {!successResponse && (
          <div className="mt-8 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 rounded-full bg-[#4ADE80]/10">
                <AlertCircle className="h-5 w-5 text-[#4ADE80]" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">
                  Tips for uploading
                </h3>
                <p className="text-[#B0B0B0]">
                  Follow these guidelines for the best results.
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-[#E0E0E0]">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                  <svg
                    className="h-3 w-3 text-[#4ADE80]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm">
                  Make sure your website has an{" "}
                  <code className="text-[#4ADE80] bg-[#4ADE80]/10 px-1 rounded">
                    index.html
                  </code>{" "}
                  file at the root.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                  <svg
                    className="h-3 w-3 text-[#4ADE80]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm">
                  Use relative paths for all assets and links.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                  <svg
                    className="h-3 w-3 text-[#4ADE80]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm">
                  You can upload a ZIP file containing your entire website.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-[#4ADE80]/20 p-1 mt-0.5">
                  <svg
                    className="h-3 w-3 text-[#4ADE80]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
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
        )}
      </div>
    </DashboardLayout>
  );
}
