'use client'

import { useBubbleSort } from "@/hooks/useBubbleSort";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const generateRandomArray = (length: number, min: number, max: number): number[] => {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

const SortVisualizer = () => {
  const [input, setInput] = useState<number[]>(() => generateRandomArray(10, 1, 10));
  const { steps, sort } = useBubbleSort();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (steps.length === 0) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 20); // mais lento para visualização

    return () => clearInterval(interval);
  }, [steps]);

  const handleRandomize = () => {
    const newArray = generateRandomArray(10, 1, 10);
    setInput(newArray);
    setCurrentStep(0);
    sort(newArray); // sort no array correto
  };

  const handleStartSort = () => {
    setCurrentStep(0);
    sort(input); // sort no input atual
  };

  return (
    <div className="flex flex-col items-center mt-10">
        <div className="flex gap-4">
      <button
        onClick={handleRandomize}
        className="mb-4 bg-blue-500 px-4 py-2 text-white rounded"
      >
        Randomize numbers
      </button>

      <button
        onClick={handleStartSort}
        className="mb-4 bg-green-500 px-4 py-2 text-white rounded"
      >
        Start Bubble Sort
      </button>
        </div>

      <div className="flex gap-2">
        {(steps.length > 0 ? steps[currentStep].array : input).map((value, index) => (
          <motion.div
            key={index}
            animate={{ y: 0 }}
            initial={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className={`w-12 h-12 flex items-center justify-center text-white font-bold border-1 border-amber-50 ${
              steps.length > 0 && steps[currentStep].compared.includes(index)
                ? "bg-red-600"
                : "bg-color-background"
            } rounded`}
          >
            {value}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SortVisualizer;
