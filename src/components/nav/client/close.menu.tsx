'use client'

import CloseTimes from "@/icons/close-times"
import { CloseMenuProps } from "../nav.type";

const CloseMenuMobile = (props:CloseMenuProps):JSX.Element => {
    
    const closeMenuMobile = ():void => {

        const menuMobile = document.getElementById('screen-menu-mobile') as HTMLElement;
        menuMobile.classList.remove('block');
        menuMobile.classList.add('hidden');
    }

    return<>
        <div data-testid="close-menu" onClick={closeMenuMobile}  className="close cursor-pointer">
            <CloseTimes width={18} height={18} fill={props.color}/>
        </div>
    </>
}

export default CloseMenuMobile;