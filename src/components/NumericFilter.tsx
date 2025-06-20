import { useEffect, useState } from 'react';
import { FilterType } from '../types';
import { usePlanetContext } from '../context/PlanetContext';

function NumericFilter() {
  const { filters, setFilters } = usePlanetContext();

  const allColumnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const usedColumns = filters.map((filter) => filter.column);

  const availableColumns = allColumnOptions.filter(
    (option) => !usedColumns.includes(option),
  );

  const [numericFilter, setNumericFilter] = useState<FilterType>({
    column: availableColumns[0],
    comparison: 'maior que',
    value: 0,
  });

  useEffect(() => {
    setNumericFilter((prevState) => ({
      ...prevState,
      column: availableColumns[0],
    }));
  }, [filters, availableColumns]);

  const handleChangeNumericFilter = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setNumericFilter({
      ...numericFilter,
      [name]: name === 'value' ? Number(value) : value,
    });
  };

  const handleClickNumericFilters = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFilters([...filters, numericFilter]);
  };

  return (
    <form onSubmit={ handleClickNumericFilters }>
      <select
        name="column"
        data-testid="column-filter"
        value={ numericFilter.column }
        onChange={ handleChangeNumericFilter }
      >
        {availableColumns.map((column) => (
          <option key={ column } value={ column }>
            {column}
          </option>
        ))}
      </select>

      <select
        name="comparison"
        data-testid="comparison-filter"
        value={ numericFilter.comparison }
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
        value={ numericFilter.value }
        onChange={ handleChangeNumericFilter }
      />
      <button data-testid="button-filter">Filtrar</button>
    </form>
  );
}

export default NumericFilter;
