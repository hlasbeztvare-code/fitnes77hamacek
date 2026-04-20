"use client";

import { useEffect, useState } from 'react';

/**
 * GOLIÁŠ Client Hooks
 * Obaluje klientskou stateful logiku.
 */
export const useHydrationFix = () => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
      setIsClient(true);
      console.log("[GOLIÁŠ] Client Integrity Shield: ACTIVE");
    }, []);
    return isClient;
};
