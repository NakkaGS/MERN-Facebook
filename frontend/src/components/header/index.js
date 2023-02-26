import React, { useRef, useState } from 'react'

//Styling
import './style.css'

//Router-Dom
import { Link } from 'react-router-dom'

//SVG
import { 
    ArrowDown, 
    Friends, 
    Gaming, 
    HomeActive, 
    Logo, 
    Market, 
    Menu, 
    Messenger, 
    Notifications, 
    Search, 
    Watch } from '../../svg'

// Redux
import { useSelector } from 'react-redux'

//Components
import SearchMenu from './SearchMenu'
import AllMenu from './AllMenu'

//Helpers
import useClickOutside from '../../helpers/clickOutside'
import UserMenu from './UserMenu'

function Header() {

    const { user } = useSelector((user) => ({ ...user }))

    const [showSearchMenu, setShowSearchMenu] = useState(false)
    const [showAllMenu, setShowAllMenu] = useState(false)
    const allmenu = useRef()
    useClickOutside(allmenu, () => {
        setShowAllMenu(false)
    })

    const color = '#65676b'

    return (
        <header>

            <div className="header_left">
                <Link to="/" className='header_logo'>
                    <div className="circle">
                        <Logo/>
                    </div>
                </Link>
                <div className="search search1" onClick={()=> {setShowSearchMenu(true)}}>
                    <Search color={color}/>
                    <input type="text" placeholder='Search Facebook' className="hide_input" />
                </div>
            </div>

            {showSearchMenu && <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu}/>}

            <div className="header_middle">
                <Link to="/" className='middle_icon hover1 active'>
                    <HomeActive/>
                </Link>
                <Link to="/" className='middle_icon hover1'>
                    <Friends color={color}/>
                </Link>
                <Link to="/" className='middle_icon hover1'>
                    <div className="middle_notification">+9</div>
                    <Watch color={color}/>
                </Link>
                <Link to="/" className='middle_icon hover1'>
                    <Market color={color}/>
                </Link>
                <Link to="/" className='middle_icon hover1'>
                    <Gaming color={color}/>
                </Link>
            </div>

            <div className="header_right">
                <Link to="/profile" className='profile_link hover1'>
                    <img src={user?.picture} alt="" />
                    <span>{user?.first_name}</span>
                </Link>
                <div className="circle_icon hover1" ref={allmenu} onClick={()=>setShowAllMenu((prev) => !prev)} >
                    <Menu/>
                    {showAllMenu && <AllMenu/>}
                </div>
                <div className="circle_icon hover1">
                    <Messenger/>
                </div>
                <div className="circle_icon hover1">
                    <Notifications/>
                    <div className="right_notification">5</div>
                </div>
                <div className="circle_icon hover1">
                    <ArrowDown/>
                    <UserMenu user={user}/>
                </div>
            </div>
        </header>
    )
}

export default Header