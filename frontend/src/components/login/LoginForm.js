import React, { useState } from 'react'

//React Router
import { Link } from 'react-router-dom'

//Validation
import * as Yup from "yup"

// Formik Forms
import { Formik, Form } from 'formik'

// Components
import LoginInput from '../../components/input/loginInput'

const loginInfos = {
  email: "",
  password: ""
}

function LoginForm() {
    const[login, setLogin] = useState(loginInfos);
    const{ email, password } = login
  
    const handleLoginChange = (e) => {
      const {name, value} = e.target
      setLogin({...login,[name]:value})
    }
  
    const loginValidation = Yup.object({
      email: Yup.string().required('Email address is required').email('Must be a valid email').max(100),
      password: Yup.string().required('Password is required'),
    })

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
                validationSchema={loginValidation}>
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
            <div className="sign_slitter"></div>
            <button className="blue_btn open_signup">Create Account</button>
            </div>
            <Link to="/" className="sign_extra">
            <b>Create a Page</b> for a celebrity, brand or business
            </Link>
        </div>
        </div>
    );
}

export default LoginForm;
