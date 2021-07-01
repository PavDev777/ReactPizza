import { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const PizzaBlock = ({ pizza, onAddPizza, addedCount }) => {
  const availableTypes = ["тонкое", "традиционное"];
  const availableSizes = [26, 30, 40];
  const [activeTypePizza, setActiveTypePizza] = useState(pizza.types[0]);
  const [selectSize, setSelectSize] = useState(0);

  const onSelectType = (index) => {
    setActiveTypePizza(index);
  };

  const onSelectSize = (index) => {
    setSelectSize(index);
  };

  const onAddPizzaItem = () => {
    const obj = {
      ...pizza,
      size: availableSizes[selectSize], 
      type: availableTypes[activeTypePizza],
    };
    onAddPizza(obj);
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title"> {pizza.name} </h4>
      <div className="pizza-block__selector">
        <ul>
          {availableTypes.map((pizzaType, idx) => (
            <li
              key={`${pizzaType}_${idx}`}
              onClick={() => onSelectType(idx)}
              className={classNames({
                active: activeTypePizza === idx,
                disabled: !pizza.types.includes(idx),
              })}
            >
              {pizzaType}
            </li>
          ))}
        </ul>

        <ul>
          {availableSizes.map((size, idx) => (
            <li
              key={`${size}_${idx}`}
              onClick={() => onSelectSize(idx)}
              className={classNames({
                active: selectSize === idx,
                disabled: !pizza.sizes.includes(size),
              })}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {pizza.price} ₽</div>
        <button
          onClick={onAddPizzaItem}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount && <i> {addedCount} </i>} 
        </button>
      </div>
    </div>
  );
};

PizzaBlock.propTypes = {
  onAddPizza: PropTypes.func.isRequired,
  addedCount: PropTypes.number,
  pizza: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};

export default PizzaBlock;
