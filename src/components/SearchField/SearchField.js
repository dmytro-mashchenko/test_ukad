import { Icon } from "../../assets/icons/icons";
import { useEffect } from "react";

import "./SearchField.scss";

export function SearchField({ changeProducts }) {
  const PATH = window.location.pathname;
  const PRODUCTS_PATH = PATH === "/products";

  const onSubmitHandler = (e) => {
    e.preventDefault();
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
            className={
              changeProducts
                ? `SearchField__input_instant`
                : "SearchField__input"
            }
            type="text"
            placeholder="Search for products"
          />
        </div>
      )}
    </form>
  );
}
