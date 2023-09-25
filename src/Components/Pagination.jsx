import "./Pagination.scss";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

function Item({ className, onClick, children }) {
  return (
    <button
      className={`pagination-btn pagination-item ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Prev({ className, onClick }) {
  return (
    <button
      className={`pagination-btn pagination-arr ${className}`}
      onClick={onClick}
    >
      <FaArrowLeftLong />
    </button>
  );
}

function Next({ className, onClick }) {
  return (
    <button
      className={`pagination-btn pagination-arr ${className}`}
      onClick={onClick}
    >
      <FaArrowRightLong />
    </button>
  );
}

export default { Item, Prev, Next };
