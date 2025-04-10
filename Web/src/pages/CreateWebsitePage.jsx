"use client"

import { useState } from "react"
import DashboardLayout from "../components/DashboardLayout"
import { PlusCircle, Check, ChevronRight, Code, Layout, ShoppingCart, FileText, Image } from "lucide-react"

export default function CreateWebsitePage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const templates = [
    {
      id: "blank",
      name: "Blank Site",
      description: "Start from scratch with a clean HTML template.",
      icon: <Code className="h-6 w-6 text-[#4ADE80]" />,
      popular: false,
    },
    {
      id: "portfolio",
      name: "Portfolio",
      description: "Showcase your work with this modern portfolio template.",
      icon: <Layout className="h-6 w-6 text-[#4ADE80]" />,
      popular: true,
    },
    {
      id: "ecommerce",
      name: "E-Commerce",
      description: "Start selling products with this online store template.",
      icon: <ShoppingCart className="h-6 w-6 text-[#4ADE80]" />,
      popular: false,
    },
    {
      id: "blog",
      name: "Blog",
      description: "Share your thoughts with this clean blog template.",
      icon: <FileText className="h-6 w-6 text-[#4ADE80]" />,
      popular: false,
    },
    {
      id: "landing",
      name: "Landing Page",
      description: "Promote your product with this conversion-focused template.",
      icon: <Image className="h-6 w-6 text-[#4ADE80]" />,
      popular: true,
    },
  ]

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Create New Website</h1>
          <p className="text-[#B0B0B0]">Get started with a template or create a website from scratch.</p>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-white mb-4">Website Details</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="website-name" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Website Name
                </label>
                <input
                  type="text"
                  id="website-name"
                  className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                  placeholder="My Awesome Website"
                  required
                />
              </div>

              <div>
                <label htmlFor="domain" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Domain (Optional)
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="domain"
                    className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                    placeholder="mywebsite"
                  />
                  <span className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-[#2A2A2A] bg-[#121212] text-[#707070]">
                    .staticshield.com
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#707070]">
                  Leave blank to use an auto-generated domain. You can add a custom domain later.
                </p>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[#E0E0E0] mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  rows="3"
                  className="w-full px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent"
                  placeholder="Describe your website"
                ></textarea>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-white mb-4">Choose a Template</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`relative p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? "border-[#4ADE80] bg-[#4ADE80]/5"
                      : "border-[#2A2A2A] hover:border-[#4ADE80]/50 hover:bg-[#2A2A2A]"
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  {template.popular && (
                    <div className="absolute top-0 right-0 bg-[#4ADE80] text-[#121212] text-xs font-medium px-2 py-1 rounded-bl-lg rounded-tr-lg">
                      Popular
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#4ADE80]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {template.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{template.name}</h3>
                      <p className="text-sm text-[#B0B0B0]">{template.description}</p>
                    </div>

                    {selectedTemplate === template.id && (
                      <div className="ml-auto">
                        <div className="w-6 h-6 bg-[#4ADE80] rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-[#121212]" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                className="px-4 py-2 rounded-md border border-[#2A2A2A] text-[#E0E0E0] hover:bg-[#2A2A2A]"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!selectedTemplate}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                  !selectedTemplate
                    ? "bg-[#4ADE80]/50 cursor-not-allowed text-[#121212]"
                    : "bg-[#4ADE80] hover:bg-[#3AC070] text-[#121212]"
                }`}
              >
                <PlusCircle className="h-4 w-4" />
                <span>Create Website</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

