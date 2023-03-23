import { useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import { Icon } from '../../assets/icons/icons';
import { getPageNumbers } from '../../services/functions';

import './Pagination.scss';

export function Pagination({
  onPageChange,
  currentPage,
  itemsPerPage,
  totalItemsCount,
}) {
  const pageNumbers = useMemo(
    () => getPageNumbers(totalItemsCount, itemsPerPage),
    [totalItemsCount, itemsPerPage]
  );

  function onPaginationClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <ReactPaginate
      breakLabel='...'
      nextLabel={<Icon icon='chevron-right' size={35} color={'#757575'} />}
      previousLabel={<Icon icon='chevron-right' size={35} color={'#757575'} />}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageRangeDisplayed={3}
      pageCount={pageNumbers}
      renderOnZeroPageCount={null}
      onClick={onPaginationClick}
      forcePage={currentPage - 1}
      containerClassName='Pagination__container'
      pageClassName='Pagination__page'
      pageLinkClassName='Pagination__page-link'
      activeLinkClassName='Pagination__page-link_active'
      breakClassName='Pagination__break'
      breakLinkClassName='Pagination__break-link'
      previousClassName='Pagination__previous'
      nextClassName='Pagination__next'
      previousLinkClassName='Pagination__previous-link'
      nextLinkClassName='Pagination__next-link'
    />
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number,
  totalItemsCount: PropTypes.number,
};
