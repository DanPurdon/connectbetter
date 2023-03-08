export const getUserContacts = () => {
    return fetch("http://localhost:8000/contacts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("connect_token")}`
        }
    })
        .then(response => response.json())
}

export const getContactDetails = (contactId) => {
    return fetch(`http://localhost:8000/contacts/${contactId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("connect_token")}`
        }
    })
        .then(response => response.json())
}

export const deleteContact = (contactId) => {
    return fetch(`http://localhost:8000/contacts/${contactId}`, {
        method: "DELETE",
        headers: {"Authorization": `Token ${localStorage.getItem("connect_token")}`}
    })
}

export const createContact = (contactObject) => {
    return fetch("http://localhost:8000/contacts", { 
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("connect_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactObject)
    })
        .then(response => response.json())
}

export const editContact = (contactObject) => {
    return fetch(`http://localhost:8000/contacts/${contactObject.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("connect_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactObject)
    })
}