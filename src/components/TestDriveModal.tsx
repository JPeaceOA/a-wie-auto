"use client";

import { useState } from "react";
import { X, Calendar, CheckCircle, ShieldCheck, Car as CarIcon } from "lucide-react";
import { CARS } from "@/data/cars";

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCarModel?: string;
}

export default function TestDriveModal({
  isOpen,
  onClose,
  defaultCarModel,
}: TestDriveModalProps) {
  const [carModel, setCarModel] = useState(defaultCarModel || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [licenseConfirmed, setLicenseConfirmed] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reservationId, setReservationId] = useState("AW-84920");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReservationId(`AW-${Math.floor(10000 + Math.random() * 90000)}`);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#12121A] border border-[#E8001D]/50 shadow-[0_0_50px_rgba(232,0,29,0.25)] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#A8AABD] hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#E8001D]/20 text-[#E8001D] mx-auto mb-5 flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-['Orbitron',sans-serif] text-2xl font-bold text-white mb-2">
              Test Drive Reserved
            </h3>
            <p className="text-sm text-[#A8AABD] max-w-md mx-auto mb-6 leading-relaxed">
              We have reserved your session for the <strong className="text-white">{carModel || "selected vehicle"}</strong> on <strong className="text-white">{date || "your preferred date"}</strong>.
              Confirmation details and showroom credentials have been sent to <strong className="text-white">{email}</strong>.
            </p>
            <div className="p-4 bg-[#0A0A0F] border border-[#2E2E35] text-xs font-['Rajdhani',sans-serif] tracking-wider text-[#A8AABD] mb-6">
              RESERVATION ID: <span className="text-[#E8001D] font-bold font-['Orbitron',sans-serif]">{reservationId}</span> · FRANKFURT SHOWROOM
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 bg-[#E8001D] hover:bg-[#9E0013] text-white font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-wider clip-parallelogram-sm transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-2 text-[#E8001D] font-['Rajdhani',sans-serif] text-xs uppercase tracking-[0.2em] font-bold mb-2">
              <Calendar className="w-4 h-4" />
              <span>VIP Road Test</span>
            </div>
            <h3 className="font-['Orbitron',sans-serif] text-2xl font-bold text-white uppercase mb-2">
              Schedule Your Test Drive
            </h3>
            <p className="text-xs text-[#A8AABD] mb-6">
              Experience the machine firsthand on unrestricted autobahn sections and closed circuits.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-['Rajdhani',sans-serif] text-xs uppercase tracking-wider text-[#A8AABD] mb-1 font-semibold">
                  Vehicle of Choice *
                </label>
                <select
                  required
                  value={carModel || defaultCarModel || ""}
                  onChange={(e) => setCarModel(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0A0A0F] border border-[#2E2E35] text-white text-sm focus:border-[#E8001D] focus:outline-none"
                >
                  <option value="">— Select a machine —</option>
                  {CARS.map((car) => (
                    <option key={car.id} value={`${car.brand} ${car.name}`}>
                      {car.brand} {car.name} ({car.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-['Rajdhani',sans-serif] text-xs uppercase tracking-wider text-[#A8AABD] mb-1 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Wolfgang Weber"
                    className="w-full px-4 py-2.5 bg-[#0A0A0F] border border-[#2E2E35] text-white text-sm focus:border-[#E8001D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-['Rajdhani',sans-serif] text-xs uppercase tracking-wider text-[#A8AABD] mb-1 font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="wolfgang@domain.de"
                    className="w-full px-4 py-2.5 bg-[#0A0A0F] border border-[#2E2E35] text-white text-sm focus:border-[#E8001D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-['Rajdhani',sans-serif] text-xs uppercase tracking-wider text-[#A8AABD] mb-1 font-semibold">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+49 170 0000000"
                    className="w-full px-4 py-2.5 bg-[#0A0A0F] border border-[#2E2E35] text-white text-sm focus:border-[#E8001D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-['Rajdhani',sans-serif] text-xs uppercase tracking-wider text-[#A8AABD] mb-1 font-semibold">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0A0A0F] border border-[#2E2E35] text-white text-sm focus:border-[#E8001D] focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="license"
                  checked={licenseConfirmed}
                  onChange={(e) => setLicenseConfirmed(e.target.checked)}
                  required
                  className="mt-1 accent-[#E8001D]"
                />
                <label htmlFor="license" className="text-xs text-[#A8AABD] leading-snug cursor-pointer">
                  I confirm that I hold a valid EU/International driving license of at least 3 years' standing.
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#E8001D] hover:bg-[#9E0013] text-white font-['Rajdhani',sans-serif] text-sm font-bold uppercase tracking-[0.15em] clip-parallelogram shadow-[0_0_20px_rgba(232,0,29,0.5)] transition-all disabled:opacity-50"
                >
                  {loading ? "Confirming Slot..." : "Confirm Test Drive Booking"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
