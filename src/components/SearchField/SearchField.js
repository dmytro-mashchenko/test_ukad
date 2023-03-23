import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
  useLocation,
  createSearchParams,
} from "react-router-dom";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";

import { Icon } from "../../assets/icons/icons";
import { useDebounce } from "../../hooks/useDebounce";

import "./SearchField.scss";

export function SearchField({ instantChangeProducts }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(searchParams.get("search") || "");
  const location = useLocation();
  const productsLocation = location.pathname === "/products";

  function handleChange(e) {
    setValue(e.target.value.trim());
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if (!instantChangeProducts && !productsLocation)
      navigate({
        pathname: "/products",
        search: `?${createSearchParams({ page: 1, search: value })}`,
      });
  }

  const debouncedChangeProducts = useDebounce(() => {
    instantChangeProducts(value);
  });

  useEffect(() => {
    if (!instantChangeProducts) return;

    if (value) {
      searchParams.set("search", value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
      instantChangeProducts(value);
      debouncedChangeProducts.cancel();
      return;
    }

    debouncedChangeProducts();
  }, [value]);

  useEffect(() => {
    if (!productsLocation) setValue("");
  }, [location]);

  return (
    <form onSubmit={onSubmitHandler} className='SearchField__form'>
      {(!productsLocation || instantChangeProducts) && (
        <div className='SearchField__container'>
          <Icon
            className='SearchField__icon'
            icon='search'
            size={22}
            color={instantChangeProducts ? "#757575" : "#fff"}
          />
          <input
            onChange={handleChange}
            className={
              instantChangeProducts ? "SearchField__input_instant" : "SearchField__input"
            }
            type='text'
            value={value}
            placeholder='Search for products'
          />
        </div>
      )}
    </form>
  );
}

SearchField.propTypes = {
  changeProducts: PropTypes.func,
};
