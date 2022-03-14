import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ inputClass }) => {
  const [searchValue, setSearchValue] = useState("");

  const navigation = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    navigation({
      search: searchValue ? `?keywords=${searchValue}` : "",
    });
    setSearchValue("");
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        className={inputClass}
        placeholder="Search products by name"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  );
};
