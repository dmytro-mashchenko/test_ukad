import React, { useState, useEffect } from 'react';
import { Card } from '../../components/Card/Card';

import { ErrorMessage } from '../../components/ErrorMesage/ErrorMessage';
import { Pagination } from '../../components/Pagination/Pagination';
import { Preloader } from '../../components/Preloader/Preloader';
import { getPosts } from '../../services/ajax';

import './Products.scss';

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const showPageCount = 10;

  async function loadPosts() {
    try {
      setLoading(true);
      setProducts([]);
      const data = await getPosts(showPageCount, currentPage);
      setProducts(data);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, [currentPage]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="Products">
      <div className="Products__container container">
        <h2 className="Products__title">Dogs</h2>
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
        <Pagination onPageChange={onPageChange} />
      </div>
    </div>
  );
}
