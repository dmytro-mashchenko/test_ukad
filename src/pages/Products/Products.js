import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Card } from "../../components/Card/Card";
import { ErrorMessage } from "../../components/ErrorMesage/ErrorMessage";
import { Pagination } from "../../components/Pagination/Pagination";
import { Preloader } from "../../components/Preloader/Preloader";
import { getPosts } from "../../services/ajax";
import { SearchField } from "../../components/SearchField/SearchField";

import "./Products.scss";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const showPageCount = 10;

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

  useEffect(() => {
    searchParams.set("page", currentPage);
    setSearchParams(searchParams);
    loadPosts();
  }, [currentPage]);

  return (
    <div className="Products">
      <div className="Products__container container">
        <div className="Products__top-row">
          <h2 className="Products__title">Dogs</h2>
          <SearchField changeProducts={setProducts} />
        </div>
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
        <Pagination onPageChange={setCurrentPage} currentPage={currentPage} />
      </div>
    </div>
  );
}
