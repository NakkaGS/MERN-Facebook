import { useEffect, useRef, useState } from 'react'

//SVG
import { Return, Search } from '../../svg'

// Helpers
import useClickOutside from '../../helpers/clickOutside'

export default function SearchMenu({color, setShowSearchMenu}) {

    const [iconVisible, setIconVisible] = useState(false)

    const input = useRef(null)

    const menu = useRef(null)

    useClickOutside(menu, () => {
        setShowSearchMenu(false)
    })

    useEffect(() => {
        input?.current?.focus();
    }, [])

    return (
        <div className="header_left search_area scrollbar" ref={menu}>
            <div className="search_wrap">

                <div className="header_logo">
                    <div className="circle hover1" onClick={()=> {setShowSearchMenu(false)}}>
                        <Return color={color}/>
                    </div>
                </div>
                <div className="search" onClick={() => {
                    input.current.focus();
                }}>
                    {iconVisible && (
                        <div>
                            <Search color={color}/>
                        </div>
                    )}

                    <input type="text" placeholder='Search Facebook' onFocus={() => setIconVisible (false)} onBlur={() => setIconVisible (true)}/>
                </div>
            </div>

            <div className="search_history_header">
                <span>Recent searches</span>
                <a href="#">Edit</a>
            </div>

            <div className="search_history"></div>
            <div className="search_results scrollbar"></div>
        </div>
    )
}
