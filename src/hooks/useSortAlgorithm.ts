/* eslint-disable react-hooks/rules-of-hooks */
import { useBogoSort } from "@/hooks/sorts/useBogoSort";
import { useBubbleSort } from "@/hooks/sorts/useBubbleSort";

export function useSortAlgorithm(pathname: string) {
  if (pathname.includes("bogo")) {
    return useBogoSort();
  }
  if (pathname.includes("bubble")) {
    return useBubbleSort();
  }
  return useBubbleSort();
}
