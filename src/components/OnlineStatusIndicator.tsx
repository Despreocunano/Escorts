import React from 'react';

interface OnlineStatusIndicatorProps {
  isOnline: boolean;
  showText?: boolean;
  className?: string;
}

export default function OnlineStatusIndicator({ isOnline, showText = false, className = '' }: OnlineStatusIndicatorProps) {
  if (!isOnline) return null;

  return (
    <div className={`flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full ${className}`}>
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      {showText && <span className="text-green-500 text-sm">Online</span>}
    </div>
  );
}