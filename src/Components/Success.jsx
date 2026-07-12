function Success({ fullName }) {
  return (
    <div className="flex flex-col items-center text-center py-8">
      {/* Wrapper for circle + ripple rings */}
      <div className="relative flex items-center justify-center">
        {/* Ripple rings - expand and fade outward */}
        <span className="absolute w-20 h-20 rounded-full bg-emerald-400/40 animate-ripple" />
        <span className="absolute w-20 h-20 rounded-full bg-emerald-400/40 animate-ripple [animation-delay:0.3s]" />

        {/* Main circle - pops in with a slight bounce */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/50 animate-pop-in">
          {/* Checkmark - draws itself using stroke-dasharray animation */}
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 13l4 4L19 7"
              pathLength="1"
              className="animate-draw-check"
            />
          </svg>
        </div>
      </div>

      {/* Text - fades up after the checkmark finishes drawing */}
      <h2 className="text-2xl font-bold text-white mt-6 opacity-0 animate-text-in [animation-delay:0.6s]">
        You're all set{fullName ? `, ${fullName.split(" ")[0]}` : ""}! 🎉
      </h2>
      <p className="text-white/60 text-sm mt-2 max-w-xs opacity-0 animate-text-in [animation-delay:0.75s]">
        Your account has been created successfully. Welcome aboard!
      </p>
    </div>
  );
}

export default Success;
