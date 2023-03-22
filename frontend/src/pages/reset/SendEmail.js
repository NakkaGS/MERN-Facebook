//Router Dom
import { Link, useNavigate } from "react-router-dom"

//Formik
import { Form, Formik } from 'formik'

// Components
import LoginInput from "../../components/input/loginInput"

export default function SendEmail({ email, setEmail, error, user}) {
    return (
        <div className="reset_form dynamic_height">
            <div className="reset_form_header">Reset your Password</div>
            <div className="reset_grid">
                <div className="reset_left">
                    <div className="reset_form_text">
                        How do yu want to receive the code to reset your password?
                    </div>

                    <label htmlFor="email" className="hover1">
                        <input type="radio" name="" id="email" checked readOnly/>
                        <div className="label_col">
                            <span>Send code via email</span>
                            <span>email@email.com</span>
                        </div>
                    </label>
                </div>
                <div className="reset_right">
                    <img src={user?.picture} alt="" />
                    <span>email@email.com</span>
                    <span>Facebook user</span>
                </div>
            </div>
            <div className="reset_form_btns">
                    <Link to="/login" className="gray_btn">
                    Not you?
                    </Link>
                    <button type="submit" className="blue_btn">
                    Continue
                    </button>
                </div>
        </div>
    )
}
