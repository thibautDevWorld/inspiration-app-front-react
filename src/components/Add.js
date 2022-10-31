import { useState } from "react";
import ResultCard from "./ResultCard";

const Add = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchTerm = { search };

    const response = await fetch("/api/book-create", {
      method: "POST",
      body: JSON.stringify(searchTerm),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      //call data to filter the search
      const dataFromMongo = await fetch("/api");
      const dataFromMongoJson = await dataFromMongo.json();

      let ids = new Set(dataFromMongoJson.map(({ bookId }) => bookId));
      let jsonFiltered = json.filter(({ id }) => !ids.has(id));

      setResults(jsonFiltered);
      setSearch("");
      setError(null);
    }
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <form className="search" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search for a book"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>Search</button>
            </form>

            {error && <div className="error">{error}</div>}

            <div className="books">
              {results.length > 0 && (
                <ul className="results">
                  {results.map((book) => (
                    <li key={book.id}>
                      <ResultCard book={book} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
