import React, { useRef, useState } from 'react'

import Header from '../../components/header/'
import useClickOutside from '../../helpers/clickOutside'

function Home() {
  const [visible, setVisible] = useState(true)
  const el = useRef(null)
  useClickOutside(el, () => {
    setVisible(false)
    //el.current.style.display = 'none' //without the useState
  })

  return (
    <div>
      <Header/>
      {visible && <div className="card" ref={el}></div>}
    </div>
  )
}

export default Home