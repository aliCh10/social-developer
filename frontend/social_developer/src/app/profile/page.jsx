import React from 'react';
import SideBar from '../Componets/SideBar';
import NavBarComponent from '../Componets/NavBarComponet';
import AccueilProfileComponet from '../Componets/Profile/AccueilProfileComponet';

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