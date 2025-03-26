import { useEffect } from "react";

/**
 * Custom hook to block scrolling when triggered.
 *
 * @param {boolean} action - Flag to control whether scrolling should be blocked.
 */
function useBlockScroll(action: boolean) {
  useEffect(() => {
    if (action) {
      // Function to prevent scrolling
      const preventScroll = (e: Event) => {
        e.preventDefault();
      };
      // Add event listeners to block scroll actions
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });

      // Cleanup function to remove event listeners when action changes or component unmounts
      return () => {
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
      };
    } else {
      // Ensure previous scroll blocking event listeners are removed
      return () => {
        window.removeEventListener("wheel", (e: Event) => e.preventDefault());
        window.removeEventListener("touchmove", (e: Event) => e.preventDefault());
      };
    }
  }, [action]);
}

export default useBlockScroll;
