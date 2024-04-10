import React from "react";
import styles from "./Pagination.module.css"

const Pagination = ({
  currentPage,
  rowsPerPage,
  totalRows,
  handlePagination,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const renderPaginationButtons = () => {
    const pageButtons = [];

    pageButtons.push(
      <button
        key="first"
        disabled={currentPage === 1}
        className={styles.page_btn_skip}
        onClick={() => handlePagination(1)}
      >
        {'<<'}
      </button>
    );

    pageButtons.push(
      <button
        key="previous"
        onClick={() => handlePagination(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.page_btn_skip}
      >
        {'<'}
      </button>
    );

    for (let page = 1; page <= totalPages; page++) {
      pageButtons.push(
        <button
          key={page}
          onClick={() => handlePagination(page)}
          className={
            currentPage === page ? styles.page_btn_skip_active : styles.page_btn}
        >
          {page}
        </button>
      );
    }

    pageButtons.push(
      <button
        key="next"
        onClick={() => handlePagination(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className={styles.page_btn_skip}
      >
        {'>'}
      </button>
    );

    pageButtons.push(
      <button
        key="last"
        onClick={() => handlePagination(totalPages)}
        disabled={currentPage === totalPages || totalPages === 0}
        className={styles.page_btn_skip}
      >
        {'>>'}
      </button>
    );

    return pageButtons;
  };

  return <div className={styles.pagination}>{renderPaginationButtons()}</div>;
};

export default Pagination;
