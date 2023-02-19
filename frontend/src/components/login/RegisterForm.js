import { Form, Formik } from 'formik'

import React, { useState } from 'react'

import RegisterInput from '../input/registerInput'

const userInfos = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: "",
  bMonth: "",
  bDay: "",
  gender: "",
};

function RegisterForm() {
  const [user, setUser] = useState();

  const handleRegisterChange = (e) => {
    const {name, value} = e.target;
    setUser({ ...user, [name]:value })
  }

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>It's quick axnd easy</span>
        </div>

        <Formik>
          <Form className='register_form'>
            <div className="reg_line">
              <RegisterInput type="text" placeholder="First name" name='first_name' onChange={handleRegisterChange}/>
              <RegisterInput type="text" placeholder="Surname" name='last_name' onChange={handleRegisterChange}/>
            </div>
            <div className="reg_line">
              <RegisterInput type="text" placeholder="Mobile number or email address" name='email' onChange={handleRegisterChange}/>
              <RegisterInput type="password" placeholder="New Password" name='password' onChange={handleRegisterChange}/>
            </div>

            <div className="reg_col">
              <div className="reg_line_header">
                Date of birth <i className="info_icon"></i>
              </div>

              <div className="reg_grid">
                <select name="bDay"></select>
                <select name="bMonth"></select>
                <select name="bYear"></select>
              </div>
            </div>

            <div className="reg_col">
              <div className="reg_line_header">
                Gender <i className="info_icon"></i>
              </div>

              <div className="reg_grid">
                <label htmlFor="male">
                  Male
                  <input type="radio" name='gender' id='male' value='male' onChange={handleRegisterChange}/>
                </label>

                <label htmlFor="female">
                  Female
                  <input type="radio" name='gender' id='female' value='female' onChange={handleRegisterChange}/>
                </label>

                <label htmlFor="custom">
                  Custom
                  <input type="radio" name='gender' id='custom' value='custom' onChange={handleRegisterChange}/>
                </label>
              </div>
            </div>

            <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">Sign Up</button>
              </div>

          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default RegisterForm