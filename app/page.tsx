"use client";

import Header from "@/components/Header";
import LoginHeader from "@/components/LoginHeader";
import { Accordion } from "@/components/ui/accordion";
import Vote from "@/components/Vote";
import { useTopbarContext } from "@/providers/Topbar";

export default function Home() {
  const { headerHeight } = useTopbarContext();

  return (
    <div style={{ marginTop: `${headerHeight}px` }}>
      <Header />
      <LoginHeader />
      <Accordion type="multiple">
        {data.map((item) => {
          return (
            <Vote
              key={item.id}
              id={item.id}
              title={item.title}
              nominees={item.nominees}
            />
          );
        })}
      </Accordion>
    </div>
  );
}

const data = [
  {
    id: "1",
    title: "Video of the Year",
    nominees: [
      { name: "Anna Carolina Crat", picture: "annacrat.jpeg" },
      { name: "Evelyn", picture: "evelyn.jpeg" },
      { name: "Glaucia", picture: "glaucia.jpeg" },
      { name: "Iara", picture: "iara.jpeg" },
      { name: "José", picture: "jose.jpeg" },
      { name: "Maria Clara", picture: "mariaclara.jpeg" },
      { name: "Matheus", picture: "matheus.jpeg" },
      { name: "Rharyson", picture: "rharyson.jpeg" },
      { name: "Vittor", picture: "vittor.jpeg" },
      { name: "Yasmin", picture: "yasmin.jpg" },
    ],
  },
  { id: "2", title: "Artist of the Year", nominees: [] },
  { id: "3", title: "Artist of the Year", nominees: [] },
  { id: "4", title: "Artist of the Year", nominees: [] },
  { id: "5", title: "Artist of the Year", nominees: [] },
  { id: "6", title: "Artist of the Year", nominees: [] },
  { id: "7", title: "Artist of the Year", nominees: [] },
];
