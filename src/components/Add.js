import { useState } from "react";
import ResultCard from "./ResultCard";
import { useAuthContext } from "../hooks/useAuthContext";

const Add = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const searchTerm = { search };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/books/book-create`, {
      method: "POST",
      body: JSON.stringify(searchTerm),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      //call data to filter the search
      const dataFromMongo = await fetch(`${process.env.REACT_APP_API_URL}/api/books`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const dataFromMongoJson = await dataFromMongo.json();

      let ids = new Set(dataFromMongoJson.map(({ bookId }) => bookId));
      let jsonFiltered = json.filter(({ id }) => !ids.has(id));

      setResults(jsonFiltered);
      setSearch("");
      setError(null);
    }
  };

  
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="add-content">
          <input
            type="text"
            placeholder="Search for a book"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="nav-btn">Search</button>
        </form>

        {error && <div className="error">{error}</div>}
      </div>

      <div className="result-search-container">
        {results.length > 0 
        && results.map((book) => (
        
          book.volumeInfo.title && (
            <div key={book.id}>
            <ResultCard  book={book} />
          </div>
          )
        )
        )}
      </div>
    </>
  );
};

export default Add;
