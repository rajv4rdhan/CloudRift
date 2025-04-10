"use client"

import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${VITE_API_URL}/api/auth/getDetail`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok && data.valid) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] p-6">
        <div className="w-full max-w-md p-8 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] shadow-lg">
          <div className="flex items-center justify-center mb-6">
            {/* Animated logo placeholder */}
            <div className="h-12 w-12 relative">
              <div className="absolute inset-0 bg-[#4ADE80] rounded-lg opacity-20 animate-pulse"></div>
              <div className="absolute inset-2 bg-[#4ADE80] rounded-md"></div>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">Authenticating</h3>
            <p className="text-[#B0B0B0]">Please wait while we verify your credentials</p>
          </div>
          
          <div className="flex justify-center items-center">
            <div className="relative h-2 w-full bg-[#2A2A2A] rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#4ADE80] to-[#3AC070] rounded-full animate-loading"></div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes loading {
            0% {
              width: 0%;
              left: 0;
            }
            50% {
              width: 30%;
            }
            70% {
              width: 70%;
            }
            80% {
              left: 0;
            }
            95% {
              left: 100%;
            }
            100% {
              left: 100%;
            }
          }
          .animate-loading {
            animation: loading 2s ease-in-out infinite;
          }
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 0.2;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}