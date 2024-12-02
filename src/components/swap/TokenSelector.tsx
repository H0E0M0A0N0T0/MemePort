import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

interface TokenSelectorProps {
  side: "source" | "destination";
  tokenSymbol: string; // Token symbol (e.g., 'ETH', 'USDC')
  tokenIcon: string; // URL of the token's icon
  balance: string; // User's balance for the token
  onMaxClick?: () => void; // Optional handler for the MAX button
}

export function TokenSelector({
  side,
  tokenSymbol,
  tokenIcon,
  balance,
  onMaxClick,
}: TokenSelectorProps) {
  const [inputValue, setInputValue] = useState<string>(""); // State for the input value
  const [isIconError, setIsIconError] = useState<boolean>(false); // State to handle token icon fallback

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="bg-[#141414] rounded-xl p-4 border border-white/10 shadow-sm transition duration-300 hover:shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-400 text-sm font-medium">
          {side === "source" ? "From" : "To"}
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-sm font-medium">
            Balance: {balance}
          </span>
          {side === "source" && (
            <button
              className="text-[#00FF94] text-sm hover:text-[#00FF94]/80 focus:outline-none transition duration-200"
              onClick={onMaxClick}
            >
              MAX
            </button>
          )}
        </div>
      </div>

      {/* Token Selector & Input Section */}
      <div className="flex items-center space-x-4">
        {/* Token Button */}
        <button
          className="flex items-center space-x-2 bg-[#1A1A1A] rounded-lg px-3 py-2 hover:bg-[#1A1A1A]/80 focus:outline-none transition duration-200"
          aria-label={`Select token for ${side}`}
        >
          <img
            src={!isIconError ? tokenIcon : "/fallback-token-icon.png"}
            alt={`${tokenSymbol} logo`}
            className="w-8 h-8 rounded-full"
            onError={() => setIsIconError(true)}
          />
          <span className="text-white font-medium text-sm">{tokenSymbol}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        {/* Input Field */}
        <div className="relative w-full">
          <input
            type="number"
            placeholder="0.0"
            value={inputValue}
            onChange={handleInputChange}
            className="
              w-full bg-transparent text-right text-2xl text-white
              placeholder-gray-500 focus:outline-none focus:ring-2
              focus:ring-[#00FF94] rounded-lg px-2 transition duration-200
            "
            aria-label={`Enter amount for ${side}`}
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
