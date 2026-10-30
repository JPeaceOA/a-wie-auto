import Link from "next/link";
import { ArrowDownRight, Compass, Calendar, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onOpenTestDrive?: () => void;
}

export default function HeroSection({ onOpenTestDrive }: HeroSectionProps) {
  const stats = [
    { num: "127+", label: "Vehicles in Stock" },
    { num: "18", label: "Premium Brands" },
    { num: "32", label: "Years of Service" },
    { num: "4.97", label: "Customer Rating" },
  ];

  return (
    <section
      id="hero"
      aria-label="Hero Showcase"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Sci-fi HUD Scanning Line */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8001D] to-transparent opacity-30 animate-scanline pointer-events-none" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#E8001D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#4A00FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 px-3 py-1.5 mb-6 rounded border border-[#E8001D]/30 bg-[#E8001D]/10 text-[#E8001D] font-['Rajdhani',sans-serif] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#E8001D] animate-ping" />
          <span>AWIEwagen Autohaus · Est. 1993</span>
        </div>

        {/* Cinematic Title */}
        <h1 className="font-['Orbitron',sans-serif] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[1.02] mb-6 text-white">
          <span className="block text-[#E8001D] drop-shadow-[0_0_25px_rgba(232,0,29,0.4)]">
            Precision.
          </span>
          <span className="block text-stroke-silver opacity-90 my-1">
            Power.
          </span>
          <span className="block text-white">
            Legend.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#A8AABD] max-w-2xl leading-relaxed mb-10 font-normal">
          We don't sell cars. We place precision instruments into the hands of
          people who demand more from the road. From sub-3-second electric sedans
          to hand-built naturally aspirated icons.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-16">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8001D] hover:bg-[#9E0013] text-white font-['Rajdhani',sans-serif] text-base font-bold uppercase tracking-[0.14em] clip-parallelogram transition-transform hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(232,0,29,0.5)] animate-glow-pulse"
          >
            <Compass className="w-5 h-5" />
            <span>Explore the Fleet</span>
          </Link>

          <button
            type="button"
            onClick={() => onOpenTestDrive && onOpenTestDrive()}
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#A8AABD]/30 hover:border-[#E8001D] text-white hover:text-[#E8001D] bg-[#12121A]/60 backdrop-blur-sm font-['Rajdhani',sans-serif] text-base font-bold uppercase tracking-[0.14em] clip-parallelogram transition-all hover:scale-105 active:scale-95"
          >
            <Calendar className="w-5 h-5 text-[#E8001D]" />
            <span>Book a Test Drive</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-[#2E2E35]">
          {stats.map((stat) => (
            <div key={stat.label} className="p-3 bg-[#12121A]/50 border border-[#2E2E35]/60 rounded">
              <div className="font-['Orbitron',sans-serif] text-2xl sm:text-3xl font-black text-white mb-1">
                {stat.num}
              </div>
              <div className="font-['Rajdhani',sans-serif] text-xs sm:text-sm font-medium tracking-wider uppercase text-[#A8AABD]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
