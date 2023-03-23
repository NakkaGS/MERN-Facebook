//Router Dom
import { Link, useNavigate } from "react-router-dom"

//Formik
import { Form, Formik } from 'formik'

// Components
import LoginInput from "../../components/input/loginInput"

export default function ChangePassword({ password, setPassword, conf_password, setConf_password, error}) {
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
            >
            {(formik) => (
                <Form>
                <LoginInput
                    type="text"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                />
                <LoginInput
                    type="text"
                    name="conf_password"
                    onChange={(e) => setConf_password(e.target.value)}
                    placeholder="Confirm new password"
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
