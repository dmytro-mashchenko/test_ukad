import { Icon } from "../../assets/icons/icons";
import { useEffect, useState } from "react";
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

  const handleChange = (e) => {
    setValue(e.target.value.trim());
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (changeProducts) return;
    if (!PRODUCTS_PATH) navigate(`/products?page=1&search=${value}`);
  };

  const debouncedChangeProducts = useDebounce(() => {
    changeProducts(value);
  });

  useEffect(() => {
    if (!changeProducts) return;
    searchParams.set("search", value);
    setSearchParams(searchParams);
    if (!value) {
      changeProducts(value);
      debouncedChangeProducts.cancel();
      return;
    }
    debouncedChangeProducts();
  }, [value]);

  useEffect(() => {
    if (!PRODUCTS_PATH) setValue("");
  }, [PATH]);

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
