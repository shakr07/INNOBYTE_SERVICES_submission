import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import FilterBlog from "./FilterBlog";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inp1, setInp1] = useState("");
  const [inp2, setInp2] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

 const handleFilter = () => {
   setLoading(true);
   axios
     .get(`http://localhost:8000/books/filter/${inp1}/${inp2}`)
     .then((response) => {
       console.log(response.data); // Log the response data received
       setFilteredBooks(response.data); // Check if this matches expected format
       setFilterApplied(true);
       setLoading(false);
     })
     .catch((error) => {
       console.log(error);
       setLoading(false);
     });
 };

 const resetFilter = () => {
   setFilteredBooks([]);
   setFilterApplied(false);
 };

  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <input
          type="text"
          value={inp1}
          onChange={(e) => setInp1(e.target.value)}
          style={{
            border: "1px solid #6b7280",
            padding: "8px",
            width: "10%",
          }}
        />
        <input
          type="text"
          value={inp2}
          onChange={(e) => setInp2(e.target.value)}
          style={{
            border: "1px solid #6b7280",
            padding: "8px",
            width: "10%",
          }}
        />
        {!filterApplied ? (
          <button
            style={{
              backgroundColor: "#38bdf8",
              padding: "8px 16px",
              borderRadius: "8px",
            }}
            onClick={handleFilter}
          >
            Filter
          </button>
        ) : (
          <button
            style={{
              backgroundColor: "#f87171",
              padding: "8px 16px",
              borderRadius: "8px",
            }}
            onClick={resetFilter}
          >
            Clear Filter
          </button>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "24px", margin: "32px 0" }}>
          {filterApplied ? "Filtered Books" : "Books List"}
        </h1>
        <Link to="/books/create">
          <MdOutlineAddBox style={{ color: "#1e40af", fontSize: "32px" }} />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : filterApplied ? (
        <FilterBlog books={filteredBooks} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
