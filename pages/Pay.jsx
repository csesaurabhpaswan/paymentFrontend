import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaymentPopup from "../components/PaymentPopup";
import { motion } from "framer-motion";
import {
  FaMoneyBillAlt,
  FaMobileAlt,
  FaRegComment,
  FaLock,
} from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// InputField Component
const InputField = ({
  label,
  icon: Icon,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center">
        <Icon className="mr-2 text-blue-600" />
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type === "number" ? "text" : type}
        value={value}
        onChange={(e) => {
          let val = e.target.value;
          if (type === "number") {
            val = val.replace(/[^0-9.]/g, "");
            if (val.split(".").length > 2) val = val.slice(0, -1);
          } else if (type === "tel") {
            val = val.replace(/[^0-9]/g, "").slice(0, 10);
          }
          onChange({ target: { value: val } });
        }}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full p-3 border-2 rounded-lg text-gray-800 focus:outline-none bg-white placeholder-gray-400 transition-all duration-150
          border-gray-300
          focus:border-blue-600 focus:shadow-[0_0_0_1px_#2563eb]
          ${disabled ? "bg-gray-100 cursor-not-allowed text-gray-400" : ""}`}
      />
    </div>
  );
};

const Pay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [mobile, setMobile] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 600));
        const data = {
          amount: "120.00",
          note: "Order Ref #2024",
          mobile: "9876543210",
        };
        setAmount(data.amount);
        setNote(data.note);
        setMobile(data.mobile);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [id]);

  const isValidMobile = (num) => /^[0-9]{10}$/.test(num);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid payment amount!");
      return;
    }
    if (!mobile || !isValidMobile(mobile)) {
      alert("Please enter a valid 10-digit mobile number!");
      return;
    }
    setShowPopup(true);
  };

  // Auto-format amount to 2 decimals
  useEffect(() => {
    if (amount && !isNaN(amount)) {
      const formatted = parseFloat(amount).toFixed(2);
      setAmount(formatted);
    }
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center p-8 font-sans relative overflow-hidden bg-gray-100">
      {/* Background Bubbles */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white p-8 md:p-10 shadow-2xl w-full max-w-lg z-10 rounded-xl"
      >
        <div className="text-center mb-10 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Payment Gateway
          </h1>
          <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
            <FaLock className="mr-2 text-green-600" />
            <p>100% Secure Payment Protocol</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-56 space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            >
              <AiOutlineLoading3Quarters className="text-5xl text-blue-600" />
            </motion.div>
            <p className="text-gray-600 font-medium mt-3">
              Loading order details...
            </p>
          </div>
        ) : (
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <InputField
              label="Payment Amount"
              icon={FaMoneyBillAlt}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 120.00"
              required
              disabled={!!id}
            />
            <InputField
              label="Contact Mobile Number"
              icon={FaMobileAlt}
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter 10 digit number"
              required
            />
            <InputField
              label="Transaction Reference / Note"
              icon={FaRegComment}
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional memo or order reference"
            />

            <motion.button
              type="submit"
              whileHover={{
                scale: 1.01,
                boxShadow: "0 10px 20px -5px rgba(37, 99, 235, 0.4)",
              }}
              whileTap={{ scale: 0.99, backgroundColor: "#1d4ed8" }}
              className="mt-8 w-full py-4 bg-blue-600 text-white font-bold rounded-lg shadow-xl hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg tracking-wide"
            >
              CONFIRM & PAY ₹{amount || "..."}
            </motion.button>
          </form>
        )}
      </motion.div>

      {showPopup && (
        <PaymentPopup
          amount={amount}
          note={note}
          mobile={mobile}
          onClose={() => setShowPopup(false)}
          onProceed={() =>
            navigate("/pending", { state: { amount, note, mobile } })
          }
        />
      )}
    </div>
  );
};

export default Pay;
