/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useSortAlgorithm } from "@/hooks/useSortAlgorithm";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'

const generateRandomArray = (length: number, min: number, max: number): number[] => {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};


const SortVisualizer = () => {
  // Estados para configurações
  const [arrayLength, setArrayLength] = useState(10);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(10);
  const [speed, setSpeed] = useState(20);

  // Estado para o array
  const [input, setInput] = useState<number[]>(() => 
    generateRandomArray(arrayLength, minValue, maxValue)
  );

  const pathname = usePathname()
  
  const { steps, sort} = useSortAlgorithm(pathname);
  const [currentStep, setCurrentStep] = useState(0);

  // Efeito para animação
  useEffect(() => {
    if (steps.length === 0) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [steps, speed]);

  const handleRandomize = () => {
    const newArray = generateRandomArray(arrayLength, minValue, maxValue);
    setInput(newArray);
    setCurrentStep(0);
    sort(newArray);
  };

  const handleStartSort = () => {
    setCurrentStep(0);
    sort(input);
  };

  useEffect(() => {
    handleRandomize();
 }, [arrayLength, minValue, maxValue]);

  return (
    <div className="flex flex-col items-center mt-10">
      {/* Painel de Controles */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg grid grid-cols-2 gap-4 w-full max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">
            Array size: {arrayLength}
          </label>
          <input
            type="range"
            min="5"
            max="100"
            value={arrayLength}
            onChange={(e) => setArrayLength(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Speed (ms): {speed}
          </label>
          <input
            type="range"
            min="5"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Min Value
          </label>
          <input
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Max Value
          </label>
          <input
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-4 mb-6">
      <button
        onClick={handleRandomize}
        className="mb-4 bg-color-background px-4 py-2 text-white rounded border-1 hover:bg-gray-600 border-amber-50"
      >
        Randomize numbers
      </button>

        <button
          onClick={handleStartSort}
          className="mb-4 bg-color-background hover:bg-gray-600 px-4 py-2 text-white rounded border-1 border-amber-50 transition"
        >
          Start Sort
        </button>
      </div>

      {/* Visualização do Array */}
      <div className="flex gap-2 flex-wrap justify-center">
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
            } rounded shadow-md`}
          >
            {value}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SortVisualizer;