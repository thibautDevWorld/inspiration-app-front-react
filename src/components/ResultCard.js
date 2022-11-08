import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { useAuthContext } from "../hooks/useAuthContext";

const ResultCard = ({ book }) => {
  const [disableBtn, setdisableBtn] = useState(false);
  const [show, setShow] = useState(false);
  const { user } = useAuthContext();


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const bookSelected = {
      bookId: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      cover: book.volumeInfo.imageLinks.thumbnail,
      description: book.volumeInfo.description
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/books`, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => res.data)
      .then((res) => {
        let storedBook = res.find((o) => o.bookId === bookSelected.bookId);
        const addDisabled = storedBook ? true : false;

        if (!addDisabled) {
          axios
            .post(`${process.env.REACT_APP_API_URL}/api/books`, bookSelected, {
              headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((response) => {
              setdisableBtn(true);
            })
            .catch((err) => console.log(err));
        }
      });
  };

  let thumbnail =
    book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;

  let authorsTab = book.volumeInfo.authors


  if (thumbnail !== undefined) {
    return (
      <>
        <section className="result-card">
          <div>
            <img
              className="result-image"
              src={thumbnail}
              alt={book.volumeInfo.title}
            />
            
          </div>
          <div className="result-authors-contain">
            <h1>{book.volumeInfo.title}</h1>
            <div className="book-authors">
             {authorsTab && authorsTab.map((author, idx) => (
              <p key={idx}>{author}</p>
             ))}
             <div className="button-detail-card-area">
              <button
              className="details-search-card"
                onClick={() => {
                  setShow(true);
                }}
              >
                show details
              </button>
              <br />
              <button
              className="add-watchlist-btn"
              onClick={handleSubmit}
              disabled={disableBtn}
            >
              Add to Watchlist
            </button>
            </div>
          </div>
          </div>
          <div className="add-watchlist-content">
            
          </div>
          <Modal show={show} item={book} onClose={() => setShow(false)} />
        </section>

       
      </>
    );
  }
};

export default ResultCard;
