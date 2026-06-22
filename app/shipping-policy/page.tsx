"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/app/components/Footer";

export default function ShippingPolicy() {
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
                    Shipping <span className="text-[#16b67e]">Policy</span>
                </h1>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            1. No Physical Shipping
                        </h2>
                        <p>
                            Trade Cartel does not sell or deliver any physical goods. All
                            services offered on this website are educational services provided
                            in digital form. As a result, no physical shipping, courier
                            services, or postal delivery are applicable to any purchase.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            2. Digital Delivery Method
                        </h2>
                        <p>
                            After successful payment confirmation, all relevant information
                            related to the purchased service is delivered digitally via the
                            email address provided at the time of checkout.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            3. Delivery Timeline
                        </h2>
                        <p>
                            Digital delivery is generally completed immediately or within a
                            few hours after payment confirmation. In certain cases, delivery
                            may take up to 24 hours due to manual verification, scheduling, or
                            operational reasons.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            4. What Is Delivered
                        </h2>
                        <p className="mb-4">
                            Depending on the service purchased, you may receive one or more of
                            the following via email:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                Payment confirmation and transaction receipt.
                            </li>
                            <li>
                                Details related to educational programs, workshops, mentorship
                                sessions, or training services.
                            </li>
                            <li>
                                Schedule, joining instructions, or additional information for
                                live or time-bound sessions (if applicable).
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            5. Shipping & Delivery Charges
                        </h2>
                        <p>
                            Since no physical products are shipped, there are no shipping
                            charges, handling fees, or delivery costs associated with any
                            purchase made on this website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            6. Non-Receipt of Delivery Email
                        </h2>
                        <p>
                            If you do not receive the delivery email within 24 hours of
                            successful payment, please check your spam or junk folder. If the
                            issue persists, you may contact our support team with your payment
                            reference details for assistance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            7. Contact Information
                        </h2>
                        <p>
                            For questions related to digital delivery or payments, please
                            contact us at:
                        </p>
                        <div className="mt-4 p-6 bg-slate-900/50 border border-[#16b67e]/20 rounded-xl">
                            <p className="mb-2">
                                <strong className="text-white">Email:</strong>{" "}
                                support@tradecartel.in
                            </p>
                            <p className="mb-2">
                                <strong className="text-white">Phone:</strong> +91 9266400402
                            </p>
                        </div>
                    </section>

                    <p className="text-sm text-gray-500 mt-12 pt-8 border-t border-slate-800">
                        Last Updated: January 2026
                    </p>
                </div>
            </div>
            <div className="mt-12">
                <Footer scrollToSection={() => { }} />
            </div>
        </div>
    );
}
