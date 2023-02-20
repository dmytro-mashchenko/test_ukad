import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Preloader } from '../../components/Preloader/Preloader';
import { ErrorMessage } from '../../components/ErrorMesage/ErrorMessage';

import './ProductInner.scss';

export function ProductInner() {
  const { id } = useParams();
  const [product, setPdouct] = useState(null);
  const [productImageUrl, setPdouctImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(`https://api.thedogapi.com/v1/breeds/${id}`)
      .then((res) => {
        setLoading(false);
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setPdouct(data))
      .catch(() => setIsError(true));
  }, [id]); // why id?

  useEffect(() => {
    product &&
      fetch(`https://api.thedogapi.com/v1/images/${product.reference_image_id}`)
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => setPdouctImageUrl(data.url))
        .catch(() => setIsError(true));
  }, [product]);

  return (
    <div className="ProductInner">
      {loading && <Preloader />}
      {isError && <ErrorMessage />}
      {productImageUrl && (
        <div className="container">
          <Link className="ProductInner__link" to="/products">
            Go to dogs list
          </Link>
          <div className="ProductInner__content">
            <div className="ProductInner__image-container">
              <img
                className="ProductInner__image"
                src={productImageUrl}
                alt="fine_dog"
              />
            </div>
            <div className="ProductInner__info-container">
              <h2 className="ProductInner__title">{product.name}</h2>
              <p>
                <span>Bred for: </span>
                {product.bred_for.toLowerCase()}
              </p>
              <p>
                <span>Country origin: </span>
                {product.origin ? product.origin : 'unknown'}
              </p>
              <p>
                <span>Height:</span>
                {` ${product.height.metric} cm (${product.height.imperial} inch)`}
              </p>
              <p>
                <span>Weight:</span>
                {` ${product.weight.metric} kg (${product.weight.imperial} lb)`}
              </p>
              <p>
                <span>Life span: </span>
                {product.life_span}
              </p>
              <p>
                <span>Temperament: </span>
                {product.temperament.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
