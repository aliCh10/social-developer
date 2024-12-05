import React from 'react';
import SideBar from '../Componets/SideBar';
import NavBarComponent from '../Componets/NavBarComponet';
import AccueilProfileComponet from '../Componets/Profile/AccueilProfileComponet';

function Page() {
  return (
    <div>
      <NavBarComponent />
      <SideBar />
      <AccueilProfileComponet />

    </div>
  );
}

export default Page;
