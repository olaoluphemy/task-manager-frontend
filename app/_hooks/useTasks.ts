import { getAllTasks } from "@/utils/services/tasks";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useTasks(
  query?: Record<string, string | number>,
  filters: Array<string | number> = [],
) {
  // const res = useQuery({
  //   queryFn: () => getAllTasks(),
  //   queryKey: ["tasks"],
  // });

  // const {
  //   fetchNextPage,
  //   fetchPreviousPage,
  //   hasNextPage,
  //   hasPreviousPage,
  //   isFetchingNextPage,
  //   isFetchingPreviousPage,
  //   ...result
  // }
  const res = useInfiniteQuery({
    queryKey: ["tasks", ...filters],
    queryFn: ({ pageParam = 1 }) => getAllTasks({ page: pageParam, ...query }),
    // ...options,
    getNextPageParam: (lastPage) => lastPage.data.meta.nextPage, //lastPage.nextCursor,
    initialPageParam: 1,
    // getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
  });

  // console.log({ result });

  return res;
}
