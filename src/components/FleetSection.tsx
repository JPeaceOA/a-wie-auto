"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, Heart, ArrowUpRight, Check, Scale } from "lucide-react";
import { CARS, CATEGORIES, Car, Category } from "@/data/cars";
import { useCurrency } from "@/context/CurrencyContext";

interface FleetSectionProps {
  onOpenTestDrive?: (carModel?: string) => void;
  savedCarIds: string[];
  onToggleSave: (carId: string) => void;
  compareCarIds: string[];
  onToggleCompare: (car: Car) => void;
  onSelectCarForModal?: (car: Car) => void;
}

export default function FleetSection({
  onOpenTestDrive,
  savedCarIds,
  onToggleSave,
  compareCarIds,
  onToggleCompare,
  onSelectCarForModal,
}: FleetSectionProps) {
  const { formatPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "accel" | "power">("featured");

  const filteredCars = useMemo(() => {
    return CARS.filter((car) => {
      const matchesCategory =
        activeCategory === "All" || car.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.numericPrice - b.numericPrice;
      }
      if (sortBy === "price-desc") {
        return b.numericPrice - a.numericPrice;
      }
      if (sortBy === "accel") {
        const aVal = parseFloat(a.specs["0–100 km/h"] || "99");
        const bVal = parseFloat(b.specs["0–100 km/h"] || "99");
        return aVal - bVal;
      }
      if (sortBy === "power") {
        const aVal = parseInt(a.specs.Power || "0", 10);
        const bVal = parseInt(b.specs.Power || "0", 10);
        return bVal - aVal;
      }
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <section id="fleet" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="Vehicle Fleet">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 text-[#E8001D] font-['Rajdhani',sans-serif] text-xs uppercase tracking-[0.25em] font-bold mb-2">
            <span className="w-6 h-[2px] bg-[#E8001D]" />
            <span>Our Fleet</span>
          </div>
          <h2 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
            Engineered for those who expect everything.
          </h2>
        </div>

        {/* Count indicator */}
        <div className="font-['Rajdhani',sans-serif] text-sm text-[#A8AABD] tracking-wider uppercase">
          Showing <span className="font-['Orbitron',sans-serif] text-white font-bold">{filteredCars.length}</span> of{" "}
          <span className="font-['Orbitron',sans-serif] text-white font-bold">{CARS.length}</span> models
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="flex flex-col gap-6 mb-10">
        {/* Category Filter Pills */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
          role="group"
          aria-label="Category Filters"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-[0.14em] transition-all whitespace-nowrap clip-parallelogram-sm border ${
                  isActive
                    ? "bg-[#E8001D] border-[#E8001D] text-white shadow-[0_0_12px_rgba(232,0,29,0.5)]"
                    : "bg-[#12121A] border-[#2E2E35] text-[#A8AABD] hover:text-white hover:border-[#E8001D]/50"
                }`}
                aria-pressed={isActive}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8AABD]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model, brand, or feature (e.g. Audi, V12, Electric)..."
              className="w-full pl-11 pr-4 py-3 bg-[#12121A] border border-[#2E2E35] rounded-none focus:border-[#E8001D] focus:outline-none text-sm text-white placeholder-[#5A5A70] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase font-['Rajdhani',sans-serif] tracking-wider text-[#A8AABD] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-3 bg-[#12121A] border border-[#2E2E35] text-sm text-white focus:border-[#E8001D] focus:outline-none appearance-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="accel">0–100 km/h: Fastest</option>
              <option value="power">Power: Highest hp</option>
            </select>
            <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8AABD] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Car Cards Grid */}
      {filteredCars.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[#2E2E35] bg-[#12121A]/30 p-8">
          <p className="font-['Orbitron',sans-serif] text-xl text-white mb-2">No vehicles match your criteria</p>
          <p className="text-sm text-[#A8AABD] mb-6">Try resetting your search query or choosing another category.</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="px-6 py-2.5 bg-[#E8001D] text-white font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-wider clip-parallelogram-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => {
            const isSaved = savedCarIds.includes(car.id);
            const isCompared = compareCarIds.includes(car.id);

            return (
              <article
                key={car.id}
                className="group flex flex-col bg-[#12121A] border border-[#2E2E35] hover:border-[#E8001D]/60 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(232,0,29,0.15)]"
              >
                {/* Vehicle Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1A1A24]">
                  <Image
                    src={car.images[0]}
                    alt={`${car.brand} ${car.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12121A] via-transparent to-black/30" />

                  {/* Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#E8001D] text-white font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-widest clip-parallelogram-sm shadow-[0_0_10px_rgba(232,0,29,0.5)]">
                    {car.badge}
                  </span>

                  {/* Action overlays: Wishlist & Compare */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onToggleCompare(car)}
                      title={isCompared ? "Remove from comparison" : "Add to comparison"}
                      className={`p-2 rounded backdrop-blur-md transition-colors ${
                        isCompared
                          ? "bg-[#4A00FF] text-white shadow-[0_0_10px_rgba(74,0,255,0.6)]"
                          : "bg-black/60 text-[#A8AABD] hover:text-white"
                      }`}
                    >
                      <Scale className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleSave(car.id)}
                      title={isSaved ? "Remove from wishlist" : "Save vehicle"}
                      className={`p-2 rounded backdrop-blur-md transition-colors ${
                        isSaved
                          ? "bg-[#E8001D] text-white shadow-[0_0_10px_rgba(232,0,29,0.6)]"
                          : "bg-black/60 text-[#A8AABD] hover:text-white"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-['Rajdhani',sans-serif] text-xs font-bold tracking-[0.2em] uppercase text-[#E8001D]">
                      {car.brand}
                    </span>
                    <span className="font-['Rajdhani',sans-serif] text-xs font-medium uppercase text-[#5A5A70]">
                      {car.category}
                    </span>
                  </div>

                  <h3 className="font-['Orbitron',sans-serif] text-xl font-bold text-white group-hover:text-[#E8001D] transition-colors mb-2">
                    {car.name}
                  </h3>

                  <p className="text-sm italic text-[#A8AABD] line-clamp-1 mb-6 border-l-2 border-[#E8001D] pl-2.5">
                    "{car.tagline}"
                  </p>

                  {/* Key specs row */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#2E2E35] bg-[#0A0A0F]/50 mb-6 text-center">
                    <div>
                      <div className="font-['Orbitron',sans-serif] text-xs sm:text-sm font-bold text-white">
                        {car.specs["0–100 km/h"] || car.specs["0–100"]}
                      </div>
                      <div className="font-['Rajdhani',sans-serif] text-[10px] uppercase tracking-wider text-[#A8AABD]">
                        0–100
                      </div>
                    </div>
                    <div className="border-x border-[#2E2E35]">
                      <div className="font-['Orbitron',sans-serif] text-xs sm:text-sm font-bold text-white">
                        {car.specs["Top Speed"]}
                      </div>
                      <div className="font-['Rajdhani',sans-serif] text-[10px] uppercase tracking-wider text-[#A8AABD]">
                        Top Speed
                      </div>
                    </div>
                    <div>
                      <div className="font-['Orbitron',sans-serif] text-xs sm:text-sm font-bold text-white">
                        {car.specs.Power}
                      </div>
                      <div className="font-['Rajdhani',sans-serif] text-[10px] uppercase tracking-wider text-[#A8AABD]">
                        Power
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Footer */}
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div>
                      <span className="block font-['Rajdhani',sans-serif] text-[10px] tracking-wider uppercase text-[#5A5A70]">
                        Starting at
                      </span>
                      <span className="font-['Orbitron',sans-serif] text-lg font-bold text-[#E8001D]">
                        {formatPrice(car.numericPrice)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/cars/${car.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2E2E35] hover:bg-[#E8001D] text-white font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-wider clip-parallelogram-sm transition-all"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
