'use client'
import React, { useState } from "react";
import {AnimatePresence, motion} from 'framer-motion';

const NavBar = () => {
  return (
    <div className="w-screen bg-gray-400 gap-20 rounded-bl-4xl rounded-br-4xl h-12 flex justify-center items-center">
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Sorts
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Dynamic Programming
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Searchs
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Divide and Conquer
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Backtracking
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Graph
      </FlyoutLink>
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Greedy
      </FlyoutLink>
    </div>
  );
};

interface FlyoutLinkProps {
  children: React.ReactNode;
  href: string;
  FlyoutContent?: React.ComponentType;
}

const FlyoutLink = ({ children, href, FlyoutContent }: FlyoutLinkProps) => {
  const [open, setOpen] = useState(false);
  const showFlyout = open && FlyoutContent;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <a className="relative text-zinc-800 text-[1.2rem]" href={href}>
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

const PricingContent = () => {
  return (
    <div className="w-fit h-fit p-6 z-10 top-full mt-2">
      {/* Conteúdo do flyout aqui */}

    </div>
  );
};

export default NavBar;
