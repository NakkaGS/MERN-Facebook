//Router Dom
import { Link, useNavigate } from "react-router-dom"

//Formik
import { Form, Formik } from 'formik'

//Yup
import * as Yup from "yup"

// Components
import LoginInput from "../../components/input/loginInput"

export default function SearchAccount({ email, setEmail, error}) {
    const validateEmail= Yup.object({
        email: Yup.string()
        .required("Email addres is required")
        .email("Must be a valid email address")
        .max(50, "Email address can't be more than 50 characters")
    });
    
    return (
        <div className="reset_form">
            <div className="reset_form_header">Find Your Account</div>
            <div className="reset_form_text">
            Please enter your email address or mobile number to search for your
            account.
            </div>
            <Formik
            enableReinitialize
            initialValues={{
                email,
            }}
            validationSchema={validateEmail}
            >
            {(formik) => (
                <Form>
                <LoginInput
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address or phone number"
                />
                {error && <div className="error_text">{error}</div>}
                <div className="reset_form_btns">
                    <Link to="/login" className="gray_btn">
                    Cancel
                    </Link>
                    <button type="submit" className="blue_btn">
                    Search
                    </button>
                </div>
                </Form>
            )}
            </Formik>
        </div>
    )
}
