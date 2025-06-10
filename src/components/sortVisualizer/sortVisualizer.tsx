/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useSortAlgorithm } from "@/hooks/useSortAlgorithm";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
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
  const [isSorting, setIsSorting] = useState(false);
  
  // Referência para o intervalo de animação
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Estado para o array
  const [input, setInput] = useState<number[]>(() => 
    generateRandomArray(arrayLength, minValue, maxValue)
  );

  const pathname = usePathname();
  const { steps, sort, setSteps } = useSortAlgorithm(pathname);
  const [currentStep, setCurrentStep] = useState(0);

  // Função para limpar o intervalo de animação
  const clearAnimationInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Efeito para animação
  useEffect(() => {
    if (steps.length === 0 || !isSorting) return;

    clearAnimationInterval();
    
    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        setIsSorting(false);
        clearAnimationInterval();
        return prev;
      });
    }, speed);

    return () => clearAnimationInterval();
  }, [steps, speed, isSorting]);

  const handleRandomize = () => {
    if (isSorting) {
      setIsSorting(false);
      clearAnimationInterval();
    }
    // Zera os passos anteriores
    setSteps([]);
    const newArray = generateRandomArray(arrayLength, minValue, maxValue);
    setInput(newArray);
    setCurrentStep(0);
  };

  const handleStartSort = () => {
    // Se já estiver ordenando, reinicia
    if (isSorting) {
      setCurrentStep(0);
      return;
    }
    
    // Inicia novo processo de ordenação
    setIsSorting(true);
    setCurrentStep(0);
    sort(input);
  };

  // Atualiza o array quando os parâmetros mudam
  useEffect(() => {
    setIsSorting(false);
    clearAnimationInterval();
    setSteps([]); // Reseta os passos
    
    const newArray = generateRandomArray(arrayLength, minValue, maxValue);
    setInput(newArray);
    setCurrentStep(0);
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

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleRandomize}
          className="mb-4 bg-color-background px-4 py-2 text-white rounded border-1 hover:bg-gray-600 border-amber-50"
        >
          Randomize numbers
        </button>

        <button
          onClick={handleStartSort}
          className={`mb-4 px-4 py-2 text-white rounded border-1 border-amber-50 transition ${
            isSorting ? "bg-yellow-600 hover:bg-yellow-700" : "bg-color-background hover:bg-gray-600"
          }`}
        >
          {isSorting ? "Restart Sort" : "Start Sort"}
        </button>
      </div>

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