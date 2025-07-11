import { useEffect } from 'react';
import { usePlanetContext } from '../context/PlanetContext';
import { PlanetApiType } from '../types';

function Table() {
  const { planets, setPlanets, nameFilter, filters, order } = usePlanetContext();

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

  const sortedPlanets = [...filteredPlanets].sort((a, b) => {
    const { column, sort } = order;

    const valueA = a[column as keyof typeof a];
    const valueB = b[column as keyof typeof b];

    // Regra especial: planetas com 'unknown' vão para o final
    if (valueA === 'unknown') return 1;
    if (valueB === 'unknown') return -1;

    if (sort === 'ASC') {
      return Number(valueA) - Number(valueB);
    }
    return Number(valueB) - Number(valueA);
  });

  return (
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
        {sortedPlanets.map((planet) => (
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
  );
}

export default Table;
