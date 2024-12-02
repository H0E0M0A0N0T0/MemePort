import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface NetworkStatusProps {
  chainId: number;
  isActive: boolean;
}

export function NetworkStatus({ chainId, isActive }: NetworkStatusProps) {
  const getChainName = (id: number) => {
    const chains: Record<number, string> = {
      1: 'Ethereum',
      137: 'Polygon',
      56: 'BSC',
      43114: 'Avalanche',
    };
    return chains[id] || 'Unknown';
  };

  return (
    <div className="flex items-center space-x-2 bg-[#1A1A1A] rounded-lg px-3 py-1.5">
      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#00FF94]' : 'bg-red-500'} animate-pulse`} />
      <span className="text-sm text-gray-300">{getChainName(chainId)}</span>
      {isActive ? (
        <Wifi className="w-4 h-4 text-[#00FF94]" />
      ) : (
        <WifiOff className="w-4 h-4 text-red-500" />
      )}
    </div>
  );
}