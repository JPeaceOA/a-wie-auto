"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Share2,
  Check,
  Calculator,
  ShieldCheck,
  Zap,
  Gauge,
  Activity,
  Sparkles,
} from "lucide-react";
import { Car } from "@/data/cars";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import TestDriveModal from "@/components/TestDriveModal";
import { useCurrency } from "@/context/CurrencyContext";

interface CarDetailClientProps {
  car: Car;
}

export default function CarDetailClient({ car }: CarDetailClientProps) {
  const { formatPrice, convertPrice, currentConfig } = useCurrency();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Finance Calculator State
  const [depositPercent, setDepositPercent] = useState(20);
  const [termMonths, setTermMonths] = useState(48);
  const [apr, setApr] = useState(4.9);

  // Calculate monthly payment in active currency
  const vehiclePrice = convertPrice(car.numericPrice);
  const depositAmount = (vehiclePrice * depositPercent) / 100;
  const loanPrincipal = vehiclePrice - depositAmount;
  const monthlyRate = apr / 100 / 12;
  const monthlyPayment =
    loanPrincipal > 0
      ? (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
        (Math.pow(1 + monthlyRate, termMonths) - 1)
      : 0;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + car.images.length) % car.images.length
    );
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F0]">
      <NavBar onOpenTestDrive={() => setTestDriveOpen(true)} />

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center justify-between py-6">
          <Link
            href="/#fleet"
            className="inline-flex items-center gap-2 font-['Rajdhani',sans-serif] text-sm uppercase tracking-wider text-[#A8AABD] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#E8001D]" />
            <span>Return to Fleet</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#12121A] border border-[#2E2E35] text-[#A8AABD] hover:text-white text-xs font-['Rajdhani',sans-serif] uppercase tracking-wider transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Machine</span>
              </>
            )}
          </button>
        </div>

        {/* Hero Section: Carousel (Left) + Dossier (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#12121A] border border-[#2E2E35] p-6 sm:p-8 lg:p-10 mb-16">
          {/* Carousel */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="relative aspect-[16/10] bg-black overflow-hidden border border-[#2E2E35] group">
              <Image
                src={car.images[activeImageIndex]}
                alt={`${car.brand} ${car.name}`}
                fill
                priority
                className="object-cover transition-opacity duration-300"
              />

              {/* Prev / Next controls */}
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-[#E8001D] text-white flex items-center justify-center transition-colors border border-[#2E2E35]"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-[#E8001D] text-white flex items-center justify-center transition-colors border border-[#2E2E35]"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Index counter */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 font-['Rajdhani',sans-serif] text-xs text-white/80 tracking-widest border border-white/10">
                {activeImageIndex + 1} / {car.images.length}
              </div>

              {/* Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 bg-[#E8001D] font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-wider text-white clip-parallelogram-sm">
                {car.badge}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-3 gap-3">
              {car.images.map((src, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[16/10] bg-black overflow-hidden border-2 transition-all ${
                    idx === activeImageIndex
                      ? "border-[#E8001D] shadow-[0_0_12px_rgba(232,0,29,0.5)]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Dossier & Pricing */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[#E8001D] mb-1">
                <span>{car.brand}</span>
                <span>·</span>
                <span>{car.category}</span>
              </div>

              <h1 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl font-black uppercase text-white mb-3">
                {car.name}
              </h1>

              <p className="font-['Rajdhani',sans-serif] text-base italic text-[#A8AABD] border-l-2 border-[#E8001D] pl-3 mb-6">
                "{car.tagline}"
              </p>

              <p className="text-sm text-[#A8AABD] leading-relaxed mb-6">
                {car.description}
              </p>

              {/* Price Block */}
              <div className="p-4 bg-[#0A0A0F] border-l-4 border-[#E8001D] mb-6">
                <span className="block font-['Rajdhani',sans-serif] text-[11px] tracking-wider uppercase text-[#5A5A70]">
                  Starting Acquisition Value
                </span>
                <span className="font-['Orbitron',sans-serif] text-3xl font-bold text-[#E8001D]">
                  {formatPrice(car.numericPrice)}
                </span>
                <span className="block text-[11px] text-[#A8AABD] mt-1">
                  Excl. bespoke tailoring & local registration taxes.
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setTestDriveOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 bg-[#E8001D] hover:bg-[#9E0013] text-white font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-wider clip-parallelogram shadow-[0_0_15px_rgba(232,0,29,0.4)] transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Test Drive</span>
              </button>

              <a
                href="#finance"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 border border-[#2E2E35] hover:border-[#E8001D] text-white bg-[#0A0A0F] font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-wider clip-parallelogram transition-colors"
              >
                <Calculator className="w-4 h-4 text-[#E8001D]" />
                <span>Finance Plan</span>
              </a>
            </div>
          </div>
        </div>

        {/* Technical Data Specifications Table */}
        <section className="mb-16" aria-label="Technical Specifications">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#2E2E35]">
            <h2 className="font-['Orbitron',sans-serif] text-2xl font-bold uppercase text-white flex items-center gap-2">
              <Gauge className="w-6 h-6 text-[#E8001D]" />
              <span>Technical Data</span>
            </h2>
            <span className="font-['Rajdhani',sans-serif] text-xs uppercase tracking-wider text-[#A8AABD]">
              Official Factory Homologation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 bg-[#12121A] border border-[#2E2E35] p-6">
            {Object.entries(car.specs).map(([key, val]) => (
              <div
                key={key}
                className="flex items-center justify-between py-3 border-b border-[#2E2E35]/50 hover:bg-[#1A1A24] px-3 transition-colors"
              >
                <span className="font-['Rajdhani',sans-serif] text-sm font-semibold uppercase tracking-wider text-[#A8AABD]">
                  {key}
                </span>
                <span className="font-['Orbitron',sans-serif] text-sm font-bold text-white">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="mb-16" aria-label="Key Features">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#2E2E35]">
            <h2 className="font-['Orbitron',sans-serif] text-2xl font-bold uppercase text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#E8001D]" />
              <span>Engineered Highlights</span>
            </h2>
            <span className="font-['Rajdhani',sans-serif] text-xs uppercase tracking-wider text-[#A8AABD]">
              Standard & Bespoke Systems
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {car.features.map((feature, i) => (
              <div
                key={i}
                className="p-4 bg-[#12121A] border border-[#2E2E35] flex items-start gap-3 hover:border-[#E8001D]/40 transition-colors"
              >
                <div className="w-3.5 h-3.5 clip-diamond bg-[#E8001D] flex-shrink-0 mt-1 shadow-[0_0_8px_#E8001D]" />
                <p className="text-sm text-[#A8AABD] leading-snug">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Finance Calculator */}
        <section id="finance" className="mb-16 scroll-mt-28" aria-label="Finance Calculator">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#2E2E35]">
            <h2 className="font-['Orbitron',sans-serif] text-2xl font-bold uppercase text-white flex items-center gap-2">
              <Calculator className="w-6 h-6 text-[#E8001D]" />
              <span>Bespoke Finance Estimator</span>
            </h2>
            <span className="font-['Rajdhani',sans-serif] text-xs uppercase tracking-wider text-[#A8AABD]">
              Custom Tailored Leasing & Purchase
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#12121A] border border-[#2E2E35] p-6 sm:p-8">
            <div className="lg:col-span-7 space-y-6">
              {/* Deposit Slider */}
              <div>
                <div className="flex justify-between items-center text-sm font-['Rajdhani',sans-serif] uppercase tracking-wider mb-2">
                  <span className="text-[#A8AABD]">Down Payment Deposit ({depositPercent}%)</span>
                  <span className="font-['Orbitron',sans-serif] text-white font-bold">
                    {currentConfig.symbol}{Math.round(depositAmount).toLocaleString("en-US")}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={depositPercent}
                  onChange={(e) => setDepositPercent(Number(e.target.value))}
                  className="w-full accent-[#E8001D] cursor-pointer"
                />
              </div>

              {/* Term Duration */}
              <div>
                <span className="block text-sm font-['Rajdhani',sans-serif] uppercase tracking-wider text-[#A8AABD] mb-2">
                  Financing Term (Months)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[24, 36, 48, 60].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setTermMonths(term)}
                      className={`py-2 text-center font-['Orbitron',sans-serif] text-sm font-bold border transition-colors ${
                        termMonths === term
                          ? "bg-[#E8001D] border-[#E8001D] text-white shadow-[0_0_10px_rgba(232,0,29,0.5)]"
                          : "bg-[#0A0A0F] border-[#2E2E35] text-[#A8AABD] hover:text-white"
                      }`}
                    >
                      {term} mo
                    </button>
                  ))}
                </div>
              </div>

              {/* APR Rate */}
              <div>
                <div className="flex justify-between items-center text-sm font-['Rajdhani',sans-serif] uppercase tracking-wider mb-2">
                  <span className="text-[#A8AABD]">Interest Rate (APR)</span>
                  <span className="font-['Orbitron',sans-serif] text-white font-bold">{apr}%</span>
                </div>
                <input
                  type="range"
                  min="2.9"
                  max="8.9"
                  step="0.1"
                  value={apr}
                  onChange={(e) => setApr(Number(e.target.value))}
                  className="w-full accent-[#E8001D] cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Monthly Estimate */}
            <div className="lg:col-span-5 p-6 bg-[#0A0A0F] border border-[#E8001D]/40 flex flex-col justify-between">
              <div>
                <span className="font-['Rajdhani',sans-serif] text-xs uppercase tracking-widest text-[#5A5A70]">
                  Estimated Monthly Installment
                </span>
                <div className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl font-black text-[#E8001D] my-2">
                  {currentConfig.symbol}{Math.round(monthlyPayment).toLocaleString("en-US")}
                  <span className="text-sm font-normal text-[#A8AABD]"> / mo</span>
                </div>
                <div className="text-xs text-[#A8AABD] space-y-1.5 pt-3 border-t border-[#2E2E35]">
                  <div className="flex justify-between">
                    <span>Financed Principal:</span>
                    <strong className="text-white">
                      {currentConfig.symbol}{Math.round(loanPrincipal).toLocaleString("en-US")}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Term Duration:</span>
                    <strong className="text-white">{termMonths} Months</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Effective APR:</span>
                    <strong className="text-white">{apr}% fixed</strong>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTestDriveOpen(true)}
                className="mt-6 w-full py-3 bg-[#E8001D] hover:bg-[#9E0013] text-white font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-widest clip-parallelogram-sm transition-all text-center"
              >
                Apply for Pre-Approval
              </button>
            </div>
          </div>
        </section>

        {/* Manufacturer Heritage Section */}
        <section aria-label="Manufacturer Background">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#2E2E35]">
            <h2 className="font-['Orbitron',sans-serif] text-2xl font-bold uppercase text-white">
              The Maker: {car.manufacturerInfo.brand}
            </h2>
            <span className="font-['Rajdhani',sans-serif] text-xs uppercase tracking-wider text-[#A8AABD]">
              Est. {car.manufacturerInfo.founded} · {car.manufacturerInfo.origin}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#12121A] border border-[#2E2E35] p-6 sm:p-8">
            <div className="lg:col-span-8">
              <p className="text-sm sm:text-base text-[#A8AABD] leading-relaxed mb-6">
                {car.manufacturerInfo.about}
              </p>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#2E2E35] lg:pl-8 pt-6 lg:pt-0">
              <h4 className="font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-wider text-[#E8001D] mb-3">
                Related Lineage Models
              </h4>
              <ul className="space-y-2">
                {car.manufacturerInfo.relatedModels.map((model) => (
                  <li
                    key={model}
                    className="p-2.5 bg-[#0A0A0F] border border-[#2E2E35] text-xs text-white font-['Rajdhani',sans-serif] font-semibold tracking-wider flex items-center justify-between"
                  >
                    <span>{model}</span>
                    <span className="text-[10px] text-[#A8AABD] uppercase">Archived</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenTestDrive={() => setTestDriveOpen(true)} />

      {/* Test Drive Modal */}
      <TestDriveModal
        isOpen={testDriveOpen}
        onClose={() => setTestDriveOpen(false)}
        defaultCarModel={`${car.brand} ${car.name}`}
      />
    </div>
  );
}
