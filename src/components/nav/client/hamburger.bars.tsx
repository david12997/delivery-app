'use client'

import HamburgerBarsIcon from "@/icons/nav-bars"

const HamburgerBars = ():JSX.Element => {

    const openMenuMobile = ():void => {
            
        const menuMobile = document.getElementById('screen-menu-mobile') as HTMLElement;
        menuMobile.classList.remove('hidden');
        menuMobile.classList.add('block');

    }

    return<>
        <div  data-testid="hamburger-bars" onClick={openMenuMobile} className="container-hamburger-nav flex items-center md:hidden w-[50px] h-[50px] cursor-pointer">
            <HamburgerBarsIcon width={25} height={25} fill="white"/>
        </div>
    </>
}

export default HamburgerBars;