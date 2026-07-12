

function ProgressBar({ currentStep, totalSteps = 3 }) {
  const percentage = (currentStep / totalSteps) * 100;

  const stepLabels = ["Personal Info", "Account Details", "Review"];

  return (
    <div className="w-full mb-8 animate-fade-in">
      {/* Step labels */}
      <div className="flex justify-between mb-2">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;
          return (
            <span
              key={label}
              className={`text-xs font-medium transition-colors duration-300 ${
                isActive ? "text-white" : "text-white/40"
              }`}
            >
              {label}
            </span>
          );
        })}
      </div>

      {/* Track */}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        {/* Fill - animates smoothly when percentage changes */}
        <div
          className="h-full bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
