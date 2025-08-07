import React, { useState } from 'react';
import { File, Code, FileText, Folder, ChevronDown } from 'lucide-react';
import Editor from '@monaco-editor/react';

// --- Sample Data ---
// In a real app, this would come from your API via props.
const initialFiles = [
  {
    filename: 'index.html',
    content: `<!DOCTYPE html>
<html>
  <head>
    <title>My Awesome Site</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Welcome!</h1>
    <script src="script.js"></script>
  </body>
</html>`,
  },
  {
    filename: 'style.css',
    content: `body {
  font-family: sans-serif;
  background-color: #f0f0f0;
}`,
  },
  {
    filename: 'script.js',
    content: `// Simple alert to show JS is working
document.addEventListener('DOMContentLoaded', () => {
  console.log('Page loaded and script is running!');
});`,
  },
];

// --- Main FileManager Component ---
const FileManager = () => {
  // Use state to manage the files and the currently selected file
  const [files] = useState(initialFiles);
  const [selectedFile, setSelectedFile] = useState(initialFiles[0]);

  /**
   * Returns the appropriate file icon based on the filename extension.
   * @param {string} filename - The name of the file.
   * @returns {React.ReactNode} A Lucide icon component.
   */
  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop();
    switch (extension) {
      case 'html':
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

  /**
   * Handles the selection of a file from the sidebar.
   * @param {object} file - The file object that was clicked.
   */
  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  /**
   * Gets the language for the Monaco Editor from the filename.
   * @param {string} filename - The name of the file.
   * @returns {string} The language identifier (e.g., 'javascript', 'css').
   */
  const getLanguageFromExtension = (filename) => {
    const extension = filename.split('.').pop();
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'jsx':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'tsx':
        return 'typescript';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'plaintext';
    }
  };


  return (
    <div className="h-screen w-full flex bg-[#1e1e1e] text-[#cccccc] font-sans">
      {/* --- VSCode-style Explorer Sidebar --- */}
      <div className="w-64 bg-[#252526] border-r border-[#333333] flex flex-col flex-shrink-0">
        {/* Explorer Header */}
        <div className="px-3 py-2 border-b border-[#333333]">
          <div className="flex items-center text-xs font-semibold text-[#cccccc] uppercase tracking-wide">
            <ChevronDown className="h-4 w-4 mr-1" />
            Explorer
          </div>
        </div>

        {/* Project Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-2 py-1">
            <div className="flex items-center text-sm font-medium text-[#cccccc] py-1 cursor-pointer">
              <ChevronDown className="h-4 w-4 mr-1" />
              <Folder className="h-4 w-4 mr-2 text-yellow-500" />
              PROJECT
            </div>
          </div>

          {/* File List */}
          <div className="px-4 py-1">
            {files.length === 0 ? (
              <div className="text-center py-8 px-4">
                <p className="text-[#969696] text-xs">No files in workspace</p>
              </div>
            ) : (
              <div className="space-y-0.5">
                {files.map((file) => (
                  <button
                    key={file.filename}
                    onClick={() => handleFileSelect(file)}
                    className={`w-full flex items-center pl-4 pr-2 py-1 text-left text-sm rounded-sm transition-colors duration-150 ${
                      selectedFile?.filename === file.filename
                        ? 'bg-[#37373d] text-white'
                        : 'text-[#cccccc] hover:bg-[#2a2d2e]'
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
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- VSCode-style Editor Area --- */}
      <div className="flex-1 flex flex-col bg-[#1e1e1e]">
        {selectedFile ? (
          <>
            {/* Editor Tabs */}
            <div className="bg-[#252526] border-b border-[#333333] flex-shrink-0">
               <div className="flex items-center px-4 py-2 bg-[#1e1e1e] text-sm text-white min-w-0 border-r border-transparent w-fit">
                  <div className="mr-2 flex-shrink-0">
                    {getFileIcon(selectedFile.filename)}
                  </div>
                  <span className="truncate">{selectedFile.filename}</span>
                </div>
            </div>
            
            {/* Monaco Editor Component */}
            <div className="flex-grow h-full">
              <Editor
                height="100%"
                width="100%"
                theme="vs-dark"
                language={getLanguageFromExtension(selectedFile.filename)}
                value={selectedFile.content}
                options={{
                  readOnly: true, // This makes it a viewer
                  domReadOnly: true,
                  minimap: { enabled: true },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  contextmenu: false, // Hides the right-click menu
                  padding: {
                    top: 16,
                    bottom: 16
                  },
                }}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#1e1e1e]">
            <div className="text-center">
              <Code className="h-12 w-12 text-[#007acc] mx-auto mb-4" />
              <h3 className="text-[#cccccc] text-lg font-medium">Welcome to the Editor</h3>
              <p className="text-[#969696] text-sm mt-2">
                Select a file from the explorer to view its content.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileManager;
