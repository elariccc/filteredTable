import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { TABLE_DATA } from '../../data/index';
import { deepCloneArray } from '../../functions/index';

import './index.css';

const ROWS_PER_PAGE = 50;

export default function Table({
  sorting, setSorting,
  filteringString,
  activePage, setActivePage,
}) {
  const history = useHistory();

  const [ rowPages, setRowPages ] = useState(null);
  const [ pageLinks, setPageLinks ] = useState(null);

  //Defining pages with rows
  useEffect(
    () => {
      const tableClone = deepCloneArray(TABLE_DATA);
      
      if (sorting) {
        const sortingFunction = (a, b) => {
          const ascendingFactor = sorting.ascending ? 1 : -1;

          if (sorting.column === 'NAME') {
            if (a[0].toLowerCase() !== b[0].toLowerCase()) {
              return ((a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1) * ascendingFactor);
            } else {
              return ((a[0] > b[0] ? 1 : -1) * ascendingFactor);
            }
          }

          return (
            (a[1] - b[1]) * ascendingFactor
          );
        };

        tableClone.sort(sortingFunction);
      }

      const rows = [];

      tableClone.forEach(
        (row, index) => {
          if (row[0].toLowerCase().indexOf(filteringString.toLowerCase()) !== -1) {
            rows.push(
              <tr key={index}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
              </tr>
            );
          }
        }
      );
      
      const pagesAmount = Math.ceil(rows.length / ROWS_PER_PAGE);
      const newRowPages = [];
      const newPageLinks = [];

      for (let i = 0; i < pagesAmount; i++) {
        const pathPage = i ? `/${i + 1}` : '/';

        newRowPages.push(
          <Route exact path={pathPage} key={i}>
            {rows.slice(ROWS_PER_PAGE * i, ROWS_PER_PAGE * i + ROWS_PER_PAGE)}
          </Route>
        );

        const handlePageLinkClick = () => {
          history.push(pathPage);
          setActivePage(i);
        };

        let pageLinkClass = 'page-link';

        if (i === activePage) pageLinkClass += ' page-link--active';

        newPageLinks.push(
          <div
            className={pageLinkClass}
            onClick={handlePageLinkClick}
            key={i}
          >
            {i + 1}
          </div>
        );
      }

      setRowPages(newRowPages);
      setPageLinks(newPageLinks);
    },
    [history, sorting, filteringString, activePage, setActivePage]
  );

  const handleNameClick = () => {
    if (sorting && sorting.column === 'NAME') {
      setSorting(
        (prevSorting) => {
          return (
            {
              column: 'NAME',
              ascending: !prevSorting.ascending,
            }
          );
        }
      );
    } else {
      setSorting({
        column: 'NAME',
        ascending: true,
      });
    }
  }

  const handleValueClick = () => {
    if (sorting && sorting.column === 'VALUE') {
      setSorting(
        (prevSorting) => {
          return (
            {
              column: 'VALUE',
              ascending: !prevSorting.ascending,
            }
          );
        }
      );
    } else {
      setSorting({
        column: 'VALUE',
        ascending: true,
      });
    }
  }

  let nameClass;
  let valueClass;

  if (sorting) {
    const directionClass = sorting.ascending ? 'header--ascending' :'header--descending';

    if (sorting.column === 'NAME') nameClass = directionClass;
    else if (sorting.column === 'VALUE') valueClass = directionClass;
  }

  return (
    <div className='table-container'>
      <table className='table__main'>
        <thead>
          <tr>
            <th 
              className={nameClass}
              onClick={handleNameClick}
            >Name</th>
            <th 
              className={valueClass}
              onClick={handleValueClick}
            >Value</th>
          </tr>
        </thead>
        <tbody>
          <Switch>
            {rowPages}
          </Switch>
        </tbody>
      </table>
      <div className='pages-container'>
        {pageLinks}
      </div>
    </div>
  );
}