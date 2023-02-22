import React, { useState } from 'react'

//Styling
import './style.css'

//Components
import LoginForm from '../../components/login/LoginForm'
import Footer from '../../components/login/Footer'
import RegisterForm from '../../components/login/RegisterForm'

function Login() {

  const [visible, setVisible] = useState(false)

  return (
    <div className="login">
      <div className="login_wrapper">

        <LoginForm setVisible={setVisible}/>

        {visible && <RegisterForm setVisible={setVisible}/>}

        <Footer/>

      </div>
    </div>
  )
}

export default Login