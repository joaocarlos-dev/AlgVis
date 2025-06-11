import { useBogoSort } from "@/hooks/sorts/useBogoSort";
import { useBubbleSort } from "@/hooks/sorts/useBubbleSort";
import { useSelectionSort } from "./sorts/useSelectionSort";
import { useInsertionSort } from "./sorts/useInsertionSort";
import { useQuickSort } from "./sorts/useQuickSort";

export function useSortAlgorithm(pathname: string) {
  const algorithms = {
    bogo: useBogoSort(),
    bubble: useBubbleSort(),
    selection: useSelectionSort(),
    insertion: useInsertionSort(),
    quick: useQuickSort(),
  };

  const key = Object.keys(algorithms).find((alg) =>
    pathname.toLowerCase().includes(alg)
  ) as keyof typeof algorithms;

  return algorithms[key] ?? algorithms.bubble;
}
