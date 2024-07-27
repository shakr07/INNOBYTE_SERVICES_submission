import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { RiDeleteBin5Line } from "react-icons/ri";
const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8000/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted successfully", { variant: "success" });
        navigate("/books  ");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div style={{ padding: "16px" }}>
      <BackButton />
      <h1 style={{ fontSize: "24px", margin: "16px 0" }}>Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid #38bdf8",
          borderRadius: "10px",
          width: "600px",
          padding: "32px",
          margin: "0 auto",
        }}
      >
        <h3 style={{ fontSize: "20px" }}>
          Are You Sure You want to delete this book?
        </h3>
        <button
          type="button"
          style={{
            padding: "16px",
            backgroundColor: "#3630a3",
            color: "white",
            margin: "32px 0",
          }}
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
