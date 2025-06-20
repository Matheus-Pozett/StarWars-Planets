import { useState } from 'react';
import { usePlanetContext } from '../context/PlanetContext';
import { OrderType } from '../types';

function SortFilter() {
  const { setOrder } = usePlanetContext();

  const [localOrder, setLocalOrder] = useState<OrderType>({
    column: 'population',
    sort: 'ASC',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setLocalOrder({
      ...localOrder,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrder(localOrder);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="column-sort">Ordenar</label>
      <select
        id="column-sort"
        name="column"
        data-testid="column-sort"
        value={ localOrder.column }
        onChange={ handleChange }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <label>
        <input
          type="radio"
          name="sort"
          value="ASC"
          data-testid="column-sort-input-asc"
          checked={ localOrder.sort === 'ASC' }
          onChange={ handleChange }
        />
        Ascendente
      </label>

      <label>
        <input
          type="radio"
          name="sort"
          value="DESC"
          data-testid="column-sort-input-desc"
          checked={ localOrder.sort === 'DESC' }
          onChange={ handleChange }
        />
        Descendente
      </label>

      <button type="submit" data-testid="column-sort-button">
        Ordenar
      </button>
    </form>
  );
}

export default SortFilter;
