import { PlanetProvider } from './PlanetContext';

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <PlanetProvider>
      {children}
    </PlanetProvider>
  );
}

export default AppProvider;
