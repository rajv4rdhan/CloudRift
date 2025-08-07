// Demo token setter - for testing purposes only
// In production, this would be handled through proper authentication flow

export const setDemoToken = () => {
  // Set a demo token for testing API calls
  // Replace this with actual token from your authentication system
  const demoToken = 'your-demo-token-here';
  localStorage.setItem('token', demoToken);
  console.log('Demo token set for API testing');
};

export const clearDemoToken = () => {
  localStorage.removeItem('token');
  console.log('Demo token cleared');
};

// Auto-set demo token for development
if (import.meta.env.DEV) {
  setDemoToken();
}
