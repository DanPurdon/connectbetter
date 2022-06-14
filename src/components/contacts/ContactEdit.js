import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getContact, editContact, getUserCategories, getContactCategoriesByContact } from "../APIManager"


export const ContactEdit = () => {
    const { contactId } = useParams()
    const [contact, updateContact] = useState()
    const [categories, setCategories] = useState([])
    const [chosenCategories, setChosenCategories] = useState([])

    const navigate = useNavigate()
    const localConnectUser = localStorage.getItem("connect_user")
    const connectUserObject = JSON.parse(localConnectUser)

    useEffect(
        () => {
            getContact(contactId)
                .then((data) => {
                    updateContact(data)
                })
        },
        [contactId]
    )

    useEffect(
        () => {
            getContactCategoriesByContact(contactId)
            .then(contactCategories => {
                const copy = new Set(chosenCategories)
                contactCategories.map(category => {
                        copy.add(category.userCategoryId)
                    })
                    setChosenCategories(copy)
            })
        },
        [] 
    )

    const loadUserCategories = () => {
        getUserCategories(connectUserObject.id)
                .then((categoryArray) => {
                    setCategories(categoryArray)
                }) 
    }

    useEffect(
        () => {
            loadUserCategories()
        },
        [] 
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        editContact(contact)
            .then(() => {
                navigate(`/contacts/${contact.id}`)
            })
    }

    return <>
        <form className="contactForm">
            <h2 className="contactForm__title">Edit Contact</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="contactFirstName">First name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder={contact?.firstName}
                        value={contact?.firstName}
                        onChange={
                            (evt) => {
                                const copy = { ...contact }
                                copy.firstName = evt.target.value
                                updateContact(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="contactLastName">Last name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder={contact?.lastName}
                        value={contact?.lastName}
                        onChange={
                            (evt) => {
                                const copy = { ...contact }
                                copy.lastName = evt.target.value
                                updateContact(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="contactMetAt">Met at:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder={contact?.metAt}
                        value={contact?.metAt}
                        onChange={
                            (evt) => {
                                const copy = { ...contact }
                                copy.metAt = evt.target.value
                                updateContact(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="contactEmail">Contact email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder={contact?.email}
                        value={contact?.email}
                        onChange={
                            (evt) => {
                                const copy = { ...contact }
                                copy.email = evt.target.value
                                updateContact(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="contactPhone">Phone:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder={contact?.phone}
                        value={contact?.phone}
                        onChange={
                            (evt) => {
                                const copy = { ...contact }
                                copy.phone = evt.target.value
                                updateContact(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="contactSocials">Socials:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder={contact?.socials}
                        value={contact?.socials}
                        onChange={
                            (evt) => {
                                const copy = { ...contact }
                                copy.socials = evt.target.value
                                updateContact(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="contactBirthday">Birthday:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder={contact?.birthday}
                        value={contact?.birthday}
                        onChange={
                            (evt) => {
                                const copy = { ...contact }
                                copy.birthday = evt.target.value
                                updateContact(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="contactNotes">Notes:</label>
                    <textarea
                        required autoFocus
                        rows={5}
                        className="form-control"
                        placeholder={contact?.notes}
                        value={contact?.notes}
                        onChange={
                            (evt) => {
                                const copy = { ...contact }
                                copy.notes = evt.target.value
                                updateContact(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                {
                categories.map(
                    (category) => {
                        return <>
                        <input key={`category--${category.id}`}
                        
                        checked = {chosenCategories?.has(category.id) ? true : false} 
                        onChange={
                            (evt) => {
                                const copy = new Set(chosenCategories)
                                const id = evt.target.id
                                if (evt.target.checked) {
                                    copy.add(parseInt(id))
                                } else {
                                    copy.delete(parseInt(id))
                                }
                                setChosenCategories(copy)
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
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => {
                    handleSaveButtonClick(clickEvent)
                }}
                className="btn btn-primary">
                Save Contact
            </button>
        </form>
    </>
}