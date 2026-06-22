"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
          Privacy <span className="text-[#16b67e]">Policy</span>
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to Trade Cartel. We respect your privacy and are committed
              to protecting your personal data. This privacy policy will inform
              you as to how we look after your personal data when you visit our
              website and tell you about your privacy rights and how the law
              protects you.
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
              4. Information We Collect
            </h2>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Identity Data:</strong> includes first name, last name,
                username or similar identifier.
              </li>
              <li>
                <strong>Contact Data:</strong> includes email address and
                telephone numbers.
              </li>
              <li>
                <strong>Technical Data:</strong> includes internet protocol (IP)
                address, your login data, browser type and version, time zone
                setting and location, browser plug-in types and versions,
                operating system and platform and other technology on the
                devices you use to access this website.
              </li>
              <li>
                <strong>Usage Data:</strong> includes information about how you
                use our website, products and services.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. How We Use Your Personal Data
            </h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Where we need to perform the contract we are about to enter into
                or have entered into with you.
              </li>
              <li>
                Where it is necessary for our legitimate interests (or those of
                a third party) and your interests and fundamental rights do not
                override those interests.
              </li>
              <li>
                Where we need to comply with a legal or regulatory obligation.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Data Security
            </h2>
            <p>
              We have put in place appropriate security measures to prevent your
              personal data from being accidentally lost, used or accessed in an
              unauthorized way, altered or disclosed. In addition, we limit
              access to your personal data to those employees, agents,
              contractors and other third parties who have a business need to
              know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Contact Us
            </h2>
            <p>
              If you have any questions about this privacy policy or our privacy
              practices, please contact us at:
            </p>
            <div className="mt-4 p-6 bg-slate-900/50 border border-[#16b67e]/20 rounded-xl">
              <p className="mb-2">
                <strong className="text-white">Email:</strong>{" "}
                admissions@aspirenowglobal.com
              </p>
              <p className="mb-2">
                <strong className="text-white">Phone:</strong> +91 9266400402
              </p>
              <p>
                <strong className="text-white">Address:</strong> ERA CASA
                PICASSO, Tower A, 8th floor, Baharampur Naya, Sector 61,
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
