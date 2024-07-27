import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [Date, setDate] = useState("");
  const [content, setContent] = useState(""); // New state for content
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      Date,
      content, 
    };
    setLoading(true);
    axios
      .post("http://localhost:8000/books/create", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Created successfully", { variant: "success" });
        navigate("/books");
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
      <h1 style={{ fontSize: "24px", margin: "16px 0" }}>Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid #38bdf8",
          borderRadius: "10px",
          width: "600px",
          padding: "16px",
          margin: "0 auto",
        }}
      >
        <div style={{ margin: "16px 0" }}>
          <label
            style={{ fontSize: "20px", marginRight: "16px", color: "#6b7280" }}
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              border: "2px solid #6b7280",
              padding: "8px",
              width: "100%",
            }}
          />
        </div>
        <div style={{ margin: "16px 0" }}>
          <label
            style={{ fontSize: "20px", marginRight: "16px", color: "#6b7280" }}
          >
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{
              border: "2px solid #6b7280",
              padding: "8px",
              width: "100%",
            }}
          />
        </div>
        <div style={{ margin: "16px 0" }}>
          <label
            style={{ fontSize: "20px", marginRight: "16px", color: "#6b7280" }}
          >
            Date
          </label>
          <input
            type="text"
            value={Date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              border: "2px solid #6b7280",
              padding: "8px",
              width: "100%",
            }}
          />
        </div>
        <div style={{ margin: "16px 0" }}>
          <label
            style={{ fontSize: "20px", marginRight: "16px", color: "#6b7280" }}
          >
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              border: "2px solid #6b7280",
              padding: "8px",
              width: "100%",
              height: "150px",
            }}
          />
        </div>
        <button
          style={{
            padding: "8px",
            backgroundColor: "#38bdf8",
            margin: "16px 0",
          }}
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
