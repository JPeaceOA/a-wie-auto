"use client";

export default function DataTicker() {
  const items = [
    { label: "Models in Stock", val: "127+" },
    { label: "Brands Represented", val: "18" },
    { label: "Avg Delivery Time", val: "14 Days" },
    { label: "Customer Rating", val: "4.97 ★" },
    { label: "Years of Service", val: "32" },
    { label: "Monthly Test Drives", val: "844" },
  ];

  // Repeat for continuous seamless loop
  const list = [...items, ...items, ...items, ...items];

  return (
    <div
      className="w-full bg-[#12121A] border-y border-[#E8001D]/20 py-3.5 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="animate-ticker flex items-center">
        {list.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-6 whitespace-nowrap font-['Rajdhani',sans-serif] text-sm uppercase tracking-widest text-[#A8AABD]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8001D] shadow-[0_0_6px_#E8001D]" />
            <span>{item.label}</span>
            <strong className="font-['Orbitron',sans-serif] text-white font-bold tracking-normal">
              {item.val}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
