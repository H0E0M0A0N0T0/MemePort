import React from "react";
import { motion } from "framer-motion";
import { Check, Loader, ArrowRight } from "lucide-react";

interface TransactionProgressProps {
  currentStep: number; // Current step index (0-based)
  estimatedTime: number; // Total estimated time in seconds
}

export function TransactionProgress({
  currentStep,
  estimatedTime,
}: TransactionProgressProps) {
  const steps = [
    { label: "Approval", icon: <Check className="w-5 h-5" /> },
    { label: "Signing", icon: <Check className="w-5 h-5" /> },
    { label: "Bridge Transfer", icon: <ArrowRight className="w-5 h-5" /> },
    { label: "Confirmation", icon: <Check className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full max-w-lg mx-auto mt-8 bg-gradient-to-r from-[#1c1c1e] to-[#2b2b2f] rounded-xl p-6 shadow-xl border border-white/10 backdrop-blur-md">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] to-[#FF00F5] text-center mb-6"
      >
        Transaction Progress
      </motion.h2>

      {/* Step Progress */}
      <div className="flex justify-between mb-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all
                ${
                  index < currentStep
                    ? "bg-[#00FF94] text-black"
                    : index === currentStep
                    ? "bg-purple-700 text-white animate-pulse"
                    : "bg-gray-700 text-gray-400"
                }`}
            >
              {index === currentStep ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                step.icon
              )}
            </div>
            <span
              className={`text-sm font-medium transition-colors ${
                index === currentStep ? "text-white" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="text-center">
        <p className="text-gray-400 mb-2">
          Estimated completion time:{" "}
          <span className="font-semibold text-white">{estimatedTime}</span>{" "}
          seconds
        </p>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: estimatedTime }}
          className="h-2 bg-gradient-to-r from-[#00FF94] via-[#FF00F5] to-[#4F46E5] rounded-full"
        />
      </div>
    </div>
  );
}
