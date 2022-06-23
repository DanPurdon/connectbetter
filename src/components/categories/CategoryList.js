import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { addCategory, deleteCategory, editCategory, getUserCategories } from "../APIManager"
import "./Categories.css"

export const CategoryList = () => {
    const localConnectUser = localStorage.getItem("connect_user")
    const connectUserObject = JSON.parse(localConnectUser)
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState({
        userId: connectUserObject.id,
        name: ""
    })
    const [editing, setEditing] = useState({
        editing: false,
        categoryId: null,
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
   
    const categorySetter = (property, value) => {
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
                        if (editing.categoryId === category.id) {
                            return <section className="category" key={`category--${category.id}`}>
                                <div className="form-group">
                                    <input
                                        required autoFocus
                                        type="text"
                                        className="form-control"
                                        placeholder={editing?.name}
                                        value={editing?.name}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...editing }
                                                copy.name = evt.target.value
                                                setEditing(copy)
                                            }
                                        } />
                                    <button onClick={() => {
                                        editCategory({
                                            userId: category.userId,
                                            name: editing.name,
                                            id: category.id
                                        })
                                        .then(setEditing({editing: false, categoryId: null, name: ""}))
                                        .then(loadUserCategories)
                                        }}
                                        >Save</button>
                                </div>
                                </section> 
                        } else {
                            return <section className="category" key={`category--${category.id}`}>
                                <div>{category?.name}<br></br>
                                    <button className="button-55" onClick={() => {
                                        setEditing({editing: true, categoryId: category.id, name: category.name})
                                        loadUserCategories()
                                        }}
                                        >Edit</button>
                                    <button className="button-55" onClick={() => {
                                        deleteCategory(category)
                                        .then(loadUserCategories)
                                        }}
                                    >Delete</button>
                                </div>
                            </section>
                        }
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
                            categorySetter("name", evt.target.value)
                        }
                    } />
            </div>
        <button 
                onClick={() => {
                    addCategory(newCategory)
                    .then(categorySetter("name", ""))
                    .then(loadUserCategories)
                }}
                className="button-55">
                Save Category
            </button>
        </fieldset>

        </>
}