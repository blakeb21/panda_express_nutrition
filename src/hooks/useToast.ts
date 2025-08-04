import { useState, useCallback } from 'react';
import { TOAST_DURATION } from '~/constants';

export interface UseToastReturn {
  readonly showToast: boolean;
  readonly toastText: string;
  readonly showToastMessage: (message: string) => void;
  readonly hideToast: () => void;
}

/**
 * Custom hook for managing toast notifications
 * @param duration - Duration in milliseconds to show the toast (default: 3000ms)
 * @returns Object with toast state and control functions
 */
export const useToast = (duration: number = TOAST_DURATION): UseToastReturn => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>('');

  const showToastMessage = useCallback((message: string) => {
    setToastText(message);
    setShowToast(true);
    
    const timer = setTimeout(() => {
      setShowToast(false);
    }, duration);

    // Return cleanup function in case component unmounts
    return () => clearTimeout(timer);
  }, [duration]);

  const hideToast = useCallback(() => {
    setShowToast(false);
  }, []);

  return {
    showToast,
    toastText,
    showToastMessage,
    hideToast,
  };
};