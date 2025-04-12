"use client"

import { useState, useRef, useEffect } from "react"
import DashboardLayout from "../components/DashboardLayout"
import {
  Send,
  Code,
  Eye,
  Copy,
  Check,
  Loader2,
  Sparkles,
  RefreshCw,
  Maximize2,
  Download,
  Terminal,
  MessageSquare,
} from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function AIGeneratePage() {
  const [activeTab, setActiveTab] = useState("code")
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Welcome to StaticShield AI! I can help you generate code, design components, or answer questions about web development. Try asking me to create something for your static website.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const messagesEndRef = useRef(null)

  // Sample code for demonstration
  const sampleCode = `
import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Build amazing websites</span>
            <span className="block text-indigo-200">with StaticShield</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Deploy your static websites with enterprise-grade security and performance.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Get started
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10">
                Live demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
`

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate AI response delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // For demo purposes, we'll generate a static response
      // In a real app, you would call your AI API here
      const aiResponse = {
        role: "assistant",
        content: "Here's a hero section component I've created for your website:",
        code: sampleCode,
      }

      setMessages((prev) => [...prev, aiResponse])
      setGeneratedCode(aiResponse.code)
    } catch (error) {
      console.error("Error generating AI response:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-65px)]">
        <div className="border-b border-[#2A2A2A] bg-[#121212] p-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">AI Generate</h1>
            <div className="ml-2 px-2 py-0.5 bg-[#4ADE80]/10 text-[#4ADE80] text-xs font-medium rounded-full border border-[#4ADE80]/20 flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              BETA
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md text-[#E0E0E0] hover:bg-[#1A1A1A] transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-md text-[#E0E0E0] hover:bg-[#1A1A1A] transition-colors">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Chat sidebar */}
          <div className="w-1/3 border-r border-[#2A2A2A] bg-[#121212] flex flex-col">
            <div className="p-4 border-b border-[#2A2A2A] bg-[#1A1A1A]">
              <h2 className="text-white font-medium flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat with AI
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-[#4ADE80] text-[#121212]"
                        : "bg-[#1A1A1A] text-[#E0E0E0] border border-[#2A2A2A]"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.code && (
                      <div className="mt-2 p-2 bg-[#121212] rounded-md">
                        <p className="text-xs text-[#B0B0B0]">Generated code available in the editor</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-[#2A2A2A] bg-[#1A1A1A]">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask AI to generate something..."
                  className="flex-1 px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent transition-all duration-200"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-md bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </button>
              </form>
            </div>
          </div>

          {/* Code editor and preview */}
          <div className="flex-1 flex flex-col bg-[#121212]">
            <div className="flex border-b border-[#2A2A2A]">
              <button
                onClick={() => setActiveTab("code")}
                className={`px-4 py-2 flex items-center ${
                  activeTab === "code"
                    ? "text-[#4ADE80] border-b-2 border-[#4ADE80]"
                    : "text-[#B0B0B0] hover:text-white"
                }`}
              >
                <Code className="h-4 w-4 mr-2" />
                Code
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-4 py-2 flex items-center ${
                  activeTab === "preview"
                    ? "text-[#4ADE80] border-b-2 border-[#4ADE80]"
                    : "text-[#B0B0B0] hover:text-white"
                }`}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab("terminal")}
                className={`px-4 py-2 flex items-center ${
                  activeTab === "terminal"
                    ? "text-[#4ADE80] border-b-2 border-[#4ADE80]"
                    : "text-[#B0B0B0] hover:text-white"
                }`}
              >
                <Terminal className="h-4 w-4 mr-2" />
                Terminal
              </button>
            </div>

            <div className="flex-1 overflow-auto">
              {activeTab === "code" && (
                <div className="relative h-full">
                  <div className="absolute top-2 right-2 flex gap-2 z-10">
                    <button
                      onClick={handleCopyCode}
                      className="p-1.5 rounded-md bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A] transition-colors"
                      title="Copy code"
                    >
                      {copied ? <Check className="h-4 w-4 text-[#4ADE80]" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <button
                      className="p-1.5 rounded-md bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A] transition-colors"
                      title="Download code"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                  {generatedCode ? (
                    <SyntaxHighlighter
                      language="jsx"
                      style={atomDark}
                      customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        borderRadius: 0,
                        height: "100%",
                        backgroundColor: "#121212",
                      }}
                    >
                      {generatedCode}
                    </SyntaxHighlighter>
                  ) : (
                    <div className="h-full flex items-center justify-center p-6 text-center">
                      <div>
                        <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
                          <Code className="h-8 w-8 text-[#4ADE80]" />
                        </div>
                        <h3 className="text-white text-lg font-medium mb-2">No Code Generated Yet</h3>
                        <p className="text-[#B0B0B0] max-w-md">
                          Ask the AI to generate code for you. Try something like "Create a responsive navbar" or
                          "Generate a contact form".
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "preview" && (
                <div className="h-full bg-white p-4 overflow-auto">
                  {generatedCode ? (
                    <div className="preview-container">
                      <iframe
                        title="Preview"
                        srcDoc={`
                          <!DOCTYPE html>
                          <html>
                            <head>
                              <meta charset="UTF-8" />
                              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                              <script src="https://cdn.tailwindcss.com"></script>
                              <style>
                                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
                              </style>
                            </head>
                            <body>
                              <div id="root"></div>
                              <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
                              <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                              <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
                              <script type="text/babel">
                                ${generatedCode}
                                ReactDOM.render(<HeroSection />, document.getElementById('root'));
                              </script>
                            </body>
                          </html>
                        `}
                        className="w-full h-full border-0"
                      />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center p-6 text-center bg-[#121212]">
                      <div>
                        <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
                          <Eye className="h-8 w-8 text-[#4ADE80]" />
                        </div>
                        <h3 className="text-white text-lg font-medium mb-2">No Preview Available</h3>
                        <p className="text-[#B0B0B0] max-w-md">
                          Generate some code first to see a preview of how it will look.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "terminal" && (
                <div className="h-full bg-[#121212] p-4 font-mono text-sm text-[#E0E0E0] overflow-auto">
                  <div className="terminal-output">
                    <p className="text-[#4ADE80]">$ npm install</p>
                    <p className="text-[#B0B0B0]">Installing dependencies...</p>
                    <p className="text-[#B0B0B0]">+ react@18.2.0</p>
                    <p className="text-[#B0B0B0]">+ react-dom@18.2.0</p>
                    <p className="text-[#B0B0B0]">+ tailwindcss@3.3.3</p>
                    <p className="text-[#4ADE80]">Done in 3.45s</p>
                    <p className="text-[#4ADE80]">$ npm run dev</p>
                    <p className="text-[#B0B0B0]">Starting development server...</p>
                    <p className="text-[#4ADE80]">Server running at http://localhost:3000</p>
                    <p className="text-[#B0B0B0]">Ready in 2.1s</p>
                    <p className="text-[#B0B0B0]">
                      <span className="text-[#4ADE80]">➜</span> Local: http://localhost:3000/
                    </p>
                    <p className="text-[#B0B0B0]">
                      <span className="text-[#4ADE80]">➜</span> Network: http://192.168.1.5:3000/
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
