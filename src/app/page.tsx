"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Flame, MapPin, Sparkles, Shield, ChevronRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import DataTicker from "@/components/DataTicker";
import Footer from "@/components/Footer";
import TestDriveModal from "@/components/TestDriveModal";
import SavedVehiclesModal from "@/components/SavedVehiclesModal";
import { CARS } from "@/data/cars";
import { useCurrency } from "@/context/CurrencyContext";

export default function Home() {
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);
  const [testDriveCarModel, setTestDriveCarModel] = useState<string | undefined>();
  const [savedCarModalOpen, setSavedCarModalOpen] = useState(false);
  const [savedCarIds, setSavedCarIds] = useState<string[]>(["phantom-x9", "obsidian-ultra"]);
  const { formatPrice } = useCurrency();

  const handleOpenTestDrive = (carModel?: string) => {
    setTestDriveCarModel(carModel);
    setTestDriveModalOpen(true);
  };

  const previewCars = CARS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F0] selection:bg-[#E8001D] selection:text-white">
      <NavBar
        onOpenTestDrive={handleOpenTestDrive}
        savedCount={savedCarIds.length}
        onOpenSavedModal={() => setSavedCarModalOpen(true)}
      />

      <main>
        {/* Cinematic Hero */}
        <HeroSection onOpenTestDrive={handleOpenTestDrive} />

        {/* Looping Factoid Ticker */}
        <DataTicker />

        {/* Section Gateway Hub: Direct side-page navigators */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 text-[#E8001D] font-['Rajdhani',sans-serif] text-xs uppercase tracking-[0.25em] font-bold mb-2">
              <span className="w-6 h-[2px] bg-[#E8001D]" />
              <span>Explore Departments</span>
            </div>
            <h2 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Precision Portals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Fleet Portal Card */}
            <Link
              href="/fleet"
              className="group flex flex-col justify-between bg-[#12121A] border border-[#2E2E35] hover:border-[#E8001D] p-8 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(232,0,29,0.2)]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8001D]/5 rounded-bl-full pointer-events-none group-hover:bg-[#E8001D]/15 transition-colors" />

              <div>
                <div className="w-12 h-12 bg-[#E8001D]/10 text-[#E8001D] flex items-center justify-center mb-6 clip-diamond shadow-[0_0_15px_rgba(232,0,29,0.3)]">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="font-['Rajdhani',sans-serif] text-xs uppercase font-bold tracking-[0.2em] text-[#E8001D]">
                  Complete Catalog
                </span>
                <h3 className="font-['Orbitron',sans-serif] text-2xl font-bold uppercase text-white mt-1 mb-3 group-hover:text-[#E8001D] transition-colors">
                  The Fleet
                </h3>
                <p className="text-sm text-[#A8AABD] leading-relaxed mb-6">
                  Explore all 6 curated performance sedans, supercars, SUVs, and luxury tourers. Filter by category, test speed, and compare side-by-side.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {["Sedan", "Sports", "Electric", "Supercar"].map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-[#0A0A0F] border border-[#2E2E35] text-[11px] font-['Rajdhani',sans-serif] uppercase tracking-wider text-[#A8AABD]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="inline-flex items-center gap-2 font-['Rajdhani',sans-serif] text-sm uppercase tracking-wider font-bold text-white group-hover:text-[#E8001D] transition-colors pt-4 border-t border-[#2E2E35]">
                <span>Open Fleet Page</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* 2. Featured Portal Card */}
            <Link
              href="/featured"
              className="group flex flex-col justify-between bg-[#12121A] border border-[#2E2E35] hover:border-[#E8001D] p-8 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(232,0,29,0.2)]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A00FF]/5 rounded-bl-full pointer-events-none group-hover:bg-[#4A00FF]/15 transition-colors" />

              <div>
                <div className="w-12 h-12 bg-[#4A00FF]/10 text-[#4A00FF] flex items-center justify-center mb-6 clip-diamond shadow-[0_0_15px_rgba(74,0,255,0.4)]">
                  <Flame className="w-6 h-6" />
                </div>
                <span className="font-['Rajdhani',sans-serif] text-xs uppercase font-bold tracking-[0.2em] text-[#4A00FF]">
                  Flagship Showcase
                </span>
                <h3 className="font-['Orbitron',sans-serif] text-2xl font-bold uppercase text-white mt-1 mb-3 group-hover:text-[#E8001D] transition-colors">
                  Featured Icon
                </h3>
                <p className="text-sm text-[#A8AABD] leading-relaxed mb-6">
                  Deep-dive into the Lamborghini Obsidian Ultra: naturally aspirated 6.5L V12, 830 horsepower, and a top speed exceeding 355 km/h.
                </p>

                <div className="p-3 bg-[#0A0A0F] border border-[#2E2E35] mb-6">
                  <div className="font-['Orbitron',sans-serif] text-sm font-bold text-[#E8001D]">
                    Obsidian Ultra · 2.5s 0–100
                  </div>
                  <div className="text-[11px] text-[#A8AABD] font-['Rajdhani',sans-serif] uppercase">
                    1 of 200 Limited Units
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 font-['Rajdhani',sans-serif] text-sm uppercase tracking-wider font-bold text-white group-hover:text-[#E8001D] transition-colors pt-4 border-t border-[#2E2E35]">
                <span>View Featured Page</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* 3. Contact & Showroom Portal Card */}
            <Link
              href="/contact"
              className="group flex flex-col justify-between bg-[#12121A] border border-[#2E2E35] hover:border-[#E8001D] p-8 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(232,0,29,0.2)]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8001D]/5 rounded-bl-full pointer-events-none group-hover:bg-[#E8001D]/15 transition-colors" />

              <div>
                <div className="w-12 h-12 bg-[#E8001D]/10 text-[#E8001D] flex items-center justify-center mb-6 clip-diamond shadow-[0_0_15px_rgba(232,0,29,0.3)]">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="font-['Rajdhani',sans-serif] text-xs uppercase font-bold tracking-[0.2em] text-[#E8001D]">
                  Showroom & Concierge
                </span>
                <h3 className="font-['Orbitron',sans-serif] text-2xl font-bold uppercase text-white mt-1 mb-3 group-hover:text-[#E8001D] transition-colors">
                  Contact Us
                </h3>
                <p className="text-sm text-[#A8AABD] leading-relaxed mb-6">
                  Connect with our Frankfurt client advisors, arrange enclosed delivery, request personal test drives, or submit acquisition inquiries.
                </p>

                <div className="p-3 bg-[#0A0A0F] border border-[#2E2E35] text-xs text-[#A8AABD] mb-6 space-y-1">
                  <div>Kaiserstrasse 88, Frankfurt am Main</div>
                  <div className="text-white font-['Orbitron',sans-serif] text-[11px]">+49 69 123 456 78</div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 font-['Rajdhani',sans-serif] text-sm uppercase tracking-wider font-bold text-white group-hover:text-[#E8001D] transition-colors pt-4 border-t border-[#2E2E35]">
                <span>Visit Contact Page</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </section>

        {/* Featured Vehicle Teaser Strip */}
        <section className="py-16 bg-[#12121A]/60 border-y border-[#2E2E35]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="font-['Orbitron',sans-serif] text-xl font-bold uppercase text-white">
                  Quick Fleet Preview
                </h3>
                <p className="text-xs text-[#A8AABD]">
                  Hand-selected machines ready for immediate delivery.
                </p>
              </div>

              <Link
                href="/fleet"
                className="inline-flex items-center gap-2 text-xs font-['Rajdhani',sans-serif] uppercase tracking-wider font-bold text-[#E8001D] hover:underline"
              >
                <span>View All 6 Vehicles</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {previewCars.map((car) => (
                <Link
                  key={car.id}
                  href={`/cars/${car.id}`}
                  className="group bg-[#0A0A0F] border border-[#2E2E35] hover:border-[#E8001D]/60 p-4 transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden mb-3 bg-black">
                    <Image
                      src={car.images[0]}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#E8001D] text-white text-[10px] font-bold uppercase font-['Rajdhani',sans-serif]">
                      {car.badge}
                    </span>
                  </div>
                  <div className="font-['Rajdhani',sans-serif] text-[11px] font-bold uppercase text-[#E8001D]">
                    {car.brand}
                  </div>
                  <div className="font-['Orbitron',sans-serif] text-base font-bold text-white group-hover:text-[#E8001D] transition-colors">
                    {car.name}
                  </div>
                  <div className="font-['Orbitron',sans-serif] text-sm text-[#E8001D] font-medium mt-1">
                    {formatPrice(car.numericPrice)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenTestDrive={handleOpenTestDrive} />

      {/* Interactive Overlays */}
      <TestDriveModal
        isOpen={testDriveModalOpen}
        onClose={() => setTestDriveModalOpen(false)}
        defaultCarModel={testDriveCarModel}
      />

      <SavedVehiclesModal
        isOpen={savedCarModalOpen}
        onClose={() => setSavedCarModalOpen(false)}
        savedCarIds={savedCarIds}
        onRemoveSave={(id) =>
          setSavedCarIds((prev) => prev.filter((i) => i !== id))
        }
        onOpenTestDrive={handleOpenTestDrive}
      />
    </div>
  );
}
