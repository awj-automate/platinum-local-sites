"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const CALENDLY_URL =
  "https://calendly.com/john-automate-with-john/free-website-audit";

export default function BookPage() {
  const widgetLoaded = useRef(false);

  useEffect(() => {
    // If the Calendly script was already loaded (e.g. cached), init the widget
    if (
      !widgetLoaded.current &&
      typeof window !== "undefined" &&
      (window as unknown as Record<string, unknown>).Calendly
    ) {
      widgetLoaded.current = true;
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#1e1e2e] relative overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute rounded-full pointer-events-none opacity-20 morph-blob"
        style={{
          width: 500,
          height: 500,
          top: -150,
          right: -100,
          background:
            "radial-gradient(circle, rgba(13,148,136,0.4), transparent 70%)",
          filter: "blur(80px)",
          animation: "meshMove1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none opacity-15 morph-blob"
        style={{
          width: 400,
          height: 400,
          bottom: -100,
          left: -50,
          background:
            "radial-gradient(circle, rgba(184,184,194,0.3), transparent 70%)",
          filter: "blur(80px)",
          animation: "meshMove2 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none breathe"
        style={{
          width: 300,
          height: 300,
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.1), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Floating particles */}
      {[
        { left: "8%", bottom: "10%", size: 4, dur: "7s", delay: "0s" },
        { left: "20%", bottom: "5%", size: 3, dur: "9s", delay: "1s" },
        { left: "45%", bottom: "8%", size: 5, dur: "6s", delay: "2s" },
        { left: "70%", bottom: "15%", size: 3, dur: "8s", delay: "0.5s" },
        { left: "88%", bottom: "12%", size: 4, dur: "7.5s", delay: "3s" },
      ].map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            background:
              i % 2 === 0
                ? "rgba(13,148,136,0.4)"
                : "rgba(184,184,194,0.35)",
            animation: `${i % 2 === 0 ? "floatUp" : "floatUp2"} ${p.dur} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}

      {/* Nav */}
      <nav className="relative z-20 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight">
            <span className="text-shimmer">Platinum</span>
            <span className="text-teal-400"> Local Sites</span>
          </a>
          <a
            href="/"
            className="text-sm text-[#9898a6] hover:text-white transition-colors flex items-center gap-1.5"
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
            Back to Home
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 sm:py-16">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left column — messaging */}
          <div className="lg:col-span-2 blur-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-900/30 text-teal-400 text-sm font-medium rounded-full mb-6 border border-teal-800/40">
              <span className="w-2 h-2 bg-teal-400 rounded-full glow-ring" />
              Free — No Obligation
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
              Let&apos;s Build You a Website That{" "}
              <span className="gradient-text">Actually Works</span>
            </h1>

            <p className="text-[#9898a6] text-lg leading-relaxed mb-8">
              Book a quick 15-minute call. We&apos;ll look at your current
              online presence, show you what&apos;s holding you back, and map
              out exactly how to fix it.
            </p>

            {/* What to expect */}
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-semibold text-[#b8b8c2] uppercase tracking-wider">
                What to Expect
              </h3>
              {[
                {
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                  text: "15-minute no-pressure conversation",
                },
                {
                  icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
                  text: "Quick audit of your current website",
                },
                {
                  icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  text: "Clear action plan — even if you don't hire us",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-3 text-[#d8d8de]"
                >
                  <div className="w-8 h-8 rounded-lg bg-teal-900/30 border border-teal-800/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-teal-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                  </div>
                  <span className="text-sm leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Trust signals */}
            <div className="flex items-center gap-4 text-xs text-[#78788a]">
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                No contracts
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                200+ sites built
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                $99/mo
              </span>
            </div>
          </div>

          {/* Right column — Calendly embed */}
          <div className="lg:col-span-3 blur-in blur-in-delay-2">
            <div className="gradient-border-wrap">
              <div className="gradient-border-inner p-1 sm:p-2">
                <div
                  className="calendly-inline-widget"
                  data-url={CALENDLY_URL}
                  style={{ minWidth: 280, height: 680 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 gradient-top-border">
        <div className="max-w-6xl mx-auto px-6 text-center text-[#78788a] text-sm">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-shimmer font-medium">
              Platinum Local Sites
            </span>
            . All rights reserved.
          </p>
        </div>
      </footer>

      {/* Calendly script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
