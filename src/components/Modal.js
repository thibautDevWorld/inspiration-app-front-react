import { FaTimes } from "react-icons/fa"

const Modal = ({show, item, onClose}) => {
 
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
                        <img src={item.volumeInfo.imageLinks.thumbnail} alt={item.volumeInfo.title} />
                        <div className="info">
                            <h1>{item.volumeInfo.title}</h1>
                            <div>{item.volumeInfo.authors && item.volumeInfo.authors.map((author, idx)=> (<h4 key={idx}>{author}</h4>))}</div>
                            <p>{item.volumeInfo.description && item.volumeInfo.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Modal;