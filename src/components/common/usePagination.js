
import React, { useState } from "react";

const usePagination = (data) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 7;

  // logic for filter the data to be displayed
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  // logic for determine how many page there will be
  const pageNumbers = [];
  let numberOfPage = data.length / itemPerPage;
  if (data.length % itemPerPage > 0) numberOfPage++;

  // html format for each page
  for (let number = 1; number <= numberOfPage; number++) {
    // this can help solve 2 problems
    // 1. avoid going out of bound.
    // * Explain: go out of bound (press Next on last page) => currentItems.length == 0 => go back immediately 1 page
    // 2. avoid out of bound after empty a currentPage.
    // * Explain: delete the last item on page 2 => currentItems.length == 0 => go back immediately to page 1
    if (currentItems.length === 0) setCurrentPage(currentPage - 1);

    if (number === currentPage) {
      pageNumbers.push(
        <div style={{background:'#63BCE5', borderRadius:'6px'}}>
          <a
            key={number}
            id={number}
            onClick={(event) => handleClick(event)}
          >
            {number}
          </a>
        </div>
      );
    } else {
      pageNumbers.push(
        <div >
          <a
          style={{display:'block', height:'100%'}}
            key={number}
            id={number}
            onClick={(event) => handleClick(event)}
          >
            {number}
          </a>
        </div>
      );
    }
  }

  // return the useful values
  return { pageNumbers, currentPage, setCurrentPage, currentItems };
};

export default usePagination;
