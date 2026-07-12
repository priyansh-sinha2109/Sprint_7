# Multi-Step Onboarding Wizard

A multi-step user onboarding form built with React, allowing users to enter personal information, set up account credentials, review their details, and submit — with real-time validation at every step.

## Tech Stack

- **React 18** (Functional Components + Hooks)
- **Vite** — build tool and dev server
- **Tailwind CSS** — styling
- **react-hook-form** — form state management
- **zod** — schema-based form validation

## Core Functionality

### 1. Three-Step Form Flow

The onboarding process is broken into three sequential steps:

**Step 1 — Personal Information**

- Full Name
- Email
- Phone Number

**Step 2 — Account Details**

- Username
- Password
- Confirm Password

**Step 3 — Review**

- Displays all previously entered information for the user to confirm before submitting.

### 2. Lifted State Management

All form data is stored in a single state object inside the parent `Onboarding` component. Each step component receives its relevant slice of data and reports changes back up via callback props (`onNext`). This ensures:

- A single source of truth for all form data.
- Data entered in any step is preserved even if the user navigates back and forth between steps.

### 3. Form Validation

Each step's inputs are validated using **zod** schemas, connected via **react-hook-form**:

- **Real-time validation** — errors appear as the user types.
- **Regex-based rules** — e.g., valid email format, phone number format, password complexity.
- **Cross-field validation** — Confirm Password is checked against Password.
- The "Next" button is disabled until all fields in the current step are valid.

### 4. Password Visibility Toggle

Both the Password and Confirm Password fields include a show/hide toggle so users can verify what they've typed.

### 5. Submission Flow

On the Review step, clicking Submit:

1. Logs the complete collected form data to the console.
2. Triggers a loading state (simulating an API call/network request).
3. Transitions to a success confirmation screen once processing completes.

> Note: The submission currently simulates a delay using `setTimeout`. In a real-world version, this would be replaced with an actual API call, and the transition to the success screen would depend on the API response rather than a fixed timer.

## Project Structure

```
src/
├── components/
│   ├── ProgressBar.jsx     # Shows current step progress
│   ├── StepOne.jsx         # Personal Information form
│   ├── StepTwo.jsx         # Account Details form
│   ├── StepThree.jsx       # Review screen
│   ├── Loading.jsx         # Loading/processing state
│   ├── Success.jsx         # Final success confirmation
│   └── Button.jsx          # Reusable button component
├── schemas/
│   └── onboardingSchema.js # Zod validation schemas for each step
├── pages/
│   └── Onboarding.jsx      # Parent component — holds form state and step logic
└── App.jsx                 # Root component
```

## How It Works — Data Flow

1. `Onboarding.jsx` initializes an empty `formData` object and tracks the current step via `currentStep` state.
2. Each step component (`StepOne`, `StepTwo`) receives `defaultValues` from `formData` and an `onNext` callback.
3. When a step's form is submitted (and valid), its data is merged into the parent's `formData`, and `currentStep` increments.
4. Going back (`onBack`) simply decrements `currentStep` — since data already lives in the parent, previously entered values remain intact.
5. On final submission from Step 3, the app moves to a loading state, then a success state, using the same `currentStep` mechanism.

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
