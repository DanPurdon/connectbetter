export const getAllContacts = () => {
    return fetch(`http://localhost:8088/contacts`)
    .then(response => response.json())
}

export const getContact = (contactId) => {
    return fetch(`http://localhost:8088/contacts/${contactId}`)
    .then(response => response.json())
}

export const getUserContacts = (userId) => {
    return fetch(`http://localhost:8088/contacts?userId=${userId}`)
    .then(response => response.json())
}

export const getContactDetails = (contactId) => {
    return fetch(`http://localhost:8088/contacts?_expand=user&id=${contactId}`)
        .then(response => response.json())
}

export const editContact = (contactObject) => {
    return fetch(`http://localhost:8088/contacts/${contactObject.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(contactObject)
                    })
                        .then(response => response.json())
}

export const newContact = (contactObject) => {
    return fetch(`http://localhost:8088/contacts`, {
                                    method: "POST",
                                    headers: {"Content-Type": "application/json"},
                                    body: JSON.stringify(contactObject)
                        
                                })
                                    .then(response => response.json())
}