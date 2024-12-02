import React, { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { TokenSelector } from './TokenSelector';
import axios from 'axios';

const PATH_FINDER_API_URL = "https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}";
const API_KEY = "2spp36gcix0xgx9m"; // Your API key for fetching gas charges

export function SwapInterface() {
  const [sourceToken, setSourceToken] = useState({
    symbol: 'ETH',
    icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png',
    balance: '0.1234',
    address: '0xSourceTokenAddress',
    chainId: '80001', // Mumbai Testnet
  });

  const [destinationToken, setDestinationToken] = useState({
    symbol: 'USDC',
    icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/usdc.png',
    balance: '0.00',
    address: '0xDestinationTokenAddress',
    chainId: '43113', // Fuji Testnet
  });

  const [swapAmount, setSwapAmount] = useState('');
  const [quoteData, setQuoteData] = useState(null);
  const [isSwapping, setIsSwapping] = useState(false);

  // Simulate gas fee based on swap amount
  const estimatedGasFee = swapAmount
    ? (Number(swapAmount) * 0.01).toFixed(2)
    : '0.00';

  const handleMaxClick = () => {
    setSwapAmount(sourceToken.balance);
  };

  const handleSwapTokens = () => {
    const temp = sourceToken;
    setSourceToken(destinationToken);
    setDestinationToken(temp);
    setSwapAmount('');
    setQuoteData(null); // Clear previous quote data
  };

  const fetchQuote = async () => {
    if (!swapAmount || Number(swapAmount) <= 0) {
      alert('Please enter a valid amount to swap.');
      return;
    }

    const params = {
      fromTokenAddress: sourceToken.address,
      toTokenAddress: destinationToken.address,
      amount: (Number(swapAmount) * 10 ** 18).toString(), // Assuming 18 decimals
      fromTokenChainId: sourceToken.chainId,
      toTokenChainId: destinationToken.chainId,
      widgetId: 0,
    };

    try {
      const response = await axios.get(PATH_FINDER_API_URL, {
        params,
        headers: { 'Authorization': `Bearer ${API_KEY}` }, // Adding API key in headers
      });
      setQuoteData(response.data);
      console.log('Quote Data:', response.data);
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      alert('Failed to fetch quote. Please try again.');
    }
  };

  const handleSwap = async () => {
    if (!quoteData) {
      alert('Please fetch the quote before proceeding with the swap.');
      return;
    }

    setIsSwapping(true);
    console.log('Swap initiated!');
    console.log('Source Token:', sourceToken);
    console.log('Destination Token:', destinationToken);
    console.log('Amount:', swapAmount);
    console.log('Quote Data:', quoteData);

    // Simulate a delay for swapping
    setTimeout(() => {
      alert('Swap completed successfully!');
      setIsSwapping(false);
      setSwapAmount('');
      setQuoteData(null); // Clear quote data after swap
    }, 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-24 p-4">
      <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6">Swap Tokens</h2>

        {/* Token Selectors */}
        <div className="space-y-2">
          {/* Source Token */}
          <TokenSelector
            side="source"
            tokenSymbol={sourceToken.symbol}
            tokenIcon={sourceToken.icon}
            balance={sourceToken.balance}
            onMaxClick={handleMaxClick}
          />

          {/* Swap Button */}
          <div className="flex justify-center -my-3 relative z-10">
            <button
              className="
                bg-[#141414] p-2 rounded-lg border border-white/10
                hover:bg-[#1A1A1A] transition-colors
                text-[#00FF94] hover:text-[#00FF94]/80
              "
              onClick={handleSwapTokens}
              aria-label="Swap tokens"
            >
              <ArrowDownUp className="w-5 h-5" />
            </button>
          </div>

          {/* Destination Token */}
          <TokenSelector
            side="destination"
            tokenSymbol={destinationToken.symbol}
            tokenIcon={destinationToken.icon}
            balance={destinationToken.balance}
          />
        </div>

        {/* Fee and Quote Details */}
        <div className="mt-6 space-y-4">
          <div className="bg-[#141414] rounded-lg p-3 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Estimated Gas Fee</span>
              <span>≈ ${estimatedGasFee}</span>
            </div>
            {quoteData && (
              <div className="flex justify-between text-gray-400">
                <span>Estimated Output</span>
                <span className="text-[#00FF94]">
                  {quoteData.estimatedAmount || 'N/A'} {destinationToken.symbol}
                </span>
              </div>
            )}
          </div>

          {/* Fetch Quote Button */}
          <button
            onClick={fetchQuote}
            disabled={!swapAmount || isSwapping}
            className={`w-full py-2 rounded-xl font-medium text-sm bg-blue-500 text-white shadow-md
              ${!swapAmount || isSwapping ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}
              transition-all duration-200 focus:outline-none`}
          >
            Fetch Quote
          </button>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            disabled={!swapAmount || isSwapping || !quoteData}
            className={`w-full py-4 rounded-xl font-semibold text-lg
              ${
                !swapAmount || isSwapping || !quoteData
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#6B46C1] to-[#4F46E5] hover:from-[#7C3AED] hover:to-[#6366F1]'
              }
              text-white shadow-lg
              transition-all duration-200
              hover:shadow-[0_0_30px_rgba(0,255,148,0.2)]
              focus:outline-none focus:ring-2 focus:ring-[#00FF94]
            `}
          >
            {isSwapping ? 'Swapping...' : 'Swap Tokens'}
          </button>
        </div>
      </div>
    </div>
  );
}
