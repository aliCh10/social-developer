import React from 'react'
import AccueilProfileComponet from '../Componets/Profile/AccueilProfileComponet'
import NavBarComponent from '../Componets/NavBarComponet'
import SideBar from '../Componets/SideBar'

const page = () => {
  return (
    <div>

        <div className="main-wrapper">
      <NavBarComponent />
      <SideBar />
      <AccueilProfileComponet/>

      
    </div>
    </div>
  )
}

export default page