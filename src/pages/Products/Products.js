import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { Card } from "../../components/Card/Card";
import { ErrorMessage } from "../../components/ErrorMesage/ErrorMessage";
import { Pagination } from "../../components/Pagination/Pagination";
import { Preloader } from "../../components/Preloader/Preloader";
import { getProducts } from "../../services/ajax";
import { SearchField } from "../../components/SearchField/SearchField";
import { getFilteredProducts } from "../../services/ajax";
import { showVisibleProducts } from "../../services/functions";

import "./Products.scss";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [filteredCurrentPage, setFilteredCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productsPerPage = 10;
  const [hasPageReloaded, setHasPageReloaded] = useState(true);

  async function loadProducts() {
    try {
      setLoading(true);
      setProducts([]);
      searchParams.delete("search");
      setSearchParams(searchParams);
      const data = await getProducts(productsPerPage, currentPage - 1);
      setProducts(data);
      setFilteredProducts([]);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  async function loadFilteredProducts() {
    try {
      setLoading(true);
      setProducts([]);
      setCurrentPage(1);
      const data = await getFilteredProducts(searchValue);
      setProducts(showVisibleProducts(data, productsPerPage, filteredCurrentPage));
      setFilteredProducts(data);
      hasPageReloaded ? setHasPageReloaded(false) : setFilteredCurrentPage(1);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!searchValue) {
      searchParams.set("page", currentPage);
      setSearchParams(searchParams);
      loadProducts();
      return;
    }
    if (searchValue) {
      searchParams.set("page", filteredCurrentPage);
      setSearchParams(searchParams);
      loadFilteredProducts();
    }
  }, [searchValue, currentPage]);

  useEffect(() => {
    searchParams.set("page", filteredCurrentPage);
    setSearchParams(searchParams);
    setProducts(
      showVisibleProducts(filteredProducts, productsPerPage, filteredCurrentPage)
    );
  }, [filteredCurrentPage]);

  return (
    <div className="Products">
      <div className="Products__container container">
        <div className="Products__top-row">
          <h2 className="Products__title">Dogs</h2>
          <SearchField instantChangeProducts={setSearchValue} />
        </div>
        {searchValue && products?.length <= 0 && !loading && !isError && (
          <ErrorMessage message="There are no dogs with this breed" />
        )}
        {isError && <ErrorMessage />}
        {loading && <Preloader />}
        <div className="Products__catalog">
          {products?.length > 0 &&
            products.map((item) => (
              <div className="Products__card-wrapper" key={item.id}>
                <Card {...item}></Card>
              </div>
            ))}
        </div>
        {products?.length > 0 && (
          <Pagination
            onPageChange={!searchValue ? setCurrentPage : setFilteredCurrentPage}
            currentPage={!searchValue ? currentPage : filteredCurrentPage}
            itemsPerPage={productsPerPage}
            totalItemsCount={filteredProducts.length}
          />
        )}
      </div>
    </div>
  );
}
