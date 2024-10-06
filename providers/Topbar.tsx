"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

interface IValue {
  isCollapsed: boolean;
  headerHeight: number; // Adicionando altura do header
  toggleSidebarcollapse: () => void;
}

const TopbarContext = createContext({} as IValue);

export const TopbarProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [isCollapsed, setCollapse] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(128); // Altura inicial do header (h-32)

  // Função para alternar colapso do sidebar (já existente)
  const toggleSidebarCollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  // Monitorar scroll e ajustar altura do header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHeaderHeight(56); // h-14 em pixels quando scrolled
      } else {
        setHeaderHeight(128); // h-32 em pixels quando no topo
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Limpar o evento ao desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const value = useMemo(
    () => ({
      isCollapsed,
      headerHeight, // Expondo o estado da altura do header
      toggleSidebarcollapse: toggleSidebarCollapse,
    }),
    [isCollapsed, headerHeight]
  );

  return (
    <TopbarContext.Provider value={value}>{children}</TopbarContext.Provider>
  );
};

export const useTopbarContext = (): IValue => useContext(TopbarContext);
