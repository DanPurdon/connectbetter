import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { addCustomField, deleteCustomField, editCustomField, getUserCustomFields } from "../APIManager"
import "./CustomFields.css"

export const CustomFieldList = () => {
    const localConnectUser = localStorage.getItem("connect_user")
    const connectUserObject = JSON.parse(localConnectUser)
    const [customFields, setCustomFields] = useState([])
    const [newCustomField, setNewCustomField] = useState({
        userId: connectUserObject.id,
        name: "",
        type:"Text"
    })
    const [editing, setEditing] = useState({
        editing: false,
        customFieldId: null,
        name: "",
        type: ""
    })
    const [typeOption, setType] = useState({
        type: ""
    })

    const navigate = useNavigate()

    const loadUserCustomFields = () => {
        getUserCustomFields(connectUserObject.id)
                .then((customFieldArray) => {
                    setCustomFields(customFieldArray)
                }) 
    }

    useEffect(
        () => {
            loadUserCustomFields()
        },
        [] 
    )
   
    const customFieldSetter = (property, value) => {
        const copy = { ...newCustomField }
        copy[property] = value
        setNewCustomField(copy)
    }
  
    const confirmDelete = (customField) => {
        let check = window.confirm("This will delete ALL content associated with this custom field! Proceed?")
        if (check) {  
        deleteCustomField(customField)
            .then(loadUserCustomFields)
        } 
    }

    return <>

            

        <h2>List of Custom Fields</h2>

        <article className="customFields">
            {
                customFields.map(
                    (customField) => {
                        if (editing.customFieldId === customField.id) {
                            return <section className="customField" key={`customField--${customField.id}`}>
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
                                        editCustomField({
                                            userId: customField.userId,
                                            name: editing.name,
                                            type: customField.type,
                                            id: customField.id
                                        })
                                        .then(setEditing({editing: false, customFieldId: null, name: "", type: ""}))
                                        .then(setTimeout(loadUserCustomFields), 100)
                                        }}
                                        >Save</button>
                                </div>
                                </section> 
                        } else {
                            return <section className="customField" key={`customField--${customField.id}`}>
                                <div className="fieldDescriptions">Field Name: {customField?.name} <br></br>  Type: {customField.type}</div>
                                <div className="fieldButtons">
                                    <button onClick={() => {
                                        setEditing({editing: true, customFieldId: customField.id, name: customField.name, type: customField.type})
                                        loadUserCustomFields()
                                        }}
                                        >Edit</button>
                                    <button onClick={() => {
                                        confirmDelete(customField)
                                        // deleteCustomField(customField)
                                        // .then(loadUserCustomFields)
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
                    placeholder="Add New Custom Field"
                    value={newCustomField?.name}
                    onChange={
                        (evt) => {
                            customFieldSetter("name", evt.target.value)
                        }
                    } />
            </div>
            <div className="fieldTypeDropdown">
                <label>
                    Field Type:
                    <select value={typeOption} onChange={(event) => {
                        setType(event.target.value)
                        customFieldSetter("type", event.target.value)
                        }}>
                        <option value="Text">Text</option>
                        <option value="Date">Date</option>
                        {/*Later feature? <option value="Boolean">Boolean (True/False)</option> */}
                    </select>
                </label>
            </div>
        <button 
                onClick={() => {
                    addCustomField(newCustomField)
                    .then(setTimeout(loadUserCustomFields), 100)
                }}
            className="btn btn-primary">
                Save New Custom Field
            </button>
        </fieldset>

        </>
}

