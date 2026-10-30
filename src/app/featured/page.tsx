"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, ShieldAlert, Sparkles, Compass } from "lucide-react";
import NavBar from "@/components/NavBar";
import SpecsHighlight from "@/components/SpecsHighlight";
import Footer from "@/components/Footer";
import TestDriveModal from "@/components/TestDriveModal";
import SavedVehiclesModal from "@/components/SavedVehiclesModal";
import { CARS } from "@/data/cars";
import { useCurrency } from "@/context/CurrencyContext";

export default function FeaturedPage() {
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);
  const [testDriveCarModel, setTestDriveCarModel] = useState<string | undefined>("Lamborghini Obsidian Ultra");
  const [savedCarModalOpen, setSavedCarModalOpen] = useState(false);
  const [savedCarIds, setSavedCarIds] = useState<string[]>(["obsidian-ultra"]);
  const { formatPrice } = useCurrency();

  const handleOpenTestDrive = (carModel?: string) => {
    setTestDriveCarModel(carModel);
    setTestDriveModalOpen(true);
  };

  const flagshipCars = CARS.filter((c) => ["obsidian-ultra", "argent-one", "tempest-gtr"].includes(c.id));

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F0] selection:bg-[#E8001D] selection:text-white">
      <NavBar
        onOpenTestDrive={handleOpenTestDrive}
        savedCount={savedCarIds.length}
        onOpenSavedModal={() => setSavedCarModalOpen(true)}
      />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="inline-flex items-center gap-2 text-[#E8001D] font-['Rajdhani',sans-serif] text-xs uppercase tracking-[0.25em] font-bold mb-2">
            <span className="w-6 h-[2px] bg-[#E8001D]" />
            <span>Curated Icons</span>
          </div>
          <h1 className="font-['Orbitron',sans-serif] text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Featured Masterpieces
          </h1>
          <p className="text-[#A8AABD] max-w-2xl text-base leading-relaxed">
            Every vehicle in our featured lineup represents the pinnacle of its respective category.
            Hand-inspected, benchmarked, and ready for closed-track validation.
          </p>
        </div>

        {/* Main Flagship Highlight */}
        <SpecsHighlight onOpenTestDrive={handleOpenTestDrive} />

        {/* Other Notable Flagship Models */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="mb-10">
            <h2 className="font-['Orbitron',sans-serif] text-2xl sm:text-3xl font-bold uppercase text-white mb-2">
              Complementary Flagships
            </h2>
            <p className="text-sm text-[#A8AABD]">
              Additional rare allocations available for private demonstration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {flagshipCars.map((car) => (
              <div
                key={car.id}
                className="bg-[#12121A] border border-[#2E2E35] p-5 hover:border-[#E8001D]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-black">
                    <Image
                      src={car.images[0]}
                      alt={car.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#E8001D] text-white text-[10px] font-bold uppercase tracking-wider font-['Rajdhani',sans-serif]">
                      {car.badge}
                    </span>
                  </div>

                  <span className="text-xs uppercase font-['Rajdhani',sans-serif] font-bold text-[#E8001D] tracking-wider">
                    {car.brand}
                  </span>
                  <h3 className="font-['Orbitron',sans-serif] text-lg font-bold text-white mb-2">
                    {car.name}
                  </h3>
                  <p className="text-xs text-[#A8AABD] line-clamp-2 mb-4 leading-relaxed">
                    {car.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2E2E35] flex items-center justify-between">
                  <span className="font-['Orbitron',sans-serif] text-base font-bold text-[#E8001D]">
                    {formatPrice(car.numericPrice)}
                  </span>
                  <Link
                    href={`/cars/${car.id}`}
                    className="inline-flex items-center gap-1 text-xs uppercase font-['Rajdhani',sans-serif] font-bold text-white hover:text-[#E8001D]"
                  >
                    <span>Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2E2E35] hover:bg-[#E8001D] text-white font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-wider clip-parallelogram transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Browse All Fleet Models</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer onOpenTestDrive={handleOpenTestDrive} />

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
