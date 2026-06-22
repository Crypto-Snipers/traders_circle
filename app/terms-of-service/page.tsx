"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
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
          Terms of <span className="text-[#16b67e]">Service</span>
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using the website of Trade Cartel, you accept and
              agree to be bound by the terms and provision of this agreement. In
              addition, when using these particular services, you shall be
              subject to any posted guidelines or rules applicable to such
              services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Educational Services Disclaimer
            </h2>
            <div className="p-6 bg-gradient-to-br from-[#16b67e]/10 to-[#16b67e]/5 border border-[#16b67e]/30 rounded-xl">
              <p className="mb-4">
                The content provided by Trade Cartel is intended solely for educational and informational purposes and should not be interpreted as financial advice. Trading in financial markets carries significant risk and may not be suitable for all individuals. We strongly recommend that you evaluate your investment objectives, experience level, and risk tolerance before engaging in any trading activities.
              </p>
              <p className="font-semibold text-white">
                Please note that all fees paid are non-refundable. In the event that the full course fee is not paid, Trade Cartel reserves the right to terminate your classes without any obligation to issue a refund.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Refund & Cancellation Policy
            </h2>
            <div className="p-6 bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-xl">
              <p>
                All fees paid to Trade Cartel for any trading-related courses, programs, or services are strictly non-refundable under any circumstances. Once a student enrolls and makes the payment—whether partial or full—the fee is considered final and cannot be reversed, cancelled, or transferred. If a student fails to complete the full payment within the stipulated timeline, Trade Cartel reserves the right to suspend or terminate access to classes, course materials, or community groups without any obligation to provide a refund or compensation. By enrolling with Trade Cartel, students acknowledge and agree to this policy in full.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Risk Disclosure
            </h2>
            <p className="mb-4">
              <strong>
                Trading involves substantial risk of loss and is not suitable
                for every investor.
              </strong>{" "}
              The valuation of futures, stocks and options may fluctuate, and,
              as a result, clients may lose more than their original investment.
              The impact of seasonal and geopolitical events is already factored
              into market prices.
            </p>
            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
              Past performance is not indicative of future results. No
              representation is being made that any account will or is likely to
              achieve profits or losses similar to those shown.
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Intellectual Property
            </h2>
            <p>
              All content included on this site, such as text, graphics, logos,
              button icons, images, audio clips, digital downloads, data
              compilations, and software, is the property of Trade Cartel or its
              content suppliers and protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. User Conduct
            </h2>
            <p>
              You agree to use the website only for lawful purposes. You agree
              not to take any action that might compromise the security of the
              website, render the website inaccessible to others or otherwise
              cause damage to the website or the Content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Limitation of Liability
            </h2>
            <p>
              Trade Cartel shall not be liable for any direct, indirect,
              incidental, special, consequential or exemplary damages, including
              but not limited to, damages for loss of profits, goodwill, use,
              data or other intangible losses resulting from the use of or
              inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Changes to Terms
            </h2>
            <p>
              Trade Cartel reserves the right to update or modify these Terms of
              Service at any time without prior notice. Your use of the website
              following any such change constitutes your agreement to follow and
              be bound by the Terms of Service as changed.
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-12 pt-8 border-t border-slate-800">
            Last Updated: December 2025
          </p>
        </div>
      </div>
    </div>
  );
}
