import Image from "next/image";

export default function LoginHeader() {
  return (
    <div className="bg-[#f7f908] flex justify-center items-center flex-col p-14 gap-3">
      <h1 className="font-bold text-5xl">Votação Aberta!</h1>
      <h2 className="font-bold text-xl">Faça login para poder votar</h2>
    </div>
  );
}
