import React, { useEffect, useState } from 'react'

//Styling
import './style.css'

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Components
import Header from '../../components/header/'
import LeftHome from '../../components/home/left'
import RightHome from '../../components/home/right'
import Stories from '../../components/home/stories'
import CreatePost from '../../components/createPost'
import ActivateForm from './ActivateForm'
import { useNavigate, useParams } from 'react-router-dom'

//axios - it can be create as action
import axios from "axios"

import Cookies from 'js-cookie'

function Activate() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((user) => ({...user}));

    //It can be create as reducers
    const [success, setSucess] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { token } = useParams()

    const activateAccount = async() => {
        try {            
            setLoading(true)
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/activate`, 
            {token}, 
            {headers: {
                Authorization: `Bearer ${user.token}`
            }})
            setSucess(data.message)
            Cookies.set("user", JSON.stringify({ ...user, verified: true }))
            dispatch({
                type: "VERIFY",
                payload: true,
            })
            setTimeout(()=> {
                navigate("/")
            }, 3000)
        } catch (error) {
            setError(error.response.data.message)
            setTimeout(()=> {
                navigate("/")
            }, 3000)
        }
    }
    useEffect(() => {
        activateAccount()
    }, [])

    return (
        <div className='home'>

            {success && (
                <ActivateForm
                type="success"
                header="Acoount verification succeded"
                text={success}
                loading={loading}
                />
            )}

            {error && (
                <ActivateForm
                type="error"
                header="Acoount verification failed"
                text={error}
                loading={loading}
                />
            )}
            
            <Header/>
            <LeftHome user={user}/>

            <div className="home_middle">
                <Stories/>
                <CreatePost user={user}/>
            </div>
            
            <RightHome user={user}/>
        </div>
    )
}

export default Activate