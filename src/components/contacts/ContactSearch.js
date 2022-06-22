import "./Contacts.css"


export const ContactSearch = ({setterFunction}) => {
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
        </>
    )
}