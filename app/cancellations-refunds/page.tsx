"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CancellationsRefunds() {
  return (
    <div className="min-h-screen bg-black text-slate-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center text-[#16b67e] hover:text-[#16b67e]/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          Cancellations & <span className="text-[#16b67e]">Refunds</span>
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <div className="p-6 bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-xl">
              <p className="text-lg leading-relaxed">
                All fees paid to Trade Cartel for any trading-related courses, programs, or services are strictly non-refundable under any circumstances. Once a student enrolls and makes the payment—whether partial or full—the fee is considered final and cannot be reversed, cancelled, or transferred. If a student fails to complete the full payment within the stipulated timeline, Trade Cartel reserves the right to suspend or terminate access to classes, course materials, or community groups without any obligation to provide a refund or compensation. By enrolling with Trade Cartel, students acknowledge and agree to this policy in full.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Contact Us
            </h2>
            <p>
              If you have any questions about our cancellation and refund policy, please contact us at:
            </p>
            <div className="mt-4 p-6 bg-slate-900/50 border border-[#16b67e]/20 rounded-xl">
              <p className="mb-2">
                <strong className="text-white">Email:</strong>{" "}
                support@tradecartel.com
              </p>
              <p className="mb-2">
                <strong className="text-white">Phone:</strong> +91 7726969864
              </p>
              <p>
                <strong className="text-white">Address:</strong> Elevana Consultancy Private Limited,
                8th Floor, Tower A, 8th floor, Baharampur Naya, Sector 61,
                Gurugram, Ghata, Haryana 122098
              </p>
            </div>
          </section>

          <p className="text-sm text-gray-500 mt-12 pt-8 border-t border-slate-800">
            Last Updated: December 2025
          </p>
        </div>
      </div>
    </div>
  );
}
