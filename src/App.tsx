import './App.css';
import { ActiveFilter, FilterTable, NumericFilter, Table } from './components';

function App() {
  return (
    <div>
      <div>
        <FilterTable />
        <NumericFilter />
        <ActiveFilter />
      </div>
      <Table />
    </div>
  );
}

export default App;
