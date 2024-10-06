"use client";

import { useTopbarContext } from "@/providers/Topbar";
import Image from "next/image";

export default function Header() {
  const { headerHeight } = useTopbarContext(); // Usar a altura do contexto

  const isScrolled = headerHeight === 56; // Verificar se está no estado "scrolled"

  return (
    <div
      className={`fixed top-0 left-0 w-full transition-all duration-300 ease-in-out bg-[#f93fff] ${
        isScrolled ? "h-14" : "h-32"
      } flex items-center px-4 z-30`}
      style={{ height: `${headerHeight}px` }} // Definindo altura baseada no estado
    >
      <div
        className={`transition-transform duration-300 ease-in-out transform ${
          isScrolled ? "translate-x-0" : "translate-x-[50%]"
        }`}
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={isScrolled ? 80 : 180}
          height={isScrolled ? 80 : 180}
        />
      </div>
    </div>
  );
}
