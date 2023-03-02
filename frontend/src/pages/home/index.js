import React from 'react'
import { useSelector } from 'react-redux'

//Components
import Header from '../../components/header/'
import LeftHome from '../../components/home/left'

function Home() {
  const { user } = useSelector((user) => ({...user}));
  
  return (
    <div>
      <Header/>
      <LeftHome user={user}/>
    </div>
  )
}

export default Home