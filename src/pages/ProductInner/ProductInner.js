import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getProductDetails, getProductImage } from '../../services/ajax';

import { Preloader } from '../../components/Preloader/Preloader';
import { ErrorMessage } from '../../components/ErrorMesage/ErrorMessage';

import './ProductInner.scss';

export function ProductInner() {
  const { id } = useParams();
  const [product, setPrdouct] = useState(null);
  const [productImageUrl, setPdouctImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function loadProductDetails() {
    try {
      const data = await getProductDetails(id);
      setPrdouct(data);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  async function loadProductImage() {
    try {
      const id = product.reference_image_id;
      const data = await getProductImage(id);
      setPdouctImageUrl(data.url);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProductDetails();
  }, []);

  useEffect(() => {
    product && loadProductImage();
  }, [product]);

  return (
    <div className="ProductInner">
      {loading && <Preloader />}
      {isError && <ErrorMessage />}
      <div className="container">
        <Link className="ProductInner__link" to="/products">
          Go to dogs list
        </Link>
        <div className="ProductInner__content">
          {productImageUrl && (
            <div className="ProductInner__image-container">
              <img
                className="ProductInner__image"
                src={productImageUrl}
                alt="fine_dog"
              />
            </div>
          )}
          {product && (
            <div className="ProductInner__info-container">
              <h2 className="ProductInner__title">{product.name}</h2>
              <h5 className="ProductInner__subtitle">
                <b>Bred for: </b>
                {product.bred_for.toLowerCase()}
              </h5>
              <h5 className="ProductInner__subtitle">
                <b>Country origin:</b>
                {product.origin ? product.origin : 'unknown'}
              </h5>
              <h5 className="ProductInner__subtitle">
                <b>Height:</b>
                {` ${product.height.metric} cm (${product.height.imperial} inch)`}
              </h5>
              <h5 className="ProductInner__subtitle">
                <b>Weight:</b>
                {` ${product.weight.metric} kg (${product.weight.imperial} lb)`}
              </h5>
              <h5 className="ProductInner__subtitle">
                <b>Life span: </b>
                {product.life_span}
              </h5>
              <h5 className="ProductInner__subtitle">
                <b>Temperament: </b>
                {product.temperament.toLowerCase()}
              </h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
