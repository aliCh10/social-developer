'use client';

import NavBarComponent from './NavBarComponet';
import AjouterPostComponet from './poste/AjouterPostComponet';
import SideBar from './SideBar';


function HomeComponet() {
  

  return (
    <div className="main-wrapper">
      <NavBarComponent />
      <SideBar />
      <AjouterPostComponet/>
      
    </div>
  );
}

export default HomeComponet;
