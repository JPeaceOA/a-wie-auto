"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { CARS } from "@/data/cars";

interface ContactSectionProps {
  prefilledVehicle?: string;
}

export default function ContactSection({ prefilledVehicle }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vehicle: prefilledVehicle || "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="Contact AWIEwagen">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-[#E8001D] font-['Rajdhani',sans-serif] text-xs uppercase tracking-[0.25em] font-bold mb-2">
          <span className="w-6 h-[2px] bg-[#E8001D]" />
          <span>Get in Touch</span>
        </div>
        <h2 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
          The fleet is ready.<br />Are you?
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Contact Info */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="p-6 bg-[#12121A] border border-[#2E2E35] flex items-start gap-4">
              <div className="p-3 bg-[#E8001D]/10 text-[#E8001D] rounded-none clip-diamond">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-wider text-[#A8AABD] mb-1">
                  Direct Line
                </span>
                <a
                  href="tel:+496912345678"
                  className="font-['Orbitron',sans-serif] text-base text-white hover:text-[#E8001D] transition-colors"
                >
                  +49 69 123 456 78
                </a>
              </div>
            </div>

            <div className="p-6 bg-[#12121A] border border-[#2E2E35] flex items-start gap-4">
              <div className="p-3 bg-[#E8001D]/10 text-[#E8001D] rounded-none clip-diamond">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-wider text-[#A8AABD] mb-1">
                  Concierge Email
                </span>
                <a
                  href="mailto:fleet@awiewagen.de"
                  className="font-['Orbitron',sans-serif] text-base text-white hover:text-[#E8001D] transition-colors"
                >
                  fleet@awiewagen.de
                </a>
              </div>
            </div>

            <div className="p-6 bg-[#12121A] border border-[#2E2E35] flex items-start gap-4">
              <div className="p-3 bg-[#E8001D]/10 text-[#E8001D] rounded-none clip-diamond">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-wider text-[#A8AABD] mb-1">
                  Showroom Address
                </span>
                <p className="text-white text-base">
                  Kaiserstrasse 88, Frankfurt am Main, Germany
                </p>
              </div>
            </div>

            <div className="p-6 bg-[#12121A] border border-[#2E2E35] flex items-start gap-4">
              <div className="p-3 bg-[#E8001D]/10 text-[#E8001D] rounded-none clip-diamond">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-wider text-[#A8AABD] mb-1">
                  Opening Hours
                </span>
                <p className="text-white text-base">
                  Mon–Sat · 09:00 – 19:00 CET
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#5A5A70] leading-relaxed">
            Personal appointments outside regular hours available upon request for accredited collectors and bespoke commissions.
          </p>
        </div>

        {/* Right Column: Contact Enquiry Form */}
        <div className="lg:col-span-7 bg-[#12121A] border border-[#2E2E35] p-8 sm:p-10">
          {submitted ? (
            <div className="py-12 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#E8001D]/10 text-[#E8001D] mx-auto mb-6 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-['Orbitron',sans-serif] text-2xl font-bold text-white mb-2">
                Enquiry Transmitted
              </h3>
              <p className="text-[#A8AABD] max-w-md mx-auto mb-6 text-sm leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>. An AWIEwagen specialist has been assigned to your request and will contact you at <strong className="text-white">{formData.email}</strong> within 4 business hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", vehicle: "", message: "" });
                }}
                className="px-6 py-2.5 bg-[#2E2E35] hover:bg-[#E8001D] text-white font-['Rajdhani',sans-serif] text-xs font-bold uppercase tracking-wider clip-parallelogram-sm transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fname" className="block font-['Rajdhani',sans-serif] text-xs uppercase tracking-wider font-semibold text-[#A8AABD] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fname"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Klaus Reinhardt"
                    className="w-full px-4 py-3 bg-[#0A0A0F] border border-[#2E2E35] text-white text-sm focus:border-[#E8001D] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-['Rajdhani',sans-serif] text-xs uppercase tracking-wider font-semibold text-[#A8AABD] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="klaus@reinhardt.de"
                    className="w-full px-4 py-3 bg-[#0A0A0F] border border-[#2E2E35] text-white text-sm focus:border-[#E8001D] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="interest" className="block font-['Rajdhani',sans-serif] text-xs uppercase tracking-wider font-semibold text-[#A8AABD] mb-2">
                  Vehicle of Interest
                </label>
                <select
                  id="interest"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0A0A0F] border border-[#2E2E35] text-white text-sm focus:border-[#E8001D] focus:outline-none cursor-pointer"
                >
                  <option value="">— Select a model —</option>
                  {CARS.map((car) => (
                    <option key={car.id} value={`${car.brand} ${car.name}`}>
                      {car.name} ({car.brand}) — {car.price}
                    </option>
                  ))}
                  <option value="General Consultation">General Fleet Consultation</option>
                </select>
              </div>

              <div>
                <label htmlFor="msg" className="block font-['Rajdhani',sans-serif] text-xs uppercase tracking-wider font-semibold text-[#A8AABD] mb-2">
                  Message / Special Requirements
                </label>
                <textarea
                  id="msg"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="I would like to arrange an appointment or receive delivery options..."
                  className="w-full px-4 py-3 bg-[#0A0A0F] border border-[#2E2E35] text-white text-sm focus:border-[#E8001D] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#E8001D] hover:bg-[#9E0013] text-white font-['Rajdhani',sans-serif] text-base font-bold uppercase tracking-[0.15em] clip-parallelogram shadow-[0_0_20px_rgba(232,0,29,0.5)] transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "Transmitting..." : "Send Enquiry"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
