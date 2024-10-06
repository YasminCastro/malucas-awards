"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

interface IProps {
  id: string;
  title: string;
  description: string;
}

export default function Vote({ id, title, description }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItem value={id} className="border-none">
      <AccordionTrigger
        className={`font-bold text-5xl h-28 flex justify-center gap-3 hover:bg-white hover:no-underline ${
          isOpen ? "bg-white" : "bg-[#f93fff]"
        } `}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {title}
      </AccordionTrigger>
      <AccordionContent>{description}</AccordionContent>
    </AccordionItem>
  );
}
