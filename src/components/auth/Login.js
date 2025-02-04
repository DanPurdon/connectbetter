import React, { useState, useRef } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { loginUser } from "../managers/AuthManager"
import "./Login.css"

export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("connect_token", res.token)
                    navigate("/contacts")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>ConnectBetter</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username</label>
                        <input ref={username} type="username" id="username" className="form-control" placeholder="Username" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign: "center"
                    }}>
                        <button className="sign-in-btn" type="submit">Sign In</button>
                        <br></br><Link to="/register" className="register-link">Not a member yet?</Link>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}


// export const Login = () => {
//     const [email, set] = useState("")
//     const navigate = useNavigate()

//     const handleLogin = (e) => {
//         e.preventDefault()

//         return fetch(`http://localhost:8088/users?email=${email}`)
//             .then(res => res.json())
//             .then(foundUsers => {
//                 if (foundUsers.length === 1) {
//                     const user = foundUsers[0]
//                     localStorage.setItem("connect_user", JSON.stringify({
//                         id: user.id,
//                         firstName: user.firstName,
//                         lastName: user.lastName,
//                         email: user.email,
//                     }))

//                     navigate("/contacts")
//                 }
//                 else {
//                     window.alert("Invalid login")
//                 }
//             })
//     }

//     return (
//         <main className="container--login">
//             <section>
//                 <form className="form--login" onSubmit={handleLogin}>
//                     <h1>ConnectBetter</h1>
//                     <h2>Please sign in</h2>
//                     <fieldset>
//                         <label htmlFor="inputEmail"> Email address </label>
//                         <input type="email"
//                             value={email}
//                             onChange={evt => set(evt.target.value)}
//                             className="form-control"
//                             placeholder="Email address"
//                             required autoFocus />
//                     </fieldset>
//                     <fieldset>
//                         <button type="submit">
//                             Sign in
//                         </button>
//                     </fieldset>
//                 </form>
//             </section>
//             <section className="link--register">
//                 <Link to="/register">Not a member yet?</Link>
//             </section>
//         </main>
//     )
// }

