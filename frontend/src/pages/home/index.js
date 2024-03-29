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
import SendVerification from '../../components/home/sendVerification'

export default function Home({ setVisible }) {
  const { user } = useSelector((state) => ({...state}));

  return (
    <div className='home'>
      <Header/>
      <LeftHome user={user}/>
      <div className="home_middle">
        <Stories/>
        
        {
          user.verified && <SendVerification user={user}/>
        }

        <CreatePost user={user} setVisible={setVisible}/>
      </div>
      <RightHome user={user}/>
    </div>
  )
}