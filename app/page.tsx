"use client";

import Header from "@/components/Header";
import LoginHeader from "@/components/LoginHeader";
import { Accordion } from "@/components/ui/accordion";
import Vote from "@/components/Vote";
import { useTopbarContext } from "@/providers/Topbar";

export default function Home() {
  const { headerHeight } = useTopbarContext(); // Usar a altura do header

  return (
    <div style={{ marginTop: `${headerHeight}px` }}>
      {" "}
      {/* Adicionar margem baseada no header */}
      <Header />
      <LoginHeader />
      <Accordion type="multiple">
        {data.map((item) => {
          return (
            <Vote
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </Accordion>
    </div>
  );
}

const data = [
  { id: "1", title: "Video of the Year", description: "TESTE" },
  { id: "2", title: "Artist of the Year", description: "TESTE" },
  { id: "3", title: "Artist of the Year", description: "TESTE" },
  { id: "4", title: "Artist of the Year", description: "TESTE" },
  { id: "5", title: "Artist of the Year", description: "TESTE" },
  { id: "6", title: "Artist of the Year", description: "TESTE" },
  { id: "7", title: "Artist of the Year", description: "TESTE" },
];
