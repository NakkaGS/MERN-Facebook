import './App.css';
import { Routes, Route } from 'react-router-dom'

//Pages
import Login from './pages/login'
import Profile from './pages/profile'
import Home from './pages/home'
import Activate from './pages/home/activate'
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutesjs';

function App() {
  return <div>
    <Routes>

      <Route element={<LoggedInRoutes/>}>
        <Route path='/profile' element={<Profile/>} exact/>
        <Route path='/' element={<Home/>} exact/>
        <Route path='/activate/:token' element={<Activate/>} exact/>
      </Route>

      <Route element={<NotLoggedInRoutes/>}>
        <Route path='/login' element={<Login/>} exact/>
      </Route>

    </Routes>
  </div>
}

export default App;
