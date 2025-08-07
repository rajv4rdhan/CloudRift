// Auth utility functions for token management
export const authUtils = {
  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Set token in localStorage
  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  // Remove token from localStorage
  removeToken: () => {
    localStorage.removeItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Get user info from token (if JWT)
  getUserFromToken: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      // Simple base64 decode - in production, use a proper JWT library
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  },
};

export default authUtils;
