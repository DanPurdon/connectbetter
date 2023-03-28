export const getUserCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("connect_token")}`
        }
    })
        .then(response => response.json())
}

export const deleteCategory = (categoryId) => {
    return fetch(`http://localhost:8000/categories/${categoryId}`, {
        method: "DELETE",
        headers: {"Authorization": `Token ${localStorage.getItem("connect_token")}`}
    })
}

export const addCategory = (categoryObject) => {
    return fetch("http://localhost:8000/categories", { 
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("connect_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoryObject)
    })
        .then(response => response.json())
}

export const editCategory = (categoryObject) => {
    return fetch(`http://localhost:8000/categories/${categoryObject.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("connect_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoryObject)
    })
}