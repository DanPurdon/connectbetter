import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUserCustomFields, addCustomField, deleteCustomField, editCustomField } from "../managers/CustomFieldManager"
import "./CustomFields.css"

export const CustomFieldList = () => {
    const [customFields, setCustomFields] = useState([])
    const [newCustomField, setNewCustomField] = useState({
        name: "",
        type: "1"
    })
    const [editing, setEditing] = useState({
        editing: false,
        customFieldId: null,
        name: "",
        type: ""
    })
    const [typeOption, setType] = useState(
        "1"
    )

    const navigate = useNavigate()

    const loadUserCustomFields = () => {
        getUserCustomFields()
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
                customFields?.map(
                    (customField) => {
                        if (editing .customFieldId === customField.id) {
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
                                    <button className="button-55" onClick={() => {
                                        editCustomField({
                                            userId: customField.userId,
                                            name: editing.name,
                                            type: customField.type.id,
                                            id: customField.id
                                        })
                                        .then(setEditing({editing: false, customFieldId: null, name: "", type: ""}))
                                        .then(setTimeout(loadUserCustomFields), 500)
                                        }}
                                        >Save</button>
                                </div>
                                </section> 
                        } else {
                            return <section className="customField" key={`customField--${customField.id}`}>
                                <div className="fieldDescriptions">Field Name: {customField?.name} <br></br>  Type: {customField.type.type}</div>
                                <div className="fieldButtons">
                                    <button className="button-55" onClick={() => {
                                        setEditing({editing: true, customFieldId: customField.id, name: customField.name, type: customField.type.id})
                                        loadUserCustomFields()
                                        }}
                                        >Edit</button>
                                    <button className="button-55" onClick={() => {
                                        confirmDelete(customField.id)
                                        
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
                        <option value="1">Text</option>
                        <option value="2">Date</option>
                        {/*Later feature? <option value="Boolean">Boolean (True/False)</option> */}
                    </select>
                </label>
            </div>
        <button 
                onClick={() => {
                    addCustomField(newCustomField)
                    setNewCustomField({name: "", type: "1"})
                    .then(setTimeout(loadUserCustomFields), 200)
                }}
                className="button-55">
                Save New Custom Field
            </button>
        </fieldset>

        </>
}

