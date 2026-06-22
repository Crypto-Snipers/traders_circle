"use client";

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (paymentId: string, amount: number) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Check if Razorpay key is loaded
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      console.log('🔑 Razorpay Key loaded:', razorpayKey ? 'Yes ✅' : 'No ❌');
      console.log('🔑 Key value:', razorpayKey || 'UNDEFINED - Check .env.local and restart server!');
      
      if (!razorpayKey) {
        throw new Error('Razorpay Key not found! Make sure NEXT_PUBLIC_RAZORPAY_KEY_ID is in .env.local and restart the dev server.');
      }

      // 1. Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Are you online?');
      }

      // 2. Create Order
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: selectedAmount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const order = await response.json();

      // 3. Open Razorpay Checkout
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "Traders Marathon",
        description: selectedAmount === 5000 ? "Registration Fee" : "Complete Program Fee",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify payment with backend
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount: order.amount,
                description: selectedAmount === 5000 ? "Registration Fee" : "Complete Program Fee"
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // Payment verified and stored successfully
              onClose();
              onPaymentSuccess(response.razorpay_payment_id, selectedAmount);
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Error verifying payment. Please contact support with your payment ID: ' + response.razorpay_payment_id);
          }
        },
        prefill: {
          name: "", // You could prefill this if you had user data
          email: "",
          contact: ""
        },
        theme: {
          color: "#16b67e" // green-500
        }
      };
      console.log('Razorpay options:', options);
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err: any) {
      console.error("Payment Error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-zinc-900 border border-green-500/20 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Select Payment Plan</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {/* Option 1: Registration */}
          <div 
            onClick={() => setSelectedAmount(5000)}
            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedAmount === 5000 
                ? 'border-green-500 bg-green-500/10' 
                : 'border-white/10 hover:border-white/20 bg-white/5'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Registration</h3>
                <p className="text-sm text-gray-400">Secure your seat now</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-green-500">₹5,000</span>
              </div>
            </div>
            {selectedAmount === 5000 && (
              <div className="absolute top-3 right-3 text-green-500">
                <Check size={16} strokeWidth={3} />
              </div>
            )}
          </div>

          {/* Option 2: Complete */}
          <div 
            onClick={() => setSelectedAmount(50000)}
            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedAmount === 50000 
                ? 'border-green-500 bg-green-500/10' 
                : 'border-white/10 hover:border-white/20 bg-white/5'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Complete Program</h3>
                <p className="text-sm text-gray-400">Pay full amount upfront</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-green-500">₹50,000</span>
              </div>
            </div>
             {selectedAmount === 50000 && (
              <div className="absolute top-3 right-3 text-green-500">
                <Check size={16} strokeWidth={3} />
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 text-sm text-red-200 bg-red-500/10 border border-red-500/20 rounded-lg">
              {error}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-white/5">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
          >
            {isProcessing ? 'Processing...' : `Pay ₹${selectedAmount.toLocaleString()}`}
          </button>
          <p className="mt-3 text-xs text-center text-gray-500">
            Secured by Razorpay
          </p>
        </div>

      </div>
    </div>
  );
};

export default PaymentModal;

