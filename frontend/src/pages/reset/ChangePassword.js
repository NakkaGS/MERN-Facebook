//Router Dom
import { Link, useNavigate } from "react-router-dom"

//Formik
import { Form, Formik } from 'formik'

//Yup
import * as Yup from "yup"

// Components
import LoginInput from "../../components/input/loginInput"

export default function ChangePassword({ password, setPassword, conf_password, setConf_password, error}) {
    
    const validatePassword = Yup.object({
        password: Yup.string()
        .required("Enter a combination of at least six numbers, letters and ponctuation marks (such as ! and &)")
        .min(6, 'Password must be betweeen 2 and 16 characters.')
        .max(36, "Password can't be more than 16 characters."),

        conf_password: Yup.string()
        .required("Confirm your password.")
        .oneOf([Yup.ref('password')], "Passwords must match")
    })
    
    return (
        <div className="reset_form" style={{height:"310px"}}>
            <div className="reset_form_header">Change Password</div>
            <div className="reset_form_text">
            Pick a strong password.
            </div>
            <Formik
            enableReinitialize
            initialValues={{
                password,
                conf_password,
            }}
            validationSchema={validatePassword}
            >
            {(formik) => (
                <Form>
                <LoginInput
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                />
                <LoginInput
                    type="password"
                    name="conf_password"
                    onChange={(e) => setConf_password(e.target.value)}
                    placeholder="Confirm new password"
                    bottom
                />
                {error && <div className="error_text">{error}</div>}
                <div className="reset_form_btns">
                    <Link to="/login" className="gray_btn">
                    Cancel
                    </Link>
                    <button type="submit" className="blue_btn">
                    Continue
                    </button>
                </div>
                </Form>
            )}
            </Formik>
        </div>
    )
}
