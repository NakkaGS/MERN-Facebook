//Router Dom
import { Link, useNavigate } from "react-router-dom"

//Formik
import { Form, Formik } from 'formik'

// Components
import LoginInput from "../../components/input/loginInput"

export default function CodeVerification({ code, setCode, error}) {
    return (
        <div className="reset_form">
            <div className="reset_form_header">Code Verification</div>
            <div className="reset_form_text">
            Please enter code that been sent to your email.
            </div>
            <Formik
            enableReinitialize
            initialValues={{
                code,
            }}
            >
            {(formik) => (
                <Form>
                <LoginInput
                    type="text"
                    name="code"
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Code"
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
