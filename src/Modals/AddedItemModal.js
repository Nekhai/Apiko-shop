import React, { useEffect } from "react";
import "./AddedItemModal.scss";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideAddedModal } from "../store/slices";
import { SvgClose } from "../components/Image/svgClose";

export const AddedItemModal = () => {
    const addedItem = useSelector((state) => state.addedModal.addedName);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(hideAddedModal());
    };

    useEffect(() => {
        const timeout = setTimeout(() => dispatch(hideAddedModal()), 3000);

        return () => clearTimeout(timeout);
    });

    return (
        addedItem &&
        ReactDOM.createPortal(
            <div className="added-item">
                <button className="added-item__close" onClick={handleClick}>
                    <SvgClose />
                </button>
                <p>
                    The <span>{addedItem}</span> is successfully added to cart
                </p>
            </div>,
            document.getElementById("modal")
        )
    );
};
