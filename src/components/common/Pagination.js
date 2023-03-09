import React from "react";
import styles from "./Pagination.module.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const Pagination = ({ _previousOnClick, _nextOnClick, _pageNumbers }) => {
  
  return (
    <div className={styles.buttonBox}>
          <button  onClick={_previousOnClick} tabIndex="-1" className={styles.button}>
            < ArrowBackIcon />
          </button>
        {_pageNumbers.map((item, i) => {
          return <button key={i} className={styles.button}>{item}</button>;
        })}
          <button  onClick={_nextOnClick} className={styles.button}>
            < ArrowForwardIcon />
          </button>
    </div>
  );
};

export default Pagination;

