import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Card } from "../../components/Card/Card";
import { ErrorMessage } from "../../components/ErrorMesage/ErrorMessage";
import { Pagination } from "../../components/Pagination/Pagination";
import { Preloader } from "../../components/Preloader/Preloader";
import { getPosts } from "../../services/ajax";
import { SearchField } from "../../components/SearchField/SearchField";
import { getProductsByFilter } from "../../services/ajax";
import { getVisiblePages } from "../../services/functions";

import "./Products.scss";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [filteredCurrentPage, setFilteredCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const productsPerPage = 10;
  const [queryValue, setQueryValue] = useState(searchParams.get("search"));
  const [totalFilteredProducts, setTotalFilteredProducts] = useState(0);

  async function loadPosts() {
    try {
      setLoading(true);
      setProducts([]);
      const data = await getPosts(productsPerPage, currentPage - 1);
      setProducts(data);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  async function loadFilteredProducts() {
    try {
      const data = await getProductsByFilter(queryValue);
      setTotalFilteredProducts(data.length);
      setProducts(getVisiblePages(data, productsPerPage, filteredCurrentPage));
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!queryValue) {
      searchParams.set("page", currentPage);
      setSearchParams(searchParams);
      loadPosts();
      return;
    }
    if (queryValue) {
      searchParams.set("page", filteredCurrentPage);
      setSearchParams(searchParams);
      loadFilteredProducts();
    }
  }, [currentPage, filteredCurrentPage, queryValue]);

  return (
    <div className="Products">
      <div className="Products__container container">
        <div className="Products__top-row">
          <h2 className="Products__title">Dogs</h2>
          <SearchField changeProducts={setQueryValue} />
        </div>
        {queryValue && !products.length && (
          <ErrorMessage message="There are no dogs with this breed" />
        )}
        {isError && <ErrorMessage />}
        {loading && <Preloader />}
        <div className="Products__catalog">
          {products &&
            products.map((item) => (
              <div className="Products__card-wrapper" key={item.id}>
                <Card {...item}></Card>
              </div>
            ))}
        </div>
        {!queryValue && (
          <Pagination onPageChange={setCurrentPage} currentPage={currentPage} />
        )}
        {queryValue && !!products.length && (
          <Pagination
            onPageChange={setFilteredCurrentPage}
            currentPage={filteredCurrentPage}
            productsPerPage={productsPerPage}
            totalProducts={totalFilteredProducts}
          />
        )}
      </div>
    </div>
  );
}
