import React from "react";
import "./Count.scss";

export const Count = ({ amount, setAmount }) => {
  const countAmount = (symbol) => {
    if (symbol === "+") {
      setAmount(amount + 1);
    } else if (amount !== 1) {
      setAmount(amount - 1);
    }
  };

  return (
    <div className="count">
      <button onClick={() => countAmount("-")} className="count__btn">
        —
      </button>
      <div className="count__amount">{amount}</div>
      <button onClick={() => countAmount("+")} className="count__btn">
        +
      </button>
    </div>
  );
};
