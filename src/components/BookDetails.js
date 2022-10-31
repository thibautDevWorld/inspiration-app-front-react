const BookDetails = ({ book }) => {
    return (
        <div className="book-details">
            <h4>{book.title}</h4>
            <p><strong>Author: </strong>{book.author}</p>
            <p><strong>Cover: </strong>{book.cover}</p>
        </div>
    )
}

export default BookDetails

