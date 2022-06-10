import { useState } from "react"
import { ContactList } from "./ContactList"
import { ContactSearch } from "./ContactSearch"

export const ContactContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    return <>
    <ContactSearch setterFunction={setSearchTerms}/> 
    <ContactList searchTermState={searchTerms}/> 
    </>
}