import React from 'react';
import { File, Code, FileText, Folder, ChevronRight, ChevronDown } from 'lucide-react';

const FileManager = ({ files = [], selectedFile, onFileSelect }) => {

  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop();
    switch (extension) {
      case 'html':
      case 'htm':
        return <FileText className="h-4 w-4 text-orange-400" />;
      case 'css':
        return <FileText className="h-4 w-4 text-blue-400" />;
      case 'js':
      case 'jsx':
        return <Code className="h-4 w-4 text-yellow-400" />;
      default:
        return <File className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleFileSelect = (file) => {
    onFileSelect(file);
  };

  return (
    <div className="h-full w-full flex bg-[#1e1e1e] text-[#cccccc]">
      {/* VSCode-style Explorer Sidebar */}
      <div className="w-64 bg-[#252526] border-r border-[#2d2d30] flex flex-col">
        {/* Explorer Header */}
        <div className="px-3 py-2 border-b border-[#2d2d30] bg-[#2d2d30]">
          <div className="flex items-center text-xs font-semibold text-[#cccccc] uppercase tracking-wide">
            <ChevronDown className="h-3 w-3 mr-1" />
            Explorer
          </div>
        </div>

        {/* Project Section */}
        <div className="flex-1">
          <div className="px-2 py-1 bg-[#37373d] border-b border-[#2d2d30]">
            <div className="flex items-center text-xs font-medium text-[#cccccc] py-1">
              <ChevronDown className="h-3 w-3 mr-1" />
              <Folder className="h-3 w-3 mr-2 text-[#dcb67a]" />
              PROJECT
            </div>
          </div>

          {/* File List */}
          <div className="px-2 py-1">
            {files.length === 0 ? (
              <div className="text-center py-8 px-4">
                <div className="w-12 h-12 bg-[#37373d] rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Folder className="h-6 w-6 text-[#dcb67a]" />
                </div>
                <p className="text-[#969696] text-xs">No files in this workspace</p>
              </div>
            ) : (
              <div className="space-y-0">
                {files.map((file, index) => (
                  <button
                    key={index}
                    onClick={() => handleFileSelect(file)}
                    className={`w-full flex items-center px-2 py-1 text-left text-sm hover:bg-[#2a2d2e] transition-colors duration-150 ${
                      selectedFile?.filename === file.filename 
                        ? 'bg-[#37373d] text-white' 
                        : 'text-[#cccccc]'
                    }`}
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="mr-2 flex-shrink-0">
                        {getFileIcon(file.filename)}
                      </div>
                      <span className="truncate font-normal">
                        {file.filename}
                      </span>
                    </div>
                    {selectedFile?.filename === file.filename && (
                      <div className="w-1 h-4 bg-[#4ADE80] ml-2 flex-shrink-0"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VSCode-style Editor Area */}
      <div className="flex-1 flex flex-col bg-[#1e1e1e]">
        {selectedFile ? (
          <>
            {/* Tab Bar */}
            <div className="bg-[#2d2d30] border-b border-[#2d2d30] px-0">
              <div className="flex">
                <div className="flex items-center px-4 py-2 bg-[#1e1e1e] border-r border-[#2d2d30] text-sm text-white min-w-0">
                  <div className="mr-2 flex-shrink-0">
                    {getFileIcon(selectedFile.filename)}
                  </div>
                  <span className="truncate">{selectedFile.filename}</span>
                  <div className="w-1 h-1 bg-white rounded-full ml-2 opacity-60"></div>
                </div>
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 bg-[#1e1e1e] relative overflow-hidden ">
              {/* Line numbers and content container */}
              <div className="flex h-full w-full">
                {/* Line Numbers */}
                <div className="bg-[#1e1e1e] text-[#858585] text-xs font-mono leading-6 px-3 py-4 select-none border-r border-[#2d2d30] min-w-[50px] text-right flex-shrink-0 ">
                  {selectedFile.content?.split('\n').map((_, index) => (
                    <div key={index + 1} className="h-6">
                      {index + 1}
                    </div>
                  ))}
                </div>
                
                {/* Code Content */}
                <div className="flex-1 bg-[#1e1e1e] overflow-auto">
                  <pre className="p-4 text-[#d4d4d4] text-sm font-mono leading-6 whitespace-pre-wrap break-words bg-[#1e1e1e] min-h-full">
                    {selectedFile.content}
                  </pre>
                </div>
              </div>

              {/* Premium glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#007acc]/5 pointer-events-none"></div>
            </div>

            {/* Status Bar */}
            <div className="bg-[#4ADE80] text-black text-xs px-4 py-1 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span>UTF-8</span>
                <span>LF</span>
                <span>{selectedFile.filename.split('.').pop()?.toUpperCase() || 'Plain Text'}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>Ln 1, Col 1</span>
                <span>{selectedFile.content?.length || 0} chars</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#1e1e1e]">
            <div className="text-center max-w-md px-8">
              <div className="w-16 h-16 bg-[#37373d] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Code className="h-8 w-8 text-[#007acc]" />
              </div>
              <h3 className="text-[#cccccc] text-xl font-semibold mb-3">Welcome to the Editor</h3>
              <p className="text-[#969696] leading-relaxed text-sm">
                Select a file from the Explorer to start viewing and editing. Your workspace files will appear in the sidebar.
              </p>
              <div className="mt-6 text-xs text-[#858585]">
                <div className="flex items-center justify-center space-x-4">
                  <span>⌘N New File</span>
                  <span>⌘O Open File</span>
                  <span>⌘S Save</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileManager;