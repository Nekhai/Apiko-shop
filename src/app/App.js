import React, { useState, useEffect } from "react";
import { Header } from "../components/Header/Header";
import { Content } from "../components/Content/Content";
import { Footer } from "../components/Footer/Footer";
import { useSelector } from "react-redux";

export const useFetch = (url) => {
  const [fetchData, setFetchData] = useState(null);
  const token = useSelector((state) => state.login.token);

  useEffect(() => {
    const fetchFromApp = async (fetchUrl) => {
      const response = await fetch(fetchUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFetchData(data);
    };
    fetchFromApp(url);
  }, [url, token]);

  return { fetchData };
};

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};
