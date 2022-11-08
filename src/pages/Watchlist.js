import { useEffect, useState } from "react";
import List from "../components/List";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const Watchlist = () => {
  const [books, setBooks] = useState([]);
  const { user } = useAuthContext();


  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.json();

      if (response.ok) {
        setBooks(json);
      }
    };

    if (user) {
      fetchBooks();
    }
  }, [user]);

  const handleClick = (id) => {
    if (!user) {
      return;
    }

    axios
      .delete("/api/books/" + id, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        if (res.data) {
          axios
            .get("/api/books", {
              headers: { Authorization: `Bearer ${user.token}` },
            })
            .then((res) => setBooks(res.data));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="watchlist-background">
        {books.length > 0 
          ? books.map((item) => (
              <>
                <div key={item.id}  className="watchlist-card">
                  <List book={item} />
                  <button
                    onClick={() => handleClick(item._id)}
                  >
                  <span class="material-icons">&#xe872;</span>
                  </button>
                </div>
              </>
            ))
          : <h1 className="waiting-books-list">Your list is waiting<br/>your favourite books</h1>}
      </div>
    </div>
  );
};

export default Watchlist;
