import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Gi3dGlasses } from "react-icons/gi";
import { TbWriting } from "react-icons/tb";

const BookSingleCard = ({ book }) => {

  return (
    <div
      style={{
        border: "2px solid #6b7280",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
        position: "relative",
        transition: "box-shadow 0.3s",
      }}
    >
      <h2
        style={{
          position: "absolute",
          top: "4px",
          right: "8px",
          padding: "8px",
          backgroundColor: "#f87171",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      >
        {book.Date}
      </h2>
      {/* <h4 style={{ margin: "8px 0", color: "#6b7280" }}>{book._id}</h4> */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Gi3dGlasses style={{ color: "#12FE0E", fontSize: "24px" }} />
        <h2 style={{ margin: "4px 0" }}>{book.title}</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <TbWriting style={{ color: "#F00242", fontSize: "24px" }} />
        <h2 style={{ margin: "4px 0" }}>{book.author}</h2>
      </div>
      <Link to={`/books/detail/${book._id}`}>
        <button
          style={{
            marginTop: "8px",
            padding: "8px",
            backgroundColor: "#38bdf8",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Show Content
        </button>
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
          marginTop: "16px",
          padding: "16px",
        }}
      >
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit
            style={{
              fontSize: "24px",
              color: "#fbbf24",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
          />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete
            style={{
              fontSize: "24px",
              color: "#ef4444",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default BookSingleCard;
