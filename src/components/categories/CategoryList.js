import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { addCategory, getUserCategories } from "../APIManager"
import "./Categories.css"

export const CategoryList = () => {
    const localConnectUser = localStorage.getItem("connect_user")
    const connectUserObject = JSON.parse(localConnectUser)
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState({
        userId: connectUserObject.id,
        name: ""
    })
    const navigate = useNavigate()

    const loadUserCategories = () => {
        getUserCategories(connectUserObject.id)
                .then((categoryArray) => {
                    setCategories(categoryArray)
                }) 
    }

    useEffect(
        () => {
            loadUserCategories()
        },
        [] 
    )
   
    const setter = (property, value) => {
        const copy = { ...newCategory }
        copy[property] = value
        setNewCategory(copy)
    }

    return <>

            

        <h2>List of Categories</h2>

        <article className="categories">
            {
                categories.map(
                    (category) => {
                        return <section className="category" key={`category--${category.id}`}>
                            <div>{category?.name}</div>

                        </section>
                    }
                    )
                }    
            
        </article>
        <fieldset>
            <div className="form-group">
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Add New Category"
                    value={newCategory?.name}
                    onChange={
                        (evt) => {
                            setter("name", evt.target.value)
                        }
                    } />
            </div>
        <button 
                onClick={() => {
                    addCategory(newCategory)
                    .then(setter("name", ""))
                    .then(loadUserCategories)
                }}
            className="btn btn-primary">
                Save Category
            </button>
        </fieldset>

        </>
}