export function getVisiblePages(data, itemsPerPage, currentPage) {
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const slicedArray = data.slice(firstIndex, lastIndex);
  return slicedArray;
}

export function setPageNumbers(totalItems, itemsPerPage) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers.length;
}

// const handleChange = (e) => {
//   setValue((actualValue) => {
//     actualValue = e.target.value.trim();
//     if (!changeProducts) return actualValue;
//     // searchParams.set("search", actualValue);
//     // setSearchParams(searchParams);
//     if (!actualValue) {
//       changeProducts(actualValue);
//       debouncedChangeProducts.cancel();
//       return actualValue;
//     }
//     debouncedChangeProducts();
//     return actualValue;
//   });
// };
