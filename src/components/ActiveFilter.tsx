import { usePlanetContext } from '../context/PlanetContext';

function ActiveFilter() {
  const { filters, setFilters } = usePlanetContext();

  const handleRemoveFilter = (columnToRemove: string) => {
    const updatedFilters = filters.filter(
      (filter) => filter.column !== columnToRemove,
    );
    setFilters(updatedFilters);
  };
  return (
    <div>
      {filters.map((f) => (
        <div key={ f.column } data-testid="filter">
          <p>{`${f.column} ${f.comparison} ${f.value}`}</p>
          <button onClick={ () => handleRemoveFilter(f.column) }>X</button>
        </div>
      ))}
      <button
        onClick={ () => setFilters([]) }
        data-testid="button-remove-filters"
      >
        Remover todos filtros
      </button>
    </div>
  );
}

export default ActiveFilter;
