import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export default function LoginHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded: any = jwt.decode(token);
      if (decoded && decoded.ig) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <Link
      className="bg-[#f7f908] flex justify-center items-center flex-col p-14 gap-3 max-md:p-8"
      href="/login"
    >
      <h1 className="font-bold text-5xl max-md:text-3xl">Votação Aberta!</h1>
      {!isLoggedIn && (
        <h2 className="font-bold text-xl max-md:text-base">
          Faça login para poder votar
        </h2>
      )}
    </Link>
  );
}
