import { useState, useEffect } from "react"
import { getUserCategories } from "../APIManager"
import { ContactList } from "./ContactList"
import { ContactSearch } from "./ContactSearch"

export const ContactContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const [categories, setCategories] = useState([])
    const [chosenCategories, setChosenCategories] = useState([])

    const localConnectUser = localStorage.getItem("connect_user")
    const connectUserObject = JSON.parse(localConnectUser)

    useEffect(
        () => {
            getUserCategories(connectUserObject.id)
                .then((data) => {
                    setCategories(data)
                }) 
        },
        []
    )

    return <>
    <ContactSearch setterFunction={setSearchTerms} categories={categories} setChosenFilters={setChosenCategories} chosenFilters={chosenCategories}/> 
    <ContactList searchTermState={searchTerms} chosenFilterCategoryState={chosenCategories}/> 
    </>
}