import React from 'react';
import { LucideIcon, ArrowDown, ArrowUp } from 'lucide-react';

interface KPICardProps {
  id: string;
  title: string;
  value: string;
  baselineDiff: string;
  isPositive: boolean;
  icon: LucideIcon;
  subtext?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  id,
  title,
  value,
  baselineDiff,
  isPositive,
  icon: Icon,
  subtext,
}) => {
  const isUp = baselineDiff.includes('↑');

  return (
    <div
      id={id}
      className="group relative bg-white rounded-2xl p-5 border border-[#E8E0CE] shadow-xs hover:shadow-md hover:border-[#D6A97A] transition-all duration-200 flex flex-col justify-between overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs sm:text-sm font-semibold text-[#6E645A]">
            {title}
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#FAF3E3] border border-[#EFE5D0] flex items-center justify-center text-[#9E471A] group-hover:scale-110 transition-transform">
            <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#261B14] tracking-tight font-['Space_Grotesk']">
            {value}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#F5EFE0] flex items-center justify-between text-xs gap-2">
        <div
          className={`flex items-center gap-1 font-bold text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap ${
            isPositive
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-amber-50 text-amber-900 border border-amber-200'
          }`}
        >
          {isUp ? (
            <ArrowUp className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
          ) : (
            <ArrowDown className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
          )}
          <span>{baselineDiff}</span>
        </div>
        {subtext && (
          <span className="text-[11px] text-[#8C8377] font-medium truncate text-right">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
