import Link from "next/link";

export default function LoginHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="bg-[#f7f908] flex justify-center items-center flex-col p-14 gap-3 max-md:p-8">
      <h1 className="font-bold text-5xl max-md:text-3xl">
        Votação irá abrir dia 05/02!
      </h1>
    </div>
  );

  if (isLoggedIn) {
    return (
      <div className="bg-[#f7f908] flex justify-center items-center flex-col p-14 gap-3 max-md:p-8">
        <h1 className="font-bold text-5xl max-md:text-3xl">Votação Aberta!</h1>
      </div>
    );
  }

  return (
    <Link
      className="bg-[#f7f908] flex justify-center items-center flex-col p-14 gap-3 max-md:p-8"
      href="/login"
    >
      <h1 className="font-bold text-5xl max-md:text-3xl">Votação Aberta!</h1>
      {!isLoggedIn && (
        <h2 className="font-bold text-xl max-md:text-base">
          Clique aqui para fazer login e votar
        </h2>
      )}
    </Link>
  );
}
