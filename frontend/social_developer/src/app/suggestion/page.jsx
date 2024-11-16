import React from 'react'
import TopNavbar from '../Componets/TopNavbar'
import SuggestionComponent from '../Componets/SuggestionComponent'
import SideBar from '../Componets/SideBar'
import NavBarComponent from '../Componets/NavBarComponet'

function page() {
  return (
    <div>
      <NavBarComponent />
      <SideBar></SideBar>
      <SuggestionComponent></SuggestionComponent>
    </div>
  )
}

export default page
