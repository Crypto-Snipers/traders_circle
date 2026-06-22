"use client";

import Image from "next/image";
import Link from "next/link";
import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import TradersMarathonLogo from "@/app/assets/trader-circle.jpeg";

interface FooterProps {
    scrollToSection: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection }) => {
    return (
        <footer className="py-12 px-4 border-t border-green-500/20">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <Image src={TradersMarathonLogo} alt="Traders Marathon Logo" width={200} height={100} className="h-12 md:h-20 w-auto mb-2 -ml-4" suppressHydrationWarning />
                        <p className="text-gray-400 text-md">Your fast-track to profitable trading in Crypto, Forex & Gold markets.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-md">Quick Links</h4>
                        <ul className="space-y-2 text-md text-gray-400">
                            <li><button onClick={() => scrollToSection('home')} className="hover:text-green-500 transition-colors">Home</button></li>
                            <li><button onClick={() => scrollToSection('features')} className="hover:text-green-500 transition-colors">Features</button></li>
                            <li><button onClick={() => scrollToSection('mentors')} className="hover:text-green-500 transition-colors">Mentors</button></li>
                            <li><button onClick={() => scrollToSection('pricing')} className="hover:text-green-500 transition-colors">Pricing</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-md">Program</h4>
                        <ul className="space-y-2 text-md text-gray-400">
                            <li><button onClick={() => scrollToSection('features')} className="hover:text-green-500 transition-colors">What You'll Learn</button></li>
                            <li><button onClick={() => scrollToSection('mentors')} className="hover:text-green-500 transition-colors">Meet Mentors</button></li>
                            <li><button onClick={() => scrollToSection('contact')} className="hover:text-green-500 transition-colors">Contact</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-md">Support</h4>
                        <ul className="space-y-2 text-md text-gray-400">
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-green-500" />
                                +91 7726969864
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-green-500" />
                                support@tradecartel.com
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-green-500" />
                                </div>
                                Elevana Consultancy Private Limited
                                8th Floor, Tower A, 8th floor, Baharampur Naya, Sector 61, Gurugram, Ghata, Haryana 122098
                            </li>
                            <li className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-green-500" />
                                Mon-Fri, 10 AM - 6 PM
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-green-500/20 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-xs">© 2024 Trade Cartel. All rights reserved.</p>
                        <div className="flex gap-6 text-xs text-gray-500">
                            <Link href="/privacy-policy" className="hover:text-green-500 transition-colors">Privacy Policy</Link>
                            <Link href="/terms-of-service" className="hover:text-green-500 transition-colors">Terms of Service</Link>
                            <Link href="/cancellations-refunds" className="hover:text-green-500 transition-colors">Cancellations & Refunds</Link>
                            <Link
                                href="/shipping-policy"
                                className="hover:text-[#16b67e]/80 transition-colors"
                            >
                                Shipping Policy
                            </Link>
                        </div>
                    </div>
                    <p className="text-[10px] text-emerald-700 mt-10 text-center">
                        Disclaimer: Trading involves risk. Past performance does not guarantee future results. Only trade with capital you can afford to risk.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
