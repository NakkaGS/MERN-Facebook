//Styling
import "./style.css"

//Router Dom
import { Link, useNavigate } from "react-router-dom"

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Cookies
import Cookies from 'js-cookie'

export default function Reset() {

    const { user } = useSelector((state) => ({...state}))

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(0)

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
                        <button className="blue_btn" onClick={() => {
                            logout()
                        }}>Logout</button>
                    </div>
                ) : (
                    <Link to="/login" className="right_reset">
                        <button className="blue_btn">Login</button>
                    </Link>
                )}

            </div>
        </div>
    )
}
