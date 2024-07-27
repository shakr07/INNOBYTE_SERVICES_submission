import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";
import Spinner from "../components/Spinner.jsx";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={{ padding: "16px" }}>
      <BackButton />
      <h1 style={{ fontSize: "24px", margin: "16px 0" }}>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "2px solid #38bdf8",
            borderRadius: "8px",
            width: "fit-content",
            padding: "16px",
          }}
        >
          <div style={{ margin: "16px 0" }}>
            <span
              style={{
                fontSize: "20px",
                marginRight: "16px",
                color: "#6b7280",
              }}
            >
              Id
            </span>
            <span>{book._id}</span>
          </div>
          <div style={{ margin: "16px 0" }}>
            <span
              style={{
                fontSize: "20px",
                marginRight: "16px",
                color: "#6b7280",
              }}
            >
              Title
            </span>
            <span>{book.title}</span>
          </div>
          <div style={{ margin: "16px 0" }}>
            <span
              style={{
                fontSize: "20px",
                marginRight: "16px",
                color: "#6b7280",
              }}
            >
              Author
            </span>
            <span>{book.author}</span>
          </div>
          <div style={{ margin: "16px 0" }}>
            <span
              style={{
                fontSize: "20px",
                marginRight: "16px",
                color: "#6b7280",
              }}
            >
              Publish Year
            </span>
            <span>{book.Date}</span>
          </div>
          <div style={{ margin: "16px 0" }}>
            <span
              style={{
                fontSize: "20px",
                marginRight: "16px",
                color: "#6b7280",
              }}
            >
              Create Time
            </span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div style={{ margin: "16px 0" }}>
            <span
              style={{
                fontSize: "20px",
                marginRight: "16px",
                color: "#6b7280",
              }}
            >
              Last Update Time
            </span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
