
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

export const addContact = (contactObject, categoryNumberSet) => {
    return fetch(`http://localhost:8088/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactObject)

    })
        .then(response => response.json())
        .then(newContact => {
            const categoryNumberArray = Array.from(categoryNumberSet)

            for (const categoryNumber of categoryNumberArray) {
                fetch(`http://localhost:8088/contactCategories`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contactId: newContact.id,
                        userCategoryId: categoryNumber
                    })

                })
                    .then(response => response.json())
                }
            })
        }

export const deleteContact = (contactId) => {
    return fetch(`http://localhost:8088/contacts/${contactId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(() => {
        const contactCategories = getContactCategoriesByContact(contactId)
        if (contactCategories.length > 0) {
            for (const contactCategory of contactCategories) {
                return fetch(`http://localhost:8088/contactCategories/${contactCategory.id}`, {
                    method: "DELETE"
                })
                    .then(response => response.json())
                }
        }
    })

}

export const getUserCategories = (userId) => {
    return fetch(`http://localhost:8088/userCategories?userId=${userId}`)
        .then(response => response.json())
}

export const getContactCategoriesByContact = (contactId) => {
    return fetch(`http://localhost:8088/contactCategories?contactId=${contactId}`)
        .then(response => response.json())
}

export const getContactCategoriesByUserCategory = (userCategoryId) => {
    return fetch(`http://localhost:8088/contactCategories?userCategoryId=${userCategoryId}`)
        .then(response => response.json())
}

export const addCategory = (category) => {
    return fetch(`http://localhost:8088/userCategories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category)

    })
        .then(response => response.json())
}



export const deleteCategory = (categoryObject) => {
    return fetch(`http://localhost:8088/userCategories/${categoryObject.id}`, {
        method: "DELETE"
    })
    .then(() => {
        const associatedContactCategories = getContactCategoriesByUserCategory(categoryObject.userCategoryId)
        if (associatedContactCategories.length > 0) {
            for (const contactCategory of associatedContactCategories) {
                fetch(`http://localhost:8088/contactCategories/${contactCategory.id}`, {
                    method: "DELETE"
                })
                }
        }
    })
}
    


export const editCategory = (categoryObject) => {
    return fetch(`http://localhost:8088/userCategories/${categoryObject.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoryObject)
    })
        .then(response => response.json())
}