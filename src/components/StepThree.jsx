import Button from "./Button";

// Review everything the user entered before final submit
function StepThree({ formData, onBack, onSubmit }) {
  const reviewItems = [
    { label: "Full Name", value: formData.fullName },
    { label: "Email", value: formData.email },
    { label: "Phone Number", value: formData.phone },
    { label: "Username", value: formData.username },
    { label: "Password", value: "•".repeat(formData.password?.length || 0) },
  ];

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold text-white mb-1">
        Review Your Information
      </h2>
      <p className="text-white/60 text-sm mb-6">
        Make sure everything looks right
      </p>

      <div className="space-y-3">
        {reviewItems.map((item) => (
          <div
            key={item.label}
            className="flex justify-between items-center px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          >
            <span className="text-white/60 text-sm">{item.label}</span>
            <span className="text-white font-medium">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <Button type="button" variant="secondary" onClick={onBack}>
          ← Back
        </Button>
        <Button type="button" onClick={onSubmit}>
          Submit ✓
        </Button>
      </div>
    </div>
  );
}

export default StepThree;
