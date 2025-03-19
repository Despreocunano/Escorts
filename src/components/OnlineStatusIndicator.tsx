import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface OnlineStatusIndicatorProps {
  modelId: string;
  initialIsOnline: boolean;
  showText?: boolean;
  className?: string;
}

export default function OnlineStatusIndicator({ 
  modelId, 
  initialIsOnline, 
  showText = false, 
  className = '' 
}: OnlineStatusIndicatorProps) {
  const [isOnline, setIsOnline] = useState(initialIsOnline);

  useEffect(() => {
    // Subscribe to real-time changes
    const channel = supabase
      .channel(`model-status-${modelId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'models',
          filter: `id=eq.${modelId}`
        },
        (payload) => {
          if (payload.new && typeof payload.new.is_online === 'boolean') {
            setIsOnline(payload.new.is_online);
          }
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [modelId]);

  if (!isOnline) return null;

  return (
    <div className={`flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full ${className}`}>
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      {showText && <span className="text-green-500 text-sm">Online</span>}
    </div>
  );
}