//Redux
import { useSelector } from 'react-redux'

//Router Dom
//An <Outlet> should be used in parent route elements to render their child route elements. 
//This allows nested UI to show up when child routes are rendered. 
//If the parent route matched exactly, it will render a child index route or nothing if there is no index route.
import { Outlet } from 'react-router-dom'

//Page Login
import Login from '../pages/login'

export default function LoggedInRoutes (){
    const {user} = useSelector((state) => ({...state}));
    return user ? <Outlet /> : <Login/>
}