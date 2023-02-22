import React from 'react'

//Styling
import './style.css'

//Router-Dom
import { Link } from 'react-router-dom'
import { Friends, FriendsActive, Gaming, HomeActive, Logo, Market, Search, Watch } from '../../svg'

function index() {

    const color = '#65676b'

    return (
        <header>

            <div className="header_left">
                <Link to="/" className='header_logo'>
                    <div className="circle">
                        <Logo/>
                    </div>
                </Link>
                <div className="search search1">
                    <Search color={color}/>
                    <input type="text" placeholder='Search Facebook' className="hide_input" />
                </div>
            </div>

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

            <div className="header_right"></div>
        </header>
    )
}

export default index