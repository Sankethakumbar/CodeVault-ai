// src/components/coming-soon/FeatureCard.tsx
import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  highlighted?: boolean;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  highlighted,
}: FeatureCardProps) {
  return (
    <div
      className={`rounded-2xl border bg-white p-6 shadow-none transition-colors ${
        highlighted
          ? "border-[#F59E0B]/50 ring-1 ring-[#F59E0B]/20"
          : "border-black/5 hover:border-black/10"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F59E0B]/10">
          <Icon className="h-5 w-5 text-[#F59E0B]" />
        </div>
        <span className="rounded-full bg-[#F59E0B]/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-[#F59E0B]">
          Coming Soon
        </span>
      </div>

      <h3 className="mt-4 font-serif text-base font-semibold text-[#0F172A]">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-[#0F172A]/60">
        {description}
      </p>
    </div>
  );
}