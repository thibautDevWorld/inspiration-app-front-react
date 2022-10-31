import { useState } from "react";
import axios from "axios";

const ResultCard = ({ book }) => {
  const [error, setError] = useState(null);
  const [disableBtn, setdisableBtn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookSelected = {
      bookId: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      cover: book.volumeInfo.imageLinks.thumbnail,
    };

    axios
      .get("/api")
      .then((res) => res.data)
      .then((res) => {
        let storedBook = res.find((o) => o.bookId === bookSelected.bookId);
        const addDisabled = storedBook ? true : false;
        
        if (!addDisabled) {
          axios
            .post("/api", bookSelected)
            .then((response) => {
              setdisableBtn(true);
            })
            .catch((err) => console.log(err));
        }
      });
  };

  let thumbnail =
    book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;
  let amount = book.saleInfo.listPrice && book.saleInfo.listPrice.amount;

  if (thumbnail !== undefined) {
    return (
      <>
        <div className="result-card">
          <div className="poster-wrapper">
            <img src={thumbnail} alt="" />
          </div>
          <div className="info">
            <div className="header">
              <h4 className="title">{book.volumeInfo.title}</h4>
              <p>{book.volumeInfo.author}</p>
              <p className="amount">{amount}</p>
              <button
                className="btn"
                onClick={handleSubmit}
                disabled={disableBtn}
              >
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ResultCard;
