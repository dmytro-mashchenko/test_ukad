import { Icon } from "../../assets/icons/icons";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../../services/hooks";
import debounce from "lodash.debounce";

import "./SearchField.scss";

export function SearchField({ changeProducts }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(searchParams.get("search") || "");
  const PATH = window.location.pathname;
  const PRODUCTS_PATH = PATH === "/products";

  const debouncedChangeProducts = useDebounce(() => {
    changeProducts(value);
  });

  const handleChange = (e) => {
    setValue((actualValue) => {
      actualValue = e.target.value.trim();
      if (!changeProducts) return actualValue;
      searchParams.set("search", actualValue);
      setSearchParams(searchParams);
      if (!actualValue) {
        changeProducts(actualValue);
        debouncedChangeProducts.cancel();
        return;
      }
      debouncedChangeProducts();
      return actualValue;
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (changeProducts) return;
    if (!PRODUCTS_PATH) navigate(`/products?page=1&search=${value}`);
  };

  return (
    <form onSubmit={onSubmitHandler} className="SearchField__form">
      {(!PRODUCTS_PATH || changeProducts) && (
        <div className="SearchField__container">
          <Icon
            className="SearchField__icon"
            icon="search"
            size={22}
            color={changeProducts ? "#757575" : "#fff"}
          />
          <input
            onChange={handleChange}
            className={
              changeProducts
                ? `SearchField__input_instant`
                : "SearchField__input"
            }
            type="text"
            value={value}
            placeholder="Search for products"
          />
        </div>
      )}
    </form>
  );
}
