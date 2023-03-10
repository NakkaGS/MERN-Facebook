import React, { useState } from 'react'

//Formik Forms
import { Form, Formik } from 'formik'

//Redux
import { useDispatch } from 'react-redux'

//Router-Dom
import { useNavigate } from 'react-router-dom'

//Axios
import axios from 'axios'

//Cookies
import Cookies from 'js-cookie'

//Validation
import * as Yup from "yup"

//React Spinners
import DotLoader from "react-spinners/DotLoader";

//Special Input
import RegisterInput from '../input/registerInput'

//Components
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';

export default function RegisterForm({setVisible}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth()+1,
    bDay: new Date().getDate(),
    gender: "",
  };

  const [user, setUser] = useState(userInfos);

  const [dateError, setDateError] = useState("")
  const [genderError, setGenderError] = useState("")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const {
    first_name, 
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender, 
  } = user;

  const yearTemp = new Date().getFullYear()

  const years = Array.from(new Array(108), (val, index) => yearTemp - index)
  const months = Array.from(new Array(12), (val, index) => 1 + index)

  const getDays = () => {
  return new Date(bYear,bMonth,0).getDate()
  }

  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const registerValidation=Yup.object({
    first_name: Yup.string().required("What's your first name")
    .min(2, 'First name must be betweeen 2 and 16 characters.')
    .max(16, 'First name must be betweeen 2 and 16 characters.')
    .matches(/^[aA-zA\s]+$/, 'Numbers and special characters are not allowed'),

    last_name: Yup.string().required("What's your last name")
    .min(2, 'First name must be betweeen 2 and 16 characters.')
    .max(16, 'First name must be betweeen 2 and 16 characters.')
    .matches(/^[aA-zA\s]+$/, 'Numbers and special characters are not allowed'),

    email:Yup.string().required("You'll need this when you log in and if you ever need to reset your password")
    .email("Enter a valid email address"),

    password: Yup.string().required("Enter a combination of at least six numbers, letters and ponctuation marks (such as ! and &)")
    .min(6, 'Password must be betweeen 2 and 16 characters.')
    .max(36, "Password can't be more than 16 characters.")

  })

  const handleRegisterChange = (e) => {
    const {name, value} = e.target;
    setUser({ ...user, [name]:value })
  }

  const registerSubmit = async() => {
    try {
      const {data} = await axios.post(`http://localhost:8000/register`,
      {
        first_name, 
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender, 
      })
      
      setError("")
      setSuccess(data.message)

      const{message, ...rest} = data

      setTimeout(()=>{
          dispatch({type: "LOGIN", payload: rest})
          Cookies.set("user", JSON.stringify(rest))
          navigate("/")
      }, 2000)

    } catch (error) {
      setLoading(false)
      setSuccess("")
      setError(error.response.data.message)
    }
  }

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>It's quick axnd easy</span>
        </div>

        <Formik
        enableReinitialize

        initialValues={{
          first_name, 
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender, 
        }}

        validationSchema={registerValidation}

        onSubmit={() => {
          let current_date = new Date();
          let picked_date = new Date(bYear, bMonth - 1, bDay); //in java script month starts in 0 (january)
          let atLeast14 = new Date(1970 + 14, 0, 1)
          let noMoreThan70 = new Date(1970 + 70, 0, 1)

          if (current_date - picked_date < atLeast14){
            setDateError("It looks like you have entered the wrong info. Please make sure that you use your real date of birth.")
          } else if (current_date- picked_date > noMoreThan70) {
            setDateError("It looks like you have entered the wrong info. Please make sure that you use your real date of birth.")
          } else if (gender === ""){ 
            setGenderError("Please choose a gender. You can change who can see this later")
          } else {
            setDateError("")
            setGenderError("")
            registerSubmit()
          }

        }}>

          <Form className='register_form'>

            <div className="reg_line">
              <RegisterInput type="text" placeholder="First name" name='first_name' onChange={handleRegisterChange}/>

              <RegisterInput type="text" placeholder="Surname" name='last_name' onChange={handleRegisterChange}/>
            </div>

            <div className="reg_line">
              <RegisterInput type="text" placeholder="Mobile number or email address" name='email' onChange={handleRegisterChange}/>
            </div>

            <div className="reg_line">
              <RegisterInput type="password" placeholder="New Password" name='password' onChange={handleRegisterChange}/>
            </div>

            <div className="reg_col">
              <div className="reg_line_header">
                Date of birth <i className="info_icon"></i>
              </div>

              <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />

            </div>

            <div className="reg_col">
              <div className="reg_line_header">
                Gender <i className="info_icon"></i>
              </div>

              <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />

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
              <DotLoader
                color="#1876f2"
                loading={loading}
                size={30}
              />
              {error && <dir className="error_text">{error}</dir>}
              {success && <dir className="success_text">{success}</dir>}

          </Form>
        </Formik>
      </div>
    </div>
  )
}