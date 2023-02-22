import React, { useState } from 'react'

// Formik Forms
import { Formik, Form } from 'formik'

//Redux
import { useDispatch } from 'react-redux'

//Router-Dom
import { useNavigate, Link } from 'react-router-dom'

//Axios
import axios from 'axios'

//Cookies
import Cookies from 'js-cookie'

//Validation
import * as Yup from "yup"

//React Spinners
import DotLoader from "react-spinners/DotLoader";

// Components
import LoginInput from '../../components/input/loginInput'

const loginInfos = {
  email: "",
  password: ""
}

function LoginForm({setVisible}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const[login, setLogin] = useState(loginInfos);
    const{ email, password } = login

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
  
    const handleLoginChange = (e) => {
      const {name, value} = e.target
      setLogin({...login,[name]:value})
    }
  
    const loginValidation = Yup.object({
      email: Yup.string().required('Email address is required').email('Must be a valid email').max(100),
      password: Yup.string().required('Password is required'),
    })

    const loginSubmit = async() => {
        try {
            const {data} = await axios.post(`http://localhost:8000/login`, {
                email,
                password,
            })

            setError("")
      
            dispatch({type: "LOGIN", payload: data})
            Cookies.set("user", JSON.stringify(data))
            navigate("/")

        } catch (error) {
            setLoading(false)
            setError(error.response.data.message)
        }
    }

    return (
        <div className="login_wrap">
        <div className="login_1">
            <img src="../../icons/facebook.svg" alt="" />
            <span>
            Facebook helps you connect and share with the people in your life
            </span>
        </div>
        <div className="login_2">
            <div className="login_2_wrap">
            <Formik
                enableReinitialize
                initialValues={{
                email,
                password,
                }}
                validationSchema={loginValidation}
                onSubmit={() => loginSubmit()}>
                
                {
                <Form>
                    <LoginInput
                    type="text"
                    name="email"
                    placeholder="Email address or Phone number"
                    onChange={handleLoginChange}
                    />
                    <LoginInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleLoginChange}
                    bottom
                    />
                    <button type="submit" className="blue_btn">
                    Log In
                    </button>
                </Form>
                }
            </Formik>
            <Link to="/forgot" className="forgot_password">
                Forgotten password?
            </Link>
            {error && <dir className="error_text">{error}</dir>}
            <div className="sign_slitter"></div>
            <button className="blue_btn open_signup" onClick={() => setVisible(true)}>Create Account</button>
            </div>
            <Link to="/" className="sign_extra">
            <b>Create a Page</b> for a celebrity, brand or business
            </Link>
        </div>
        </div>
    );
}

export default LoginForm;
