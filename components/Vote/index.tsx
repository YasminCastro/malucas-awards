"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import NomineeCard from "./NomineeCard";
import { ICategories } from "@/config/categoriesNominees";

export default function Vote({ title, nominees, winner }: ICategories) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItem value={title} className="border-none ">
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
      <AccordionContent className="flex justify-center items-center p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {nominees.map((nominee) => (
            <NomineeCard
              key={nominee.name}
              name={nominee.name}
              picture={nominee.picture}
              winner={winner}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
