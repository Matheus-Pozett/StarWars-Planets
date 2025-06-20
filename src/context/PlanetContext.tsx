import { createContext, useContext, useState } from 'react';
import { FilterType, OrderType, PlanetType } from '../types';

type PlanetContextType = {
  planets: PlanetType[];
  setPlanets: (data: PlanetType[]) => void;
  nameFilter: string;
  setNameFilter: (e: string) => void;
  filters: FilterType[];
  setFilters: React.Dispatch<React.SetStateAction<FilterType[]>>;
  order: OrderType;
  setOrder: React.Dispatch<React.SetStateAction<OrderType>>;
};

const PlanetContext = createContext<PlanetContextType | undefined>(undefined);

function PlanetProvider({ children }: { children: React.ReactNode }) {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [filters, setFilters] = useState<FilterType[]>([]);
  const [order, setOrder] = useState<OrderType>({
    column: 'population',
    sort: 'ASC',
  });

  const values = {
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    filters,
    setFilters,
    order,
    setOrder,
  };
  return (
    <PlanetContext.Provider value={ values }>
      {children}
    </PlanetContext.Provider>
  );
}

const usePlanetContext = () => {
  const context = useContext(PlanetContext);

  if (!context) {
    throw new Error('usePlanetContext precisa estar dentro do PlanetProvider');
  }

  return context;
};

export { PlanetProvider, usePlanetContext, PlanetContext };
