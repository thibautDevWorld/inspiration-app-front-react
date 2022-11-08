import { useState } from "react";
import BookDetails from "./BookDetails";

const List = ({ book }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <section className="book-container">
        <div>
          <img className="book-image" src={book.cover} alt={book.title} />
          <div className="button-detail-card-area">
            <button
              onClick={() => {
                setShow(true);
              }}
            >
              show details
            </button>
          </div>
        </div>
        <div className="title-authors-contain">
          <h1>{book.title}</h1>
          <div className="book-authors">
            {book.authors.map((element, idx) => (
              <p key={idx}>{element}</p>
            ))}
          </div>
        </div>
        <div className="button-location-card"></div>

        <BookDetails show={show} item={book} onClose={() => setShow(false)} />
      </section>
    </>
  );
};

export default List;
