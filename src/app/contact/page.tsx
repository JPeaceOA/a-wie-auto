"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TestDriveModal from "@/components/TestDriveModal";
import SavedVehiclesModal from "@/components/SavedVehiclesModal";

export default function ContactPage() {
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);
  const [testDriveCarModel, setTestDriveCarModel] = useState<string | undefined>();
  const [savedCarModalOpen, setSavedCarModalOpen] = useState(false);
  const [savedCarIds, setSavedCarIds] = useState<string[]>([]);

  const handleOpenTestDrive = (carModel?: string) => {
    setTestDriveCarModel(carModel);
    setTestDriveModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F0] selection:bg-[#E8001D] selection:text-white">
      <NavBar
        onOpenTestDrive={handleOpenTestDrive}
        savedCount={savedCarIds.length}
        onOpenSavedModal={() => setSavedCarModalOpen(true)}
      />

      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="inline-flex items-center gap-2 text-[#E8001D] font-['Rajdhani',sans-serif] text-xs uppercase tracking-[0.25em] font-bold mb-2">
            <span className="w-6 h-[2px] bg-[#E8001D]" />
            <span>Showroom & Headquarters</span>
          </div>
          <h1 className="font-['Orbitron',sans-serif] text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Direct Concierge Access
          </h1>
          <p className="text-[#A8AABD] max-w-2xl text-base leading-relaxed">
            Located in the financial center of Frankfurt am Main with direct highway and airport links.
            Private underground viewing bays available for discrete vehicle appraisals.
          </p>
        </div>

        <ContactSection prefilledVehicle={testDriveCarModel} />
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
