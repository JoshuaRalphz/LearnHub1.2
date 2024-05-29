// to search when user stop typing 
// to not query every type

import { useEffect, useState } from "react";

/**
 * useDebounce
 * 
 * Returns a debounced state value.
 * The returned value will be updated after the `delay` has passed
 * without any additional renders.
 * 
 * @template T type of the initial value
 * @param {T} value initial value
 * @param {number} [delay=500] delay in milliseconds
 * @returns {T} debounced state value
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // useEffect will only run after the component is mounted
  // and will be cleaned up when the component is unmounted
  useEffect(() => {
    /**
     * timerId stores the id of the setTimeout timer
     * @type {ReturnType<typeof setTimeout>}
     */
    const timerId = setTimeout(() => {
      /**
       * update the debouncedValue after the delay
       */
      setDebouncedValue(value);
    }, delay);

    /**
     * clear the timer when the component is unmounted
     */
    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return debouncedValue;
}

