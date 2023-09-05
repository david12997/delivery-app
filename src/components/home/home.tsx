import Image from "next/image";
import { HomeProps } from "./home.type";
import ContainerButtons from "./client/buttons";

const HomeComponent = (props:HomeProps):JSX.Element => {

    const data = JSON.parse(props.dataBrand);
   
    return<section className="absolute top-[50px] bg-[#00000029] w-screen h-[96vh]  ">
        
        <div className="main-container  w-[90%] ml-[5%] md:w-[50%] md:ml-[25%] h-[100%] md:pt-[40px]">
            
            <div className="container-logo relative flex items-center justify-center">
                <Image
                    src={data.page_home.brand.logo}
                    alt="logo"
                    width={180}
                    height={180}
                />
                <div className="cursor-pointer  h-[130px]  w-[290px] md:w-[360px] bg-white   p-1 z-10 rounded-[17px] message-home absolute top-[149px] shadow-sm shadow-[#818181]">
                    <h1 className=" ml-3 p-[2px]  truncate text-ellipsis  w-[260px] md:w-[330px]  text-[15px] md:text-[17px] font-extrabold ">
                        {data.page_home.brand.message1}
                    </h1>
                    <h1 className=" ml-3 p-[2px] truncate text-ellipsis  w-[260px] md:w-[330px] text-[#7a7a7a]  text-[15px] md:text-[17px] font-extrabold ">
                        {data.page_home.brand.message2}
                    </h1>
                    <h1 className=" ml-3 p-[2px] truncate text-ellipsis  w-[260px] md:w-[330px]  text-[#7a7a7a]   text-[15px] md:text-[17px] font-extrabold ">
                        {data.page_home.brand.message3}
                    </h1>
                    <h1 style={{color:data.theme.primary}} className=" ml-3 p-[2px] truncate text-ellipsis  w-[260px] md:w-[330px]   text-[15px] md:text-[17px] font-extrabold ">
                        {data.page_home.brand.message4}
                    </h1>
                </div>
            </div>
            
           <ContainerButtons
                theme={data.theme}
                items={data.items}
           />

        </div>
    </section>
};

export default HomeComponent;