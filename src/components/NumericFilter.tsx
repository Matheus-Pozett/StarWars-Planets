import { useState } from 'react';
import { FilterType } from '../types';
import { usePlanetContext } from '../context/PlanetContext';

const INITIAL_VALUES = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

function NumericFilter() {
  const { filters, setFilters } = usePlanetContext();
  const [numericFilters, setNumericFilters] = useState<FilterType>(INITIAL_VALUES);

  const handleChangeNumericFilter = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setNumericFilters({
      ...numericFilters,
      [name]: name === 'value' ? Number(value) : value,
    });
  };

  const handleClickNumericFilters = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFilters([...filters, numericFilters]);
  };

  return (
    <form onSubmit={ handleClickNumericFilters }>
      <select
        name="column"
        data-testid="column-filter"
        value={ numericFilters.column }
        onChange={ handleChangeNumericFilter }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        name="comparison"
        data-testid="comparison-filter"
        value={ numericFilters.comparison }
        onChange={ handleChangeNumericFilter }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        name="value"
        min={ 0 }
        data-testid="value-filter"
        value={ numericFilters.value }
        onChange={ handleChangeNumericFilter }
      />
      <button data-testid="button-filter">Filtrar</button>
    </form>
  );
}

export default NumericFilter;
