interface ICategories {
  title: string;
  nominees: INominees[];
}

interface INominees {
  name: string;
  picture: string;
  isWinner?: boolean;
}

const data: ICategories[] = [
  {
    title: "Video of the Year",
    nominees: [
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
    ],
  },
  {
    title: "Melhor Internacional Latino",
    nominees: [{ name: "José", picture: "jose.jpeg" }],
  },
  { title: "Artist of the Year", nominees: [] },
  { title: "Artist of the Year", nominees: [] },
  { title: "Artist of the Year", nominees: [] },
  { title: "Artist of the Year", nominees: [] },
  { title: "Artist of the Year", nominees: [] },
];

export default data;
