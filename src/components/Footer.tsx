"use client";

import Link from "next/link";
import { CATEGORIES } from "@/data/cars";

interface FooterProps {
  onOpenTestDrive?: () => void;
}

export default function Footer({ onOpenTestDrive }: FooterProps) {
  return (
    <footer className="bg-[#07070B] border-t border-[#E8001D]/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-6 clip-diamond bg-gradient-to-br from-[#E8001D] to-[#4A00FF]" />
              <span className="font-['Orbitron',sans-serif] text-xl font-bold tracking-wider text-white">
                <span className="text-[#E8001D]">A</span>WIE
                <span className="text-[#4A00FF]">wagen</span>
              </span>
            </Link>
            <p className="text-sm text-[#A8AABD] max-w-sm leading-relaxed mb-6">
              Germany's finest automotive collective. We source, curate, and deliver extraordinary
              vehicles to extraordinary people. Headquartered in Frankfurt, operating across Europe.
            </p>
            <div className="font-['Rajdhani',sans-serif] text-xs uppercase tracking-widest text-[#5A5A70]">
              Autohaus · Personenkraftwagen · Est. 1993
            </div>
          </div>

          {/* Fleet Categories */}
          <div>
            <h4 className="font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[#E8001D] mb-4">
              Fleet
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8AABD]">
              {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                <li key={cat}>
                  <Link href="/fleet" className="hover:text-white transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[#E8001D] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8AABD]">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenTestDrive && onOpenTestDrive()}
                  className="hover:text-white transition-colors text-left"
                >
                  Book Test Drive
                </button>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Bespoke Finance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Vehicle Insurance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Enclosed Delivery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Concierge Servicing
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Showroom */}
          <div>
            <h4 className="font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[#E8001D] mb-4">
              Showroom
            </h4>
            <ul className="space-y-2 text-sm text-[#A8AABD] mb-6">
              <li>Kaiserstrasse 88</li>
              <li>60329 Frankfurt am Main</li>
              <li>Germany</li>
              <li className="pt-2 text-white font-['Orbitron',sans-serif] text-xs">
                +49 69 123 456 78
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2E2E35] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-['Rajdhani',sans-serif] tracking-wider text-[#5A5A70]">
          <div>
            © 2026 <span className="text-[#A8AABD]">AWIEwagen GmbH</span>. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-[#A8AABD] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#A8AABD] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#A8AABD] cursor-pointer">Impressum / Imprint</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
