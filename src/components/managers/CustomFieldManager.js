export const getUserCustomFields = () => {
    return fetch("http://localhost:8000/fields", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("connect_token")}`
        }
    })
        .then(response => response.json())
}

// export const getContactDetails = (contactId) => {
//     return fetch(`http://localhost:8000/contacts/${contactId}`, {
//         headers:{
//             "Authorization": `Token ${localStorage.getItem("connect_token")}`
//         }
//     })
//         .then(response => response.json())
// }

// export const deleteContact = (contactId) => {
//     return fetch(`http://localhost:8000/contacts/${contactId}`, {
//         method: "DELETE",
//         headers: {"Authorization": `Token ${localStorage.getItem("connect_token")}`}
//     })
// }
