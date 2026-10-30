"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X, Car as CarIcon, Calendar, ArrowRight } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

interface NavBarProps {
  onOpenTestDrive?: (carModel?: string) => void;
  savedCount?: number;
  onOpenSavedModal?: () => void;
}

export default function NavBar({
  onOpenTestDrive,
  savedCount = 0,
  onOpenSavedModal,
}: NavBarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#0A0A0F]/90 backdrop-blur-md border-b border-[#E8001D]/20 transition-all">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-[#E8001D]"
            aria-label="AWIEwagen Homepage"
          >
            <div className="w-8 h-8 clip-diamond bg-gradient-to-br from-[#E8001D] to-[#4A00FF] flex-shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(232,0,29,0.5)]" />
            <span className="font-['Orbitron',sans-serif] text-xl font-black tracking-wider text-white">
              <span className="text-[#E8001D]">A</span>WIE
              <span className="text-[#4A00FF] font-medium">wagen</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {[
              { name: "Fleet", href: "/fleet" },
              { name: "Featured", href: "/featured" },
              { name: "Contact", href: "/contact" },
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-['Rajdhani',sans-serif] text-sm uppercase tracking-[0.16em] transition-colors relative py-1 ${
                    isActive
                      ? "text-[#E8001D] font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#E8001D]"
                      : "text-[#A8AABD] hover:text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#E8001D] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Currency Selector */}
            <div className="relative flex items-center bg-[#12121A] border border-[#2E2E35] p-0.5 rounded-none">
              {(["EUR", "NGN", "USD"] as const).map((curr) => {
                const isActive = currency === curr;
                return (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`px-2.5 py-1 text-xs font-['Orbitron',sans-serif] font-bold transition-all ${
                      isActive
                        ? "bg-[#E8001D] text-white shadow-[0_0_10px_rgba(232,0,29,0.5)]"
                        : "text-[#A8AABD] hover:text-white"
                    }`}
                    title={curr === "NGN" ? "Nigerian Naira (₦)" : curr === "EUR" ? "Euro (€)" : "US Dollar ($)"}
                  >
                    {curr === "NGN" ? "₦ NGN" : curr === "EUR" ? "€ EUR" : "$ USD"}
                  </button>
                );
              })}
            </div>

            {/* Wishlist Button */}
            {onOpenSavedModal && (
              <button
                type="button"
                onClick={onOpenSavedModal}
                className="relative p-2 text-[#A8AABD] hover:text-white transition-colors focus:outline-none"
                aria-label={`Saved vehicles (${savedCount})`}
                title="View saved vehicles"
              >
                <Heart className={`w-5 h-5 ${savedCount > 0 ? "fill-[#E8001D] text-[#E8001D]" : ""}`} />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E8001D] text-white text-[11px] font-bold flex items-center justify-center font-['Orbitron',sans-serif]">
                    {savedCount}
                  </span>
                )}
              </button>
            )}

            {/* Test Drive CTA */}
            <button
              type="button"
              onClick={() => onOpenTestDrive && onOpenTestDrive()}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-[#E8001D] hover:bg-[#9E0013] text-white font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-[0.12em] clip-parallelogram-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(232,0,29,0.4)]"
            >
              <Calendar className="w-4 h-4" />
              <span>Test Drive</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#A8AABD] hover:text-white focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#0A0A0F]/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-6 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-4">
            {[
              { name: "Fleet", href: "/fleet" },
              { name: "Featured Vehicle", href: "/featured" },
              { name: "Contact & Location", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between text-lg font-['Orbitron',sans-serif] py-3 border-b border-[#2E2E35] transition-colors ${
                  pathname === link.href ? "text-[#E8001D]" : "text-white hover:text-[#E8001D]"
                }`}
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-[#A8AABD]" />
              </Link>
            ))}
          </nav>

          {/* Mobile Currency Selector */}
          <div className="flex flex-col gap-2 pt-2">
            <span className="font-['Rajdhani',sans-serif] text-xs uppercase tracking-widest text-[#A8AABD]">
              Currency
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(["EUR", "NGN", "USD"] as const).map((curr) => {
                const isActive = currency === curr;
                return (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`py-2 text-center text-xs font-['Orbitron',sans-serif] font-bold border transition-colors ${
                      isActive
                        ? "bg-[#E8001D] border-[#E8001D] text-white shadow-[0_0_10px_rgba(232,0,29,0.5)]"
                        : "bg-[#12121A] border-[#2E2E35] text-[#A8AABD]"
                    }`}
                  >
                    {curr === "NGN" ? "₦ NGN" : curr === "EUR" ? "€ EUR" : "$ USD"}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenTestDrive) onOpenTestDrive();
            }}
            className="w-full py-4 mt-4 bg-[#E8001D] hover:bg-[#9E0013] text-white font-['Rajdhani',sans-serif] text-base font-bold uppercase tracking-[0.15em] clip-parallelogram text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(232,0,29,0.5)]"
          >
            <Calendar className="w-5 h-5" />
            <span>Book a Test Drive</span>
          </button>
        </div>
      )}
    </>
  );
}
