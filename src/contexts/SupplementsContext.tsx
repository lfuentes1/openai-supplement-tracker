
import React, { useState, createContext, useContext, ReactNode } from "react";

export type NutritionFact = {
  id: string;
  name: string;
  value: string;
  unit: string;
};

export type Supplement = {
  id: string;
  name: string;
  servingSize: string;
  servingUnit: string;
  nutritionFacts: NutritionFact[];
  images?: {
    front?: File;
    nutrition?: File;
  };
};

type SupplementsContextType = {
  supplements: Supplement[];
  addSupplement: (supp: Omit<Supplement, "id" | "nutritionFacts" | "servingSize" | "servingUnit"> & {
    images?: { front?: File; nutrition?: File };
  }) => void;
  removeSupplement: (id: string) => void;
  updateSupplement: (supp: Supplement) => void;
  search: string;
  setSearch: (s: string) => void;
};

const SupplementsContext = createContext<SupplementsContextType | undefined>(undefined);

export function useSupplements() {
  const ctx = useContext(SupplementsContext);
  if (!ctx) throw new Error("useSupplements must be used within SupplementsProvider");
  return ctx;
}

function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

const defaultServing = { size: "", unit: "" };

export function SupplementsProvider({ children }: { children: ReactNode }) {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [search, setSearch] = useState<string>("");

  function addSupplement(input: Omit<Supplement, "id" | "nutritionFacts" | "servingSize" | "servingUnit"> & {
    images?: { front?: File; nutrition?: File }
  }) {
    setSupplements(sups => [
      ...sups,
      {
        id: randomId(),
        name: input.name,
        servingSize: "",
        servingUnit: "",
        nutritionFacts: [],
        images: input.images,
      }
    ]);
  }

  function removeSupplement(id: string) {
    setSupplements(sups => sups.filter(s => s.id !== id));
  }

  function updateSupplement(updated: Supplement) {
    setSupplements(sups => sups.map(s => (s.id === updated.id ? updated : s)));
  }

  return (
    <SupplementsContext.Provider
      value={{
        supplements,
        addSupplement,
        removeSupplement,
        updateSupplement,
        search,
        setSearch,
      }}
    >
      {children}
    </SupplementsContext.Provider>
  );
}
