import {render, screen} from '@testing-library/react';
import Navbar from './nav';
import '@testing-library/jest-dom/';

describe('Rendering Tests', () => {

    it('should render the nav component and its nested components: close-menu and hamburger-menu', () => {

        render( <Navbar
            logo="https://cms.skycode.me/skycode/assets/t3nkikzmo8go4csw"
            name="Doomis"
            items={[{name:'Cotizar', link:'/cotizar'}, {name:'Cobertura', link:'/cobertura'}]}
            social={[{name:'Facebook', icon:'/icon',link:'/link'}, {name:'Instagram', icon:'/icon',link:'/link'}]}
            theme={{primary:'#000',secondary:'#000',white:'#fff',black:'#000',gray:'#000', gray_dark:'#000'}}
        />);

        const hamburgerBars = screen.getByTestId('hamburger-bars');
        const nav = screen.getByTestId('nav');
        const closeMenu = screen.getByTestId('close-menu');

        expect(nav).toBeInTheDocument();
        expect(closeMenu).toBeInTheDocument();
        expect(hamburgerBars).toBeInTheDocument();
    });

    it('should render the nav texts like name bussines, items, menu title, etc',()=>{
        
        render( <Navbar
            logo="https://cms.skycode.me/skycode/assets/t3nkikzmo8go4csw"
            name="Doomis"
            items={[{name:'Cotizar', link:'/cotizar'}, {name:'Cobertura', link:'/cobertura'}]}
            social={[{name:'Facebook', icon:'/icon',link:'/link'}, {name:'Instagram', icon:'/icon',link:'/link'}]}
            theme={{primary:'#000',secondary:'#000',white:'#fff',black:'#000',gray:'#000', gray_dark:'#000'}}
        />);

        const name = screen.getByText('Doomis');
        const item1 = screen.getByText('Cotizar');
        const item2 = screen.getByText('Cobertura');
        const titleMenu = screen.getByText('Menu');

        expect(name).toBeInTheDocument();
        expect(item1).toBeInTheDocument();
        expect(item2).toBeInTheDocument();
        expect(titleMenu).toBeInTheDocument();

    });

    it('should render the images like logo and social icons',()=>{

        render( <Navbar
            logo="https://cms.skycode.me/skycode/assets/t3nkikzmo8go4csw"
            name="Doomis"
            items={[{name:'Cotizar', link:'/cotizar'}, {name:'Cobertura', link:'/cobertura'}]}
            social={[{name:'Facebook', icon:'/icon',link:'/link'}, {name:'Instagram', icon:'/icon',link:'/link'}]}
            theme={{primary:'#000',secondary:'#000',white:'#fff',black:'#000',gray:'#000', gray_dark:'#000'}}
        />);

        const logo = screen.getByAltText('logo');
        const icon1 = screen.getByAltText('icon');
        const icon2 = screen.getByAltText('icon');

        expect(logo).toBeInTheDocument();
        expect(icon1).toBeInTheDocument();
        expect(icon2).toBeInTheDocument();

    }
    );



});