"use client";

import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string;
  amount: number;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  onClose,
  paymentId,
  amount,
  autoClose = true,
  autoCloseDelay = 5000
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      console.log('⏱️ Setting auto-close timer for', autoCloseDelay, 'ms');
      const timer = setTimeout(() => {
        console.log('⏱️ Auto-closing modal now');
        onClose();
      }, autoCloseDelay);

      return () => {
        console.log('⏱️ Clearing timer');
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, autoClose, autoCloseDelay]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-br from-emerald-900/90 to-emerald-950/90 border-2 border-emerald-500/50 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-300">
        
        {/* Success Icon */}
        <div className="flex flex-col items-center justify-center p-8 pt-12">
          <div className="relative mb-6">
            {/* Animated rings */}
            <div className="absolute inset-0 animate-ping">
              <div className="w-20 h-20 bg-green-500/30 rounded-full"></div>
            </div>
            <div className="relative w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
              <Check size={40} className="text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
          <p className="text-green-200 text-center mb-6">
            Your payment has been processed successfully
          </p>

          {/* Payment Details */}
          <div className="w-full bg-black/30 rounded-xl p-4 space-y-2 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Amount Paid:</span>
              <span className="text-white font-bold text-lg">₹{amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Payment ID:</span>
              <span className="text-green-300 font-mono text-xs">{paymentId}</span>
            </div>
          </div>

          {/* Auto-close notice */}
          {autoClose && (
            <p className="text-xs text-green-300/70 text-center">
              This will close automatically in {autoCloseDelay / 1000} seconds
            </p>
          )}

          {/* Manual close button */}
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;



// ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHg298gPpeaR/Ph5LXYsXVP35ZjeFIO4Q1KNQQLlEQxm vipinpal7060@gmail.com
