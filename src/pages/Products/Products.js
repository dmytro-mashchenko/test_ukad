import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import { Card } from "../../components/Card/Card";
import { ErrorMessage } from "../../components/ErrorMesage/ErrorMessage";
import { Pagination } from "../../components/Pagination/Pagination";
import { Preloader } from "../../components/Preloader/Preloader";
import { SearchField } from "../../components/SearchField/SearchField";
import { getPosts } from "../../services/ajax";
import { filterCompareData } from "../../services/ajax";
import { sliceArray } from "../../services/functions";

import "./Products.scss";

export function Products({ productsFromContext }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [isInstant] = useState(true);
  const showPageCount = 10;
  const [filteredCurrentPage, setFilteredCurrentPage] = useState(1);
  const [totalFilteredProducts, setTotalFilteredProducts] = useState(0);

  async function loadPosts() {
    try {
      setLoading(true);
      setProducts([]);
      const data = await getPosts(showPageCount, currentPage - 1);
      setProducts(data);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  async function loadFilteredPosts() {
    try {
      const filteredData = await filterCompareData(productsFromContext);
      setTotalFilteredProducts(filteredData.length);
      setProducts(sliceArray(filteredData, showPageCount, filteredCurrentPage));
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    searchParams.set("page", currentPage);
    setSearchParams(searchParams);
    loadPosts();
  }, [currentPage]);

  useEffect(() => {
    if (!productsFromContext) return;
    if (productsFromContext.length) {
      loadFilteredPosts();
      searchParams.set("page", filteredCurrentPage);
      setSearchParams(searchParams);
      return;
    }
    if (products.length) loadPosts();
  }, [productsFromContext, filteredCurrentPage]);

  return (
    <div className="Products">
      <div className="Products__container container">
        <div className="Products__top-row">
          <h2 className="Products__title">Dogs</h2>
          <SearchField instant={isInstant} />
        </div>
        {!productsFromContext && (
          <ErrorMessage message="There are no dogs with this name" />
        )}
        {isError && <ErrorMessage />}
        {loading && <Preloader />}
        <div className="Products__catalog">
          {productsFromContext &&
            products &&
            products.map((item) => (
              <div className="Products__card-wrapper" key={item.id}>
                <Card {...item}></Card>
              </div>
            ))}
        </div>
        {productsFromContext && !productsFromContext.length ? (
          <Pagination onPageChange={setCurrentPage} currentPage={currentPage} />
        ) : (
          productsFromContext && (
            <Pagination
              onPageChange={setFilteredCurrentPage}
              currentPage={filteredCurrentPage}
              totalProducts={totalFilteredProducts}
              productsPerPage={showPageCount}
            />
          )
        )}
      </div>
    </div>
  );
}

Products.propTypes = {
  productsFromContext: PropTypes.array,
};
