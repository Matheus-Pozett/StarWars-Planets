import { useEffect } from 'react';
import { usePlanetContext } from '../context/PlanetContext';
import { PlanetApiType } from '../types';
import FilterTable from './FilterTable';
import NumericFilter from './NumericFilter';

function Table() {
  const { planets, setPlanets, nameFilter, filters } = usePlanetContext();

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi.info/api/planets');
        const data = await response.json();

        const result = data.map((p: PlanetApiType) => {
          const { residents, ...planet } = p;

          return { ...planet };
        });

        setPlanets(result);
      } catch (error) {
        console.error('api error');
      }
    };
    fetchPlanets();
  }, [setPlanets]);

  let filteredPlanets = planets.filter(
    (planet) => planet.name.toLowerCase().includes(nameFilter.toLowerCase()),
  );

  filters.forEach((filter) => {
    filteredPlanets = filteredPlanets.filter((planet) => {
    // Se não houver filtro, retorna true para todos os planetas
      if (filters.length === 0) {
        return true;
      }

      const planetValue = Number(planet[filter.column as keyof typeof planet]);
      const filterValue = Number(filter.value);

      switch (filter.comparison) {
        case 'maior que':
          return planetValue > filterValue;
        case 'menor que':
          return planetValue < filterValue;
        case 'igual a':
          return planetValue === filterValue;
        default:
          return true;
      }
    });
  });

  return (
    <div>
      <FilterTable />
      <NumericFilter />
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films.join(', ')}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
