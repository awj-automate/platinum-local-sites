"use client";

import { useEffect, useRef, useState } from "react";

const CALENDLY = "https://calendly.com/john-automate-with-john/30min";

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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

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
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-lg font-medium text-gray-900">{q}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* ── Nav ── */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-gray-900 tracking-tight">
            Platinum<span className="text-teal-600"> Local Sites</span>
          </a>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-5 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors"
          >
            Book a Free Call
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 hero-pattern">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 text-teal-700 text-sm font-medium rounded-full mb-6 border border-teal-100">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              Now accepting new clients
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
              A Website That Actually{" "}
              <span className="text-teal-600">Gets You Customers</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Most local business websites sit there doing nothing. We build
              sites that show up when people search for your service — and turn
              visitors into paying customers. From{" "}
              <strong className="text-gray-900">$99/mo</strong>, delivered in{" "}
              <strong className="text-gray-900">2-3 days</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-white transition-all text-lg"
              >
                See Pricing
              </a>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckIcon /> No contracts
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon /> Cancel anytime
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon /> 2-3 day delivery
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Problem ── */}
      <Section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Your Website Is Costing You Customers
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              If your site is slow, looks outdated, or doesn&apos;t show up when
              people search for what you do — you&apos;re losing business every
              single day.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-5">
                  <svg
                    className="w-6 h-6 text-red-500"
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
            ))}
          </div>
        </div>
      </Section>

      {/* ── What You Get ── */}
      <Section className="py-20" id="features">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need. Nothing You Don&apos;t.
            </h2>
            <p className="text-lg text-gray-600">
              One simple plan. Everything handled for you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
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
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-teal-100 hover:shadow-lg hover:shadow-teal-600/5 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
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
            ))}
          </div>
        </div>
      </Section>

      {/* ── How It Works ── */}
      <Section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Three Steps. That&apos;s It.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
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
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-teal-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Pricing ── */}
      <Section className="py-20" id="pricing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Simple, Honest Pricing
            </h2>
            <p className="text-lg text-gray-600">
              No hidden fees. No contracts. No surprises.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl border-2 border-teal-600 p-10 relative shadow-xl shadow-teal-600/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-sm font-semibold px-5 py-1.5 rounded-full">
                Everything Included
              </div>
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold text-gray-900">
                    $99
                  </span>
                  <span className="text-xl text-gray-500">/mo</span>
                </div>
                <p className="text-gray-500 mt-2">No setup fee. Cancel anytime.</p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Custom-designed website",
                  "Delivered in 2-3 days",
                  "Unlimited revisions",
                  "Hosting & security included",
                  "Built to rank in local search",
                  "Mobile-optimized",
                  "Ongoing updates & maintenance",
                  "Month-to-month — no contracts",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-8 py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all hover:shadow-lg text-lg"
              >
                Book Your Free Call
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Testimonials ── */}
      <Section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Local Businesses
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((t) => (
              <div
                key={t.name}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-400"
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
            ))}
          </div>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section className="py-20" id="faq">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Common Questions
            </h2>
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
      <Section className="py-20 bg-gray-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Stop Losing Customers?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Book a free 15-minute call. We&apos;ll look at your current site, show
            you what&apos;s not working, and have your new one live in days.
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-400 transition-all hover:shadow-lg hover:shadow-teal-500/25 text-lg"
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
          </a>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer className="py-10 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Platinum Local Sites. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
