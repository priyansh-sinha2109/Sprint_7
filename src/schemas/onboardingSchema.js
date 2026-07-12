import { z } from "zod";

// ---------- STEP 1: Personal Information ----------
export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name is too long"),

  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    // Accepts optional +countrycode followed by 10 digits
    .regex(/^\+?[0-9]{1,3}?[-.\s]?[0-9]{10}$/, "Enter a valid phone number"),
});

// ---------- STEP 2: Account Details ----------
export const accountDetailsSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username is too long")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Only letters, numbers, and underscores allowed",
      ),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  // Cross-field validation: confirmPassword must match password
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error shows under confirmPassword field
  });
