import { useState, useEffect } from "react";
function Loading() {
  const [progress, setProgress] = useState(0);

  // Status messages that change as progress increases
  const statusMessages = [
    { threshold: 0, text: "Verifying your details..." },
    { threshold: 35, text: "Setting up your account..." },
    { threshold: 70, text: "Almost there..." },
    { threshold: 95, text: "Finishing up..." },
  ];

  // Get the current message based on progress
  const currentMessage = [...statusMessages]
    .reverse()
    .find((msg) => progress >= msg.threshold)?.text;

  useEffect(() => {
    // Animate progress from 0 to 100 over ~2 seconds (matches parent's setTimeout)
    const duration = 2000;
    const intervalTime = 20; // update every 20ms for a smooth count
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
      }
      setProgress(Math.round(current));
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center text-center py-10">
      {/* Spinner with percentage in the center */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Outer glow pulse */}
        <div className="absolute w-28 h-28 rounded-full bg-emerald-400/20 blur-xl animate-pulse-dot" />

        {/* Faint background ring */}
        <svg className="absolute w-28 h-28 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="6"
          />
          {/* Progress ring - fills based on percentage, using stroke-dashoffset */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#loadingGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 42}
            strokeDashoffset={2 * Math.PI * 42 * (1 - progress / 100)}
            className="transition-all duration-100 ease-linear"
          />
          <defs>
            <linearGradient
              id="loadingGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage counter in the center */}
        <span className="relative text-2xl font-bold text-white tabular-nums">
          {progress}%
        </span>
      </div>

      {/* Rotating status message - key forces re-mount so fade-in replays on change */}
      <h2
        key={currentMessage}
        className="text-lg font-semibold text-white mt-6 animate-text-in"
      >
        {currentMessage}
      </h2>

      {/* Animated dots for extra "processing" feel */}
      <div className="flex gap-1.5 mt-3">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce-dot" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce-dot [animation-delay:0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce-dot [animation-delay:0.3s]" />
      </div>
    </div>
  );
}

export default Loading;
