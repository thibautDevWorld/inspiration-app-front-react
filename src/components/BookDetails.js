import { FaTimes } from "react-icons/fa"

const BookDetails = ({show, item, onClose}) => {
    if (!show) {
        return null;
    }
    return ( 
        <>
            <div className="overlay">
                <div className="overlay-inner">
                <button onClick={onClose} className="close">
                    <FaTimes />
                </button>
                    <div className="inner-box">
                        <img src={item.cover} alt={item.title} />
                        <div className="info">
                            <h1>{item.title}</h1>
                            <div>{item.authors.map((author, idx) => (<h4 key={idx}>{author}</h4>))}</div>
                            <p>{item.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}


export default BookDetails

