'use client'

import Button from "@/components/button/button"
import { ThemeProp } from "../nav.type"
import Arrow1 from "@/icons/arrow-1"
import MapCoberturaIcon from "@/icons/map-cobertura"
import { useRouter } from "next/navigation"

const LinksMobile = (props:{theme:ThemeProp}):JSX.Element => {

    const router = useRouter();

    const handleClicklink = (link:string):void => {
        document.getElementById('screen-menu-mobile')?.classList.add('hidden');
        router.push(link);

    }

    return<>
            <div className="buttons-nav-mobile w-[90%] ml-[5%] h-[300px] mt-[20px]">
                <Button 
                    color={props.theme.white}
                    text="Cotizar"
                    bg={props.theme.primary}
                    icon={<Arrow1 width={20} height={20} fill={props.theme.white} />}    
                    height="60px"
                    click={() =>handleClicklink('/cotizar')}
                />
                <Button 

                    color={props.theme.white}
                    text="Cobertura"
                    bg={props.theme.primary}
                    icon={<MapCoberturaIcon width={22} height={23} fill={props.theme.white} />}
                    height="60px"    
                    click={() =>handleClicklink('/cobertura')}
                />
            </div>
    </>
}

export default LinksMobile;