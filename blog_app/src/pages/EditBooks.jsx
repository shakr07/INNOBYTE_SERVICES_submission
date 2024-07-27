import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [Date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setDate(response.data.Date);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Check console");
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      Date,
    };
    setLoading(true);
    axios
      .put(`http://localhost:8000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited successfully", { variant: "success" });
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
      <h1 style={{ fontSize: "24px", margin: "16px 0" }}>Edit Book</h1>
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
        <button
          style={{
            padding: "8px",
            backgroundColor: "#38bdf8",
            margin: "16px 0",
          }}
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
