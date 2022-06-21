import { Outlet, Route, Routes } from "react-router-dom"
import { CategoryList } from "../categories/CategoryList"
import { ContactContainer } from "../contacts/ContactContainer"
import { ContactForm } from "../contacts/ContactForm"
import { ContactEdit } from "../contacts/ContactEdit"
import { ContactDetails } from "../contacts/ContactDetails"
import { CustomFieldList } from "../fields/CustomFieldList"


export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    {/* <h1>ConnectBetter</h1>
                    <h2>Your Memory Extender</h2> */}
                    <Outlet />
                </>
            }>

                <Route path="categories" element={ <CategoryList /> } />
                <Route path="contacts" element={ <ContactContainer /> } />
				<Route path="contacts/create" element={ <ContactForm /> } />
				<Route path="contacts/:contactId/edit" element={ <ContactEdit /> } />
                <Route path="contacts/:contactId" element={<ContactDetails/>} />
                <Route path="customFields" element={ <CustomFieldList /> } />
            </Route>
        </Routes>
    )
}