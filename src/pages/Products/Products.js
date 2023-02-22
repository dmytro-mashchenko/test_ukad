import React, { useState, useEffect } from 'react';
import { Card } from '../../components/Card/Card';

import { ErrorMessage } from '../../components/ErrorMesage/ErrorMessage';
import { Preloader } from '../../components/Preloader/Preloader';
import { getPosts } from '../../services/ajax';

import './Products.scss';

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function loadPosts() {
    try {
      const data = await getPosts();
      setProducts(data);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="Products">
      <div className="container">
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
      </div>
    </div>
  );
}
