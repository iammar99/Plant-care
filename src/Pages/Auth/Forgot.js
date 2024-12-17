import React, { useState } from 'react'
import { Link } from 'react-router-dom'
//  -------------  FireBase - Authentication -------------
import { auth } from 'Config/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
//  -------------  Error Handling -------------
import { ToastContainer , toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


export default function Forgot() {

  const [state, setState] = useState({})
 
  const handleChange = (e) => { setState(s => ({ ...s, [e.target.name]: e.target.value })) }
  
  const handleRegister = (e) => {
    e.preventDefault()
    // ---------------------  Validation (Empty Fields) ---------------------
    if (!state.email ) {
      toast.error('Enter the Email')
    } 
    else {
      // ---------------------  FireBase (Authentication) ---------------------
      let { email } = state
      sendPasswordResetEmail (auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        toast.success("Link Sent")
      })
      .catch((error) => {
        toast.error("An Error Occured")
        // ..
      });
    }
  }
  return (
    <>
      <div className="form-container">
        <form className='reset'>
          <h1>
            Reset Password
          </h1>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name='email'
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <Link to={"/auth/register"} className="login-link">
              Not a User
            </Link>
            <button className="btn btn-secondary d-block ms-auto" onClick={handleRegister}>
              Send Link
            </button>
          </div>
        </form>

      </div>
      <ToastContainer/>
    </>
  )
}
