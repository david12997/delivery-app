import Image from "next/image";
import { NavbarProps } from "./nav.type"
import Link from "next/link";
import HamburgerBars from "./client/hamburger.bars";
import CloseMenuMobile from "./client/close.menu";
import LinksMobile from "./client/links.mobile";
import SocialMedia from "./client/social.media";


const NavbarClient = (props:NavbarProps):JSX.Element => {

    return<nav data-testid="nav" 
            style={{background:props.theme.primary}} 
            className="mt-[0px] relative w-screen h-[50px] flex justify-between"
            >

        <Link href={'/'} className="contianer-logo-name flex ml-2 md:ml-4 items-center  justify-between w-[200px] cursor-pointer">
            <Image 
                src={'https://cms.skycode.me/skycode/assets/g6r4eefeazsowkwo'} 
                width={45} 
                height={45} 
                alt="logo"
                className="mt-[1px]"
            />
            <h1 className=" w-[150px] text-ellipsis text-white text-[20px] font-bold ml-2 "> 
                {props.name} 
            </h1>
        </Link>

        <div className="container-items-redes w-[330px] hidden md:flex justify-around  mr-2 md:mr-4">
            
            <div className="container-items  flex items-center">
                {
                    props.items.map((item, index) => {

                        return<Link key={index} href={item.link} className={`${item.name.toLowerCase()}-menu-desktop flex items-center justify-center w-[100px] h-[50px] text-white text-[18px] font-semibold ml-1 mr-1`}>
                            {item.name}
                        </Link>

                    })
                }
            </div>

            <SocialMedia redes={props.social} screen="desktop" />

        </div>

        <HamburgerBars/>

        <div id="screen-menu-mobile" className="z-20 shadow-[#b0b0b0] shadow-lg  absolute left-[15vw] w-[85vw] h-[100vh] hidden md:hidden bg-white">

            <div className="title-close ml-[45%] w-[50%] h-[40px]  flex items-center justify-between">
                <div className="title text-[18px] font-semibold">
                    Menu
                </div>
                <CloseMenuMobile color={props.theme.primary}/>
            </div>
            <hr className="w-[95%] ml-[2.5%] mt-1"/>
            
            <LinksMobile theme={props.theme}/>

            <SocialMedia redes={props.social} screen="mobile" />

        </div>

    </nav>
}

const NavbarAdmin = (props:NavbarProps):JSX.Element => {

    return<nav data-testid="nav" 
            style={{background:props.theme.primary}} 
            className="mt-[0px] relative w-screen h-[50px] flex justify-between"
            >

        <Link href={'/'} className="contianer-logo-name flex ml-2 md:ml-4 items-center  justify-between w-[200px] cursor-pointer">
            <Image 
                src={'https://cms.skycode.me/skycode/assets/g6r4eefeazsowkwo'} 
                width={45} 
                height={45} 
                alt="logo"
                className="mt-[1px]"
            />
            <h1 className=" w-[150px] text-ellipsis text-white text-[20px] font-bold ml-2 "> 
                {props.name} 
            </h1>
        </Link>

        <div className="container-items-redes w-[330px] hidden md:flex justify-around  mr-2 md:mr-4">
            
            <div className="container-items  flex items-center">
               

                <Link href='/conductores/salir' className={`flex items-center justify-center w-[100px] h-[50px] text-white text-[18px] font-semibold ml-1 mr-1`}>
                    Salir
                </Link>

            </div>

        </div>


        <HamburgerBars/>

        <div id="screen-menu-mobile" className="z-20 shadow-[#b0b0b0] shadow-lg  absolute left-[15vw] w-[85vw] h-[100vh] hidden md:hidden bg-white">

            <div className="title-close ml-[45%] w-[50%] h-[40px]  flex items-center justify-between">
                <div className="title text-[18px] font-semibold">
                    Menu
                </div>
                <CloseMenuMobile color={props.theme.primary}/>
            </div>
            <hr className="w-[95%] ml-[2.5%] mt-1"/>
            

        </div>

    </nav>
}


const Navbar = (props:NavbarProps):JSX.Element => {
    
    
    return<>
    {
        props.admin !== undefined
        &&
        props.admin !== true
        ? 
        <NavbarClient {...props}/>
        :
        <NavbarAdmin {...props}/>
    }
    
    </>
}
export default Navbar