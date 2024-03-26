import React from 'react';
import PropTypes from 'prop-types';

function CategoriesList({ categories, onCategoryClick }) {
  return (
    <div className="categories-list">
      {categories.map((category) => (
        <button
          type="button"
          className="category-item"
          key={category}
          onClick={() => onCategoryClick(category)}
        >
          {`#${category}`}
        </button>
      ))}
      {categories.length < 1 && <p>Data belum tersedia</p>}
    </div>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCategoryClick: PropTypes.func.isRequired,
};

export default CategoriesList;
