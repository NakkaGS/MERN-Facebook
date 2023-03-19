//Redux
import { useSelector } from 'react-redux'

//Router Dom
//An <Outlet> should be used in parent route elements to render their child route elements. 
//This allows nested UI to show up when child routes are rendered. 
//If the parent route matched exactly, it will render a child index route or nothing if there is no index route.
import { Navigate, Outlet } from 'react-router-dom'

export default function NotLoggedInRoutes () {
    const {user} = useSelector((state) => ({...state}));
    return user ? <Navigate to="/"/> : <Outlet/>
}