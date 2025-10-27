import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4 font-sans overflow-hidden">
      <div className="flex flex-col items-center space-y-8 w-full max-w-lg text-center">
        {/* Error Code */}
        <div className="space-y-2">
          <h1 className="text-7xl md:text-8xl font-extrabold text-gray-800 tracking-tight">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-800">Page Not Found</h2>
          <p className="text-gray-600 text-md max-w-sm">
            Oops! The page you were looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 justify-center pt-4">
          <Link
            to='/pay'
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
