
export const getAllContacts = () => {
    return fetch(`http://localhost:8088/contacts`)
        .then(response => response.json())
}

export const getContact = (contactId) => {
    return fetch(`http://localhost:8088/contacts/${contactId}`)
        .then(response => response.json())
}

export const getUserContacts = (userId) => {
    return fetch(`http://localhost:8088/contacts?_embed=contactCategories&userId=${userId}`)
        .then(response => response.json())
}

export const getContactDetails = (contactId) => {
    return fetch(`http://localhost:8088/contacts?_embed=contactCategories&_expand=user&id=${contactId}`)
        .then(response => response.json())
}

export const editContact = (contactObject, categoryNumberSet) => {
    return fetch(`http://localhost:8088/contacts/${contactObject.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactObject)
    })
        .then(response => response.json())
        .then(editedContact => {
            // Get selected category numbers from newly edited contact
            const userCategoryNumberArray = Array.from(categoryNumberSet)

            // Get access to preexisting categories on the contact
            getContactDetails(contactObject.id)
            .then(matchedContactArray => {
                const preexistingCategoriesArray = matchedContactArray[0].contactCategories

                // compare-- any new additions must be posted. Any unselected options must be deleted.
                for (const categoryNumber of userCategoryNumberArray) {
                    if (preexistingCategoriesArray?.filter(categoryObject => categoryObject.userCategoryId === categoryNumber).length === 0) {
                        fetch(`http://localhost:8088/contactCategories`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                contactId: editedContact.id,
                                userCategoryId: categoryNumber
                            })
                        })
                            .then(response => response.json())
                    }
                }
                
                for (const categoryObject of preexistingCategoriesArray) {
                    if (userCategoryNumberArray?.filter(categoryNumber => categoryObject.userCategoryId === categoryNumber).length === 0) {
                        fetch(`http://localhost:8088/contactCategories/${categoryObject.id}`, {
                            method: "DELETE"
                        })
                            .then(response => response.json())
                    }
                }
            })    

        })
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

export const getUserCategoryById = (userCategoryId) => {
    return fetch(`http://localhost:8088/userCategories?id=${userCategoryId}`)
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


export const getUserCustomFields = (userId) => {
    return fetch(`http://localhost:8088/userCustomFields?_expand=user&userId=${userId}`)
        .then(response => response.json())
}

export const addCustomField = (customFieldObject) => {
    return fetch(`http://localhost:8088/userCustomFields`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customFieldObject)

    })
        .then(response => response.json())
}



export const deleteCustomField = (customFieldObject) => {
    return fetch(`http://localhost:8088/userCustomFields/${customFieldObject.id}`, {
        method: "DELETE"
    })
}

export const editCustomField = (customFieldObject) => {
    return fetch(`http://localhost:8088/userCustomFields/${customFieldObject.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customFieldObject)
    })
        .then(response => response.json())
}