export const getUserCustomFields = () => {
    return fetch("http://localhost:8000/fields", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("connect_token")}`
        }
    })
        .then(response => response.json())
}

export const deleteCustomField = (customFieldId) => {
    return fetch(`http://localhost:8000/fields/${customFieldId}`, {
        method: "DELETE",
        headers: {"Authorization": `Token ${localStorage.getItem("connect_token")}`}
    })
}

export const addCustomField = (customFieldObject) => {
    return fetch("http://localhost:8000/fields", { 
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("connect_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customFieldObject)
    })
        .then(response => response.json())
}

export const editCustomField = (customFieldObject) => {
    return fetch(`http://localhost:8000/fields/${customFieldObject.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("connect_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customFieldObject)
    })
}