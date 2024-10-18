"use client";

import { useTopbarContext } from "@/providers/Topbar";
import Image from "next/image";

export default function Header() {
  const { headerHeight } = useTopbarContext(); // Usar a altura do contexto

  const isScrolled = headerHeight === 56; // Verificar se está no estado "scrolled"

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-[#f93fff] ${
        isScrolled ? "h-14" : "h-32"
      } flex items-center px-4 z-30 transition-none`} // Removendo transição do height
      style={{ height: `${headerHeight}px`, transition: "none" }} // Ajustar para que a altura mude instantaneamente
    >
      <div
        className={`transition-all duration-500 ease-in-out ${
          isScrolled ? "ml-0" : "ml-[calc(50%-90px)]"
        }`}
        style={{
          transition:
            "margin-left 0.5s ease-in-out, transform 0.5s ease-in-out",
        }}
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
