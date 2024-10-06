"use client";

import Header from "@/components/Header";
import LoginHeader from "@/components/LoginHeader";
import { Accordion } from "@/components/ui/accordion";
import Vote from "@/components/Vote";
import categoriesNominees from "@/config/categoriesNominees";
import { useTopbarContext } from "@/providers/Topbar";

export default function Home() {
  const { headerHeight } = useTopbarContext();

  return (
    <div style={{ marginTop: `${headerHeight}px` }}>
      <Header />
      <LoginHeader />
      <Accordion type="multiple">
        {categoriesNominees.map((item, index) => {
          return (
            <Vote key={index} title={item.title} nominees={item.nominees} />
          );
        })}
      </Accordion>
    </div>
  );
}
