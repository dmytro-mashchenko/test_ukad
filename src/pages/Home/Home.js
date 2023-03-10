import { useState, useEffect } from "react";

import { getProducts } from "../../services/ajax";
import { Slider } from "../../components/Slider/Slider";
import { Preloader } from "../../components/Preloader/Preloader";
import { ErrorMessage } from "../../components/ErrorMesage/ErrorMessage";

import "./Home.scss";

export function Home() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function loadSliderProducts() {
    try {
      const data = await getProducts();
      setList(data);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSliderProducts();
  }, []);

  return (
    <div className="Home">
      <div className="Home__container container">
        <h2 className="Home__title">Home page</h2>
        {isError && <ErrorMessage />}
        {loading && <Preloader />}
        {list?.length > 0 && <Slider list={list} />}
      </div>
    </div>
  );
}
