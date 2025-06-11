import { createContext, useContext, useState } from 'react';

export type PlanetType = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  created: string;
  edited: string;
  url: string;
};

type PlanetContextType = {
  planets: PlanetType[];
  setPlanets: (data: PlanetType[]) => void;
};

const PlanetContext = createContext<PlanetContextType | undefined>(undefined);

function PlanetProvider({ children }: { children: React.ReactNode }) {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  return (
    <PlanetContext.Provider value={ { planets, setPlanets } }>
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
