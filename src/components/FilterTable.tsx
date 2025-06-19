import { usePlanetContext } from '../context/PlanetContext';

function FilterTable() {
  const { nameFilter, setNameFilter } = usePlanetContext();

  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        value={ nameFilter }
        onChange={ (e) => setNameFilter(e.target.value) }
      />
    </form>
  );
}

export default FilterTable;
