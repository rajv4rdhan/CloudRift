import { Navigate } from "react-router-dom"

// This is a simple mock authentication check
// In a real app, you would check if the user is authenticated
const isAuthenticated = () => {
  // For demo purposes, we'll assume the user is authenticated
  return true
}

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />
  }

  return children
}

