import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Table from '../table/index';

import './index.css';

export default function TableInterface() {
  const history = useHistory();

  const [ sorting, setSorting ] = useState(null);
  const [ filteringString, setFilteringString ] = useState('');
  const [ activePage, setActivePage ] = useState(0);

  const handleFilteringChange = event => {
    setFilteringString(event.target.value);
    if (history.location.pathname !== '/') {
      history.push('/');
      setActivePage(0);
    }
  }

  const handleResetClick = () => {
    setSorting(null);
    setFilteringString('');
    history.push('/');
    setActivePage(0);
  }

  return (
    <div className='interface-container'>
      <Table
        sorting={sorting}
        setSorting={setSorting}
        filteringString={filteringString}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div>
        <fieldset
          className='filter-field'
        >
          <legend>
            Filter & Sort
          </legend>
          <input 
            type='text'
            placeholder='Searching string...'
            value={filteringString}
            onChange={handleFilteringChange}
          />
          <button
            type='button'
            onClick={handleResetClick}
          >
            Reset filtering and sorting
          </button>
        </fieldset>
      </div>
    </div>
  );
}