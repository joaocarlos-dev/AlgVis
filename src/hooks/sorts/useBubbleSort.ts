import { useState } from "react";
import axios from "axios";

export function useBubbleSort() {
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [loading, setLoading] = useState(false);

  const sort = async (input: number[]) => {
    setLoading(true);
    const res = await axios.post<SortStep[]>(
      "https://alg-vis-algorithms.vercel.app/sorts/bubble-sort",
      {
        array: input,
      }
    );
    setSteps(res.data);
    setLoading(false);
  };

  return { steps, sort, loading, setSteps };
}
