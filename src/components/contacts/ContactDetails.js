import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getContactDetails, deleteContact } from "../managers/ContactManager"
import { useNavigate } from "react-router-dom"

export const ContactDetails = () => {
    const {contactId} = useParams()
    const [contact, updateContact] = useState()
    const [allCategories, updateCategories] = useState()

    const localConnectUser = localStorage.getItem("connect_token")

    useEffect(
        () => {
            getContactDetails(contactId)
                .then((data) => {
                    updateContact(data)
                })
        },
        [contactId]
    )

    const navigate = useNavigate()

    return <section className="contact">
            <header>{contact?.first_name} {contact?.last_name ? `${contact?.last_name}` : ""}</header>
            <div>{contact?.metAt ? `Met at: ${contact?.metAt}` : ""}</div>
            <div>{contact?.city ? `City: ${contact?.city}` : ""}</div>
            <div>{contact?.email ? `Email: ${contact?.email}` : ""}</div>
            <div>{contact?.phone ? `Phone: ${contact?.phone}` : ""}</div>
            <div>{contact?.socials ? `Socials: ${contact?.socials}` : ""}</div>
            <div>{contact?.birthday ? `Birthday: ${contact?.birthday}` : ""}</div>
            <div>{contact?.notes ? `Notes: ${contact?.notes}` : ""}</div>
            {contact?.field_content?.map(field => {
                return <div>{field?.user_custom_field?.name}: {field.content}</div>
            })}
            <div className="categoriesOutputContainer">
            {contact?.categories?.map(contactCategory => {
                return <div className="categoryOutput">{contactCategory.name}</div>
            })}
            </div>

            <button 
                onClick={() => {
                    
                    navigate(`/contacts/${contact.id}/edit`)
                }}
            className="button-55">
                Edit contact
            </button>
            <button 
                onClick={() => {
                    deleteContact(contactId)
                    .then(window.alert("Contact Deleted"))
                    .then(navigate(`/contacts`))
                }}
            className="button-55">
                DELETE contact
            </button>
        </section>
}