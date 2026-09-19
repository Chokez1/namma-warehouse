import React, { useState } from 'react';
import {
  Sparkles,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Warehouse,
  BarChart3,
  GitFork,
  Zap,
} from 'lucide-react';

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunOptimization: () => void;
  onGoToScenarios: () => void;
  onGoToAnalytics: () => void;
}

export const DemoTourModal: React.FC<DemoTourModalProps> = ({
  isOpen,
  onClose,
  onRunOptimization,
  onGoToScenarios,
  onGoToAnalytics,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'The Challenge: Rapid Urban E-Commerce in Bengaluru',
      tag: 'Problem Context',
      icon: MapPin,
      content: (
        <div className="space-y-2.5 text-xs text-[#57534E]">
          <p>
            Bengaluru processes over <strong>300,000+ e-commerce & quick-commerce deliveries daily</strong>. However, severe corridor congestion along Outer Ring Road, Silk Board, and Whitefield leads to delayed dispatches, elevated logistics operating costs, and excessive fuel burn.
          </p>
          <p>
            <strong>Namma Warehouse</strong> solves this using mathematical facility location optimization grounded in real municipal BBMP spatial data.
          </p>
        </div>
      ),
      actionText: 'Next: Explore Data',
    },
    {
      title: 'The Foundation: Real BBMP Municipal Dataset',
      tag: '800 Grid Nodes',
      icon: Warehouse,
      content: (
        <div className="space-y-2.5 text-xs text-[#57534E]">
          <p>
            Rather than relying on synthetic estimates, the map is powered directly by <strong>800 BBMP coordinate points</strong> from the repository dataset.
          </p>
          <div className="p-2.5 bg-[#FAF7EF] rounded-lg border border-[#E7E2D4] space-y-1">
            <div className="font-bold text-[#1C1917]">Dataset Attributes:</div>
            <div>• <code className="font-mono text-amber-800">orders_per_day</code>: Density demand from Census ward populations</div>
            <div>• <code className="font-mono text-amber-800">price_per_sqft</code>: Ward property lease values (₹5,678 - ₹26,653)</div>
            <div>• <code className="font-mono text-amber-800">traffic_index</code>: Real road congestion multipliers (0.15 - 0.98)</div>
          </div>
        </div>
      ),
      actionText: 'Next: Solve Optimization',
    },
    {
      title: 'The Solver: Capacitated Multi-Criteria P-Median',
      tag: 'Algorithmic Optimization',
      icon: Zap,
      content: (
        <div className="space-y-2.5 text-xs text-[#57534E]">
          <p>
            Namma Warehouse evaluates 10 candidate logistics hubs (Peenya, Whitefield, Electronic City, Hoskote, Bommasandra, Nelamangala, etc.) against multi-objective functions:
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 bg-emerald-50 rounded border border-emerald-200">
              <span className="font-bold text-emerald-900">Cost & Speed:</span> Minimizes fixed leases and transport delays
            </div>
            <div className="p-2 bg-emerald-50 rounded border border-emerald-200">
              <span className="font-bold text-emerald-900">Green City:</span> Minimizes vehicle kilometers and diesel CO₂ emissions
            </div>
          </div>
        </div>
      ),
      actionText: 'Trigger Solver Now',
      onAction: () => {
        onRunOptimization();
      },
    },
    {
      title: 'Measurable Outcomes: 18% Cost Reduction, 24m Delivery',
      tag: 'Validated Results',
      icon: BarChart3,
      content: (
        <div className="space-y-2.5 text-xs text-[#57534E]">
          <p>
            Upon optimization, the network reveals optimal hub placements:
          </p>
          <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 space-y-1 text-[11px] text-[#78350F]">
            <div>• <strong>3 Hubs Selected:</strong> Peenya (NW), Electronic City (S), Whitefield (E)</div>
            <div>• <strong>Average Delivery Time:</strong> Reduced from 34 min to <strong>24.5 min</strong></div>
            <div>• <strong>CO₂ Emissions:</strong> Saved over <strong>1.1 tons</strong> of daily greenhouse gases</div>
            <div>• <strong>SLA Compliance:</strong> <strong>94.2%</strong> on-time rate</div>
          </div>
        </div>
      ),
      actionText: 'Next: Test What-If Failure',
    },
    {
      title: 'Operational Resilience: Instant Disruption Failover',
      tag: 'Stress Testing',
      icon: GitFork,
      content: (
        <div className="space-y-2.5 text-xs text-[#57534E]">
          <p>
            Real logistics networks face unexpected disruptions. In the <strong>Scenarios</strong> tab, judges can simulate:
          </p>
          <p>
            • <strong>Facility Outage:</strong> Take Whitefield W3 offline and observe the solver dynamically reroute volume to Peenya and Electronic City.
            <br />
            • <strong>Festive Surge:</strong> Test +40% demand spikes.
            <br />
            • <strong>Monsoon Gridlock:</strong> Simulate peak traffic slowdowns.
          </p>
        </div>
      ),
      actionText: 'Finish Walkthrough',
      onAction: () => {
        onGoToScenarios();
        onClose();
      },
    },
  ];

  const step = steps[currentStep];
  const StepIcon = step.icon;

  const handleNext = () => {
    if (step.onAction) {
      step.onAction();
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-[#E7E2D4] shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#FAF7EF] via-[#F5F0E4] to-[#FAF7EF] border-b border-[#E7E2D4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded inline-block border border-amber-200">
                Hackathon Judge Tour • Step {currentStep + 1} of {steps.length}
              </div>
              <h3 className="font-extrabold text-sm text-[#1C1917] mt-0.5">
                GRIDPOINT Interactive Walkthrough
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <StepIcon className="w-4 h-4" />
            </div>
            <h4 className="font-extrabold text-sm text-[#1C1917]">
              {step.title}
            </h4>
          </div>

          <div>{step.content}</div>
        </div>

        {/* Progress Dots & Buttons */}
        <div className="p-4 bg-[#FAF7EF] border-t border-[#E7E2D4] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                  i === currentStep
                    ? 'bg-amber-600 w-6'
                    : i < currentStep
                    ? 'bg-amber-300'
                    : 'bg-stone-300'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-3 py-1.5 rounded-lg border border-[#E7E2D4] text-xs font-semibold text-[#57534E] hover:bg-white transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>{step.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
