"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, ShieldAlert, Sparkles } from "lucide-react";
import { CARS } from "@/data/cars";
import { useCurrency } from "@/context/CurrencyContext";

interface SpecsHighlightProps {
  onOpenTestDrive?: (carModel?: string) => void;
}

export default function SpecsHighlight({ onOpenTestDrive }: SpecsHighlightProps) {
  const { formatPrice } = useCurrency();
  const car = CARS.find((c) => c.id === "obsidian-ultra") || CARS[0];

  const highlightSpecs = [
    { label: "0–100 km/h", val: car.specs["0–100 km/h"] || "2.5 s" },
    { label: "Top Speed", val: car.specs["Top Speed"] },
    { label: "Power Output", val: car.specs.Power },
    { label: "Engine Block", val: car.specs.Engine || "6.5L V12 NA" },
  ];

  return (
    <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="Featured Highlight">
      <div className="relative bg-[#12121A] border border-[#E8001D]/40 p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* Ambient red gradient aura */}
        <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-[#E8001D]/10 via-[#4A00FF]/5 to-transparent pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Information & CTAs */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-[#E8001D] font-['Rajdhani',sans-serif] text-xs uppercase tracking-[0.25em] font-bold mb-3">
              <Flame className="w-4 h-4 text-[#E8001D]" />
              <span>Flagship Showcase</span>
            </div>

            <h2 className="font-['Orbitron',sans-serif] text-3xl sm:text-5xl font-black uppercase text-white leading-tight mb-4">
              {car.brand} <br />
              <span className="text-[#E8001D]">{car.name}</span>
            </h2>

            <p className="font-['Rajdhani',sans-serif] text-xl italic text-white/90 border-l-2 border-[#E8001D] pl-4 mb-4">
              "{car.tagline}"
            </p>

            <p className="text-sm sm:text-base text-[#A8AABD] leading-relaxed mb-8 max-w-xl">
              {car.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/cars/${car.id}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#E8001D] hover:bg-[#9E0013] text-white font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-wider clip-parallelogram shadow-[0_0_20px_rgba(232,0,29,0.5)] transition-all hover:scale-105 active:scale-95"
              >
                <span>Full Specifications</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => onOpenTestDrive && onOpenTestDrive(`${car.brand} ${car.name}`)}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#A8AABD]/30 hover:border-[#E8001D] text-white hover:text-[#E8001D] bg-[#0A0A0F]/60 font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-wider clip-parallelogram transition-all"
              >
                <span>Request a Quote</span>
              </button>
            </div>
          </div>

          {/* Right Column: Specs Grid & Price */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              {highlightSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="p-5 bg-[#0A0A0F]/80 border border-[#2E2E35] hover:border-[#E8001D]/40 transition-colors"
                >
                  <div className="font-['Orbitron',sans-serif] text-xl sm:text-2xl font-bold text-white mb-1">
                    {spec.val}
                  </div>
                  <div className="font-['Rajdhani',sans-serif] text-xs font-semibold tracking-wider uppercase text-[#A8AABD]">
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Banner */}
            <div className="p-6 bg-[#0A0A0F] border-l-4 border-[#E8001D] flex flex-col justify-center">
              <span className="font-['Rajdhani',sans-serif] text-xs tracking-widest uppercase text-[#5A5A70] mb-1">
                Starting From
              </span>
              <div className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl font-black text-[#E8001D] mb-1">
                {formatPrice(car.numericPrice)}
              </div>
              <span className="font-['Rajdhani',sans-serif] text-xs text-[#A8AABD] tracking-wider uppercase">
                {car.badge} · {car.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
