import React, { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import { Content } from "../components/Content/Content";
import { Footer } from "../components/Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { saveState } from "./browserStorage";
import { store } from "../store/store";
import { debounce } from "debounce";
import { openSetting } from "../store/slices";

export const useFetch = (url) => {
  const [fetchData, setFetchData] = useState(null);
  const token = useSelector((state) => state.login.token);

  useEffect(() => {
    const fetchFromApp = async (fetchUrl) => {
      try {
        const response = await fetch(fetchUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error("error");
        } else {
          setFetchData(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFromApp(url);
  }, [url, token]);

  return { fetchData };
};

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

export const App = () => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(openSetting(false));
  };

  return (
    <div className="app" onClick={clickHandler}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
};
