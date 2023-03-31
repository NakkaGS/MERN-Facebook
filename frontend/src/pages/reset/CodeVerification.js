//Router Dom
import { Link, useNavigate } from "react-router-dom"

//Formik
import { Form, Formik } from 'formik'

//Yup
import * as Yup from "yup"

// Components
import LoginInput from "../../components/input/loginInput"

//Axios
import axios from "axios";

export default function CodeVerification({ 
    code, 
    setCode, 
    error,
    setError,
    loading,
    setLoading,
    userInfo,
    setVisible
}) {
    const { email } = userInfo

    const verifyCode = async() => {
        try {
            setLoading(true)
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
                { email, code }
            )
            setError("")
            setVisible(3)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.response.data.message)
        }
    }

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
            onSubmit={() => {
                verifyCode()
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
