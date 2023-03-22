import { useState } from "react"

//Styling
import "./style.css"

//Router Dom
import { Link, useNavigate } from "react-router-dom"

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Cookies
import Cookies from 'js-cookie'

//Formik
import { Form, Formik } from 'formik'

// Components
import LoginInput from "../../components/input/loginInput"

export default function Reset() {

    const { user } = useSelector((state) => ({...state}))

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(0)
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    const logout = () => {
        Cookies.set('user', "")
        dispatch({
            type: "LOGOUT",
        })
        navigate("/login")
    }

    return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user.picture} alt="" />
            </Link>
            <button
              className="blue_btn"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        <div className="reset_form">
          <div className="reset_form_header">Find Your Account</div>
          <div className="reset_form_text">
            Please enter your email address or mobile number to search for your
            account.
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address or phone number"
                />
                {error && <div className="error_text">{error}</div>}
                <div className="reset_form_btns">
                  <Link to="/login" className="gray_btn">
                    Cancel
                  </Link>
                  <button type="submit" className="blue_btn">
                    Search
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
    )
}
