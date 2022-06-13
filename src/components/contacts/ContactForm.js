import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { newContact } from "../APIManager"


export const ContactForm = () => {
    const localConnectUser = localStorage.getItem("connect_user")
    const connectUserObject = JSON.parse(localConnectUser)
    const navigate = useNavigate()
    
    const [contact, updateContact] = useState({
        userId: connectUserObject.id,
        firstName: "",
        lastName: "",
        metAt: "",
        email: "",
        phone: "",
        socials: "",
        birthday: "",
        notes: "",
        dateCreated: new Date().toLocaleString("en-CA").slice(0,10)
    })


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        newContact(contact)
            .then((contact) => {
                navigate(`/contacts/${contact.id}`)
            })
    }

    return <>
        <form className="contactForm">
            <h2 className="contactForm__title">Create a New Contact</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="contactFirstName">First name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="First Name"
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
                        placeholder="Last Name"
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
                        placeholder="Where did you meet?"
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
                        placeholder="Email"
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
                        placeholder="Phone Number"
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
                        placeholder="Social Media Accounts"
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
                        placeholder="Birthday"
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
                        placeholder="Any other notes"
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
            {/* Add categories here
                <fieldset>
                <div className="form-group">
                {
                locations.map(
                    (location) => {
                        return <>
                        <input 
                        type="radio" 
                        name="contactLocation" 
                        id={location.address} 
                        value={location.id}
                        onChange={
                            (evt) => {
                                const copy = {...contact}
                                copy.locationId = parseInt(evt.target.value)
                                updateContact(copy)
                            }
                        }
                        />
                        <label htmlFor={location.address}>{location.address}</label>
                        </>
                    }
                )
            }    
                </div>
            </fieldset> */}
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