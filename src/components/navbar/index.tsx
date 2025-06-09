'use client'
import React, { useState } from "react";
import {AnimatePresence, motion} from 'framer-motion';

import Link from 'next/link';

const NavBar = () => {
  return (
    <div className="w-screen bg-gray-400 gap-20 rounded-bl-4xl rounded-br-4xl h-12 flex justify-center items-center">
      <FlyoutLink FlyoutContent={SortsContent}>
        Sorts
      </FlyoutLink>
      <FlyoutLink FlyoutContent={DPContent}>
        Dynamic Programming
      </FlyoutLink>
      <FlyoutLink FlyoutContent={SearchsContent}>
        Searchs
      </FlyoutLink>
      <FlyoutLink FlyoutContent={DivideConquerContent}>
        Divide and Conquer
      </FlyoutLink>
      <FlyoutLink FlyoutContent={BacktrackingContent}>
        Backtracking
      </FlyoutLink>
      <FlyoutLink FlyoutContent={GraphContent}>
        Graph
      </FlyoutLink>
      <FlyoutLink FlyoutContent={GreedyContent}>
        Greedy
      </FlyoutLink>
    </div>
  );
};

interface FlyoutLinkProps {
  children: React.ReactNode;
  FlyoutContent?: React.ComponentType;
}

const FlyoutLink = ({ children, FlyoutContent }: FlyoutLinkProps) => {
  const [open, setOpen] = useState(false);
  const showFlyout = open && FlyoutContent;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <a className="relative text-zinc-800 text-[1.2rem] hover:cursor-pointer">
        {children}
        <span
        style={{transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
        }}
        className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-zinc-800
        transition-transform duration-300 ease-out"
        >
        </span>
      </a>

        <AnimatePresence>
        {showFlyout && (
        <motion.div 
        initial={{opacity: 0, y: 15}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: 15}}
        transition={{duration: 0.3, ease: 'easeOut'}}
        className="absolute left-1/2 top-12 -translate-x-1/2 bg-gray-100 text-black">
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent"/>
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-100"/>
            <FlyoutContent />
            </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
};

const SortsContent = () => {
  return (
    <div className="w-max h-fit p-6 top-full flex flex-col gap-2 items-start">
      <Link href="/sorts/bubble" className="hover:cursor-pointer">Bubble Sort</Link>
      <a className="hover:cursor-pointer">Selection Sort</a>
      <a className="hover:cursor-pointer">Insertion Sort</a>
      <a className="hover:cursor-pointer">Merge Sort</a>
      <a className="hover:cursor-pointer">Quick Sort</a>
      <a className="hover:cursor-pointer">Heap Sort</a>
      <a className="hover:cursor-pointer">Counting Sort</a>
      <a className="hover:cursor-pointer">Shell Sort</a>
      <a className="hover:cursor-pointer">Radix Sort</a>
      <a className="hover:cursor-pointer">Bogo Sort</a>
    </div>
  );
};

const DPContent = () => {
  return (
    <div className="w-max h-fit p-6 z-10 top-full mt-2 flex flex-col gap-2 items-start">
      <a className="hover:cursor-pointer">Fibonacci Sequence</a>
      <a className="hover:cursor-pointer">Knapsack Problem</a>
      <a className="hover:cursor-pointer">Subset Sum Problem</a>
      <a className="hover:cursor-pointer">Longest Increasing Subsequence (LIS)</a>
      <a className="hover:cursor-pointer">Longest Common Subsequence (LCS)</a>
      <a className="hover:cursor-pointer">Palindrome Partitioning</a>
      <a className="hover:cursor-pointer">Catalan Numbers</a>
    </div>
  );
};


const SearchsContent = () => {
    return (
      <div className="w-max h-fit p-6 z-10 top-full mt-2 flex flex-col gap-2 items-start">
        <a className="hover:cursor-pointer">Linear Search</a>
        <a className="hover:cursor-pointer">Binary Search</a>
        <a className="hover:cursor-pointer">Jump Search</a>
        <a className="hover:cursor-pointer">Interpolation Search</a>
        <a className="hover:cursor-pointer">Exponential Search</a>
        <a className="hover:cursor-pointer">Ternary Search</a>
        <a className="hover:cursor-pointer">Hashing</a>
      </div>
    );
};

const DivideConquerContent = () => {
    return (
      <div className="w-max h-fit p-6 z-10 top-full mt-2 flex flex-col gap-2 items-start">
        <a className="hover:cursor-pointer">Strassen Algorithm</a>
        <a className="hover:cursor-pointer">Karatsuba Algorithm</a>
        <a className="hover:cursor-pointer">Merge Sort</a>
        <a className="hover:cursor-pointer">Quick Sort</a>
        <a className="hover:cursor-pointer">Binary Search</a>
      </div>
    );
};

const BacktrackingContent = () => {
    return (
      <div className="w-max h-fit p-6 z-10 top-full mt-2 flex flex-col gap-2 items-start">
        <a className="hover:cursor-pointer">N-Queens Problem</a>
        <a className="hover:cursor-pointer">Subset Sum Problem</a>
        <a className="hover:cursor-pointer">Knight’s Tour Problem</a>
        <a className="hover:cursor-pointer">Subset Sum Problem</a>
      </div>
    );
};

const GraphContent = () => {
    return (
      <div className="w-max h-fit p-6 z-10 top-full mt-2 flex flex-col gap-2 items-start">
        <a className="hover:cursor-pointer">Depth-First Search (DFS)</a>
        <a className="hover:cursor-pointer">Breadth-First Search (BFS)</a>
        <a className="hover:cursor-pointer">Dijkstra’s Algorithm</a>
        <a className="hover:cursor-pointer">Bellman-Ford Algorithm</a>
        <a className="hover:cursor-pointer">Floyd-Warshall Algorithm</a>
        <a className="hover:cursor-pointer">A* Algorithm</a>
        <a className="hover:cursor-pointer">Prim’s and Kruskal’s Algorithms</a>
        <a className="hover:cursor-pointer">Topological Sorting</a>
      </div>
    );
};

const GreedyContent = () => {
    return (
      <div className="w-fit h-fit p-6 z-10 top-full mt-2 flex flex-col gap-2 items-start">
        <a className="hover:cursor-pointer">Activity Selection Problem</a>
        <a className="hover:cursor-pointer">Prim’s Algorithm</a>
        <a className="hover:cursor-pointer">Job Sequencing with Deadlines</a>
        <a className="hover:cursor-pointer">Huffman Coding</a>
        <a className="hover:cursor-pointer">Fractional Knapsack Problem</a>
      </div>
    );
};

export default NavBar;
