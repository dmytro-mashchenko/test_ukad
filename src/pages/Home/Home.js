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
        throw new Error('There is an error on server side');
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
        <h2 className="Home__title">Home page</h2>
        {isError && (
          <ErrorMessage message="Something went wrong, please try again later" />
        )}
        {loading && <Preloader />}
        {list && <Slider list={list} />}
      </div>
    </div>
  );
}
