import { useEffect, useRef } from "react";

export function usePagination(
  callbackFn: () => void,
  isFetchingNextPage: boolean,
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observee = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !isFetchingNextPage) {
          console.log("maybeeeeeeeee");
          callbackFn?.();
        }
      },
      {
        root: null,
        threshold: 0.1,
      },
    );

    if (observee) observer.observe(observee);

    return () => {
      if (observee) observer.unobserve(observee);
    };
  }, [callbackFn, isFetchingNextPage]);

  return ref;
}
