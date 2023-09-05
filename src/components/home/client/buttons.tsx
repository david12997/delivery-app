'use client'

import Button from "@/components/button/button"
import React from "react"
import { ContainerButtons } from "../home.type"
import Arrow1 from "@/icons/arrow-1"
import MapCoberturaIcon from "@/icons/map-cobertura"
import { useRouter } from "next/navigation"

const ContainerButtons = (props:ContainerButtons):JSX.Element => {

    const router = useRouter();

    return<>
        <div className="container-buttons mt-[110px]  w-[100%] md:w-[70%] md:ml-[15%]">
            <Button
                click={()=>router.push('/cotizar')}
                text="Cotizar entregas"
                bg={props.theme.primary}
                color={props.theme.secondary}
                height="65px"
                icon={<Arrow1 width={20} height={20} fill={props.theme.secondary} />}
            />
            <Button
                click={()=>router.push('/cobertura')}
                text="Cobertura"
                bg={props.theme.primary}
                color={props.theme.secondary}
                height="65px"
                icon={<MapCoberturaIcon width={23} height={26} fill={props.theme.secondary} />}
            />
        </div>
    </>
}

export default ContainerButtons;