import './App.css';
import {
  ActiveFilter, FilterTable, NumericFilter, SortFilter, Table } from './components';

function App() {
  return (
    <div>
      <div>
        <FilterTable />
        <NumericFilter />
        <ActiveFilter />
        <SortFilter />
      </div>
      <Table />
    </div>
  );
}

export default App;
