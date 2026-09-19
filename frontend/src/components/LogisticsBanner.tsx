import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Warehouse, Building2, Trees, Sparkles, Heart } from 'lucide-react';

export const LogisticsBanner: React.FC = () => {
  const [honked, setHonked] = useState(false);

  const handleHonk = () => {
    setHonked(true);
    setTimeout(() => setHonked(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E8E0CE] bg-[#FAF7EF] px-4 sm:px-6 py-3.5 shadow-xs">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Left: Pipeline Story & Status Pill */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono uppercase tracking-wider text-[11px] text-[#9E471A] bg-[#FFF8EE] px-2.5 py-1 rounded-full border border-[#E9CDB0] font-bold shadow-2xs">
              Live Transit
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#7A7168]">
            <span className="text-[#1F1A16] font-semibold">City Demand</span>
            <span>→</span>
            <span className="text-[#1F1A16] font-semibold">Micro-Hubs</span>
            <span>→</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span>Eco Dispatch</span>
              <span className="text-xs">🌱</span>
            </span>
          </div>
        </div>

        {/* Center & Right: Paved Logistics Road with the Adorable Animated Delivery Truck */}
        <div className="relative flex-1 max-w-2xl w-full h-10 flex items-center justify-between px-2">
          {/* Warehouse on Left */}
          <div
            className="flex items-center gap-1.5 text-[#9E471A] shrink-0 z-10 bg-[#FAF7EF] pr-2"
            title="Regional Warehouse Hub"
          >
            <div className="w-6 h-6 rounded-lg bg-[#FAF3E3] border border-[#EFE5D0] flex items-center justify-center text-[#9E471A]">
              <Warehouse className="w-3.5 h-3.5 text-[#9E471A]" />
            </div>
            <span className="text-[11px] font-bold text-[#261B14] hidden sm:inline">Hub</span>
          </div>

          {/* Road Strip with dashed line */}
          <div className="relative flex-1 mx-2 sm:mx-3 h-6 bg-[#E8DFC9] rounded-full overflow-hidden flex items-center border border-[#DDD3BC] shadow-inner">
            {/* Road lane dashed line */}
            <div className="w-full border-t-2 border-dashed border-[#FAF5E8] opacity-80"></div>

            {/* Smooth moving cute delivery truck */}
            <motion.div
              className="absolute text-amber-700 flex items-center z-20"
              initial={{ x: '-15%' }}
              animate={{ x: '105%' }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {/* Cute Interactive Delivery Truck */}
              <div
                onClick={handleHonk}
                className="relative cursor-pointer select-none"
                title="Click me! Beep beep!"
              >
                {/* Little Honk Speech Bubble */}
                {honked && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.8 }}
                    animate={{ opacity: 1, y: -26, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 z-40 whitespace-nowrap bg-white text-[#9E471A] text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md border border-amber-300 flex items-center gap-1"
                  >
                    <span>Beep beep!</span>
                    <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500 inline" />
                  </motion.div>
                )}

                {/* Truck with playful gentle road rumble/bounce */}
                <motion.div
                  animate={{
                    y: [0, -2.5, 0, -1.8, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative flex items-center"
                >
                  {/* Glowing warm headlight beam casting forward onto road */}
                  <div className="absolute left-[38px] top-[14px] w-9 h-4 bg-gradient-to-r from-amber-300/70 via-amber-200/30 to-transparent rounded-r-full pointer-events-none blur-[0.5px]" />

                  {/* Little Eco Sprout on Roof waving in wind */}
                  <motion.div
                    animate={{ rotate: [-6, 6, -6] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-[-5px] left-[13px] z-10 select-none text-[10px] leading-none"
                  >
                    🌱
                  </motion.div>

                  {/* Cute Chubby Delivery Van SVG */}
                  <svg
                    width="46"
                    height="29"
                    viewBox="0 0 46 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                  >
                    {/* Shadow under truck */}
                    <ellipse cx="23" cy="27" rx="19" ry="2" fill="#1C1917" opacity="0.2" />

                    {/* Main Cargo Box (Sunny Amber) with rounded corners */}
                    <rect x="2" y="6" width="25" height="17" rx="3.5" fill="#F59E0B" />
                    {/* Cargo Roof Highlight */}
                    <rect x="2" y="6" width="25" height="3.5" rx="1.5" fill="#FBBF24" />

                    {/* Cute White Delivery Parcel Graphic on Cargo side */}
                    <rect
                      x="8"
                      y="10.5"
                      width="13"
                      height="8"
                      rx="1.5"
                      fill="#FEF3C7"
                      stroke="#D97706"
                      strokeWidth="0.75"
                    />
                    {/* Parcel ribbon tape */}
                    <line x1="14.5" y1="10.5" x2="14.5" y2="18.5" stroke="#EA580C" strokeWidth="0.9" />
                    <line x1="8" y1="14.5" x2="21" y2="14.5" stroke="#EA580C" strokeWidth="0.9" />
                    <circle cx="14.5" cy="14.5" r="1" fill="#B45309" />

                    {/* Front Cab (Chubby Curved Nose in Warm Marigold) */}
                    <path
                      d="M26 8.5C26 7.5 27 6.5 28 6.5H34C37.5 6.5 41 9 42 13L43.2 18C43.7 19.8 42.2 21.5 40 21.5H26V8.5Z"
                      fill="#FBBF24"
                    />

                    {/* Cute Rounded Windshield */}
                    <path
                      d="M28 8H33.5C35.8 8 38 9.5 38.8 12L39.5 14.5H28V8Z"
                      fill="#BAE6FD"
                    />
                    {/* Windshield Shine / Glint */}
                    <line
                      x1="31"
                      y1="9"
                      x2="36"
                      y2="13.5"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      opacity="0.85"
                    />

                    {/* Front Bumper */}
                    <rect
                      x="41.5"
                      y="19.5"
                      width="3.5"
                      height="3"
                      rx="1.5"
                      fill="#E2E8F0"
                      stroke="#94A3B8"
                      strokeWidth="0.5"
                    />

                    {/* Round Cheerful Headlight */}
                    <circle cx="41.5" cy="15.5" r="2.2" fill="#FEF08A" stroke="#F59E0B" strokeWidth="0.75" />
                    <circle cx="41.5" cy="15.5" r="1" fill="#FFFFFF" />

                    {/* Tail Light */}
                    <rect x="1" y="12.5" width="1.5" height="3" rx="0.75" fill="#EF4444" />

                    {/* Rear Wheel */}
                    <g>
                      <circle cx="10" cy="23.5" r="4.5" fill="#292524" />
                      <circle cx="10" cy="23.5" r="2.4" fill="#F8FAFC" />
                      <circle cx="10" cy="23.5" r="1" fill="#F59E0B" />
                    </g>

                    {/* Front Wheel */}
                    <g>
                      <circle cx="34" cy="23.5" r="4.5" fill="#292524" />
                      <circle cx="34" cy="23.5" r="2.4" fill="#F8FAFC" />
                      <circle cx="34" cy="23.5" r="1" fill="#F59E0B" />
                    </g>
                  </svg>

                  {/* Cute animated exhaust puffs trailing behind */}
                  <motion.div
                    animate={{
                      opacity: [0, 0.75, 0],
                      x: [0, -9],
                      y: [0, -3],
                      scale: [0.5, 1.2, 0.3],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                    className="absolute left-[-5px] bottom-[3px] w-2 h-2 rounded-full bg-stone-300/85 pointer-events-none"
                  />
                  <motion.div
                    animate={{
                      opacity: [0, 0.55, 0],
                      x: [-2, -15],
                      y: [0, -5],
                      scale: [0.4, 1.4, 0.2],
                    }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: 0.3,
                      ease: 'easeOut',
                    }}
                    className="absolute left-[-9px] bottom-[5px] w-2.5 h-2.5 rounded-full bg-stone-200/70 pointer-events-none"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* City Destination on Right */}
          <div
            className="flex items-center gap-1.5 text-[#261B14] shrink-0 z-10 bg-[#FAF7EF] pl-2"
            title="Urban Demand Centers"
          >
            <div className="w-6 h-6 rounded-lg bg-[#FAF3E3] border border-[#EFE5D0] flex items-center justify-center text-[#5C5248]">
              <Building2 className="w-3.5 h-3.5 text-[#5C5248]" />
            </div>
            <span className="text-[11px] font-bold text-[#261B14] hidden sm:inline">Urban Grid</span>
          </div>
        </div>
      </div>
    </div>
  );
};
