import { useEffect } from "react";
import { useRef } from "react";

// Return a ref to be attached to the sentinel element, and also triggers a callback to load more items when the sentinel comes into view
export function useInfiniteScrollObserver(
  loadMore: () => void,
  hasMore: boolean
) {
  // Sentinel ref for infinite scroll (div at the end of the list)
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // console.log(entries);
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinelRef.current);

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadMore]);

  return sentinelRef;
}
