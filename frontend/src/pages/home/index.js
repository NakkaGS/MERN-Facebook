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

export default function Home() {
  const { user } = useSelector((user) => ({...user}));

  return (
    <div className='home'>
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