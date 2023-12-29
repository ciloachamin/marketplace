"use client"

import { ChevronDown } from "lucide-react";

import { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" rounded-md  overflow-hidden w-9/12">
      <div
        className="flex justify-between items-center p-4 cursor-pointer transition duration-300 ease-in-out"
        onClick={toggleAccordion}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`}>
                      <ChevronDown/>
        </span>
      </div>
      <div className={` transition-all  ${isOpen ? 'group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000 max-h-96 p-4 border-t' : 'max-h-0 overflow-hidden invisible h-auto max-h-0 items-center opacity-0 '}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
