import React, { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import {
  AiOutlineClose,
  AiOutlineQrcode,
  AiOutlineCreditCard,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { FaGooglePay, FaAmazonPay } from "react-icons/fa";
import { SiPhonepe, SiPaytm } from "react-icons/si";

// UPI apps configuration
const upiApps = [
  {
    name: "G Pay",
    icon: <FaGooglePay className="text-xl text-blue-600" />,
    id: "gpay",
  },
  {
    name: "PhonePe",
    icon: <SiPhonepe className="text-xl text-purple-600" />,
    id: "phonepe",
  },
  {
    name: "Paytm",
    icon: <SiPaytm className="text-xl text-blue-400" />,
    id: "paytm",
  },
  {
    name: "Amazon Pay",
    icon: <FaAmazonPay className="text-xl text-orange-500" />,
    id: "amazon",
  },
];

// Deep link schemes for different apps
const upiBaseLinks = {
  gpay: "tez://upi/pay",
  phonepe: "phonepe://upi/pay",
  paytm: "paytmmp://pay",
  amazon: "amazonpay://pay",
  default: "upi://pay",
};

// Detect mobile device
const isMobileDevice = () => /Mobi|Android/i.test(navigator.userAgent);

const PaymentPopup = ({ amount, note, onClose }) => {
  const upiId = import.meta.env.VITE_UPI_ID;
  const upiName = import.meta.env.VITE_UPI_NAME;

  const encodedUPI = encodeURIComponent(upiId);
  const encodedName = encodeURIComponent(upiName);
  const encodedAmount = encodeURIComponent(amount);
  const encodedNote = encodeURIComponent(note);

  const genericUpiUrl = `upi://pay?pa=${encodedUPI}&pn=${encodedName}&am=${encodedAmount}&tn=${encodedNote}&cu=INR`;

  const isMobile = isMobileDevice();
  const [showGenericUpi, setShowGenericUpi] = useState(false);
  const [showQR, setShowQR] = useState(true);

  // Handle app-specific UPI open
  const handleUPIClick = (appId = "default") => {
    if (!isMobile) return;

    const baseUrl = upiBaseLinks[appId] || upiBaseLinks.default;
    const upiUrl = `${baseUrl}?pa=${encodedUPI}&pn=${encodedName}&am=${encodedAmount}&tn=${encodedNote}&cu=INR`;

    // Try to open specific UPI app
    window.location.href = upiUrl;

    // Fallback to generic UPI if app not installed
    setTimeout(() => {
      window.location.href = genericUpiUrl;
    }, 1500);
  };

  // Copy UPI ID
  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    alert("UPI ID copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white/80 backdrop-blur-md border border-white/50 p-6 rounded-2xl flex flex-col items-center space-y-5 max-w-sm w-full shadow-2xl text-gray-900 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full text-gray-600 hover:bg-white/20 transition"
        >
          <AiOutlineClose className="text-lg" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold uppercase tracking-wider">
          Pay with UPI
        </h2>
        <div className="text-3xl font-extrabold text-gray-800">
          ₹ {parseFloat(amount).toFixed(2)}
        </div>

        {/* --- MOBILE VIEW --- */}
        {isMobile ? (
          <div className="w-full space-y-4">
            {!showGenericUpi ? (
              <>
                <p className="text-gray-600 text-sm text-center">
                  Continue with a direct link:
                </p>
                <div className="flex justify-center space-x-3">
                  {upiApps.map((app) => (
                    <motion.button
                      key={app.id}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleUPIClick(app.id)}
                      className="flex flex-col items-center p-3 bg-white/70 backdrop-blur-sm border border-white/30 w-20 h-20 rounded-xl shadow-lg justify-center transition"
                    >
                      {app.icon}
                      <span className="mt-1 font-semibold text-xs">
                        {app.name}
                      </span>
                    </motion.button>
                  ))}
                </div>

                <button
                  onClick={() => setShowGenericUpi(true)}
                  className="w-full flex items-center justify-center space-x-2 py-2 text-sm text-gray-600 hover:text-gray-900 transition"
                >
                  <span>Use another UPI App</span>
                  <AiOutlineArrowRight />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-gray-600 text-sm text-center mb-3">
                  Tap to open and choose <b>any</b> installed UPI app:
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleUPIClick("default")}
                  className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition"
                >
                  Open UPI Link
                </motion.button>
                <button
                  onClick={() => setShowGenericUpi(false)}
                  className="mt-3 text-sm text-gray-500 hover:text-gray-700 transition"
                >
                  Back to App Links
                </button>
              </div>
            )}
          </div>
        ) : (
          /* --- DESKTOP VIEW --- */
          <div className="w-full space-y-4">
            <div className="flex justify-center space-x-3 rounded-xl bg-white/70 backdrop-blur-md p-2">
              <button
                onClick={() => setShowQR(true)}
                className={`flex items-center space-x-2 px-3 py-1.5 text-sm rounded-md transition ${
                  showQR
                    ? "bg-white text-gray-900 font-semibold"
                    : "text-gray-600 hover:bg-white/30"
                }`}
              >
                <AiOutlineQrcode />
                <span>QR Code</span>
              </button>
              <button
                onClick={() => setShowQR(false)}
                className={`flex items-center space-x-2 px-3 py-1.5 text-sm rounded-md transition ${
                  !showQR
                    ? "bg-white text-gray-900 font-semibold"
                    : "text-gray-600 hover:bg-white/30"
                }`}
              >
                <AiOutlineCreditCard />
                <span>UPI ID</span>
              </button>
            </div>

            {showQR ? (
              <div className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-md rounded-xl">
                <p className="mb-3 text-gray-800 text-sm font-medium">
                  Scan this QR code
                </p>
                <QRCodeCanvas
                  value={genericUpiUrl}
                  size={180}
                  fgColor="#000000"
                  level="H"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-md rounded-xl">
                <p className="mb-2 text-gray-600 text-sm font-medium">
                  Copy UPI ID:
                </p>
                <div className="flex w-full mt-2">
                  <input
                    type="text"
                    readOnly
                    value={upiId}
                    className="flex-grow p-3 text-sm font-mono bg-white/70 border border-white/30 rounded-l-lg focus:outline-none"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 py-3 bg-green-600 text-white text-sm font-semibold rounded-r-lg hover:bg-green-500 transition"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="mt-2 w-full py-2 bg-white/60 text-gray-700 font-semibold rounded-lg hover:bg-white/80 transition"
        >
          Cancel
        </button>
      </motion.div>
    </motion.div>
  );
};

export default PaymentPopup;
