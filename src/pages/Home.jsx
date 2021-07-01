import React from "react";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/Categories/Categories";
import Loader from "../components/Loader/Loader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import SortPopup from "../components/SortPopup/SortPopup";
import { getCategoryIndex, getItemType } from "../features/categoriesSlice";
import { loadPizzaAsync } from "../features/pizzaSlice";
import { addPizzaToCart } from "../features/cartSlice";

const categoryNames = ["Мясные", "Вегетарианская", "Венгерская", "Азиатская"];
const sortItems = [
  { type: "popular", name: "популярности", order: "desc" },
  { type: "price", name: "цене", order: "desc" },
  { type: "name", name: "алфавиту", order: "asc" },
];

const Home = () => {
  const dispatch = useDispatch();
  const {
    pizza: { pizzas, isLoading },
    categories: { categoryIndex, sortBy },
    cart: { items },
  } = useSelector(({ pizza, categories, cart }) => {
    return { pizza, categories, cart };
  });

  const onSelectCategoryIndex = useCallback((index) => {
    dispatch(getCategoryIndex(index));
  }, []);

  const onClickSortItem = useCallback((itemType) => {
    dispatch(getItemType(itemType));
  }, []);

  const onAddPizza = (pizza) => {
    dispatch(addPizzaToCart(pizza));
  };

  useEffect(() => {
    dispatch(loadPizzaAsync({ sortBy, categoryIndex }));
  }, [dispatch, categoryIndex, sortBy]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          category={categoryNames}
          onClickItem={onSelectCategoryIndex}
          activeCategory={categoryIndex}
        />
        <SortPopup
          activeSortType={sortBy.type}
          popupMenu={sortItems}
          onClickSortItem={onClickSortItem}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? Array(12)
              .fill(0)
              .map((_, index) => <Loader key={index} />)
          : pizzas &&
            pizzas.map((pizza) => (
              <PizzaBlock
                key={pizza.id}
                pizza={pizza}
                onAddPizza={onAddPizza}
                addedCount={
                  items[pizza.id] && items[pizza.id].items.length 
                }
              />
            ))}
      </div>
    </div>
  );
};
export default Home;
