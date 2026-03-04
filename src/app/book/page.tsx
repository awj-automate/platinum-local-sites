"use client";

import Script from "next/script";

const CALENDLY_URL =
  "https://calendly.com/john-automate-with-john/free-website-audit";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Nav */}
      <nav className="border-b border-[#e8e8ee]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight">
            <span className="text-shimmer">Platinum</span>
            <span className="text-teal-600"> Local Sites</span>
          </a>
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Home
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Book Your Free Call
          </h1>
          <p className="text-gray-500">
            Pick a time that works. 15 minutes, no obligation.
          </p>
        </div>

        {/* Calendly embed */}
        <div className="rounded-2xl border border-[#e8e8ee] bg-white overflow-hidden shadow-sm">
          <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{ minWidth: 280, height: 700 }}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-[#e8e8ee]">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-shimmer font-medium">
              Platinum Local Sites
            </span>
            . All rights reserved.
          </p>
        </div>
      </footer>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
