import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  XCircle,
  Wallet,
  FileText,
  Smartphone,
  Home,
  RotateCw,
} from "lucide-react"; // Using Lucide React for icons

const Fail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Destructure state with default values to prevent errors if state is null
  const {
    amount = "N/A",
    note = "N/A",
    mobile = "N/A",
    reason = "An unexpected error occurred.",
  } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-orange-100 p-4 font-sans relative overflow-hidden">
      {/* Background elements for visual interest */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col items-center space-y-6 w-full max-w-md z-10 border border-red-100"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: 0.2,
          }}
          className="text-red-500 bg-red-50 rounded-full p-4 shadow-inner"
        >
          <XCircle className="w-16 h-16" strokeWidth={1.5} />
        </motion.div>

        <h1 className="text-3xl font-extrabold text-red-700 tracking-tight text-center">
          Payment Failed
        </h1>

        <p className="text-gray-600 text-center text-sm md:text-base">
          **Reason:** {reason}
          <br />
          Please try the payment again.
        </p>

        <div className="w-full space-y-3 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-gray-700">
            <span className="flex items-center text-lg font-medium">
              <Wallet className="w-5 h-5 mr-2 text-indigo-500" /> Attempted
              Amount
            </span>
            <span className="text-xl font-bold text-red-600">₹{amount}</span>
          </div>
          <div className="flex items-center justify-between text-gray-700">
            <span className="flex items-center text-md">
              <FileText className="w-4 h-4 mr-2 text-purple-500" /> Note
            </span>
            <span className="text-md font-medium text-gray-800">{note}</span>
          </div>
          <div className="flex items-center justify-between text-gray-700">
            <span className="flex items-center text-md">
              <Smartphone className="w-4 h-4 mr-2 text-blue-500" /> Mobile
            </span>
            <span className="text-md font-medium text-gray-800">{mobile}</span>
          </div>
        </div>

        <div className="w-full flex flex-col space-y-3 pt-6">
          <motion.button
            onClick={() => navigate("/pay")} // Navigate back to the payment form
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 15px rgba(239, 68, 68, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-200 text-lg"
          >
            <Link to="/pay" className="flex items-center">
              <RotateCw className="w-5 h-5 mr-2" /> Try Payment Again
            </Link>
          </motion.button>
          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg shadow-sm hover:bg-gray-200 transition-all duration-200 text-md"
          >
            <Link to="/pay" className="flex">
              <Home className="w-5 h-5 mr-2" /> Go to Home
            </Link>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Fail;
