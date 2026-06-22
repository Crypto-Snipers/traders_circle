"use client";

import React from "react";

export default function FloatingSocials() {
  const socials = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/iiamyashgupta/",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      hoverClass: "hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-500 hover:to-yellow-500 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]",
    },
    {
      name: "Telegram",
      url: "https://t.me/YashGuptaTrader",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.58.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.89 1.2-5.33 3.52-.5.35-.96.52-1.37.51-.45-.01-1.32-.26-1.97-.47-.8-.26-1.43-.4-1.38-.85.03-.23.35-.47.96-.71 3.76-1.63 6.27-2.71 7.53-3.23 3.58-1.48 4.32-1.74 4.81-1.75.11 0 .35.03.5.16.13.11.17.26.19.37z" />
        </svg>
      ),
      hoverClass: "hover:bg-sky-500 hover:border-sky-400/50 hover:shadow-[0_0_15px_rgba(14,165,233,0.5)]",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@iamyashgupta",
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      ),
      hoverClass: "hover:bg-red-600 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]",
    },
  ];

  return (
    <div className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${social.hoverClass}`}
        >
          {/* Icon */}
          <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
            {social.icon}
          </span>

          {/* Tooltip */}
          <span className="absolute right-14 px-3 py-1 bg-black/85 backdrop-blur-sm border border-white/10 text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-lg">
            {social.name}
          </span>
        </a>
      ))}
    </div>
  );
}
