"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const CALENDLY =
  "https://calendly.com/john-automate-with-john/free-website-audit";

/* ═══════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════ */

function useMousePosition() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    const handler = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setPos({ x: e.clientX, y: e.clientY })
      );
    };
    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
      cancelAnimationFrame(raf);
    };
  }, []);
  return pos;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const scrollTop = document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return progress;
}

function useNavScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrolled;
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function useAnimatedCounter(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, value };
}

function useTypewriter(text: string, delay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      const timer = setTimeout(() => setShowCursor(false), 2000);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(
      () => setDisplayed(text.slice(0, displayed.length + 1)),
      50 + Math.random() * 40
    );
    return () => clearTimeout(timer);
  }, [displayed, text, started]);

  return { displayed, showCursor, started };
}

function useTiltCard() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -8;
    const tiltY = (x - 0.5) * 8;
    el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    const inner = el.querySelector(".tilt-card-inner") as HTMLElement;
    if (inner) {
      inner.style.setProperty("--glow-x", `${x * 100}%`);
      inner.style.setProperty("--glow-y", `${y * 100}%`);
    }
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  }, []);

  return { ref, handleMove, handleLeave };
}

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useScrollReveal();
  return (
    <section id={id} ref={ref} className={`animate-on-scroll ${className}`}>
      {children}
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function RippleButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const span = document.createElement("span");
    span.className = "ripple-span";
    span.style.left = `${e.clientX - rect.left - 10}px`;
    span.style.top = `${e.clientY - rect.top - 10}px`;
    btn.appendChild(span);
    setTimeout(() => span.remove(), 700);
  };

  return (
    <a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`btn-shimmer elastic-press ${className}`}
    >
      {children}
    </a>
  );
}

function MagneticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`magnetic-btn ${className}`}
    >
      {children}
    </div>
  );
}

function TiltCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, handleMove, handleLeave } = useTiltCard();
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="tilt-card-inner h-full">{children}</div>
    </div>
  );
}

function FAQ({
  q,
  a,
  open,
  onClick,
}: {
  q: string;
  a: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`border-b border-gray-200 faq-item ${open ? "active" : ""}`}
    >
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-lg font-medium text-gray-900">{q}</span>
        <svg
          className={`w-5 h-5 text-gray-500 chevron-bounce ${open ? "open" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div className={`faq-answer ${open ? "open" : ""}`}>
        <p className="pb-5 text-gray-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const mouse = useMousePosition();
  const scrollProgress = useScrollProgress();
  const navScrolled = useNavScrolled();

  const { displayed, showCursor, started } = useTypewriter(
    "Gets You Customers",
    800
  );

  const priceCounter = useAnimatedCounter(99, 1200);
  const daysCounter = useAnimatedCounter(3, 800);
  const clientsCounter = useAnimatedCounter(200, 2000);

  const faqs = [
    {
      q: "What if I don't like the design?",
      a: "You get unlimited revisions. We'll keep refining until you love it. And if you're still not happy, you can cancel anytime — no contracts, no fees.",
    },
    {
      q: "Do I own the website?",
      a: "While you're subscribed, we host and manage everything for you. If you decide to leave, we'll hand over all the code and files — it's yours.",
    },
    {
      q: "What's included in the $99/mo?",
      a: "Everything: custom design, hosting, security updates, performance optimization, content changes, and making sure your site shows up when people search for your business locally.",
    },
    {
      q: "I already have a website. Can you rebuild it?",
      a: "Absolutely. Most of our clients come to us with an existing site that's not performing. We'll rebuild it from the ground up and make it work for you.",
    },
    {
      q: "How do you deliver in 2-3 days?",
      a: "We've built hundreds of local business sites. We know exactly what works and have a streamlined process. No back-and-forth for weeks — just a quick call, then we build.",
    },
    {
      q: "Is there a setup fee?",
      a: "No. Just $99/mo, starting from the day your site goes live. That's it.",
    },
  ];

  const problemItems = [
    {
      icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
      title: "Invisible on Google",
      desc: "When someone searches for your service in your area, they find your competitors instead of you.",
    },
    {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Slow & Outdated",
      desc: "A slow site or one that looks like it was built 10 years ago makes people leave in seconds.",
    },
    {
      icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",
      title: "No Calls, No Leads",
      desc: "Your site gets visitors but nobody calls, books, or fills out a form. That's money left on the table.",
    },
  ];

  const featureItems = [
    {
      icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
      title: "Custom Design",
      desc: "Built from scratch for your business. Not a cookie-cutter template.",
    },
    {
      icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
      title: "2-3 Day Delivery",
      desc: "Your new site goes live in days, not weeks or months.",
    },
    {
      icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992",
      title: "Unlimited Revisions",
      desc: "Not happy with something? We'll change it. As many times as you want.",
    },
    {
      icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
      title: "Built for Local Search",
      desc: "We make sure people in your area find you when they search for what you do.",
    },
    {
      icon: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
      title: "Mobile-First",
      desc: "Looks perfect on every phone, tablet, and desktop. Because most of your customers are on their phone.",
    },
    {
      icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
      title: "Fully Managed",
      desc: "Hosting, security, updates, content changes — we handle it all. You just run your business.",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Book a Free Call",
      desc: "Tell us about your business. Takes 15 minutes.",
    },
    {
      step: "2",
      title: "We Build Your Site",
      desc: "Sit back. Your custom website is ready in 2-3 days.",
    },
    {
      step: "3",
      title: "You Get More Customers",
      desc: "Your phone rings more. Your calendar fills up. Simple as that.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Within the first month, I got 3 new clients just from my website. Best $99 I spend every month.",
      name: "Mike R.",
      biz: "Plumbing Company",
    },
    {
      quote:
        "I couldn't believe how fast they delivered. My old site took 3 months. This one was done in 2 days.",
      name: "Sarah T.",
      biz: "Dental Practice",
    },
    {
      quote:
        "People actually find us on Google now. We went from zero online leads to 5-6 calls a week.",
      name: "James L.",
      biz: "HVAC Services",
    },
  ];

  const pricingFeatures = [
    "Custom-designed website",
    "Delivered in 2-3 days",
    "Unlimited revisions",
    "Hosting & security included",
    "Built to rank in local search",
    "Mobile-optimized",
    "Ongoing updates & maintenance",
    "Month-to-month — no contracts",
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* ── Cursor Glow ── */}
      <div className="cursor-glow" style={{ left: mouse.x, top: mouse.y }} />

      {/* ── Scroll Progress ── */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── Nav ── */}
      <nav
        className={`fixed top-0 w-full bg-white/70 backdrop-blur-md z-50 border-b border-[#e8e8ee] transition-all duration-300 ${
          navScrolled ? "nav-scrolled" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-bold tracking-tight animated-underline"
          >
            <span className="text-shimmer">Platinum</span>
            <span className="text-teal-600"> Local Sites</span>
          </a>
          <MagneticButton className="hidden sm:block">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors elastic-press"
            >
              Book a Free Call
            </a>
          </MagneticButton>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 hero-mesh overflow-hidden">
        {/* Mesh gradient blobs */}
        <div
          className="hero-mesh-blob opacity-25 morph-blob"
          style={{
            width: 600,
            height: 600,
            top: -200,
            right: -100,
            background: "radial-gradient(circle, #d8d8de, transparent 70%)",
            animation: "meshMove1 20s ease-in-out infinite",
          }}
        />
        <div
          className="hero-mesh-blob opacity-20 morph-blob"
          style={{
            width: 500,
            height: 500,
            bottom: -150,
            left: -80,
            background:
              "radial-gradient(circle, rgba(13,148,136,0.3), transparent 70%)",
            animation: "meshMove2 25s ease-in-out infinite",
          }}
        />
        <div
          className="hero-mesh-blob opacity-15 morph-blob"
          style={{
            width: 400,
            height: 400,
            top: "30%",
            left: "50%",
            background:
              "radial-gradient(circle, rgba(184,184,194,0.3), transparent 70%)",
            animation: "meshMove3 18s ease-in-out infinite",
          }}
        />
        {/* Extra breathing blob */}
        <div
          className="hero-mesh-blob breathe"
          style={{
            width: 300,
            height: 300,
            top: "10%",
            left: "20%",
            background:
              "radial-gradient(circle, rgba(13,148,136,0.1), transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        {/* Floating decorative dots */}
        {[
          { top: "15%", left: "80%", size: 6, delay: "0s" },
          { top: "60%", left: "85%", size: 4, delay: "2s" },
          { top: "30%", left: "90%", size: 8, delay: "1s" },
          { top: "75%", left: "75%", size: 5, delay: "3s" },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              background: i % 2 === 0 ? "rgba(13,148,136,0.3)" : "rgba(184,184,194,0.4)",
              animation: `dotFloat 4s ease-in-out ${dot.delay} infinite`,
            }}
          />
        ))}

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="slide-in-left inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 text-teal-700 text-sm font-medium rounded-full mb-6 border border-teal-100">
              <span className="w-2 h-2 bg-teal-500 rounded-full glow-ring" />
              Now accepting new clients
            </div>

            {/* Hero heading with typewriter */}
            <h1 className="blur-in text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
              A Website That Actually{" "}
              <span className="gradient-text">
                {started ? displayed : ""}
                {showCursor && started && (
                  <span className="typewriter-cursor" />
                )}
              </span>
            </h1>

            <p className="blur-in blur-in-delay-2 text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Most local business websites sit there doing nothing. We build
              sites that show up when people search for your service — and turn
              visitors into paying customers. From{" "}
              <strong className="text-gray-900">$99/mo</strong>, delivered in{" "}
              <strong className="text-gray-900">2-3 days</strong>.
            </p>

            <div className="blur-in blur-in-delay-3 flex flex-col sm:flex-row gap-4">
              <RippleButton
                href={CALENDLY}
                className="inline-flex items-center justify-center px-8 py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all hover:shadow-lg hover:shadow-teal-600/20 text-lg"
              >
                Get Started — It&apos;s Free to Talk
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </RippleButton>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#d8d8de] text-gray-700 font-semibold rounded-xl hover:border-teal-300 hover:bg-white transition-all text-lg elastic-press"
              >
                See Pricing
              </a>
            </div>

            <div className="flex items-center gap-6 mt-10 text-sm text-gray-500">
              {[
                "No contracts",
                "Cancel anytime",
                "2-3 day delivery",
              ].map((text, i) => (
                <span
                  key={text}
                  className={`trust-badge flex items-center gap-1.5`}
                  style={{ animationDelay: `${1 + i * 0.15}s` }}
                >
                  <CheckIcon /> {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            className="w-full h-[40px] block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C360,55 720,5 1080,30 C1260,42 1380,48 1440,30 L1440,60 L0,60 Z"
              fill="white"
            />
          </svg>
        </div>
      </header>

      {/* ── Problem ── */}
      <Section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 slide-up">
              Your Website Is Costing You Customers
            </h2>
            <span className="heading-line" />
            <p className="text-lg text-gray-600 leading-relaxed mt-4 slide-up" style={{ animationDelay: "0.2s" }}>
              If your site is slow, looks outdated, or doesn&apos;t show up when
              people search for what you do — you&apos;re losing business every
              single day.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {problemItems.map((item, i) => (
              <TiltCard key={item.title} delay={i * 0.15}>
                <div className="bg-[#f8f9fb] rounded-2xl p-8 border border-[#e8e8ee] h-full glow-border-hover hover-lift">
                  <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center mb-5 icon-container hover-wobble">
                    <svg
                      className="w-6 h-6 text-amber-600 icon-draw"
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Stats bar ── */}
      <Section className="py-12 bg-[#f8f9fb] relative">
        <div className="shimmer-bar absolute top-0 left-0 right-0" />
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="scale-in" style={{ animationDelay: "0s" }}>
              <span
                ref={clientsCounter.ref}
                className="text-4xl sm:text-5xl font-extrabold text-teal-600 number-glow"
              >
                {clientsCounter.value}+
              </span>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Sites Built</p>
            </div>
            <div className="scale-in" style={{ animationDelay: "0.15s" }}>
              <span
                ref={daysCounter.ref}
                className="text-4xl sm:text-5xl font-extrabold text-teal-600 number-glow"
              >
                {daysCounter.value}
              </span>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Day Avg. Delivery</p>
            </div>
            <div className="scale-in" style={{ animationDelay: "0.3s" }}>
              <span className="text-4xl sm:text-5xl font-extrabold text-teal-600 number-glow">
                $0
              </span>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Setup Fee</p>
            </div>
          </div>
        </div>
        <div className="shimmer-bar absolute bottom-0 left-0 right-0" />
      </Section>

      {/* ── What You Get ── */}
      <Section className="py-20" id="features">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 slide-up">
              Everything You Need. Nothing You Don&apos;t.
            </h2>
            <span className="heading-line" />
            <p className="text-lg text-gray-600 mt-4 slide-up" style={{ animationDelay: "0.2s" }}>
              One simple plan. Everything handled for you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureItems.map((item, i) => (
              <TiltCard key={item.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 border border-[#e8e8ee] hover:shadow-lg hover:shadow-teal-600/5 transition-all duration-300 h-full glow-border-hover">
                  <div className="w-11 h-11 bg-teal-50 rounded-xl flex items-center justify-center mb-4 icon-container hover-wobble">
                    <svg
                      className="w-5 h-5 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={item.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ── How It Works ── */}
      <Section className="py-20 bg-white relative">
        {/* Wave at top */}
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            className="w-full h-[40px] block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C360,55 720,5 1080,30 C1260,42 1380,48 1440,30 L1440,60 L0,60 Z"
              fill="#f8f9fb"
            />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 slide-up">
              Three Steps. That&apos;s It.
            </h2>
            <span className="heading-line" />
          </div>
          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line (desktop only) */}
            <div className="connecting-line hidden md:block">
              <div className="connecting-line-inner" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((item, i) => (
                <div key={item.step} className="text-center relative z-10">
                  <div
                    className="bounce-in w-14 h-14 bg-teal-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg shadow-teal-600/20 hover-wobble"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 slide-up" style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 slide-up" style={{ animationDelay: `${0.4 + i * 0.15}s` }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            className="w-full h-[40px] block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C360,55 720,5 1080,30 C1260,42 1380,48 1440,30 L1440,60 L0,60 Z"
              fill="#f8f9fb"
            />
          </svg>
        </div>
      </Section>

      {/* ── Pricing ── */}
      <Section className="py-20" id="pricing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 slide-up">
              Simple, Honest Pricing
            </h2>
            <span className="heading-line" />
            <p className="text-lg text-gray-600 mt-4 slide-up" style={{ animationDelay: "0.2s" }}>
              No hidden fees. No contracts. No surprises.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="float-card">
              <div className="gradient-border-wrap">
                <div className="gradient-border-inner p-10 relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-sm font-semibold px-5 py-1.5 rounded-full badge-pulse whitespace-nowrap">
                    Everything Included
                  </div>
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-lg text-gray-500 mr-0.5">$</span>
                      <span
                        ref={priceCounter.ref}
                        className="text-5xl font-extrabold text-gray-900 number-glow"
                      >
                        {priceCounter.value}
                      </span>
                      <span className="text-xl text-gray-500">/mo</span>
                    </div>
                    <p className="text-gray-500 mt-2">
                      No setup fee. Cancel anytime.
                    </p>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {pricingFeatures.map((item, i) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 checklist-item"
                        style={{ animationDelay: `${0.3 + i * 0.08}s` }}
                      >
                        <CheckIcon />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <RippleButton
                    href={CALENDLY}
                    className="block w-full text-center px-8 py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all hover:shadow-lg text-lg"
                  >
                    Book Your Free Call
                  </RippleButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Testimonials ── */}
      <Section className="py-20 bg-white relative">
        {/* Wave at top */}
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            className="w-full h-[40px] block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C360,55 720,5 1080,30 C1260,42 1380,48 1440,30 L1440,60 L0,60 Z"
              fill="#f8f9fb"
            />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 slide-up">
              Trusted by Local Businesses
            </h2>
            <span className="heading-line" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <TiltCard key={t.name} delay={idx * 0.15}>
                <div className="bg-[#f8f9fb] rounded-2xl p-8 border border-[#e8e8ee] relative quote-card hover:shadow-xl hover:shadow-teal-600/5 transition-all duration-300 h-full glow-border-hover hover-lift">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-amber-400 star-pop"
                        style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-5 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.biz}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section className="py-20" id="faq">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 slide-up">
              Common Questions
            </h2>
            <span className="heading-line" />
          </div>
          <div>
            {faqs.map((faq, i) => (
              <FAQ
                key={i}
                q={faq.q}
                a={faq.a}
                open={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ── Final CTA ── */}
      <Section className="py-20 bg-[#1e1e2e] relative overflow-hidden">
        {/* Dark mesh blobs */}
        <div
          className="absolute rounded-full pointer-events-none opacity-20 morph-blob"
          style={{
            width: 400,
            height: 400,
            top: -100,
            right: -50,
            background:
              "radial-gradient(circle, rgba(13,148,136,0.4), transparent 70%)",
            filter: "blur(60px)",
            animation: "darkMesh1 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none opacity-15 morph-blob"
          style={{
            width: 350,
            height: 350,
            bottom: -80,
            left: -30,
            background:
              "radial-gradient(circle, rgba(184,184,194,0.3), transparent 70%)",
            filter: "blur(60px)",
            animation: "darkMesh2 18s ease-in-out infinite",
          }}
        />
        {/* Extra center blob */}
        <div
          className="absolute rounded-full pointer-events-none breathe"
          style={{
            width: 250,
            height: 250,
            top: "20%",
            left: "40%",
            background:
              "radial-gradient(circle, rgba(13,148,136,0.15), transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Floating particles - more of them */}
        {[
          { left: "5%", bottom: "10%", size: 4, dur: "6s", delay: "0s", bg: "rgba(13,148,136,0.5)" },
          { left: "15%", bottom: "5%", size: 3, dur: "8s", delay: "1s", bg: "rgba(184,184,194,0.4)" },
          { left: "30%", bottom: "15%", size: 5, dur: "7s", delay: "2s", bg: "rgba(13,148,136,0.4)" },
          { left: "45%", bottom: "8%", size: 3, dur: "9s", delay: "0.5s", bg: "rgba(184,184,194,0.5)" },
          { left: "60%", bottom: "12%", size: 4, dur: "6.5s", delay: "3s", bg: "rgba(13,148,136,0.3)" },
          { left: "75%", bottom: "20%", size: 2, dur: "10s", delay: "1.5s", bg: "rgba(237,237,240,0.3)" },
          { left: "90%", bottom: "6%", size: 3, dur: "7.5s", delay: "0.8s", bg: "rgba(13,148,136,0.4)" },
          { left: "20%", bottom: "25%", size: 2, dur: "11s", delay: "2.5s", bg: "rgba(184,184,194,0.3)" },
          { left: "55%", bottom: "3%", size: 4, dur: "5.5s", delay: "1.2s", bg: "rgba(13,148,136,0.35)" },
          { left: "80%", bottom: "18%", size: 3, dur: "8.5s", delay: "3.5s", bg: "rgba(237,237,240,0.25)" },
        ].map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: p.size,
              height: p.size,
              background: p.bg,
              animation: `${i % 2 === 0 ? "floatUp" : "floatUp2"} ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-reveal">
            Ready to Stop Losing Customers?
          </h2>
          <p className="text-lg text-[#9898a6] mb-8 max-w-xl mx-auto text-reveal" style={{ animationDelay: "0.3s" }}>
            Book a free 15-minute call. We&apos;ll look at your current site,
            show you what&apos;s not working, and have your new one live in
            days.
          </p>
          <RippleButton
            href={CALENDLY}
            className="inline-flex items-center justify-center px-10 py-4 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-400 transition-all hover:shadow-lg hover:shadow-teal-500/25 text-lg pulse-glow"
          >
            Book Your Free Call
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </RippleButton>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer className="py-10 bg-[#1e1e2e] gradient-top-border">
        <div className="max-w-6xl mx-auto px-6 text-center text-[#9898a6] text-sm">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-shimmer font-medium">
              Platinum Local Sites
            </span>
            . All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
