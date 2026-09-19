import React from 'react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Zap,
  Clock,
} from 'lucide-react';
import { ActivityEvent } from '../types';

interface ActivityFeedProps {
  events: ActivityEvent[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ events }) => {
  const getIcon = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'optimization':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      case 'traffic':
        return <Flame className="w-3.5 h-3.5 text-red-500 shrink-0" />;
      case 'demand':
        return <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'capacity':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E7E2D4] shadow-xs p-4 flex flex-col">
      <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D4]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-600" />
          <h3 className="font-bold text-sm text-[#1C1917]">Recent System Events</h3>
        </div>
        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
          Real-time
        </span>
      </div>

      <div className="divide-y divide-[#F5F0E4] mt-1">
        {events.map((evt) => (
          <div key={evt.id} className="py-2.5 flex items-start gap-2.5 text-xs">
            <div className="mt-0.5">{getIcon(evt.type)}</div>
            <div className="min-w-0 flex-1">
              <div className="text-[#1C1917] font-semibold leading-tight">
                {evt.message}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#A8A29E] mt-0.5">
                <Clock className="w-3 h-3" />
                <span>{evt.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
