"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  // Static Success Stories Database
  const stories = [
    {
      name: "Samuel Bekele",
      role: "Five-Star Hotel Chef",
      country: "UAE",
      details: "Samuel had 4 years of culinary experience in Addis Ababa but wanted to work internationally. SKY Agency matched him with a leading hospitality group in Dubai, UAE, handled his embassy paperwork, and secured his employment contract.",
      image: "/images/plane-1.jpg",
      quote: "SKY Agency guided me step-by-step. Now, I am cooking in one of Dubai's most popular resort kitchens and sending support back home.",
      duration: "3 Months (Express)",
    },
    {
      name: "Abebe Yosef",
      role: "Logistics Specialist & Driver",
      country: "Saudi Arabia",
      details: "Abebe sought a forklift and heavy logistics role. Through SKY Agency's direct employers network, he received a job offer within 3 weeks and was relocated to a state-of-the-art warehouse in Riyadh, Saudi Arabia.",
      image: "/images/plane-2.jpg",
      quote: "The processing was clean and honest. The salary is exactly what was promised, and the employer even provided housing.",
      duration: "2 Months (Standard)",
    },
    {
      name: "Helena Tadesse",
      role: "Healthcare Support Specialist",
      country: "Qatar",
      details: "Helena, a certified nurse assistant, wanted to experience the Gulf healthcare sector. SKY Agency helped her with visa screening and matched her with a premium rehabilitation facility in Doha, Qatar.",
      image: "/images/plnae-3.jpg", // Note the spelling in public/images
      quote: "Doha is beautiful, and my work is incredibly fulfilling. SKY Agency's support during visa screening made all the difference.",
      duration: "3 Months (Standard)",
    },
  ];

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Destinations Slider Focus State (starts on middle item of middle copy: Jordan, index 13)
  const [currentIndex, setCurrentIndex] = useState<number>(13);
  const [transitionEnabled, setTransitionEnabled] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Re-enable transitions after a silent jump completes
  useEffect(() => {
    if (!transitionEnabled) {
      const timer = setTimeout(() => {
        setTransitionEnabled(true);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [transitionEnabled]);

  // Autoplay for Destinations Slider (resets timer when user manually changes slide or hovers)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, currentIndex]);

  const handleTransitionEnd = () => {
    if (currentIndex < 9) {
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex + 9);
    } else if (currentIndex >= 18) {
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex - 9);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Active Navigation Section Spying & Scroll state
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Update scrolled state
      setIsScrolled(window.scrollY > 20);

      // 2. Active section detection (Scroll spy)
      const sections = ["home", "about", "services", "destinations", "advantages", "success", "faq"];
      const scrollPosition = window.scrollY + 120; // offset for header height

      // Special check: bottom of page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection("faq");
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          if (scrollPosition >= el.offsetTop) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on desktop window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const faqs = [
    {
      q: "What countries does SKY Agency deploy workers to?",
      a: "We specialize in placements across the Middle East and Gulf region, including Saudi Arabia, UAE, Kuwait, Bahrain, Jordan, Oman, Qatar, Lebanon, and beyond.",
    },
    {
      q: "Is SKY Foreign Employment Agency licensed?",
      a: "Yes, we are a fully licensed and government-approved foreign employment agency in Ethiopia. We operate strictly in compliance with all legal frameworks and international labor migration laws.",
    },
    {
      q: "What kind of jobs do you recruit for?",
      a: "Our core recruitment areas include domestic work (nannies, caregivers, trained housemaids), hospitality and culinary staff, skilled logistics workers (drivers, warehouse personnel), and industrial construction trades.",
    },
    {
      q: "What support do you offer workers once they are deployed?",
      a: "Our relationship doesn't end with deployment. We offer post-deployment follow-up, coordinate with local recruitment partners, and assist in resolving any workplace issues or contract disputes for both workers and employers.",
    },
    {
      q: "How does the document processing work?",
      a: "We handle the entire visa, COC certification, medical clearance, and labor contract documentation process end-to-end to ensure complete compliance and hassle-free processing.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f8fc] font-sans text-slate-800 flex flex-col">
      {/* STICKY HEADER */}
      <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#f3f8fc]/95 backdrop-blur-md shadow-sm border-b border-slate-200/60 py-3"
          : "bg-[#f3f8fc]/90 backdrop-blur-md border-b border-slate-200/40 py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          {/* Left: Logo */}
          <div className="flex items-center">
            <span className="font-display font-black text-2xl tracking-tight text-[#0f172a] lowercase">
              sky agency<span className="text-brand-primary">.</span>
            </span>
          </div>

          {/* Center: Navigation Links (Desktop only, scroll-spied and dynamic) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About Us" },
              { id: "services", label: "Services" },
              { id: "destinations", label: "Destinations" },
              { id: "advantages", label: "Why Us" },
              { id: "success", label: "Stories" },
              { id: "faq", label: "FAQ" },
            ].map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`transition-colors py-1 relative ${
                    isActive
                      ? "text-[#0f172a] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#0f172a]"
                      : "text-slate-400 hover:text-[#0f172a]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Contact Us Button (Desktop only) */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="px-6 py-2.5 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-full transition-colors inline-block text-center uppercase tracking-wider"
            >
              Contact Us
            </a>
          </div>

          {/* Hamburger Menu Button (Mobile only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-800 hover:text-brand-primary transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu slide down, inside the header wrapper but below the main flex row */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full bg-[#f3f8fc]/95 backdrop-blur-lg border-t border-slate-200/50 transition-all duration-300 ease-in-out">
            <nav className="flex flex-col px-6 py-4 gap-3 text-sm font-semibold">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About Us" },
                { id: "services", label: "Services" },
                { id: "destinations", label: "Destinations" },
                { id: "advantages", label: "Why Us" },
                { id: "success", label: "Stories" },
                { id: "faq", label: "FAQ" },
              ].map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`transition-colors py-2 px-3 rounded-xl ${
                      isActive
                        ? "text-[#0f172a] bg-slate-200/50"
                        : "text-slate-500 hover:text-[#0f172a] hover:bg-slate-100/50"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="border-t border-slate-200/40 pt-3 mt-1">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-6 py-3 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-full transition-colors block text-center uppercase tracking-wider"
                >
                  Contact Us
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER (overflow-x-hidden wrapper sibling to allow header stickiness) */}
      <main className="w-full flex-1 overflow-x-hidden">

      {/* HERO SECTION */}
      <section id="home" className="w-full max-w-7xl mx-auto px-6 pt-6 sm:pt-10 md:pt-12 pb-24 flex flex-col items-center justify-start text-center relative bg-[#f3f8fc] min-h-[calc(100vh-80px)]">
        {/* Centered Overlay Container */}
        <div className="relative w-full flex flex-col items-center justify-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 relative z-30">
            TRUSTED RECRUITMENT & PLACEMENT
          </span>
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-[104px] text-[#0f172a] max-w-6xl leading-[0.98] tracking-tighter uppercase relative z-10 select-none">
            Convenient Global <br />
            <span className="text-brand-primary">Employment Services</span>
          </h1>

          {/* Large Airplane Graphic: flows relative below text on mobile, absolute overlap on desktop */}
          <div className="relative md:absolute mt-8 md:mt-0 top-0 md:top-[20%] left-0 md:left-1/2 translate-x-0 md:-translate-x-1/2 w-full md:max-w-[1300px] h-[220px] sm:h-[360px] md:h-[620px] z-20 pointer-events-none">
            <div className="w-full h-full relative animate-float">
              <Image
                src="/images/hero-plane-2-removebg-preview_upscayl_4x_upscayl-standard-4x.png"
                alt="SKY Agency 3D Airplane Graphic Upscaled"
                fill
                priority
                className="object-contain object-top"
                sizes="(max-w-7xl) 100vw, 1300px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="w-full max-w-7xl mx-auto px-6 py-20 bg-[#f3f8fc] border-t border-slate-200/60 md:my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Image with Floating Card */}
          <div className="relative">
            <div className="relative h-80 md:h-[400px] rounded-[32px] overflow-hidden border border-slate-200 shadow-sm">
              <Image
                src="/images/plane-1.jpg"
                alt="SKY Agency professional reception office environment"
                fill
                className="object-cover"
                sizes="(max-w-lg) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay" />
            </div>
            {/* Floating 10+ Years of Excellence Card */}
            <div className="absolute -bottom-4 -right-4 bg-white border border-slate-200 rounded-2xl p-4 text-center min-w-[140px] z-10 shadow-sm">
              <span className="block font-display font-extrabold text-3xl text-[#0f172a] leading-none">10+</span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Years of Excellence</span>
            </div>
          </div>

          {/* Right Column: Copywriting and Badges */}
          <div>
            <span className=" text-xs font-bold text-brand-primary uppercase tracking-widest mb-2 block">
              ABOUT SKY AGENCY
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0f172a] uppercase leading-tight">
              Your Trusted Bridge to Gulf Employment
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mt-4">
              SKY Foreign Employment Agency is one of Ethiopia's leading recruitment agencies, dedicated to providing reliable and professional services. Since our founding, we have helped thousands of candidates secure employment across the Middle East.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mt-3.5">
              We specialize in deploying domestic workers, caregivers, and skilled professionals to Saudi Arabia, UAE, Kuwait, Bahrain, and beyond. Our ethical approach ensures dignity for every candidate.
            </p>

            {/* Chips Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-700">
                <span className="text-base shrink-0">🇪🇹</span>
                <span>Based in Addis Ababa</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-700">
                <span className="text-base shrink-0">📄</span>
                <span>Fully Licensed</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-700">
                <span className="text-base shrink-0">⚡</span>
                <span>Fast Processing</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-700">
                <span className="text-base shrink-0">❤️</span>
                <span>Ethical Standards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES SECTION */}
      <section id="services" className="w-full max-w-7xl mx-auto px-6 py-20 bg-[#f3f8fc] border-t border-slate-200/60 md:my-10">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-2 block">
            OUR CORE SERVICES
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0f172a] uppercase">
            End-To-End Migration & Placement Solutions
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
            We handle everything from candidate screening and training to government documentation and post-relocation worker support.
          </p>
        </div>

        {/* 6 Services Grid - Spacious gaps and paddings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-brand-primary/50 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center font-bold text-base mb-4">
                01
              </div>
              <h3 className="font-display font-extrabold text-lg text-[#0f172a] uppercase tracking-tight">
                Domestic Workers
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-3">
                Trained housemaids, nannies, and caregivers deployed to families across the Gulf region. Every candidate is vetted and fully prepared for their specific role.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-brand-primary/50 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center font-bold text-base mb-4">
                02
              </div>
              <h3 className="font-display font-extrabold text-lg text-[#0f172a] uppercase tracking-tight">
                Document Processing
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-3">
                Complete visa, COC, medical clearance, and labor contract documentation handled end-to-end. We ensure full governmental and embassy compliance for legal relocation.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-brand-primary/50 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center font-bold text-base mb-4">
                03
              </div>
              <h3 className="font-display font-extrabold text-lg text-[#0f172a] uppercase tracking-tight">
                Gulf Deployment
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-3">
                Reliable deployment to Saudi Arabia, UAE, Kuwait, Bahrain, Jordan, Oman, Qatar, Lebanon, and beyond. We coordinate travel logistics and secure safe flights.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-brand-primary/50 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center font-bold text-base mb-4">
                04
              </div>
              <h3 className="font-display font-extrabold text-lg text-[#0f172a] uppercase tracking-tight">
                Pre-departure Training
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-3">
                Language training, cultural orientation, and professional skill training programs. We prepare workers to adapt quickly and perform professionally in their destination countries.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-brand-primary/50 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center font-bold text-base mb-4">
                05
              </div>
              <h3 className="font-display font-extrabold text-lg text-[#0f172a] uppercase tracking-tight">
                Partner Coordination
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-3">
                Seamless collaboration with certified recruitment partners and agencies abroad. We manage employer requirements and verify worker accommodation and working terms beforehand.
              </p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-brand-primary/50 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center font-bold text-base mb-4">
                06
              </div>
              <h3 className="font-display font-extrabold text-lg text-[#0f172a] uppercase tracking-tight">
                Post-deployment Support
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-3">
                Ongoing support and follow-up for workers and employers after placement. We maintain active communication channels to resolve disputes, handle renewals, or organize repatriation if needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR COUNTRIES / DESTINATIONS */}
      <section id="destinations" className="w-full py-20 bg-[#f3f8fc] relative overflow-hidden border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-2 block">
            REGIONAL COVERAGE
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0f172a] uppercase">
            Popular Work Destinations
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
            SKY Agency organizes placements in authorized countries across the Middle East.
          </p>
        </div>

        {/* Carousel Container with Arrows and Masks */}
        <div 
          className="relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Left Cloudy Blur Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-56 bg-gradient-to-r from-[#f3f8fc] via-[#f3f8fc]/85 to-transparent z-20 pointer-events-none backdrop-blur-[3px]" />

          {/* Right Cloudy Blur Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-56 bg-gradient-to-l from-[#f3f8fc] via-[#f3f8fc]/85 to-transparent z-20 pointer-events-none backdrop-blur-[3px]" />

          {/* Left Navigation Arrow */}
          <button
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            className="absolute left-4 md:left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/40 hover:bg-white/70 active:scale-95 backdrop-blur-md border border-white/40 text-slate-800 flex items-center justify-center transition-all shadow-sm cursor-pointer"
            aria-label="Previous destination"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/40 hover:bg-white/70 active:scale-95 backdrop-blur-md border border-white/40 text-slate-800 flex items-center justify-center transition-all shadow-sm cursor-pointer"
            aria-label="Next destination"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Track Container */}
          <div className="destinations-container py-8">
            {(() => {
              const destinations = [
                { name: "Saudi Arabia", img: "/images/sauid-arabia.jpg" },
                { name: "UAE", img: "/images/dubai.jpg" },
                { name: "Kuwait", img: "/images/kuwait.jpg" },
                { name: "Bahrain", img: "/images/Bahrain.jpg" },
                { name: "Jordan", img: "/images/jordan.png" },
                { name: "Oman", img: "/images/oman.webp" },
                { name: "Qatar", img: "/images/qatar.jpg" },
                { name: "Lebanon", img: "/images/lebanon.jpg" },
                { name: "And Beyond", img: "/images/hero-plane.jpg" },
              ];
              return (
                <div
                  className="destinations-track"
                  onTransitionEnd={handleTransitionEnd}
                  style={{
                    transform: `translateX(calc(50% - (var(--card-width) + var(--gap)) * ${currentIndex} - var(--card-width) / 2))`,
                    transition: transitionEnabled ? "transform 0.65s cubic-bezier(0.25, 1.25, 0.45, 1.05)" : "none",
                    gap: "var(--gap)",
                  }}
                >
                  {[...destinations, ...destinations, ...destinations].map((dest, idx) => {
                    const isFocused = idx === currentIndex;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (transitionEnabled) {
                            setCurrentIndex(idx);
                          }
                        }}
                        className={`shrink-0 w-[var(--card-width)] h-52 bg-white rounded-[32px] border relative overflow-hidden transition-all duration-500 cursor-pointer ${
                          isFocused
                            ? "scale-105 md:scale-110 border-brand-primary/30 shadow-lg z-20 opacity-100"
                            : "scale-90 md:scale-95 border-slate-200/50 opacity-60 z-10"
                        }`}
                      >
                        {/* Background image overlay */}
                        <div className="absolute inset-0 bg-slate-100 z-0">
                          <Image
                            src={dest.img}
                            alt={dest.name}
                            fill
                            className="object-cover transition-transform duration-700 filter brightness-[0.7] contrast-[0.9]"
                            sizes="340px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" />
                        </div>

                        {/* Glassmorphism Button Overlay (Centered headers with always visible arrow button) */}
                        <div className="absolute bottom-4 left-4 right-4 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-2 flex items-center justify-between transition-all duration-300 min-h-[52px]">
                          {/* Empty spacer to align the text in the absolute center */}
                          <div className="w-8 h-8 shrink-0" />
                          
                          <span className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-wide truncate text-center flex-1 px-1">
                            {dest.name}
                          </span>
                          
                          {/* Glassmorphic arrow button (always visible) */}
                          <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center shrink-0 transition-transform duration-300 active:scale-90">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* OUR ADVANTAGES SECTION */}
      <section id="advantages" className="w-full max-w-7xl mx-auto px-6 py-20 bg-[#f3f8fc] border-t border-slate-200/60 md:my-10">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-2 block">
            WHY WORK WITH US
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0f172a] uppercase">
            Our Key Advantages
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Setting the standard in foreign recruitment with a secure, legal, and candidate-first framework.
          </p>
        </div>

        {/* 3 Advantage Columns with borders and white cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-display font-extrabold text-lg text-[#0f172a] uppercase tracking-tight">
              100% Legal & Licensed
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mt-3">
              We hold official government licenses in Ethiopia and cooperate exclusively with registered overseas recruitment agencies, securing legitimate visas and labor contracts.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-display font-extrabold text-lg text-[#0f172a] uppercase tracking-tight">
              Fast, Honest Timelines
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mt-3">
              We provide realistic processing estimates and keep candidates updated during every step of their embassy checks, medical clearance, and visa approvals.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-display font-extrabold text-lg text-[#0f172a] uppercase tracking-tight">
              Active Candidate Safety
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mt-3">
              Every employer contract is vetted. We monitor deployed workers' welfare through post-deployment follow-up, ensuring they receive their agreed salaries, housing, and medical care.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / SUCCESS STORIES */}
      <section id="success" className="w-full max-w-7xl mx-auto px-6 py-20 bg-[#f3f8fc] border-t border-slate-200/60 md:my-10">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-2 block">
            VERIFIED OUTCOMES
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0f172a] uppercase">
            Candidate Success Stories
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
            Read stories from individuals who found legitimate, rewarding careers through SKY Agency.
          </p>
        </div>

        {/* 3 Success cards - Spacious padding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-sm"
            >
              <div>
                {/* Image header */}
                <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover"
                    sizes="(max-w-md) 100vw, 380px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-brand-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {story.country} Placed
                  </span>
                </div>

                {/* Rating stars & Quote */}
                <div className="p-6">
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#0f172a] leading-tight">
                    {story.name}
                  </h3>
                  <span className="text-xs text-brand-primary font-medium block mt-1 mb-3">{story.role}</span>

                  <p className="text-slate-500 text-sm leading-relaxed italic">
                    "{story.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="w-full max-w-4xl mx-auto px-6 py-20 bg-[#f3f8fc] border-t border-slate-200/60">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-2 block">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0f172a] uppercase">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto mt-2">
            Find answers to common questions about deployment processes, visa regulations, and support systems.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-3xl overflow-hidden transition-all shadow-sm">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 flex justify-between items-center text-left hover:bg-slate-50/50 transition-colors"
              >
                <span className="font-display font-bold text-[#0f172a] text-base pr-4">
                  {faq.q}
                </span>
                <span className="text-brand-primary font-bold shrink-0">
                  {openFaq === idx ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M20 12H4" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 border-t border-slate-100 pt-4 bg-slate-50/30">
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* DETAILED AGENCY CONTACT SECTION */}
      <section id="contact" className="w-full max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="bg-slate-900 text-white rounded-[32px] p-8 md:p-12 relative overflow-hidden border border-slate-800">
          {/* background geometric glow */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-primary/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-brand-primary/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
              GET IN TOUCH DIRECTLY
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl uppercase tracking-tight leading-tight">
              Ready to take the <br className="sm:hidden" /> next step in your career?
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              If you are a job seeker looking for an international job contract, or an employer looking to recruit skilled labor, contact our support team.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center pt-4">
              {/* Phone Card */}
              <a
                href="tel:0910918428"
                className="w-full sm:w-auto flex items-center gap-4 bg-white/5 border border-white/10 hover:border-brand-primary hover:bg-white/10 p-4 px-6 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-[#ebf8ff] text-brand-primary flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">CALL US DIRECTLY</span>
                  <span className="text-base font-extrabold text-white">0910918428</span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:Skyagency64@gmail.com"
                className="w-full sm:w-auto flex items-center gap-4 bg-white/5 border border-white/10 hover:border-brand-primary hover:bg-white/10 p-4 px-6 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-[#ebf8ff] text-brand-primary flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">EMAIL AN INQUIRY</span>
                  <span className="text-base font-extrabold text-white">Skyagency64@gmail.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#0f172a] text-slate-400 py-12 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-extrabold text-sm tracking-wider">
                S
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white uppercase">
                Sky agency.
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              SKY Foreign Employment Agency connects citizens with overseas jobs. Officially licensed recruitment agency coordinating work visa processes.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Navigation</h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <a href="#home" className="hover:text-brand-primary transition-colors">Home</a>
              <a href="#about" className="hover:text-brand-primary transition-colors">About Us</a>
              <a href="#services" className="hover:text-brand-primary transition-colors">Our Services</a>
              <a href="#destinations" className="hover:text-brand-primary transition-colors">Featured Destinations</a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Agency Information</h4>
            <div className="space-y-3 text-xs">
              <div className="flex gap-2.5 items-center">
                <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:0910918428" className="hover:underline hover:text-white">0910918428</a>
              </div>
              <div className="flex gap-2.5 items-center">
                <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:Skyagency64@gmail.com" className="hover:underline hover:text-white">Skyagency64@gmail.com</a>
              </div>
              <div className="flex gap-2.5 items-start">
                <svg className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-slate-500">Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 text-center text-[10px] text-slate-600">
          <p>© {new Date().getFullYear()} SKY Foreign Employment Agency. All Rights Reserved. Private Relocation & Placement Licensing.</p>
        </div>
      </footer>
    </div>
  );
}
