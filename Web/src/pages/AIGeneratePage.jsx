"use client"

import { useState, useRef, useEffect } from "react"
import DashboardLayout from "../components/DashboardLayout"
import SessionSelector from "../components/SessionSelector"
import FileManager from "../components/FileManager"
import {
  Send,
  Eye,
  Copy,
  Check,
  Loader2,
  Sparkles,
  RefreshCw,
  Maximize2,
  Download,
  MessageSquare,
  Files,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useChatHistory, useSendMessage } from "../hooks/useChatAPI"
import { toast } from "react-hot-toast"

export default function AIGeneratePage() {
  const [activeTab, setActiveTab] = useState("files")
  const [selectedSession, setSelectedSession] = useState(null)
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)
  const [generatedFiles, setGeneratedFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [chatView, setChatView] = useState("sessions") // "sessions" or "chat"
  const messagesEndRef = useRef(null)

  // API hooks
  const { data: chatHistory, isLoading: isLoadingHistory } = useChatHistory(selectedSession)
  const sendMessageMutation = useSendMessage()

  // Get messages from chat history
  const messages = chatHistory?.chat || []
  const files = chatHistory?.files?.file || []

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Update generated files when chat history changes (only on initial load)
    if (files.length > 0 && generatedFiles.length === 0) {
      setGeneratedFiles(files)
      if (!selectedFile && files.length > 0) {
        setSelectedFile(files[0])
      }
    }
  }, [files, generatedFiles.length])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSessionSelect = (sessionId) => {
    setSelectedSession(sessionId)
    setGeneratedFiles([])
    setSelectedFile(null)
    setChatView("chat") // Switch to chat view when session is selected
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || !selectedSession) {
      if (!selectedSession) {
        toast.error("Please select or create a chat session first")
      }
      return
    }

    const message = input.trim()
    setInput("")

    try {
      const response = await sendMessageMutation.mutateAsync({
        sessionId: selectedSession,
        message: message,
      })

      // Handle file updates - merge with existing files instead of replacing
      if (response.files && response.files.length > 0) {
        setGeneratedFiles(prevFiles => {
          const updatedFiles = [...prevFiles]
          
          response.files.forEach(newFile => {
            const existingIndex = updatedFiles.findIndex(f => f.filename === newFile.filename)
            
            if (existingIndex !== -1) {
              // Update existing file
              updatedFiles[existingIndex] = newFile
            } else {
              // Add new file
              updatedFiles.push(newFile)
            }
          })
          
          return updatedFiles
        })
        
        // Update selected file if it was modified, otherwise keep current selection
        if (selectedFile) {
          const updatedSelectedFile = response.files.find(f => f.filename === selectedFile.filename)
          if (updatedSelectedFile) {
            setSelectedFile(updatedSelectedFile)
          }
        } else if (response.files.length > 0) {
          // If no file selected, select first new file
          setSelectedFile(response.files[0])
        }
        
        toast.success(`Updated ${response.filesCount} file(s)`)
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleCopyCode = () => {
    if (selectedFile?.content) {
      navigator.clipboard.writeText(selectedFile.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success("Code copied to clipboard!")
    }
  }

  const handleDownloadFile = () => {
    if (selectedFile) {
      const blob = new Blob([selectedFile.content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = selectedFile.filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success(`Downloaded ${selectedFile.filename}`)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-65px)]">
        {/* Minimalist Header */}
        <div className="border-b border-[#2A2A2A] bg-[#121212] p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4ADE80] to-[#22C55E] rounded-lg flex items-center justify-center mr-3">
              <Zap className="h-4 w-4 text-[#121212]" />
            </div>
            <h1 className="text-lg font-semibold text-white">AI Code Generator</h1>
            <div className="ml-3 px-2 py-1 bg-[#4ADE80]/10 text-[#4ADE80] text-xs rounded-full border border-[#4ADE80]/20">
              BETA
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="flex items-center px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#E0E0E0] rounded-md transition-colors text-sm"
            >
              {isChatOpen ? <ChevronLeft className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
              {isChatOpen ? 'Hide' : 'Chat'}
            </button>
            <button className="p-1.5 rounded-md text-[#E0E0E0] hover:bg-[#1A1A1A] transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
            <button className="p-1.5 rounded-md text-[#E0E0E0] hover:bg-[#1A1A1A] transition-colors">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Minimalist Chat Sidebar */}
          {isChatOpen && (
            <div className="w-80 border-r border-[#2A2A2A] bg-[#121212] flex flex-col">
              {/* Toggle Header */}
              <div className="p-3 border-b border-[#2A2A2A] bg-[#1A1A1A]">
                <div className="flex bg-[#2A2A2A] rounded-lg p-1">
                  <button
                    onClick={() => setChatView("sessions")}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      chatView === "sessions"
                        ? "bg-[#4ADE80] text-[#121212]"
                        : "text-[#B0B0B0] hover:text-white"
                    }`}
                  >
                    Sessions
                  </button>
                  <button
                    onClick={() => setChatView("chat")}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      chatView === "chat"
                        ? "bg-[#4ADE80] text-[#121212]"
                        : "text-[#B0B0B0] hover:text-white"
                    }`}
                  >
                    AI Chat
                  </button>
                </div>
              </div>

              {/* Content based on toggle */}
              {chatView === "sessions" ? (
                <SessionSelector
                  selectedSession={selectedSession}
                  onSessionSelect={handleSessionSelect}
                />
              ) : (
                <>
                  {/* Minimalist Chat Header */}
                  <div className="p-3 border-b border-[#2A2A2A] bg-[#1A1A1A]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#4ADE80] to-[#22C55E] rounded-md flex items-center justify-center mr-2">
                          <MessageSquare className="h-3 w-3 text-[#121212]" />
                        </div>
                        <h3 className="text-white font-medium text-sm">AI Assistant</h3>
                      </div>
                      {selectedSession && (
                        <div className="w-2 h-2 bg-[#4ADE80] rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Minimalist Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {!selectedSession ? (
                      <div className="text-center py-8">
                        <MessageSquare className="h-8 w-8 text-[#4A4A4A] mx-auto mb-2" />
                        <p className="text-[#B0B0B0] text-sm">Select a session first</p>
                      </div>
                    ) : isLoadingHistory ? (
                      <div className="text-center py-8">
                        <Loader2 className="h-5 w-5 animate-spin text-[#4ADE80] mx-auto mb-2" />
                        <p className="text-[#B0B0B0] text-sm">Loading...</p>
                      </div>
                    ) : (
                      <>
                        {messages.length === 0 && (
                          <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-lg">
                            <p className="text-[#E0E0E0] text-sm">
                              Ask me to generate code, components, or complete projects.
                            </p>
                          </div>
                        )}
                        {messages.map((chat, index) => (
                          <div key={index} className="space-y-2">
                            {/* User message */}
                            <div className="flex justify-end">
                              <div className="max-w-[85%] p-2.5 rounded-lg bg-[#4ADE80] text-[#121212]">
                                <p className="text-sm">{chat.user}</p>
                              </div>
                            </div>
                            {/* AI response */}
                            <div className="flex justify-start">
                              <div className="max-w-[85%] p-2.5 rounded-lg bg-[#1A1A1A] text-[#E0E0E0] border border-[#2A2A2A]">
                                <p className="text-sm">{chat.system}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Minimalist Chat Input */}
                  <div className="p-3 border-t border-[#2A2A2A] bg-[#1A1A1A]">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={selectedSession ? "Ask AI..." : "Select session first"}
                        className="flex-1 px-3 py-2 bg-[#121212] border border-[#2A2A2A] rounded-lg text-white text-sm placeholder-[#666] focus:outline-none focus:ring-1 focus:ring-[#4ADE80] focus:border-transparent"
                        disabled={sendMessageMutation.isLoading || !selectedSession}
                      />
                      <button
                        type="submit"
                        disabled={sendMessageMutation.isLoading || !input.trim() || !selectedSession}
                        className="p-2 rounded-lg bg-[#4ADE80] text-[#121212] hover:bg-[#3AC070] disabled:opacity-50 transition-colors"
                      >
                        {sendMessageMutation.isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-[#121212]">
            {/* Minimalist Tab Navigation */}
            <div className="flex border-b border-[#2A2A2A] bg-[#1A1A1A] px-4">
              <button
                onClick={() => setActiveTab("files")}
                className={`px-4 py-3 flex items-center font-medium text-sm transition-colors ${
                  activeTab === "files"
                    ? "text-[#4ADE80] border-b-2 border-[#4ADE80]"
                    : "text-[#B0B0B0] hover:text-white"
                }`}
              >
                <Files className="h-4 w-4 mr-2" />
                Files
                {generatedFiles.length > 0 && (
                  <span className="ml-2 bg-[#4ADE80] text-[#121212] text-xs px-1.5 py-0.5 rounded-full">
                    {generatedFiles.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-4 py-3 flex items-center font-medium text-sm transition-colors ${
                  activeTab === "preview"
                    ? "text-[#4ADE80] border-b-2 border-[#4ADE80]"
                    : "text-[#B0B0B0] hover:text-white"
                }`}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
            </div>

            {/* Minimalist Content Area */}
            <div className="flex-1 overflow-auto">
              {activeTab === "files" && (
                <div className="h-full bg-[#121212]">
                  {generatedFiles.length > 0 ? (
                    <div className="flex h-full">
                      <FileManager 
                        files={generatedFiles} 
                        selectedFile={selectedFile}
                        onFileSelect={setSelectedFile}
                      />
                      
                      {/* Minimalist Action Buttons */}
                      {selectedFile && (
                        <div className="absolute top-2 right-2 flex gap-1 z-20">
                          <button
                            onClick={handleCopyCode}
                            className="p-2 rounded-md bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A] transition-colors"
                            title="Copy"
                          >
                            {copied ? <Check className="h-4 w-4 text-[#4ADE80]" /> : <Copy className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={handleDownloadFile}
                            className="p-2 rounded-md bg-[#1A1A1A] text-[#E0E0E0] hover:bg-[#2A2A2A] transition-colors"
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center p-6 text-center">
                      <div>
                        <div className="w-16 h-16 bg-[#1A1A1A] rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Files className="h-8 w-8 text-[#4ADE80]" />
                        </div>
                        <h3 className="text-white text-lg font-medium mb-2">No Files Yet</h3>
                        <p className="text-[#B0B0B0] text-sm mb-4">
                          Chat with AI to generate code files
                        </p>
                        <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-lg text-left">
                          <p className="text-[#4ADE80] text-sm mb-1">Try asking:</p>
                          <p className="text-[#B0B0B0] text-sm">"Create a responsive navbar"</p>
                          <p className="text-[#B0B0B0] text-sm">"Generate a contact form"</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "preview" && (
                <div className="h-full bg-white overflow-auto">
                  {selectedFile && selectedFile.filename.endsWith('.html') ? (
                    <div className="preview-container h-full relative">
                      <div className="absolute top-2 left-2 z-10">
                        <div className="bg-white/90 px-2 py-1 rounded text-xs text-gray-700">
                          {selectedFile.filename}
                        </div>
                      </div>
                      <iframe
                        title="Preview"
                        srcDoc={selectedFile.content}
                        className="w-full h-full border-0"
                      />
                    </div>
                  ) : generatedFiles.find(f => f.filename.endsWith('.html')) ? (
                    <div className="preview-container h-full relative">
                      <div className="absolute top-2 left-2 z-10">
                        <div className="bg-white/90 px-2 py-1 rounded text-xs text-gray-700">
                          {generatedFiles.find(f => f.filename.endsWith('.html')).filename}
                        </div>
                      </div>
                      <iframe
                        title="Preview"
                        srcDoc={generatedFiles.find(f => f.filename.endsWith('.html')).content}
                        className="w-full h-full border-0"
                      />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center p-6 text-center bg-[#121212]">
                      <div>
                        <div className="w-16 h-16 bg-[#1A1A1A] rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Eye className="h-8 w-8 text-[#4ADE80]" />
                        </div>
                        <h3 className="text-white text-lg font-medium mb-2">No HTML Files</h3>
                        <p className="text-[#B0B0B0] text-sm">
                          Generate HTML files to see live preview
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
