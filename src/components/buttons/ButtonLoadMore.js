import React from "react";
import "./ButtonLoadMore.scss";

export const ButtonLoadMore = ({ handler }) => {
  return (
    <button className="button-load-more" onClick={handler}>
      Load more...
    </button>
  );
};
