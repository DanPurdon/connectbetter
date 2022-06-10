import "./Contacts.css"


export const ContactSearch = ({setterFunction}) => {
    return (
        <input 
        onChange={
            (evt) => {
                setterFunction(evt.target.value)
            }
        }
        type="text" placeholder="Search your contacts" className="searchField"/>
    )
}