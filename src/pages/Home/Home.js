import React, { useState, useEffect } from 'react';

import { getPosts } from '../../services/ajax';
import { Slider } from '../../components/Slider/Slider';
import { Preloader } from '../../components/Preloader/Preloader';
import { ErrorMessage } from '../../components/ErrorMesage/ErrorMessage';

import './Home.scss';

export function Home() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function loadPosts() {
    setIsError(false);
    try {
      const data = await getPosts();
      setLoading(false);
      if (!data.ok) {
        throw new Error('Something went wrong');
      }
      setList(await data.json());
    } catch (e) {
      setIsError(true);
      console.log(e.message);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="Home">
      <div className="Home__container container">
        {isError && (
          <ErrorMessage message="Something went wrong, please try later" />
        )}
        <h2 className="Home__title page__title">Home page</h2>
        {loading && <Preloader />}
        {list && <Slider list={list} />}
      </div>
    </div>
  );
}
