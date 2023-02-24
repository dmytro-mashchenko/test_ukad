import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import './Pagination.scss';

export function Pagination({ onPageChange, currentPage }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={17}
      renderOnZeroPageCount={null}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      forcePage={currentPage - 1}
      containerClassName="Pagination__container"
      pageClassName="Pagination__page"
      pageLinkClassName="Pagination__page-link"
      breakClassName="Pagination__break"
      breakLinkClassName="Pagination__break-link"
      previousClassName="Pagination__previous"
      nextClassName="Pagination__next"
      previousLinkClassName="Pagination__previous-link"
      nextLinkClassName="Pagination__next-link"
    />
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
