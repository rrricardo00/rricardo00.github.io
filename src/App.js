import { useState } from 'react';
import './App.css';
import Create from './Components/create/Create';
import Filter from './Components/filter/Filter';
import Table from './Components/table/Table';
import Total from './Components/total/Total';
import { Api } from './Context/Api';

function App() {

  const json = JSON.parse(localStorage.getItem('array')) ? JSON.parse(localStorage.getItem('array')) : []
  const [filterAr, setFilter] = useState([])
  const [array, setArray] = useState(json)

  return (
    <div>
      <Api.Provider value={{ array, setArray, json, filterAr, setFilter}}>
        <Filter />
        <Table />
        <Create />
        <Total />
      </Api.Provider>
    </div>

  );
}

export default App;
