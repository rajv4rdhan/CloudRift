"use client"

import { useState } from "react"
import { Save, Trash2, AlertCircle, Key } from "lucide-react"

export default function ProjectSettings({ project }) {
  const [formData, setFormData] = useState({
    name: project.name,
    domain: project.domain,
    framework: project.framework,
    buildCommand: project.buildCommand,
    outputDirectory: project.outputDirectory,
    environment: project.environment,
  })

  const [envVars, setEnvVars] = useState(project.environmentVariables || [])
  const [newEnvKey, setNewEnvKey] = useState("")
  const [newEnvValue, setNewEnvValue] = useState("")
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddEnvVar = () => {
    if (newEnvKey.trim() === "") return

    setEnvVars([...envVars, { key: newEnvKey, value: newEnvValue }])

    setNewEnvKey("")
    setNewEnvValue("")
  }

  const handleRemoveEnvVar = (index) => {
    const newEnvVars = [...envVars]
    newEnvVars.splice(index, 1)
    setEnvVars(newEnvVars)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    // Simulate API call
    setTimeout(() => {
      setSaving(false)
    }, 1500)
  }

  const handleDelete = () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true)
      return
    }

    // Simulate API call
    console.log("Deleting project...")
  }

  return (
    <div className="space-y-6">
      {/* Project Settings */}
      <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-white font-medium mb-6">Project Settings</h3>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Project Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Project Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
              />
            </div>

            {/* Domain */}
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Domain
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                />
                <span className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-[#2A2A2A] bg-[#121212] text-[#707070]">
                  .staticshield.com
                </span>
              </div>
              <p className="mt-1 text-xs text-[#707070]">This will be the URL of your deployed project.</p>
            </div>

            {/* Framework */}
            <div>
              <label htmlFor="framework" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Framework
              </label>
              <select
                id="framework"
                name="framework"
                value={formData.framework}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
              >
                <option value="static">Static HTML</option>
                <option value="react">React</option>
                <option value="vue">Vue</option>
                <option value="next">Next.js</option>
                <option value="nuxt">Nuxt.js</option>
              </select>
            </div>

            {/* Build Command */}
            <div>
              <label htmlFor="buildCommand" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Build Command
              </label>
              <input
                type="text"
                id="buildCommand"
                name="buildCommand"
                value={formData.buildCommand}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                placeholder="npm run build"
              />
              <p className="mt-1 text-xs text-[#707070]">Leave blank for static sites with no build step.</p>
            </div>

            {/* Output Directory */}
            <div>
              <label htmlFor="outputDirectory" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Output Directory
              </label>
              <input
                type="text"
                id="outputDirectory"
                name="outputDirectory"
                value={formData.outputDirectory}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                placeholder="dist"
              />
              <p className="mt-1 text-xs text-[#707070]">Directory where your built files are located.</p>
            </div>

            {/* Environment */}
            <div>
              <label htmlFor="environment" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Environment
              </label>
              <select
                id="environment"
                name="environment"
                value={formData.environment}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
              >
                <option value="production">Production</option>
                <option value="staging">Staging</option>
                <option value="development">Development</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070] disabled:bg-[#4ADE80]/50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-[#121212] border-t-transparent rounded-full" />
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

      {/* Environment Variables */}
      <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-white font-medium mb-6">Environment Variables</h3>

        <div className="space-y-4">
          {/* Existing Variables */}
          {envVars.length > 0 && (
            <div className="bg-[#121212] rounded-md border border-[#2A2A2A] divide-y divide-[#2A2A2A]">
              {envVars.map((env, index) => (
                <div key={index} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-[#4ADE80]" />
                    <div>
                      <p className="text-sm text-white">{env.key}</p>
                      <p className="text-xs text-[#707070]">
                        {env.value.length > 20 ? env.value.substring(0, 20) + "..." : env.value}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveEnvVar(index)}
                    className="p-1 rounded-full hover:bg-[#2A2A2A] text-[#B0B0B0]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Variable */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="KEY"
              value={newEnvKey}
              onChange={(e) => setNewEnvKey(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="VALUE"
              value={newEnvValue}
              onChange={(e) => setNewEnvValue(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleAddEnvVar}
              disabled={!newEnvKey.trim()}
              className="px-4 py-2 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070] disabled:bg-[#4ADE80]/50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Add Variable
            </button>
          </div>

          <p className="text-xs text-[#707070]">
            Environment variables are encrypted and only exposed to your project during build and runtime.
          </p>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-[#1A1A1A] rounded-xl border border-red-500/20 p-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="p-2 rounded-full bg-red-500/10">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Danger Zone</h3>
            <p className="text-[#B0B0B0]">Irreversible actions that affect your project.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#121212] rounded-md border border-[#2A2A2A] p-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h4 className="text-white font-medium">Delete Project</h4>
                <p className="text-[#B0B0B0] text-sm">
                  Permanently delete this project and all of its contents. This action cannot be undone.
                </p>
              </div>
              {deleteConfirm ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="px-3 py-1.5 rounded-md border border-[#2A2A2A] text-[#E0E0E0] hover:bg-[#2A2A2A] text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 text-sm"
                  >
                    Confirm Delete
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-md border border-red-500/50 text-red-500 hover:bg-red-500/10"
                >
                  Delete Project
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
