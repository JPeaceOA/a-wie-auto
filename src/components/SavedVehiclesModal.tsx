"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Heart, Trash2, ArrowRight } from "lucide-react";
import { CARS } from "@/data/cars";
import { useCurrency } from "@/context/CurrencyContext";

interface SavedVehiclesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCarIds: string[];
  onRemoveSave: (carId: string) => void;
  onOpenTestDrive: (carModel?: string) => void;
}

export default function SavedVehiclesModal({
  isOpen,
  onClose,
  savedCarIds,
  onRemoveSave,
  onOpenTestDrive,
}: SavedVehiclesModalProps) {
  const { formatPrice } = useCurrency();
  if (!isOpen) return null;

  const savedCars = CARS.filter((car) => savedCarIds.includes(car.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#12121A] border border-[#E8001D]/40 shadow-[0_0_40px_rgba(232,0,29,0.2)] p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#2E2E35] mb-6">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#E8001D] fill-[#E8001D]" />
            <h3 className="font-['Orbitron',sans-serif] text-xl font-bold uppercase text-white">
              Your Curated Collection ({savedCars.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#A8AABD] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {savedCars.length === 0 ? (
          <div className="py-12 text-center">
            <Heart className="w-12 h-12 text-[#2E2E35] mx-auto mb-3" />
            <p className="font-['Orbitron',sans-serif] text-base text-white mb-1">
              Your wishlist is empty
            </p>
            <p className="text-xs text-[#A8AABD] mb-6">
              Browse the fleet and click the heart icon on any model to save it to your collection.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-[#E8001D] text-white font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-wider clip-parallelogram-sm"
            >
              Explore Fleet
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {savedCars.map((car) => (
              <div
                key={car.id}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-[#0A0A0F] border border-[#2E2E35] hover:border-[#E8001D]/50 transition-colors"
              >
                <div className="relative w-full sm:w-36 aspect-[16/10] overflow-hidden flex-shrink-0 bg-black">
                  <Image
                    src={car.images[0]}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="font-['Rajdhani',sans-serif] text-[11px] font-bold uppercase tracking-wider text-[#E8001D]">
                    {car.brand}
                  </span>
                  <h4 className="font-['Orbitron',sans-serif] text-base font-bold text-white truncate">
                    {car.name}
                  </h4>
                  <p className="font-['Orbitron',sans-serif] text-sm text-[#E8001D] font-medium mt-0.5">
                    {formatPrice(car.numericPrice)}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Link
                    href={`/cars/${car.id}`}
                    onClick={onClose}
                    className="px-3.5 py-1.5 bg-[#2E2E35] hover:bg-[#E8001D] text-white text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider clip-parallelogram-sm transition-colors flex items-center gap-1"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenTestDrive(`${car.brand} ${car.name}`);
                    }}
                    className="px-3.5 py-1.5 bg-[#E8001D] hover:bg-[#9E0013] text-white text-xs font-['Rajdhani',sans-serif] font-bold uppercase tracking-wider clip-parallelogram-sm transition-colors"
                  >
                    Test Drive
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemoveSave(car.id)}
                    className="p-2 text-[#5A5A70] hover:text-[#E8001D] transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
