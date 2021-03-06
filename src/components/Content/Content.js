import React from "react";
import "./Content.scss";
import { Route, Routes } from "react-router-dom";
import { Home } from "../../pages/Home/Home";
import { Cart } from "../../pages/Cart/Cart";
import { Menu } from "../../pages/Menu/Menu";

export const Content = () => {
    return (
        <div className="content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/menu" element={<Menu />} />
            </Routes>
        </div>
    );
};
