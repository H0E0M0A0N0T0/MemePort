import React, { useState } from "react";
import { FadeIn } from "../components/animations/FadeIn";
import { SwapInterface } from "../components/swap/SwapInterface";
import { AchievementSystem } from "../components/gamification/AchievementSystem";
import { TransactionProgress } from "../components/swap/TransactionProgress";
import { NetworkStatus } from "../components/swap/NetworkStatus";
import axios from "axios";

export function Exchange() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showProgress, setShowProgress] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapResult, setSwapResult] = useState<string | null>(null);

  const handleTokenSwap = async () => {
    setShowProgress(true);
    setIsSwapping(true);
    setSwapResult(null);
    try {
      // Simulating a service router API call
      const response = await axios.post("/api/swap", {
        sourceToken: "ETH",
        destinationToken: "DAI",
        amount: 1,
      });
      setSwapResult(response.data.message || "Swap Successful!");
      setCurrentStep(4); // Complete all steps
    } catch (error) {
      setSwapResult("Swap failed. Please try again.");
      console.error("Error during token swap:", error);
    } finally {
      setIsSwapping(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-r from-[#0b0b0b] to-[#141414]">
      <FadeIn>
        <div className="container mx-auto px-4 pt-24 text-center">
          {/* Network Status Section */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <NetworkStatus chainId={1} isActive={true} />
            <NetworkStatus chainId={137} isActive={true} />
          </div>

          {/* Header Section */}
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] via-[#FF00F5] to-[#4F46E5] text-center mb-4">
            Meme Token Exchange
          </h1>
          <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mx-auto mb-8">
            Swap your favorite meme tokens instantly with the best rates.
          </p>

          {/* Main Content */}
          <div className="flex flex-col items-center space-y-8">
            {/* Swap Interface */}
            <SwapInterface />

            {/* Swap Button */}
            <button
              onClick={handleTokenSwap}
              disabled={isSwapping}
              className={`px-5 py-3 rounded-lg font-semibold bg-gradient-to-r
                from-green-600 to-teal-600 text-white shadow-lg
                hover:from-green-500 hover:to-teal-500 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2
                flex items-center justify-center space-x-2
                ${
                  isSwapping
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:shadow-[0_0_30px_rgba(0,255,148,0.3)]"
                }`}
            >
              {isSwapping ? (
                <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></div>
              ) : (
                <span>Swap Tokens</span>
              )}
            </button>

            {/* Transaction Progress */}
            {showProgress && (
              <div className="w-full max-w-2xl">
                <TransactionProgress
                  currentStep={currentStep}
                  estimatedTime={30}
                />
              </div>
            )}

            {/* Swap Result */}
            {swapResult && (
              <div className="text-center text-sm font-medium text-white bg-[#1a1a1a] rounded-lg p-3 shadow-md">
                {swapResult}
              </div>
            )}

            {/* Gamification System */}
            <div className="w-full max-w-xl">
              <AchievementSystem />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
