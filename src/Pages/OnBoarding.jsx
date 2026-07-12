import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import Loading from "../components/Loading";
import Success from "../components/Success";

function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Merge new step data into the master formData object, then advance
  const handleNext = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Called when user clicks Submit on the Review step.
  // Shows the loading state first, then switches to success
  const handleFinalSubmit = () => {
    console.log("Onboarding complete. Final data:", formData);
    setCurrentStep(4); // move to loading state

    // Simulate async submission (e.g. API call) taking ~2 seconds
    setTimeout(() => {
      setCurrentStep(5); // move to success screen
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 px-4 py-10 relative overflow-hidden">
      {/* Decorative floating gradient blobs in the background */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-float" />

      {/* Glassmorphism card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 animate-fade-in">
        {currentStep <= 3 && <ProgressBar currentStep={currentStep} />}

        {currentStep === 1 && (
          <StepOne
            defaultValues={{
              fullName: formData.fullName,
              email: formData.email,
              phone: formData.phone,
            }}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <StepTwo
            defaultValues={{
              username: formData.username,
              password: formData.password,
              confirmPassword: formData.confirmPassword,
            }}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <StepThree
            formData={formData}
            onBack={handleBack}
            onSubmit={handleFinalSubmit}
          />
        )}

        {currentStep === 4 && <Loading />}

        {currentStep === 5 && <Success fullName={formData.fullName} />}
      </div>
    </div>
  );
}

export default Onboarding;
