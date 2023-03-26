//Router Dom
import { Link, useNavigate } from "react-router-dom"

//Formik
import { Form, Formik } from 'formik'

//Yup
import * as Yup from "yup"

// Components
import LoginInput from "../../components/input/loginInput"

export default function CodeVerification({ code, setCode, error}) {

    const validateCode = Yup.object ({
        code: Yup.string()
            .required("Code is required")
            .min("5", "Code must be 5 characters.")
            .max("25", "Code must be 25 characters.")
    })
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
            validationSchema={validateCode}
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
