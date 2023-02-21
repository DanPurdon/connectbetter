import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getContact, editContact, getUserCategories, getContactCategoriesByContact, getUserCustomFields, getONLYCustomFieldsByContact } from "../APIManager"

export const ContactEdit = () => {
    const { contactId } = useParams()
    const [contact, updateContact] = useState()
    const [categories, setCategories] = useState([])
    const [chosenCategories, setChosenCategories] = useState([])
    const [userFields, setUserFields] = useState([])
    const [userFieldContents, setUserFieldContents] = useState([])

    const [feedback, setFeedback] = useState("")

    const navigate = useNavigate()
    const localConnectUser = localStorage.getItem("connect_user")
    const connectUserObject = JSON.parse(localConnectUser)
    
    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])
    
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
            getUserCustomFields(connectUserObject.id)
            .then(data => setUserFields(data.map(obj => ({...obj, content: ""}))))
        },
        [] 
    )

    useEffect(
        () => {
            getONLYCustomFieldsByContact(contactId)
            .then(data => setUserFieldContents(data))
        },
        [] 
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

        editContact(contact, chosenCategories, userFieldContents)
            .then(() => {
                setFeedback("Employee profile successfully saved")
                setTimeout(() => navigate(`/contacts/${contact.id}`), 100)
            })
    }

    const handleCheckboxes = (category) => {
        if (chosenCategories.has(category.id)) {
            return true
        } else {
            return false
        } 
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
                    <label htmlFor="contactCity">City:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder={contact?.city}
                        value={contact?.city}
                        onChange={
                            (evt) => {
                                const copy = { ...contact }
                                copy.city = evt.target.value
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
           
           {
                userFields?.map(
                    (userField) => {
                        const preexistingMatch = userFieldContents.find(field => field?.userCustomFieldId === userField.id)
                        return <>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor={userField.name}>{userField.name}:</label>
                                <input key={`userField--${userField.id}`} 
                                type={userField.type.toLowerCase()} 
                                required autoFocus
                                className="form-control"
                                placeholder={userField.name}
                                value={preexistingMatch ? preexistingMatch.content : ""}
                                onChange={
                                    (evt) => {
                                        let copy = userFieldContents.map(field => ({...field}))
                                        const match = copy.filter(field => userField.id===parseInt(field.userCustomFieldId))
                                        if (match.length > 0) {
                                            const index = copy.indexOf(match[0])
                                            copy[index].content = evt.target.value
                                            setUserFieldContents(copy)
                                        } else {
                                            let newUserFieldContent = {
                                                userCustomFieldId: parseInt(`${userField.id}`),
                                                content: evt.target.value,
                                                contactId: contactId
                                            }
                                            copy.push(newUserFieldContent)
                                            setUserFieldContents(copy)
                                        }
                                    }
                                } />
                            </div>
                        </fieldset>
                        </>
                    }
                    )
                }    

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
                        
                        checked = {handleCheckboxes(category)}
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
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
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