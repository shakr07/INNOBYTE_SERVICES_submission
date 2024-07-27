import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBooks";
import DeleteBook from "./pages/DeleteBook";
import FilterBlog from "./pages/FilterBlog";
import BookDetail from "./pages/BookDetail";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/verify", { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          setIsAuth(true);
        }
      })
      .catch(() => {
        setIsAuth(false);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/books" element={isAuth ? <Home /> : <Navigate to="/login" />} />
      <Route path="/books/create" element={isAuth ? <CreateBook /> : <Navigate to="/login" />} />
      <Route path="/books/details/:id" element={isAuth ? <ShowBook /> : <Navigate to="/login" />} />
      <Route path="/books/edit/:id" element={isAuth ? <EditBook /> : <Navigate to="/login" />} />
      <Route path="/books/delete/:id" element={isAuth ? <DeleteBook /> : <Navigate to="/login" />} />
      <Route path="/books/filter/:title/:author" element={isAuth ? <FilterBlog /> : <Navigate to="/login" />} />
      <Route path="/books/detail/:id" element={isAuth ? <BookDetail /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
