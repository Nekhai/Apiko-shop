import React, { useEffect, useState } from "react";
import "./Home.scss";
import { useFetch } from "../../app/App";
import { AppItem } from "../../app/AppItem";
import { ButtonLoadMore } from "../../components/buttons/ButtonLoadMore";
import { ItemModal } from "../../Modals/ItemModal";
import { categoriesFetch } from "../../store/slices";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "./SearchBar";
import { useLocation } from "react-router-dom";
import { NoResults } from "./NoResults";
import { Continue } from "../../Modals/Continue";

export const Home = () => {
    const [products, setProducts] = useState([]);
    const [itemLimit, setItemLimit] = useState(20);
    const [activCategorie, setActivCategorie] = useState("/");
    const [sortBy, setSortBy] = useState("latest");

    const location = useLocation().search;

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const token = useSelector((state) => state.login.token);
    const favorites = useSelector((state) => state.favorites.favorites);

    const url = !location
        ? `/api${activCategorie}products?offset=0&limit=${itemLimit}&sortBy=${sortBy}`
        : `/api/products/search${location}=tor&offset=0&limit=${itemLimit}`;

    const { fetchData } = useFetch(url);

    const handleCategories = (e) => {
        e.target.value !== "0"
            ? setActivCategorie(`/categories/${e.target.value}/`)
            : setActivCategorie("/");
    };

    const handleSorting = (e) => {
        setSortBy(e.target.value);
    };

    useEffect(() => {
        setProducts(fetchData);
        dispatch(categoriesFetch());
    }, [fetchData, dispatch, token, favorites]);

    if (!products) {
        return <div></div>;
    }

    return (
        <div className="home">
            <div className="home__form">
                <div className="home__search-bar">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.75 13.5V13.6037L11.8234 13.677L16.8234 18.667L17.0002 18.8434L17.1768 18.6668L18.6668 17.1768L18.8434 17.0002L18.667 16.8234L13.677 11.8234L13.6037 11.75H13.5H13H12.8109L12.7705 11.7111C13.6973 10.5539 14.25 9.08773 14.25 7.5C14.25 3.77193 11.2281 0.75 7.5 0.75C3.77193 0.75 0.75 3.77193 0.75 7.5C0.75 11.2281 3.77193 14.25 7.5 14.25C9.08773 14.25 10.5539 13.6973 11.7111 12.7705L11.75 12.8109V13.5ZM7.5 11.75C5.14807 11.75 3.25 9.85193 3.25 7.5C3.25 5.14807 5.14807 3.25 7.5 3.25C9.85193 3.25 11.75 5.14807 11.75 7.5C11.75 9.85193 9.85193 11.75 7.5 11.75Z"
                            fill="#727272"
                            stroke="#727272"
                            strokeWidth="0.5"
                        />
                    </svg>
                    <SearchBar inputClass="home__search" />
                </div>
                {!location && (
                    <form className="home__filter">
                        <div className="home__categories">
                            <select
                                onChange={handleCategories}
                                defaultValue={"DEFAULT"}
                                className="home__select-categorie"
                            >
                                <option value="DEFAULT" disabled hidden>
                                    Choose Category
                                </option>
                                <option value="0">All</option>
                                {categories.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="home__sort">
                            <select
                                onChange={handleSorting}
                                defaultValue={"DEFAULT"}
                                className="home__select-sort"
                                multiple
                            >
                                <option value="DEFAULT" disabled hidden>
                                    Sorting
                                </option>
                                <option value="popular">Popular</option>
                                <option value="latest">New</option>
                            </select>
                        </div>

                        {/* <div className="multiselect_block">
                            <label
                                htmlFor="select-2"
                                className="field_multiselect"
                            >
                                Frameworks
                            </label>

                            <input
                                id="checkbox-2"
                                className="multiselect_checkbox"
                                type="checkbox"
                            />
                            <label
                                htmlFor="checkbox-2"
                                className="multiselect_label"
                            ></label>

                            <select
                                id="select-2"
                                className="field_select"
                                name="frameworks"
                                multiple
                            >
                                <option value="React">React</option>
                                <option value="Vue">Vue</option>
                                <option value="Angular">Angular</option>
                                <option value="Ember">Ember</option>
                            </select>
                            <span className="field_multiselect_help">
                                You can select several items by pressing{" "}
                                <b>Ctrl(or Command)+Element</b>
                            </span>
                        </div> */}
                    </form>
                )}
            </div>
            {products.length === 0 ? (
                <NoResults />
            ) : (
                <div className="home__wrap">
                    <div className="home__items">
                        {products.map((item) => (
                            <AppItem
                                item={item}
                                key={item.id}
                                // title={item.title}
                                // price={item.price}
                                // id={item.id}
                                // img={<Image path={item.picture} name={item.title} />}
                                // favorite={item.favorite}
                            />
                        ))}
                    </div>
                    <div className="home__more">
                        {products.length % 20 === 0 && (
                            <ButtonLoadMore
                                handler={() => setItemLimit(itemLimit + 20)}
                            />
                        )}
                    </div>
                </div>
            )}
            <ItemModal />
            <Continue />
        </div>
    );
};
