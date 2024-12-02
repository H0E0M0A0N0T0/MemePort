import React, { useState } from "react";
import { Wallet, Loader2, LogOut, ClipboardCopy } from "lucide-react";
import { ethers } from "ethers";

export function ConnectWalletButton() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it to connect.");
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setShowPopup(false);
    alert("Wallet disconnected.");
  };

  return (
    <div className="relative">
      {/* Connect Wallet Button */}
      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className={`px-5 py-3 rounded-lg font-medium flex items-center justify-center space-x-2
            bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg
            hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-[#00FF94] focus:ring-offset-2
            ${isConnecting ? "opacity-75 cursor-not-allowed" : ""}`}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Wallet className="w-5 h-5" />
          )}
          <span>Connect Wallet</span>
        </button>
      ) : (
        // Wallet Address Button
        <button
          onClick={() => setShowPopup(!showPopup)}
          className="px-5 py-3 rounded-lg font-medium flex items-center space-x-2
            bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg
            hover:from-green-500 hover:to-teal-500 transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2"
        >
          <Wallet className="w-5 h-5" />
          <span>
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
        </button>
      )}

      {/* Popup Section */}
      {showPopup && walletAddress && (
        <div
          className="absolute right-0 mt-3 w-80 bg-gradient-to-r from-gray-800 to-gray-900
            rounded-xl shadow-lg border border-white/10 p-4 backdrop-blur-lg z-20"
        >
          <div className="text-sm text-gray-400">Connected Wallet</div>
          <div className="mt-2 text-white font-medium truncate">
            {walletAddress}
          </div>
          <div className="mt-4 space-y-3">
            {/* Copy Wallet Address */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(walletAddress);
                alert("Address copied to clipboard!");
              }}
              className="flex items-center justify-between px-4 py-2 text-sm font-medium
                bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <ClipboardCopy className="w-5 h-5" />
              <span>Copy Address</span>
            </button>
            {/* Disconnect Wallet */}
            <button
              onClick={disconnectWallet}
              className="flex items-center justify-between px-4 py-2 text-sm font-medium
                bg-gray-700 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition-all
                duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
