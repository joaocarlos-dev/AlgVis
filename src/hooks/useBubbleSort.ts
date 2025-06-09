import { useState } from "react";
import axios from "axios";

interface SortStep {
  array: number[];
  compared: number[];
}

export function useBubbleSort() {
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [loading, setLoading] = useState(false);

  const sort = async (input: number[]) => {
    setLoading(true);
    const res = await axios.post<SortStep[]>(
      "http://localhost:8000/bubble-sort",
      {
        array: input,
      }
    );
    setSteps(res.data);
    setLoading(false);
  };

  return { steps, sort, loading };
}
