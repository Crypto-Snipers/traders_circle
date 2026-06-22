"use client";
import { useEffect } from "react";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number; // milliseconds
}

export default function ThankYouModal({
  isOpen,
  onClose,
  autoClose = false,
  autoCloseDelay = 500000000,
}: ThankYouModalProps) {
  // auto-close feature
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 rounded-2xl">
      <div className="bg-black/95 border border-green-500/20 backdrop-blur-xl rounded-lg shadow-xl max-w-lg w-full mx-4 pt-8 text-center relative">
        <h2 className="text-xl font-semibold text-white mb-3">
          Thank You For Contacting Us!
        </h2>
        <p className="text-gray-300 text-sm md:text-sm">
          Our team will reach out to you shortly. In the
          meantime, feel free to browse our website for the latest updates.
        </p>

        {/* Decorative Gradient Bar */}
        <div className="h-8 w-full rounded-b-lg mt-6 bg-gradient-to-r from-emerald-600 to-emerald-500"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
      </div>
    </div>
  );
}


