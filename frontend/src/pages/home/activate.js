import React from 'react'

//Styling
import './style.css'

//Redux
import { useSelector } from 'react-redux'

//Components
import Header from '../../components/header/'
import LeftHome from '../../components/home/left'
import RightHome from '../../components/home/right'
import Stories from '../../components/home/stories'
import CreatePost from '../../components/createPost'
import ActivateForm from './ActivateForm'

function Activate() {
    const { user } = useSelector((user) => ({...user}));
    const [success, setSucess] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

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