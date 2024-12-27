import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useState, useEffect, useCallback } from "react";
import NomineeCard from "./NomineeCard";
import { ICategories } from "@/lib/collections/categories";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export default function Vote({ title, nominees, winner }: ICategories) {
  const [isOpen, setIsOpen] = useState(false);
  const [votedNomineeIg, setVotedNomineeIg] = useState<string | undefined>(
    undefined
  );

  const fetchUserVotes = useCallback(
    async (voterIg: string) => {
      try {
        const response = await fetch(
          `/api/admin/users/get-one?voterIg=${voterIg}`
        );
        const user = await response.json();
        const vote = user.votedCategories?.find(
          (vote: { categoryTitle: string }) => vote.categoryTitle === title
        );

        if (vote) {
          setVotedNomineeIg(vote.nomineeIg);
        }
      } catch (error) {
        console.error("Erro ao buscar votos do usuário:", error);
      }
    },
    [title]
  );

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded: any = jwt.decode(token);
      const voterIg = decoded.ig;

      fetchUserVotes(voterIg);
    }
  }, [title, fetchUserVotes]);

  return (
    <AccordionItem value={title} className="border-none">
      <AccordionTrigger
        className={`font-bold text-5xl h-28 flex justify-center gap-3 hover:bg-white hover:no-underline max-lg:text-4xl max-md:text-3xl max-sm:text-xl max-md:h-24 ${
          isOpen ? "bg-white" : "bg-[#f93fff]"
        }`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p className="w-1/2">{title}</p>
      </AccordionTrigger>
      <AccordionContent className="flex justify-center items-center p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {nominees.map((nominee) => (
            <NomineeCard
              key={nominee.ig}
              name={nominee.name}
              picture={nominee.imagePath}
              ig={nominee.ig}
              categoryTitle={title}
              winner={winner}
              votedNomineeIg={votedNomineeIg}
              setVotedNomineeIg={setVotedNomineeIg}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
