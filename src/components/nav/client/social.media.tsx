'use client'

import Image from "next/image"
import { SocialProp } from "../nav.type"


const LinksSocialMedia = (props:{redes:SocialProp[]}):JSX.Element => {

    return<>
        {
                    
            props.redes.map((item, index) => {

                return<div key={index} 
                    className=" w-[40px] h-[50px] flex items-center ml-4"
                    onClick={() => window.open(item.link)}
                >
                    <Image
                        src={item.icon}
                        width={35}
                        height={35}
                        alt="icon"
                    />

                </div>
            })
        }
    </>
}

const SocialMedia = (props:{redes:SocialProp[],screen:string}):JSX.Element => {

    return<>
        {
            props.screen === 'desktop' 
            ?
            <div className="container-redes flex cursor-pointer">
               <LinksSocialMedia redes={props.redes}/>
            </div>
            :
            props.screen === 'mobile'
            ?
            <div className="absolute container-redes-mobile flex items-center justify-center w-[100%] bottom-[10px] h-[50px]">
                <LinksSocialMedia redes={props.redes}/>
            </div>
            :
            null

            
            
            
        }

    </>
}

export default SocialMedia;