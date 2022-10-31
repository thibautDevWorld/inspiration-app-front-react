const List = ({items}) => {

    

    return ( 
     <div>
       {items.map(item => {
        return (
            <>
                {item.title}
            </>
            
        )
       })}
     </div>   
    )
}
 
export default List;