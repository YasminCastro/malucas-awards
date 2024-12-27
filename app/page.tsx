"use client";

import Header from "@/components/Header";
import LoginHeader from "@/components/LoginHeader";
import { Accordion } from "@/components/ui/accordion";
import Vote from "@/components/Vote";
import { ICategories } from "@/lib/collections/categories";
import { useTopbarContext } from "@/providers/Topbar";
import { useEffect, useState } from "react";

export default function Home() {
  const { headerHeight } = useTopbarContext();
  const [categories, setCategories] = useState<ICategories[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/admin/categories/get");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div style={{ marginTop: `${headerHeight}px` }}>
      <Header />
      <LoginHeader />
      <Accordion type="multiple">
        {categories.map((item, index) => {
          return (
            <Vote
              key={index}
              title={item.title}
              nominees={item.nominees}
              winner={item.winner}
            />
          );
        })}
      </Accordion>
    </div>
  );
}
