import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import './Pagination.scss';

export function Pagination({ onPageChange }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onPageChange(event.selected)}
      pageRangeDisplayed={5}
      pageCount={17}
      renderOnZeroPageCount={null}
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
};
