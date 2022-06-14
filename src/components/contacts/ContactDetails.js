import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { deleteContact, getContactDetails } from "../APIManager"
import { useNavigate } from "react-router-dom"


export const ContactDetails = () => {
    const {contactId} = useParams()
    const [contact, updateContact] = useState()


    useEffect(
        () => {
            getContactDetails(contactId)
                .then((data) => {
                    const singleContact = data[0]
                    updateContact(singleContact)
                }) 
        },
        [contactId]
    )

    const navigate = useNavigate()
    
    return <section className="contact">
            <header>{contact?.firstName} {contact?.lastName ? `${contact?.lastName}` : ""}</header>
            <div>{contact?.metAt ? `Met at: ${contact?.metAt}` : ""}</div>
            <div>{contact?.email ? `Email: ${contact?.email}` : ""}</div>
            <div>{contact?.phone ? `Phone: ${contact?.phone}` : ""}</div>
            <div>{contact?.socials ? `Socials: ${contact?.socials}` : ""}</div>
            <div>{contact?.birthday ? `Birthday: ${contact?.birthday}` : ""}</div>
            <div>{contact?.notes ? `Notes: ${contact?.notes}` : ""}</div>
            {/* Add category listout */}

            <button 
                onClick={() => {
                    
                    navigate(`/contacts/${contact.id}/edit`)
                }}
            className="btn btn-primary">
                Edit contact
            </button>
            <button 
                onClick={() => {
                    deleteContact(contactId)
                    .then(window.alert("Contact Deleted"))
                    .then(navigate(`/contacts`))
                }}
            className="btn btn-primary">
                DELETE contact
            </button>
        </section>
}