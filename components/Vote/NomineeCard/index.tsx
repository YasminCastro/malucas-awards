import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

interface IProps {
  name: string;
  picture: string;
  ig: string;
  categoryTitle: string;
  winner?: string;
  votedNomineeIg?: string; // Adiciona a propriedade para o IG do indicado votado
  setVotedNomineeIg: (ig: string) => void; // Função para atualizar o IG do indicado votado
}

export default function NomineeCard({
  picture,
  name,
  ig,
  categoryTitle,
  winner,
  votedNomineeIg,
  setVotedNomineeIg,
}: IProps) {
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    setVoted(votedNomineeIg === ig);
  }, [votedNomineeIg, ig]);

  const handleVote = async () => {
    const token = Cookies.get("token");
    // if (!token) {
    //   alert("Você precisa estar logado para votar.");
    //   return;
    // }
    if (!token) {
      alert("A votação ainda não iniciou.");
      return;
    }

    const decoded: any = jwt.decode(token);
    const voterIg = decoded.ig;

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ig: voterIg,
          categoryTitle,
          nomineeIg: ig,
          action: voted ? "unvote" : "vote",
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setVotedNomineeIg(voted ? "" : ig);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Erro ao registrar voto:", error);
      alert("Erro ao registrar voto. Tente novamente mais tarde.");
    }
  };

  return (
    <div
      className="relative max-w-[380px] max-h-[380px] w-full h-full overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 max-xl:max-w-[280px] max-xl:max-h-[280px]"
      onClick={handleVote}
    >
      <div className="relative w-full h-full cursor-pointer">
        <Image
          src={`/nominees/${picture}`}
          alt={name}
          width={380}
          height={380}
          objectFit="cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent flex flex-col gap-2 ">
        {winner === name && (
          <span className="bg-[#f93fff] text-black font-bold p-1 w-fit">
            GANHADOR
          </span>
        )}
        <h3 className="text-2xl font-bold  text-white">{name}</h3>
        {voted && (
          <span className="bg-[#00ff00] text-black font-bold p-1 w-fit">
            VOTADO
          </span>
        )}
      </div>
    </div>
  );
}
