import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LucideClock, LucideCircleCheck, LucideCircleX } from "lucide-react";

const PaymentPending = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Receive state from previous page
  const { amount, note, mobile, app } = location.state || {
    amount: 0,
    note: "-",
    mobile: "-",
    app: "-",
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-8 max-w-md w-full"
      >
        {/* Clock Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="text-blue-500 w-24 h-24 flex justify-center items-center"
          >
            <LucideClock size={96} />
          </motion.div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 text-blue-600 text-center">
          Payment Initiated
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Complete the payment in your UPI app, then confirm below
        </p>

        {/* Payment Details Card */}
        <div className="space-y-4 mb-8 p-6 bg-white rounded-xl border border-gray-200 text-gray-900">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Amount</span>
            <span className="text-xl font-bold text-blue-600">₹{amount}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-sm text-gray-500">Note</span>
            <span className="text-sm font-medium text-right">{note}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Mobile</span>
            <span className="text-sm font-medium">{mobile}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Payment App</span>
            <span className="text-sm font-medium capitalize">{app}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500 mb-2 text-center">
            Did you complete the payment successfully?
          </p>
          <button
            onClick={
              (() => navigate("/success"), { state: { amount, note, mobile } })
            }
            className="inline-flex items-center justify-center gap-2 w-full px-8 py-3 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md transition"
          >
            <LucideCircleCheck className="w-5 h-5" />
            Payment Successful
          </button>
          <button
            onClick={
              (() => navigate("/failed"), { state: { amount, note, mobile } })
            }
            className="inline-flex items-center justify-center gap-2 w-full px-8 py-3 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md transition"
          >
            <LucideCircleX className="w-5 h-5" />
            Payment Failed
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPending;
