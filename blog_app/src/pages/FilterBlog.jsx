import React from "react";
import BookSingleCard from "../components/home/BookSingleCard"; // Adjust the import path if necessary

const FilterBlog = ({ books }) => {
  // If books is not an array, initialize it as an empty array
  const booksArray = Array.isArray(books) ? books : [];
  console.log(booksArray);

  // Styles for the grid container and individual cards
  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  };

  return (
    <div style={gridContainerStyle}>
      {booksArray.map((item) => (
        <BookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default FilterBlog;
