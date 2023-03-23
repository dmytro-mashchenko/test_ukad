import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Card } from "../../components/Card/Card";
import { ErrorMessage } from "../../components/ErrorMesage/ErrorMessage";
import { Pagination } from "../../components/Pagination/Pagination";
import { Preloader } from "../../components/Preloader/Preloader";
import { getProducts } from "../../services/ajax";
import { SearchField } from "../../components/SearchField/SearchField";
import { getFilteredProducts } from "../../services/ajax";
import { showVisibleProducts } from "../../services/functions";
import { useDidUpdate } from "../../hooks/useDidUpdate";

import "./Products.scss";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
  const [totalFilteredProducts, setTotalFilteredProducts] = useState([]);
  const productsPerPage = 10;

  async function loadProducts() {
    try {
      setLoading(true);
      setProducts([]);

      const data = await getProducts(productsPerPage, currentPage - 1);
      setProducts(data);
      setTotalFilteredProducts([]);
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

      const data = await getFilteredProducts(searchValue);
      setTotalFilteredProducts(data);
      setProducts(showVisibleProducts(data, productsPerPage, currentPage));
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    !searchValue ? loadProducts() : loadFilteredProducts();
  }, []);

  useDidUpdate(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      !searchValue ? loadProducts() : loadFilteredProducts();
    }
  }, [searchValue]);

  useDidUpdate(() => {
    searchParams.set("page", currentPage);
    setSearchParams(searchParams);
    if (!searchValue) {
      loadProducts();
    } else if (searchValue && currentPage === 1) {
      loadFilteredProducts();
    } else {
      setProducts(
        showVisibleProducts(totalFilteredProducts, productsPerPage, currentPage)
      );
    }
  }, [currentPage]);

  return (
    <div className='Products'>
      <div className='Products__container container'>
        <div className='Products__top-row'>
          <h2 className='Products__title'>Dogs</h2>
          <SearchField instantChangeProducts={setSearchValue} />
        </div>
        {searchValue && products?.length <= 0 && !loading && !isError && (
          <ErrorMessage message='There are no dogs with this breed' />
        )}
        {isError && <ErrorMessage />}
        {loading && <Preloader />}
        <div className='Products__catalog'>
          {products?.length > 0 &&
            products.map((item) => (
              <div className='Products__card-wrapper' key={item.id}>
                <Card {...item}></Card>
              </div>
            ))}
        </div>
        {products?.length > 0 && (
          <Pagination
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            itemsPerPage={productsPerPage}
            totalItemsCount={totalFilteredProducts.length}
          />
        )}
      </div>
    </div>
  );
}
