"use client";

import { useTopbarContext } from "@/providers/Topbar";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { headerHeight } = useTopbarContext(); // Usar a altura do contexto
  const router = useRouter();

  const isScrolled = headerHeight === 56; // Verificar se está no estado "scrolled"

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

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

      {isLoggedIn && (
        <button
          className="ml-auto cursor-pointer flex items-center"
          onClick={handleLogout}
        >
          <LogOut className="mr-2" />
        </button>
      )}
    </div>
  );
}
