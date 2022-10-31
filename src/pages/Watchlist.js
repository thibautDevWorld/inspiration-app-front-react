import { useEffect, useState } from "react";
import List from "../components/List";

const Watchlist = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/api/')
            const json = await response.json()

            if(response.ok) {
                setBooks(json)
            }
        }
        fetchBooks()
    }, [])



    return ( 

        <div className="home">
            <div className="books">

                { books.length > 0
                ? <List items={books}/>
                : <h1>The list is empty</h1>
                }
                    
               
            </div>

        </div>
     );
}
 
export default Watchlist;