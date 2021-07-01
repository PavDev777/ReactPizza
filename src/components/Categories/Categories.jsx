import React from "react";
import PropTypes from "prop-types";

const Categories = React.memo(({ category, onClickItem, activeCategory }) => {
  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategory === null ? "active" : ""}
          onClick={() => onClickItem(null)}
        >
          Все
        </li>
        {category &&
          category.map((item, index) => (
            <li
              className={activeCategory === index ? "active" : ""}
              onClick={() => onClickItem(index)}
              key={`${item}_${index}`}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  activeCategory: PropTypes.number,
  category: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickItem: PropTypes.func.isRequired,
};
Categories.defaultProps = { category: [], activeCategory: null };
export default Categories;
