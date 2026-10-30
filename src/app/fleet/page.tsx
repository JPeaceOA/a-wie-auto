"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import FleetSection from "@/components/FleetSection";
import Footer from "@/components/Footer";
import TestDriveModal from "@/components/TestDriveModal";
import ComparisonDrawer from "@/components/ComparisonDrawer";
import SavedVehiclesModal from "@/components/SavedVehiclesModal";
import { Car, CARS } from "@/data/cars";

export default function FleetPage() {
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);
  const [testDriveCarModel, setTestDriveCarModel] = useState<string | undefined>();
  const [savedCarModalOpen, setSavedCarModalOpen] = useState(false);
  const [savedCarIds, setSavedCarIds] = useState<string[]>(["phantom-x9", "obsidian-ultra"]);
  const [compareCarIds, setCompareCarIds] = useState<string[]>([]);

  const handleOpenTestDrive = (carModel?: string) => {
    setTestDriveCarModel(carModel);
    setTestDriveModalOpen(true);
  };

  const handleToggleSave = (carId: string) => {
    setSavedCarIds((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const handleToggleCompare = (car: Car) => {
    setCompareCarIds((prev) => {
      if (prev.includes(car.id)) {
        return prev.filter((id) => id !== car.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 vehicles at a time.");
        return prev;
      }
      return [...prev, car.id];
    });
  };

  const compareCars = CARS.filter((car) => compareCarIds.includes(car.id));

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0F0] selection:bg-[#E8001D] selection:text-white">
      <NavBar
        onOpenTestDrive={handleOpenTestDrive}
        savedCount={savedCarIds.length}
        onOpenSavedModal={() => setSavedCarModalOpen(true)}
      />

      <main className="pt-24 pb-16">
        <FleetSection
          onOpenTestDrive={handleOpenTestDrive}
          savedCarIds={savedCarIds}
          onToggleSave={handleToggleSave}
          compareCarIds={compareCarIds}
          onToggleCompare={handleToggleCompare}
        />
      </main>

      <Footer onOpenTestDrive={handleOpenTestDrive} />

      <TestDriveModal
        isOpen={testDriveModalOpen}
        onClose={() => setTestDriveModalOpen(false)}
        defaultCarModel={testDriveCarModel}
      />

      <ComparisonDrawer
        compareCars={compareCars}
        onRemoveCar={(carId) =>
          setCompareCarIds((prev) => prev.filter((id) => id !== carId))
        }
        onClearAll={() => setCompareCarIds([])}
      />

      <SavedVehiclesModal
        isOpen={savedCarModalOpen}
        onClose={() => setSavedCarModalOpen(false)}
        savedCarIds={savedCarIds}
        onRemoveSave={handleToggleSave}
        onOpenTestDrive={handleOpenTestDrive}
      />
    </div>
  );
}
