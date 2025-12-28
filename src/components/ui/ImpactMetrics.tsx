import { useRef, useState, useEffect } from 'react';
import { clsx } from 'clsx';

interface Metric {
    label: string;
    value: string;
    description: string;
}

interface HighlightProps {
    metrics: Metric[];
}

export const ImpactMetrics = ({ metrics }: HighlightProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, i) => (
                <div
                    key={i}
                    className={clsx(
                        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-500",
                        hoveredIndex === i ? "border-white/30 bg-white/10" : "hover:border-white/20"
                    )}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <div className="mb-4">
                        <span className="text-sm font-medium uppercase tracking-wider text-gray-400">
                            {metric.label}
                        </span>
                    </div>
                    <div>
                        <div className="mb-2 font-display text-4xl md:text-5xl lg:text-6xl text-white">
                            {metric.value}
                        </div>
                        <p className="text-sm leading-relaxed text-gray-500 group-hover:text-gray-300 transition-colors">
                            {metric.description}
                        </p>
                    </div>

                    <div className={clsx(
                        "absolute inset-0 -z-10 bg-gradient-to-br from-signal-emerald/10 to-transparent opacity-0 transition-opacity duration-500",
                        hoveredIndex === i ? "opacity-100" : ""
                    )} />
                </div>
            ))}
        </div>
    );
};
