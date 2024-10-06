interface ICategories {
  title: string;
  nominees: INominees[];
  winner?: string;
}

interface INominees {
  name: string;
  picture: string;
}

const allParticipants = [
  { name: "Anna Carolina Crat", picture: "annacrat.jpeg" },
  { name: "Evelyn", picture: "evelyn.jpeg" },
  { name: "Glaucia", picture: "glaucia.jpeg" },
  { name: "Iara", picture: "iara.jpeg" },
  { name: "José", picture: "jose.jpeg" },
  { name: "Lincoln", picture: "lincoln.jpeg" },
  { name: "Maria Clara", picture: "mariaclara.jpeg" },
  { name: "Matheus", picture: "matheus.jpeg" },
  { name: "Rharyson", picture: "rharyson.jpeg" },
  { name: "Vittor", picture: "vittor.jpeg" },
  { name: "Yasmin", picture: "yasmin.jpg" },
];

const findParticipant = (name: string) => {
  const participant = allParticipants.find((p) => p.name === name);
  if (!participant) {
    throw new Error(`Participant not found: ${name}`);
  }
  return participant;
};

const data: ICategories[] = [
  {
    title: "Todas as Malucas",
    nominees: [
      findParticipant("Anna Carolina Crat"),
      findParticipant("Evelyn"),
      findParticipant("Glaucia"),
      findParticipant("Iara"),
      findParticipant("José"),
      findParticipant("Lincoln"),
      findParticipant("Maria Clara"),
      findParticipant("Matheus"),
      findParticipant("Rharyson"),
      findParticipant("Vittor"),
      findParticipant("Yasmin"),
    ],
  },
  {
    title: "Melhor Internacional Latino do Ano",
    winner: "José",
    nominees: [findParticipant("José")],
  },
  {
    title: "Maluca do Ano",
    nominees: [
      findParticipant("Evelyn"),
      findParticipant("Vittor"),
      findParticipant("Maria Clara"),
    ],
  },
  {
    title: "Sapatona do Ano",
    nominees: [
      findParticipant("Anna Carolina Crat"),
      findParticipant("Glaucia"),
      findParticipant("Maria Clara"),
      findParticipant("Yasmin"),
    ],
  },
  {
    title: "Afeminado do Ano",
    nominees: [
      findParticipant("José"),
      findParticipant("Lincoln"),
      findParticipant("Matheus"),
      findParticipant("Rharyson"),
      findParticipant("Vittor"),
    ],
  },
];

export default data;
