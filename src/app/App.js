import React from "react";
import { Header } from "../components/Header/Header";
import { Content } from "../components/Content/Content";
import { Footer } from "../components/Footer/Footer";

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};
