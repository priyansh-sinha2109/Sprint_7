import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../schemas/onboardingSchema";
import Button from "./Button";

// Step 1: collects Full Name, Email, Phone Number
// defaultValues come from the parent's lifted state, so Back preserves data
function StepOne({ defaultValues, onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
    mode: "onChange", // real-time validation as user types
  });

  const onSubmit = (data) => {
    onNext(data); // send this step's data up to parent, move to next step
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="animate-slide-up">
      <h2 className="text-2xl font-bold text-white mb-1">
        Personal Information
      </h2>
      <p className="text-white/60 text-sm mb-6">Let's start with the basics</p>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Full Name
          </label>
          <input
            type="text"
            {...register("fullName")}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />
          {errors.fullName && (
            <p className="text-pink-300 text-xs mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />
          {errors.email && (
            <p className="text-pink-300 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            {...register("phone")}
            placeholder="9876543210"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />
          {errors.phone && (
            <p className="text-pink-300 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button type="submit" disabled={!isValid}>
          Next Step →
        </Button>
      </div>
    </form>
  );
}

export default StepOne;
