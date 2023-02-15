import './style.css'

import React from 'react'

import { Formik, Form, Field } from 'formik'

import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="" />
            <span>
              Facebook helps you connect and share with the people in your life
            </span>            
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik>
                {

                    <Form>
                      <input type="text" />
                      <input type="text" />
                      <button type='submit' className="blue_btn">Log In</button>
                    </Form>

                }
              </Formik>
              <Link to='/forgot' className='forgot_password'>Forgotten password?</Link>
              <div className="sign_slitter"></div>
              <button className="blue_btn open_signup">Create Account</button>
              
            </div>
            <Link to='/' className="sign_extra">
              <b>Create a Page</b>
              for a celebrity, brand or business
            </Link>
          </div>

        </div>

        <div className="register"></div>

      </div>
    </div>
  )
}

export default Login