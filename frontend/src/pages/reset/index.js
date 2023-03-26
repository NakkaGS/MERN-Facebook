import { useState } from "react"

//Styling
import "./style.css"

//Router Dom
import { Link, useNavigate } from "react-router-dom"

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Cookies
import Cookies from 'js-cookie'
import SearchAccount from "./SearchAccount"
import SendEmail from "./SendEmail"
import CodeVerification from "./CodeVerification"

//Components
import Footer from "../../components/login/Footer"
import ChangePassword from "./ChangePassword"

export default function Reset() {

    const { user } = useSelector((state) => ({...state}))

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(3)
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    //Code Verification
    const [code, setCode] = useState("")

    //Change Password
    const [password, setPassword] = useState("")
    const [conf_password, setConf_password] = useState("")


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
        {visible === 0 && (
            <SearchAccount email={email} setEmail={setEmail} error={error}/>
        )}
        {visible === 1 && (
            <SendEmail user={user}/>
        )}
        {visible === 2 && (
            <CodeVerification code={code} setCode={setCode} error={error}/>
        )}
        {visible === 3 && (
          <ChangePassword password={password} setPassword={setPassword} conf_password={conf_password} setConf_password={setConf_password} error={error}/>
        )}

      </div>
      <Footer/>
    </div>
    )
}
