import React, { useState, useEffect, useRef } from 'react';
import { File, Code, FileText, Folder, ChevronRight, ChevronDown } from 'lucide-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'; // Dark theme for highlighting


const FileManager = ({ files = [], selectedFile, onFileSelect }) => {
  // Ref for the code block to apply highlighting
  const codeRef = useRef(null);
  // State to hold formatted content
  const [formattedContent, setFormattedContent] = useState('');

  // Simple code formatter function
  const formatCode = (content, fileExtension) => {
    if (!content) return '';

    try {
      switch (fileExtension) {
        case 'html':
        case 'htm':
          return formatHTML(content);
        case 'css':
          return formatCSS(content);
        case 'js':
        case 'jsx':
          return formatJavaScript(content);
        case 'json':
          return formatJSON(content);
        default:
          return content;
      }
    } catch (error) {
      console.error('Formatting error:', error);
      return content; // Return original content if formatting fails
    }
  };

  // HTML formatter
  const formatHTML = (html) => {
    let formatted = html;
    let indent = 0;
    const indentStr = '  '; // 2 spaces

    // Remove existing formatting
    formatted = formatted.replace(/>\s*</g, '><');
    
    // Add line breaks and indentation
    formatted = formatted.replace(/(<[^>]+>)/g, (match, tag) => {
      if (tag.includes('</')) {
        indent--;
        return '\n' + indentStr.repeat(Math.max(0, indent)) + tag;
      } else if (tag.includes('/>')) {
        return '\n' + indentStr.repeat(indent) + tag;
      } else {
        const result = '\n' + indentStr.repeat(indent) + tag;
        indent++;
        return result;
      }
    });

    return formatted.trim();
  };

  // CSS formatter
  const formatCSS = (css) => {
    let formatted = css;
    
    // Add line breaks after { and }
    formatted = formatted.replace(/\{/g, ' {\n  ');
    formatted = formatted.replace(/\}/g, '\n}\n');
    formatted = formatted.replace(/;/g, ';\n  ');
    
    // Clean up extra spaces and line breaks
    formatted = formatted.replace(/\n\s*\n/g, '\n');
    formatted = formatted.replace(/  \n}/g, '\n}');
    
    return formatted.trim();
  };

  // JavaScript formatter
  const formatJavaScript = (js) => {
    let formatted = js;
    let indent = 0;
    const indentStr = '  ';

    // Add line breaks after { and }
    formatted = formatted.replace(/\{/g, ' {\n');
    formatted = formatted.replace(/\}/g, '\n}\n');
    formatted = formatted.replace(/;/g, ';\n');
    
    // Split into lines and add proper indentation
    const lines = formatted.split('\n');
    const formattedLines = lines.map(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return '';
      
      if (trimmedLine.includes('}')) {
        indent = Math.max(0, indent - 1);
      }
      
      const result = indentStr.repeat(indent) + trimmedLine;
      
      if (trimmedLine.includes('{')) {
        indent++;
      }
      
      return result;
    });

    return formattedLines.join('\n').trim();
  };

  // JSON formatter
  const formatJSON = (json) => {
    try {
      const parsed = JSON.parse(json);
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      return json; // Return original if parsing fails
    }
  };

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

  // Effect to format code and apply syntax highlighting when selected file changes
  useEffect(() => {
    if (selectedFile?.content) {
      const fileExtension = selectedFile.filename.split('.').pop();
      const formatted = formatCode(selectedFile.content, fileExtension);
      setFormattedContent(formatted);
    } else {
      setFormattedContent('');
    }
  }, [selectedFile]);

  // Effect to apply syntax highlighting when formatted content changes
  useEffect(() => {
    if (codeRef.current && formattedContent) {
      // Remove existing highlighting
      codeRef.current.removeAttribute('data-highlighted');
      // Apply new highlighting
      hljs.highlightElement(codeRef.current);
    }
  }, [formattedContent]);


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
                {/* Code Content with integrated line numbers */}
                <div className="flex-1 bg-[#1e1e1e] overflow-auto">
                  <div className="flex">
                    {/* Line Numbers */}
                    <div className="bg-[#1e1e1e] text-[#858585] text-sm font-mono select-none border-r border-[#2d2d30] min-w-[50px] flex-shrink-0 py-4 px-3">
                      {formattedContent.split('\n').map((_, index) => (
                        <div key={index + 1} className="text-right leading-6 h-6">
                          {index + 1}
                        </div>
                      ))}
                    </div>
                    
                    {/* Code Content */}
                    <pre className="flex-1 p-4 text-[#d4d4d4] text-sm font-mono leading-6 whitespace-pre-wrap break-words bg-[#1e1e1e] min-h-full overflow-visible">
                      <code ref={codeRef} className={`language-${selectedFile.filename.split('.').pop()}`}>
                        {formattedContent}
                      </code>
                    </pre>
                  </div>
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
                <span>Ln {formattedContent.split('\n').length}, Col 1</span>
                <span>{formattedContent.length} chars</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#1e1e1e]">
            {/* ... (Welcome message remains the same) ... */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileManager;