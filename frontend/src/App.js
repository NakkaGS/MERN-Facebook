import './App.css';

import { useState } from 'react';

//Redux
import { useSelector } from 'react-redux';

//Router-Dom
import { Routes, Route } from 'react-router-dom'

//Components
import CreatePostPopup from "./components/createPostPopup"

//Pages
import Login from './pages/login'
import Profile from './pages/profile'
import Home from './pages/home'
import Activate from './pages/home/activate'
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';
import Reset from './pages/reset';

function App() {

  const [visible, setVisible] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))
  
  return <div>
    {visible && <CreatePostPopup user={user} setVisible={setVisible}/>}

    <Routes>

      <Route element={<LoggedInRoutes/>}>
        <Route path='/profile' element={<Profile/>} exact/>
        <Route path='/' element={<Home setVisible={setVisible}/>} exact/>
        <Route path='/activate/:token' element={<Activate/>} exact/>
      </Route>

      <Route element={<NotLoggedInRoutes/>}>
        <Route path='/login' element={<Login/>} exact/>
      </Route>

      <Route path='/reset' element={<Reset/>}/>

    </Routes>
  </div>
}

export default App;
