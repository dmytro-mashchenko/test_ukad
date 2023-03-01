export function sliceArray(filteredData, ItemsPerPage, currentPage) {
  const lastIndex = currentPage * ItemsPerPage;
  const firstIndex = lastIndex - ItemsPerPage;
  const slicedArray = filteredData.slice(firstIndex, lastIndex);
  return slicedArray;
}

export function setPageNumbers(totalItems, itemsPerPage) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}
