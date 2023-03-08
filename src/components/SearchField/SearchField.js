import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";

import { Icon } from "../../assets/icons/icons";
import { useDebounce } from "../../services/hooks";

import "./SearchField.scss";

export function SearchField({ changeProducts }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(searchParams.get("search") || "");
  const LOCATION = useLocation();
  const LOCATION_PRODUCTS = LOCATION.pathname === "/products";

  function handleChange(e) {
    setValue(e.target.value.trim());
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if (!changeProducts && !LOCATION_PRODUCTS)
      navigate(`/products?page=1&search=${value}`);
  }

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
    if (!LOCATION_PRODUCTS) setValue("");
  }, [LOCATION]);

  return (
    <form onSubmit={onSubmitHandler} className="SearchField__form">
      {(!LOCATION_PRODUCTS || changeProducts) && (
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
                ? "SearchField__input_instant"
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

SearchField.propTypes = {
  changeProducts: PropTypes.func,
};
