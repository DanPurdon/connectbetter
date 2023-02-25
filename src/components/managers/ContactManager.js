export const getUserContacts = () => {
    return fetch("http://localhost:8000/contacts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("connect_token")}`
        }
    })
        .then(response => response.json())
}