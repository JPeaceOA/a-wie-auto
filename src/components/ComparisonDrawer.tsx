"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Scale, X, ArrowRight, Check } from "lucide-react";
import { Car } from "@/data/cars";
import { useCurrency } from "@/context/CurrencyContext";

interface ComparisonDrawerProps {
  compareCars: Car[];
  onRemoveCar: (carId: string) => void;
  onClearAll: () => void;
}

export default function ComparisonDrawer({
  compareCars,
  onRemoveCar,
  onClearAll,
}: ComparisonDrawerProps) {
  const { formatPrice } = useCurrency();
  const [modalOpen, setModalOpen] = useState(false);

  if (compareCars.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#12121A]/95 border border-[#4A00FF]/50 shadow-[0_0_30px_rgba(74,0,255,0.4)] backdrop-blur-md px-4 sm:px-6 py-3 flex items-center gap-4 max-w-xl w-[92%] animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#4A00FF]" />
          <span className="font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-wider text-white hidden sm:inline">
            Compare ({compareCars.length}/3)
          </span>
        </div>

        {/* Thumbnail circles */}
        <div className="flex items-center gap-2 flex-1 overflow-x-auto">
          {compareCars.map((car) => (
            <div
              key={car.id}
              className="relative flex items-center gap-2 bg-[#1A1A24] border border-[#2E2E35] pl-2 pr-1 py-1 rounded-sm text-xs font-['Rajdhani',sans-serif] text-white whitespace-nowrap"
            >
              <span>{car.name}</span>
              <button
                type="button"
                onClick={() => onRemoveCar(car.id)}
                className="p-1 hover:text-[#E8001D] text-[#A8AABD]"
                title="Remove"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-[#4A00FF] hover:bg-[#3700bd] text-white font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-wider clip-parallelogram-sm transition-all"
          >
            View Specs
          </button>
          <button
            type="button"
            onClick={onClearAll}
            className="p-2 text-[#A8AABD] hover:text-white text-xs font-['Rajdhani',sans-serif] uppercase tracking-wider"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Comparison Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-[#12121A] border border-[#4A00FF]/50 shadow-[0_0_50px_rgba(74,0,255,0.3)] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#2E2E35] mb-6">
              <div className="flex items-center gap-3">
                <Scale className="w-6 h-6 text-[#4A00FF]" />
                <h3 className="font-['Orbitron',sans-serif] text-xl font-bold uppercase text-white">
                  Head-to-Head Fleet Comparison
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 text-[#A8AABD] hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-[#2E2E35] text-[#A8AABD] font-['Rajdhani',sans-serif] uppercase text-xs">
                      Specification
                    </th>
                    {compareCars.map((car) => (
                      <th
                        key={car.id}
                        className="p-4 border-b border-[#2E2E35] min-w-[200px]"
                      >
                        <div className="relative aspect-[16/9] mb-3 overflow-hidden bg-black/50">
                          <Image
                            src={car.images[0]}
                            alt={car.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="font-['Rajdhani',sans-serif] text-xs font-bold text-[#E8001D] uppercase">
                          {car.brand}
                        </div>
                        <div className="font-['Orbitron',sans-serif] text-base font-bold text-white mb-1">
                          {car.name}
                        </div>
                        <div className="font-['Orbitron',sans-serif] text-sm text-[#E8001D] font-semibold">
                          {formatPrice(car.numericPrice)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2E2E35]/60 text-xs sm:text-sm font-['Rajdhani',sans-serif]">
                  <tr>
                    <td className="p-4 font-bold text-[#A8AABD] uppercase tracking-wider">
                      Category
                    </td>
                    {compareCars.map((c) => (
                      <td key={c.id} className="p-4 text-white">
                        {c.category}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#A8AABD] uppercase tracking-wider">
                      0–100 km/h
                    </td>
                    {compareCars.map((c) => (
                      <td key={c.id} className="p-4 font-['Orbitron',sans-serif] text-white font-bold">
                        {c.specs["0–100 km/h"] || c.specs["0–100"]}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#A8AABD] uppercase tracking-wider">
                      Top Speed
                    </td>
                    {compareCars.map((c) => (
                      <td key={c.id} className="p-4 font-['Orbitron',sans-serif] text-white font-bold">
                        {c.specs["Top Speed"]}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#A8AABD] uppercase tracking-wider">
                      Power
                    </td>
                    {compareCars.map((c) => (
                      <td key={c.id} className="p-4 font-['Orbitron',sans-serif] text-white font-bold">
                        {c.specs.Power}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#A8AABD] uppercase tracking-wider">
                      Powertrain / Engine
                    </td>
                    {compareCars.map((c) => (
                      <td key={c.id} className="p-4 text-white">
                        {c.specs.Engine || (c.specs.Range ? `Electric (${c.specs.Range} range)` : "Electric Multi-motor")}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#A8AABD] uppercase tracking-wider">
                      Drivetrain
                    </td>
                    {compareCars.map((c) => (
                      <td key={c.id} className="p-4 text-white">
                        {c.specs.Drive || "AWD"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#A8AABD] uppercase tracking-wider">
                      Curb Weight
                    </td>
                    {compareCars.map((c) => (
                      <td key={c.id} className="p-4 text-white">
                        {c.specs.Weight || "—"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-[#A8AABD] uppercase tracking-wider">
                      Action
                    </td>
                    {compareCars.map((c) => (
                      <td key={c.id} className="p-4">
                        <Link
                          href={`/cars/${c.id}`}
                          onClick={() => setModalOpen(false)}
                          className="inline-flex items-center gap-1 text-xs text-[#E8001D] hover:underline font-bold"
                        >
                          <span>Full dossier</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
