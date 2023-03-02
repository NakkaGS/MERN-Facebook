import React from 'react'

//Styling
import "./style.css";

//Component
import LeftLink from './LeftLink'

//Data
import { left } from '../../../data/home'

//Router Dom
import { Link } from 'react-router-dom'

export default function LeftHome({user}) {

  return (
    <div className="left_home">
        <Link to='/profile' className="left_link hover">
            <img src={user?.picture} alt="" />
            <span>
                {user?.first_name} {user?.last_name}
            </span>
        </Link>
        {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
    </div>
  )
}
