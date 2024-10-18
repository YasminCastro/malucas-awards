import Link from "next/link";

export default function LoginHeader() {
  return (
    <Link
      className="bg-[#f7f908] flex justify-center items-center flex-col p-14 gap-3 max-md:p-8"
      href="/login"
    >
      <h1 className="font-bold text-5xl max-md:text-3xl">Votação Aberta!</h1>
      <h2 className="font-bold text-xl max-md:text-base">
        Faça login para poder votar
      </h2>
    </Link>
  );
}
