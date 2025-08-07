# API Integration Documentation

## Overview
This project now includes React Query integration for managing API state and communication with the backend chat service.

## Features Implemented

### 1. React Query Setup
- **QueryClient**: Configured with retry and caching options
- **Provider**: Wrapped around the app with devtools for debugging
- **Hooks**: Custom hooks for each API endpoint

### 2. API Endpoints Integrated

#### Chat Sessions
- `GET /api/model/chat/session` - Get all chat sessions
- `POST /api/model/chat/session` - Create new chat session

#### Chat Management  
- `GET /api/model/chat/history/<sessionId>` - Get chat history
- `POST /api/model/chat/<sessionId>` - Send message to chat

### 3. Components Created

#### SessionSelector
- Displays list of chat sessions
- Create new sessions with project names
- Select active session for chatting

#### FileManager
- Displays generated files from API responses
- File type icons (HTML, CSS, JS)
- File selection and content viewing

#### Updated AIGeneratePage
- Real-time chat with API integration
- File management and code viewing
- Session-based conversations
- Live preview of HTML files

### 4. Key Features

#### Smart File Management
- **Auto-update**: Files update when API returns new/modified files
- **File Detection**: Automatically detects file types for proper syntax highlighting
- **Download Support**: Download individual files
- **Copy Support**: Copy file contents to clipboard

#### Session Management
- **Persistent Sessions**: Sessions are cached and persist between page reloads
- **Project-based**: Each session is tied to a specific project name
- **Real-time Updates**: Chat history updates in real-time

#### Error Handling
- **Toast Notifications**: User-friendly error and success messages
- **Retry Logic**: Automatic retry for failed requests
- **Loading States**: Proper loading indicators throughout the UI

## Configuration

### Base URL
The API base URL is set to `http://localhost:3000` in `src/utils/api.js`.

### Authentication
The app automatically includes Bearer tokens from localStorage in API requests.

### Development Setup
For development, a demo token is automatically set. Update `src/utils/demoAuth.js` with your actual token.

## Usage

1. **Start the development server**: `npm run dev`
2. **Navigate to AI Generate page**
3. **Create a new session** by clicking the + button and entering a project name
4. **Start chatting** with the AI to generate code
5. **View generated files** in the Files tab
6. **Preview HTML files** in the Preview tab

## File Structure
```
src/
├── hooks/
│   └── useChatAPI.js          # React Query hooks for API calls
├── utils/
│   ├── api.js                 # Axios configuration and API calls
│   ├── auth.js                # Authentication utilities
│   └── demoAuth.js            # Demo token setup for development
├── components/
│   ├── SessionSelector.jsx    # Chat session management
│   └── FileManager.jsx        # File viewing and management
└── pages/
    └── AIGeneratePage.jsx     # Updated main page with API integration
```

## API Response Handling

### Chat History Response
The app handles the nested structure from the API:
```json
{
  "_id": "sessionId",
  "chat": [
    {
      "user": "user message",
      "system": "AI response"
    }
  ],
  "files": {
    "file": [
      {
        "filename": "index.html",
        "content": "<!DOCTYPE html>..."
      }
    ]
  }
}
```

### Send Message Response
Handles file updates and additions:
```json
{
  "sessionId": "sessionId",
  "message": "AI response message",
  "files": [...],
  "filesCount": 3
}
```

## Next Steps

1. **Replace demo token** with actual authentication
2. **Add file editing capabilities**
3. **Implement file upload/import**
4. **Add project deployment features**
5. **Enhance error handling and retry logic**
