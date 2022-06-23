import "./Contacts.css"




export const ContactSearch = ({setterFunction, categories, setChosenFilters, chosenFilters}) => {
    return (
        <>
        <h2 className="list__header">List of Contacts</h2>
        <input 
        onChange={
            (evt) => {
                setterFunction(evt.target.value)
            }
        }
        type="text" placeholder="Search your contacts" className="searchField"/>
        Filter By:
        {
                categories.map(
                    (category) => {
                        return <>
                        <input key={`category--${category.id}`} 
                        onChange={
                            (evt) => {
                                const copy = new Set(chosenFilters)
                                const id = evt.target.id
                                if (evt.target.checked) {
                                    copy.add(parseInt(id))
                                } else {
                                    copy.delete(parseInt(id))
                                }
                                setChosenFilters(copy)
                            }
                        }
                        type="checkbox" 
                        name="category" 
                        id={category.id}
                        
                        />
                        {category.name}
                        </>
                    }
                )
            }    
        </>
    )
}